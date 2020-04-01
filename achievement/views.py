from rest_framework import permissions
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Achievement

from .serializers import AchievementSerializer

from .documents import AchievementDocument

from misc.classes import ElasticModelViewSet


# ------------------------------------------------- STUDENT -------------------------------------------------
class AchievementViewSet(ElasticModelViewSet):
    """Student viewset"""
    queryset = Achievement.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = AchievementSerializer
    es_document_class = AchievementDocument
    model_class = Achievement

    @action(detail=False, methods=['GET'])
    def get_type_options(self, request):
        data = Achievement.TYPE_CHOICES
        data_dict = []
        for type_choice in data:
            data_dict.append(type_choice)
        return Response(data, 200)


# ------------------------------------------------- STUDENT USER -------------------------------------------------
class AchievementUserViewSet(ElasticModelViewSet):
    """Achievement User viewset"""
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = AchievementSerializer
    es_document_class = AchievementDocument
    model_class = Achievement

    def get_queryset(self):
        result = self.request.user.user_profile.created_achievements
        return result

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user.user_profile)
