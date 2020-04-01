from rest_framework import serializers
from .models import Student, StudentCourse, StudentModule, StudentLesson

from accounts.serializers import UserProfileSerializer
from course.serializers import CourseSerializer, CategorySerializer, ModuleSerializer, LessonSerializer
from educator.serializers import EducatorSerializer


class StudentSerializer(serializers.ModelSerializer):
    """Student model serializer."""
    id = UserProfileSerializer(required=False)
    educators = EducatorSerializer(required=False, many=True)
    categories = CategorySerializer(required=False, many=True)

    class Meta:
        model = Student
        fields = '__all__'


class StudentCourseSerializer(serializers.ModelSerializer):
    """Student's Course model serializer."""
    course = CourseSerializer(required=False)

    class Meta:
        model = StudentCourse
        fields = '__all__'


class StudentModuleSerializer(serializers.ModelSerializer):
    """Student's Module model serializer."""
    module = ModuleSerializer(required=False)

    class Meta:
        model = StudentModule
        fields = '__all__'


class StudentLessonSerializer(serializers.ModelSerializer):
    """Student's Lesson model serializer."""
    lesson = LessonSerializer(required=False)

    class Meta:
        model = StudentLesson
        fields = '__all__'
