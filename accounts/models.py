from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class UserProfile(models.Model):
    """User Profile Django model"""
    id = models.OneToOneField(User, related_name='user_profile', on_delete=models.CASCADE, primary_key=True)
    active = models.BooleanField(default=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100)
    image = models.ImageField(null=True, upload_to='profile_pictures')

    def __str__(self):
        return f'User Profile: {self.id.username}'
