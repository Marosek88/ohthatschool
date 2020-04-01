from rest_framework import serializers
from .models import Parent

from student.serializers import StudentSerializer


class ParentSerializer(serializers.ModelSerializer):
    """Parent model serializer."""
    children = StudentSerializer(required=False, many=True)

    class Meta:
        model = Parent
        fields = '__all__'
