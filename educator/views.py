from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Educator
from achievement.models import Achievement

from .serializers import EducatorSerializer
from achievement.serializers import AchievementSerializer
from student.serializers import StudentSerializer

from .documents import EducatorDocument

from misc.classes import ElasticModelViewSet


# ------------------------------------------------- EDUCATOR -------------------------------------------------
class EducatorViewSet(ElasticModelViewSet):
    """Educator viewset"""
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = EducatorSerializer
    es_document_class = EducatorDocument
    model_class = Educator

    def get_queryset(self):
        return Educator.objects.all()

    """Any modify functions are disabled"""
    def create(self, request, *args, **kwargs):
        pass

    def update(self, request, *args, **kwargs):
        pass

    def partial_update(self, request, pk=None, *args, **kwargs):
        pass

    def destroy(self, request, pk=None, *args, **kwargs):
        pass


# ------------------------------------------------- EDUCATOR USER -------------------------------------------------
class EducatorUserViewSet(ElasticModelViewSet):
    """Educator User viewset"""
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = EducatorSerializer
    es_document_class = EducatorDocument
    model_class = Educator

    def get_queryset(self):
        result = Educator.objects.filter(id=self.request.user.id)
        return result

    def perform_create(self, serializer):
        serializer.save(id=self.request.user.user_profile)

    @action(detail=False, methods=['GET'])
    def get_students(self, request):
        students = request.user.user_profile.educator.students
        serializer = StudentSerializer(students, many=True)
        return Response(serializer.data, 200)

    @action(detail=False, methods=['GET'])
    def get_achievements(self, request):
        achievements = request.user.user_profile.educator.achievements.filter(type__in=[
            Achievement.FROM_PARENT_TO_EDUCATOR,
            Achievement.FROM_STUDENT_TO_EDUCATOR
        ])
        serializer = AchievementSerializer(achievements, many=True)
        return Response(serializer.data, 200)
