from django.urls import path, include
from knox import views as knox_views
from rest_framework import routers


from .views import RegisterAPI, LoginAPI, UserAPI, UserProfileViewSet

router = routers.DefaultRouter()
router.register('api/auth/user_profile', UserProfileViewSet, 'user-profile')

urlpatterns = [
    path('api/auth', include('knox.urls')),
    path('api/auth/register', RegisterAPI.as_view()),
    path('api/auth/login', LoginAPI.as_view()),
    path('api/auth/user', UserAPI.as_view()),
    path('api/auth/logout', knox_views.LoginView.as_view(), name='knox_logout'),
] + router.urls
