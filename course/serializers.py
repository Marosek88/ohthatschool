from rest_framework import serializers
from .models import Category, Course, Module, Lesson

from educator.serializers import EducatorSerializer


class CategorySerializer(serializers.ModelSerializer):
    """Category model serializer."""
    class Meta:
        model = Category
        fields = '__all__'


class CourseSerializer(serializers.ModelSerializer):
    """Course model serializer."""
    owner = EducatorSerializer(required=False)

    class Meta:
        model = Course
        fields = '__all__'


class ModuleSerializer(serializers.ModelSerializer):
    """Module model serializer."""
    owner = EducatorSerializer(required=False)
    course = CourseSerializer(required=False)

    class Meta:
        model = Module
        fields = '__all__'

    def create(self, validated_data):
        course = self.initial_data['course']
        instance = super(ModuleSerializer, self).create(validated_data)
        instance.course_id = course
        instance.save()
        return instance


class LessonSerializer(serializers.ModelSerializer):
    """Lesson model serializer."""
    owner = EducatorSerializer(required=False)
    module = ModuleSerializer(required=False)

    class Meta:
        model = Lesson
        fields = '__all__'

    def create(self, validated_data):
        module = self.initial_data['module']
        instance = super(LessonSerializer, self).create(validated_data)
        instance.module_id = module
        instance.save()
        return instance
