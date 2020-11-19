from django.core.exceptions import ObjectDoesNotExist

from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.parsers import MultiPartParser, FormParser
from knox.models import AuthToken

from .models import UserProfile, Category
from student.models import Student

from .serializers import UserSerializer, RegisterSerializer, LoginSerializer, UserProfileSerializer, CategorySerializer
from course.serializers import CourseSerializer
from educator.serializers import EducatorSerializer
from student.serializers import StudentSerializer, StudentCourseSerializer
from parent.serializers import ParentSerializer

from .documents import UserProfileDocument, CategoryDocument
from educator.documents import EducatorDocument
from student.documents import StudentDocument
from parent.documents import ParentDocument

from misc.classes import ElasticModelViewSet


# Helper file for User additional data collection
def _get_user_profile(user_profile):
    # Get User Profile
    result = {'user_profile': UserProfileSerializer(user_profile).data}

    # Get Educator (if exists)
    try:
        result['educator'] = EducatorSerializer(user_profile.educator).data
        # Educator's Connected Students
        educator_students = user_profile.educator.students.all()
        result['educator']['connects'] = {"students": StudentSerializer(educator_students, many=True).data}
        # Educator's Course Students
        result['educator']['connects']['course_students'] = []
        for course in user_profile.educator.courses.all():
            for student_course in course.student_courses.all():
                result['educator']['connects']['course_students'].append(StudentSerializer(student_course.student).data)
    except ObjectDoesNotExist:
        result['educator'] = None

    # Get Student (if exists)
    try:
        result['student'] = StudentSerializer(user_profile.student).data
        # Student's Student Courses
        student_courses = user_profile.student.student_courses.all()
        result['student']['connects'] = {'student_courses': StudentCourseSerializer(student_courses, many=True).data}
        # Courses id list
        result['student']['connects']['courses'] = []
        for student_course in result['student']['connects']['student_courses']:
            result['student']['connects']['courses'].append(student_course['course']['id'])
    except ObjectDoesNotExist:
        result['student'] = None

    # Get Parent (if exists)
    try:
        result['parent'] = ParentSerializer(user_profile.parent).data
    except ObjectDoesNotExist:
        result['parent'] = None

    return result


class RegisterAPI(generics.GenericAPIView):
    """Register API"""
    serializer_class = RegisterSerializer

    def get_serializer_context(self):
        context = super(RegisterAPI, self).get_serializer_context()
        context.update({
            "exclude_email_list": ['test@test.com', 'test1@test.com']
            # extra data
        })
        return context

    def post(self, request, *args, **kwargs):
        data = request.data
        data['username'] = data['email']
        profile_data = {
            'first_name': data['first_name'],
            'last_name': data['last_name'],
            'email': data['email'],
            'active': True,
            'location': {'lat': 0, 'lon': 0}
        }
        del data['first_name']
        del data['last_name']
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        profile_data['id'] = user.id
        # Create a User Profile entry Django database
        user_profile_object = UserProfile(id_id=profile_data['id'],
                                          first_name=profile_data['first_name'],
                                          last_name=profile_data['last_name'],
                                          email=profile_data['email'],
                                          active=profile_data['active'],
                                          )
        user_profile_object.save()

        # Create a User Profile entry in Elasticsearch
        # UserProfileDocument.init()
        # UserProfileDocument(**profile_data).save()

        # Get all user data
        result = _get_user_profile(user_profile_object)
        result['token'] = AuthToken.objects.create(user)[1]

        return Response(result, 200)


class LoginAPI(generics.GenericAPIView):
    """Login API"""
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        user_profile_object = UserProfile.objects.get(pk=user.id)

        # Get all user data
        result = _get_user_profile(user_profile_object)
        result['token'] = AuthToken.objects.create(user)[1]

        return Response(result, 200)


class UserAPI(generics.RetrieveAPIView):
    """User API"""
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user


class UserProfileViewSet(ElasticModelViewSet):
    """Educator's Course viewset"""
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = UserProfileSerializer
    # es_document_class = UserProfileDocument
    model_class = UserProfile

    parser_classes = (MultiPartParser, FormParser)

    def get_queryset(self):
        return UserProfile.objects.filter(id=self.request.user.id)

    def perform_create(self, serializer):
        serializer.save(id=self.request.user)

    @action(detail=False, methods=['POST'])
    def update_profile_picture(self, request, pk=None):
        user_profile = request.user.user_profile
        user_profile.image = request.data['image']
        user_profile.save()
        data = UserProfileSerializer(user_profile).data
        return Response(data, 200)

    @action(detail=False, methods=['GET'])
    def get_user_profiles(self, request):
        result = _get_user_profile(request.user.user_profile)
        return Response(result, 200)


# ------------------------------------------------- CATEGORY -------------------------------------------------
class CategoryViewSet(ElasticModelViewSet):
    """Category viewset"""
    queryset = Category.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = CategorySerializer
    es_document_class = CategoryDocument
    model_class = Category
