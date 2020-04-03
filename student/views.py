from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Student, StudentCourse, StudentModule, StudentLesson
from achievement.models import Achievement
from course.models import Course

from .serializers import StudentSerializer, StudentCourseSerializer, StudentModuleSerializer, StudentLessonSerializer
from achievement.serializers import AchievementSerializer
from educator.serializers import EducatorSerializer
from course.serializers import CourseSerializer

from .documents import StudentDocument, StudentCourseDocument, StudentModuleDocument, StudentLessonDocument
from course.documents import CourseDocument
from educator.documents import EducatorDocument

from misc.classes import ElasticModelViewSet


# ------------------------------------------------- STUDENT -------------------------------------------------
class StudentViewSet(ElasticModelViewSet):
    """Student viewset"""
    queryset = Student.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = StudentSerializer
    es_document_class = StudentDocument
    model_class = Student


# ------------------------------------------------- STUDENT USER -------------------------------------------------
class StudentUserViewSet(ElasticModelViewSet):
    """Student User viewset"""
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = StudentSerializer
    es_document_class = StudentDocument
    model_class = Student

    def get_queryset(self):
        result = Student.objects.filter(id=self.request.user.id)
        return result

    def perform_create(self, serializer):
        serializer.save(id=self.request.user.user_profile)

    @action(detail=False, methods=['GET'])
    def get_educators(self, request):
        educators = request.user.user_profile.student.educators
        data = EducatorSerializer(educators, many=True).data
        # self.add_es_data(data, EducatorDocument)
        return Response(data, 200)

    @action(detail=False, methods=['GET'])
    def get_achievements(self, request):
        achievements = request.user.user_profile.student.achievements.filter(type__in=[
            Achievement.FROM_COURSE_TO_STUDENT,
            Achievement.FROM_EDUCATOR_TO_STUDENT
        ])
        serializer = AchievementSerializer(achievements, many=True)
        return Response(serializer.data, 200)


# ------------------------------------------------- STUDENT COURSE -------------------------------------------------
class StudentCourseViewSet(ElasticModelViewSet):
    """Student Course viewset"""
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = StudentCourseSerializer
    es_document_class = StudentCourseDocument
    model_class = StudentCourse

    def get_queryset(self):
        result = StudentCourse.objects.filter(student=self.request.user.user_profile.student)
        return result

    def perform_create(self, serializer):

        serializer.save(student=self.request.user.user_profile.student)

    @action(detail=False, methods=['GET'])
    def get_student_courses(self, request):
        student_courses = request.user.user_profile.student.student_courses
        data = StudentCourseSerializer(student_courses, many=True).data
        # for item in data:
        #     # self.add_es_data([item['course']], CourseDocument)
        return Response(data, 200)

    @action(detail=True, methods=['GET'])
    def get_modules(self):
        modules = self.get_object().modules
        serializer = CourseSerializer(modules, many=True)
        return Response(serializer.data, 200)

    @action(detail=False, methods=['POST'])
    def connect_with_course(self, request):
        student = request.user.user_profile.student
        new_course = Course.objects.get(id=request.data['id'])
        StudentCourse(course=new_course, student=student).save()
        return Response(True, 200)
