from rest_framework import routers
from .views import StudentViewSet, StudentUserViewSet, StudentCourseViewSet

router = routers.DefaultRouter()
router.register('api/student/student', StudentViewSet, 'student-student')
router.register('api/student/student-user', StudentUserViewSet, 'student-user')
router.register('api/student/student-course', StudentCourseViewSet, 'student-course')

urlpatterns = router.urls
