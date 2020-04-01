from rest_framework import routers
from .views import EducatorViewSet, EducatorUserViewSet

router = routers.DefaultRouter()
router.register('api/educator/educator', EducatorViewSet, 'educator-educator')
router.register('api/educator/educator-user', EducatorUserViewSet, 'educator-educator-user')

urlpatterns = router.urls
