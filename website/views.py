from website.models import Website
from rest_framework import viewsets, permissions
from website.serializers import WebsiteSerializer


class WebsiteViewSet(viewsets.ModelViewSet):
    queryset = Website.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = WebsiteSerializer
