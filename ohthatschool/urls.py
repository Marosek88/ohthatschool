from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('frontend.urls')),  # Needs to be on top
    path('', include('accounts.urls')),
    path('', include('achievement.urls')),
    path('', include('course.urls')),
    path('', include('educator.urls')),
    # path('', include('parent.urls')),
    path('', include('student.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) \
              + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
