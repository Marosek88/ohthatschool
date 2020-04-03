from django.db.models import Q
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.decorators import action
import json

from .models import Course, Module, Lesson
from .serializers import CourseSerializer, ModuleSerializer, LessonSerializer
from .documents import CourseDocument, ModuleDocument, LessonDocument

from misc.classes import ElasticModelViewSet


# ------------------------------------------------- COURSE EVERYONE -------------------------------------------------
class CourseViewSet(ElasticModelViewSet):
    """Course viewset for public access"""
    # queryset = Course.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = CourseSerializer
    es_document_class = CourseDocument
    model_class = Course

    def get_queryset(self):
        return Course.objects.order_by('title')

    """Any modify functions are disabled"""
    def create(self, request, *args, **kwargs):
        pass

    def update(self, request, *args, **kwargs):
        pass

    def partial_update(self, request, pk=None, *args, **kwargs):
        pass

    def destroy(self, request, pk=None, *args, **kwargs):
        pass

    @action(detail=False, methods=['POST'])
    def search(self, request):
        categories = json.loads(request.data['categories'])
        sort_by = request.data['sort_by']
        query = request.data['query']
        # Prepare queries
        q = Q()
        if categories:
            q |= Q(category__in=categories)
        if query:
            q |= Q(title__contains=query)
        courses = Course.objects.filter(q)
        # Sort
        if sort_by:
            courses.order_by(f'{sort_by}')
        data = CourseSerializer(courses, many=True).data
        # self.add_es_data(data)
        return Response(data, 200)

    @action(detail=True, methods=['GET'])
    def get_course_modules(self, request, pk=None):
        course = self.get_object()
        course_modules = course.modules
        serializer = ModuleSerializer(course_modules, many=True)
        # self.add_es_data(serializer.data, ModuleDocument)
        return Response(serializer.data, status=200)


# ------------------------------------------------- COURSE EDUCATOR -------------------------------------------------
class CourseEducatorViewSet(ElasticModelViewSet):
    """Educator's Course viewset"""
    # queryset = Course.objects.all()
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = CourseSerializer
    es_document_class = CourseDocument
    model_class = Course

    def get_queryset(self):
        return self.request.user.user_profile.educator.courses.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user.user_profile.educator)

    @action(detail=True, methods=['GET'])
    def get_course_modules(self, request, pk=None):
        course = self.get_object()
        course_modules = course.modules
        serializer = ModuleSerializer(course_modules, many=True)
        # self.add_es_data(serializer.data, ModuleDocument)
        return Response(serializer.data, status=200)


# ------------------------------------------------- COURSE STUDENT -------------------------------------------------
class CourseStudentViewSet(ElasticModelViewSet):
    """Student's Course viewset"""
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = CourseSerializer
    es_document_class = CourseDocument
    model_class = Course

    def get_queryset(self):
        return self.request.user.user_profile.student.courses.all()

    def create(self, request, *args, **kwargs):
        pass

    @action(detail=True, methods=['GET'])
    def get_course_modules(self, request, pk=None):
        course = self.get_object()
        course_modules = course.modules
        serializer = ModuleSerializer(course_modules, many=True)
        # self.add_es_data(serializer.data, ModuleDocument)
        return Response(serializer.data, status=200)


# ------------------------------------------------- MODULE EVERYONE -------------------------------------------------
class ModuleViewSet(ElasticModelViewSet):
    """Module viewset"""
    queryset = Module.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = ModuleSerializer
    es_document_class = ModuleDocument
    model_class = Module

    """Any modify functions are disabled"""
    def create(self, request, *args, **kwargs):
        pass

    def update(self, request, *args, **kwargs):
        pass

    def partial_update(self, request, pk=None, *args, **kwargs):
        pass

    def destroy(self, request, pk=None, *args, **kwargs):
        pass


# ------------------------------------------------- MODULE EDUCATOR -------------------------------------------------
class ModuleEducatorViewSet(ElasticModelViewSet):
    """Educator's Module viewset"""
    queryset = Module.objects.all()
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = ModuleSerializer
    es_document_class = ModuleDocument
    model_class = Module

    def get_queryset(self):
        educators_courses = self.request.user.user_profile.educator.courses.all()
        educators_modules = Module.objects.none()
        for course in educators_courses:
            educators_modules |= course.modules.all()
        return educators_modules

    @action(detail=True, methods=['GET'])
    def get_module_lessons(self, request, pk=None):
        module = self.get_object()
        module_lessons = module.lessons
        serializer = LessonSerializer(module_lessons, many=True)
        # self.add_es_data(serializer.data, LessonDocument)
        return Response(serializer.data, status=200)


# ------------------------------------------------- LESSON EVERYONE -------------------------------------------------
class LessonViewSet(ElasticModelViewSet):
    """Lesson viewset"""
    queryset = Lesson.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = LessonSerializer
    es_document_class = LessonDocument
    model_class = Lesson

    """Any modify functions are disabled"""
    def create(self, request, *args, **kwargs):
        pass

    def update(self, request, *args, **kwargs):
        pass

    def partial_update(self, request, pk=None, *args, **kwargs):
        pass

    def destroy(self, request, pk=None, *args, **kwargs):
        pass


# ------------------------------------------------- LESSON EDUCATOR -------------------------------------------------
class LessonEducatorViewSet(ElasticModelViewSet):
    """Lesson viewset"""
    queryset = Lesson.objects.all()
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = LessonSerializer
    es_document_class = LessonDocument
    model_class = Lesson
