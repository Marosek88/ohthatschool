from rest_framework import serializers
from .models import Parent

from accounts.serializers import UserProfileSerializer
from student.serializers import StudentSerializer


class ParentSerializer(serializers.ModelSerializer):
    """Parent model serializer."""
    children = StudentSerializer(required=False, many=True)
    id = UserProfileSerializer(required=False)

    class Meta:
        model = Parent
        fields = '__all__'
