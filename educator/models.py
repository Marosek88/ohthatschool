from django.db import models

from accounts.models import UserProfile


class Educator(models.Model):
    """Educator Django model"""
    id = models.OneToOneField(UserProfile, related_name='educator', on_delete=models.CASCADE, primary_key=True)
    active = models.BooleanField(default=True)
    show_in_listings = models.BooleanField(default=True)
    local_connect = models.BooleanField(default=True)
    online_connect = models.BooleanField(default=True)

    def __str__(self):
        return f'Educator: {self.id.id.username}'
