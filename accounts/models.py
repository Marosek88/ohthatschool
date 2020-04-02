from django.db import models
from django.contrib.postgres.fields import JSONField
from django.contrib.auth.models import User
import uuid


def default_json():
    return {"lat": 0.0000, "lon": 0.0000}

# Create your models here.
class UserProfile(models.Model):
    """User Profile Django model"""
    active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now=True)
    email = models.EmailField(max_length=100)
    first_name = models.CharField(max_length=100)
    id = models.OneToOneField(User, related_name='user_profile', on_delete=models.CASCADE, primary_key=True)
    image = models.ImageField(null=True, upload_to='profile_pictures')
    last_name = models.CharField(max_length=100)
    location = JSONField(default=default_json)
    updated_at = models.DateTimeField(null=True)

    def __str__(self):
        return f'User Profile: {self.id.username}'


class Category(models.Model):
    """Category Django model"""
    class Meta:
        verbose_name_plural = 'categories'
        ordering = ['name']

    created_at = models.DateTimeField(auto_now=True)
    description = models.TextField(null=True, blank=True)
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(null=False, blank=False, max_length=100, unique=True)
    updated_at = models.DateTimeField(null=True)

    def __str__(self):
        return f'Category: {self.name}'
