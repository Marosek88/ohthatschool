from rest_framework import routers
from .views import AchievementViewSet, AchievementUserViewSet

router = routers.DefaultRouter()
router.register('api/achievement/achievement', AchievementViewSet, 'achievement-achievement')
router.register('api/achievement/achievement-user', AchievementUserViewSet, 'achievement-user')

urlpatterns = router.urls
