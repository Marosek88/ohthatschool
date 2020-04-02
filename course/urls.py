from rest_framework import routers
from .views import (CourseViewSet,
                    CourseEducatorViewSet,
                    CourseStudentViewSet,
                    ModuleViewSet,
                    ModuleEducatorViewSet,
                    LessonViewSet,
                    LessonEducatorViewSet,
                    )

router = routers.DefaultRouter()
router.register('api/course/course', CourseViewSet, 'course-course')
router.register('api/course/course-educator', CourseEducatorViewSet, 'course-course-educator')
router.register('api/course/course-student', CourseStudentViewSet, 'course-course-student')
router.register('api/course/module', ModuleViewSet, 'course-module')
router.register('api/course/module-educator', ModuleEducatorViewSet, 'course-module-educator')
router.register('api/course/lesson', LessonViewSet, 'course-lesson')
router.register('api/course/lesson-educator', LessonEducatorViewSet, 'course-lesson-educator')

urlpatterns = router.urls
