from rest_framework import serializers
from .models import Student, StudentCourse, StudentModule, StudentLesson

from accounts.serializers import UserProfileSerializer, CategorySerializer
from course.serializers import CourseSerializer, ModuleSerializer, LessonSerializer
from educator.serializers import EducatorSerializer


class StudentSerializer(serializers.ModelSerializer):
    """Student model serializer."""
    # categories = CategorySerializer(required=False, many=True)
    # courses = CourseSerializer(required=False, many=True)
    # educators = EducatorSerializer(required=False, many=True)
    id = UserProfileSerializer(required=False)

    class Meta:
        model = Student
        fields = '__all__'


class StudentCourseSerializer(serializers.ModelSerializer):
    """Student's Course model serializer."""
    course = CourseSerializer(required=False)
    student = StudentSerializer(required=False)

    class Meta:
        model = StudentCourse
        fields = '__all__'


class StudentModuleSerializer(serializers.ModelSerializer):
    """Student's Module model serializer."""
    module = ModuleSerializer(required=False)
    student_course = StudentCourseSerializer(required=False)

    class Meta:
        model = StudentModule
        fields = '__all__'


class StudentLessonSerializer(serializers.ModelSerializer):
    """Student's Lesson model serializer."""
    lesson = LessonSerializer(required=False)
    student_module = StudentModuleSerializer(required=False)

    class Meta:
        model = StudentLesson
        fields = '__all__'
