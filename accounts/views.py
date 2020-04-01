from django.core.exceptions import ObjectDoesNotExist

from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.parsers import MultiPartParser, FormParser
from knox.models import AuthToken

from .models import UserProfile
from .serializers import UserSerializer, RegisterSerializer, LoginSerializer, UserProfileSerializer
from educator.serializers import EducatorSerializer
from student.serializers import StudentSerializer
from parent.serializers import ParentSerializer

from .documents import UserProfileDocument
from educator.documents import EducatorDocument
from student.documents import StudentDocument
from parent.documents import ParentDocument

from misc.classes import ElasticModelViewSet


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
            'location': {'lat': 53.337272, 'lon': -6.268247}
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
        UserProfileDocument.init()
        UserProfileDocument(**profile_data).save()

        # Get Roles
        es_helper = ElasticModelViewSet()
        # Get User Profile and add ES data
        user_profile = UserProfileSerializer(user_profile_object).data
        es_helper.add_es_data([user_profile, ], UserProfileDocument)

        # Get Educator and add ES data (if exists)
        try:
            educator = EducatorSerializer(user_profile_object.educator).data
            es_helper.add_es_data([educator, ], EducatorDocument)
        except ObjectDoesNotExist:
            educator = None

        # Get Student and add ES data (if exists)
        try:
            student = StudentSerializer(user_profile_object.student).data
            es_helper.add_es_data([student, ], StudentDocument)
        except ObjectDoesNotExist:
            student = None

        # Get Parent and add ES data (if exists)
        try:
            parent = ParentSerializer(user_profile_object.parent).data
            es_helper.add_es_data([parent, ], ParentDocument)
        except ObjectDoesNotExist:
            parent = None

        return Response({
            'user_profile': user_profile,
            'educator': educator,
            'student': student,
            'parent': parent,
            "token": AuthToken.objects.create(user)[1]
        }, 200)


class LoginAPI(generics.GenericAPIView):
    """Login API"""
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        user_profile_object = UserProfile.objects.get(pk=user.id)

        # Get Roles
        es_helper = ElasticModelViewSet()
        # Get User Profile and add ES data
        user_profile = UserProfileSerializer(user_profile_object).data
        es_helper.add_es_data([user_profile, ], UserProfileDocument)

        # Get Educator and add ES data (if exists)
        try:
            educator = EducatorSerializer(user_profile_object.educator).data
            es_helper.add_es_data([educator, ], EducatorDocument)
        except ObjectDoesNotExist:
            educator = None

        # Get Student and add ES data (if exists)
        try:
            student = StudentSerializer(user_profile_object.student).data
            es_helper.add_es_data([student, ], StudentDocument)
        except ObjectDoesNotExist:
            student = None

        # Get Parent and add ES data (if exists)
        try:
            parent = ParentSerializer(user_profile_object.parent).data
            es_helper.add_es_data([parent, ], ParentDocument)
        except ObjectDoesNotExist:
            parent = None

        return Response({
            'user_profile': user_profile,
            'educator': educator,
            'student': student,
            'parent': parent,
            "token": AuthToken.objects.create(user)[1]
        }, 200)


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
    # queryset = Course.objects.all()
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = UserProfileSerializer
    es_document_class = UserProfileDocument
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
        self.add_es_data([data, ])
        return Response(data, 200)

    @action(detail=False, methods=['GET'])
    def get_user_profiles(self, request):
        # Get User Profile and add ES data
        user_profile = UserProfileSerializer(request.user.user_profile).data
        self.add_es_data([user_profile, ], UserProfileDocument)

        # Get Educator and add ES data (if exists)
        try:
            educator = EducatorSerializer(request.user.user_profile.educator).data
            self.add_es_data([educator, ], EducatorDocument)
        except ObjectDoesNotExist:
            educator = None

        # Get Student and add ES data (if exists)
        try:
            student = StudentSerializer(request.user.user_profile.student).data
            self.add_es_data([student, ], StudentDocument)
        except ObjectDoesNotExist:
            student = None

        # Get Parent and add ES data (if exists)
        try:
            parent = ParentSerializer(request.user.user_profile.parent).data
            self.add_es_data([parent, ], ParentDocument)
        except ObjectDoesNotExist:
            parent = None

        result = {
            'user_profile': user_profile,
            'educator': educator,
            'student': student,
            'parent': parent
        }

        return Response(result, 200)
