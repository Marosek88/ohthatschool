from rest_framework import serializers
from .models import Educator

from accounts.serializers import UserProfileSerializer


class EducatorSerializer(serializers.ModelSerializer):
    """Educator model serializer."""
    id = UserProfileSerializer(required=False)

    class Meta:
        model = Educator
        fields = '__all__'
