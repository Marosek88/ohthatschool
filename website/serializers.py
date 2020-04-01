from rest_framework import serializers
from website.models import Website


class WebsiteSerializer(serializers.ModelSerializer):
    """Website model serializer."""
    class Meta:
        model = Website
        fields = '__all__'
