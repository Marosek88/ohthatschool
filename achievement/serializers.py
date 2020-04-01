from rest_framework import serializers
from .models import Achievement

from course.serializers import CourseSerializer
from educator.serializers import EducatorSerializer
from student.serializers import StudentSerializer
from parent.serializers import ParentSerializer


class AchievementSerializer(serializers.ModelSerializer):
    """Achievement model serializer."""
    related_courses = CourseSerializer(required=False, many=True)
    related_educators = EducatorSerializer(required=False, many=True)
    related_students = StudentSerializer(required=False, many=True)
    related_parents = ParentSerializer(required=False, many=True)

    class Meta:
        model = Achievement
        fields = '__all__'
