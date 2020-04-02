from rest_framework import serializers
from .models import Category, Course, Module, Lesson

from accounts.serializers import CategorySerializer
from educator.serializers import EducatorSerializer


class CourseSerializer(serializers.ModelSerializer):
    """Course model serializer."""
    category = CategorySerializer(required=False)
    owner = EducatorSerializer(required=False)

    class Meta:
        model = Course
        fields = '__all__'

    def create(self, validated_data):
        category = self.initial_data['category']
        instance = super(CourseSerializer, self).create(validated_data)
        instance.category_id = category
        instance.save()
        return instance


class ModuleSerializer(serializers.ModelSerializer):
    """Module model serializer."""
    course = CourseSerializer(required=False)
    owner = EducatorSerializer(required=False)

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
    module = ModuleSerializer(required=False)
    owner = EducatorSerializer(required=False)

    class Meta:
        model = Lesson
        fields = '__all__'

    def create(self, validated_data):
        module = self.initial_data['module']
        instance = super(LessonSerializer, self).create(validated_data)
        instance.module_id = module
        instance.save()
        return instance
