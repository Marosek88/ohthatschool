from rest_framework import routers
from .views import WebsiteViewSet

router = routers.DefaultRouter()
router.register('api/website', WebsiteViewSet, 'website')

urlpatterns = router.urls
