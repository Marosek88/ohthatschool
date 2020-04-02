from django.db import models

from accounts.models import UserProfile, Category


class Educator(models.Model):
    """Educator Django model"""
    active = models.BooleanField(default=True)
    categories = models.ManyToManyField(Category, related_name='educators', blank=True)
    created_at = models.DateTimeField(auto_now=True)
    id = models.OneToOneField(UserProfile, related_name='educator', on_delete=models.CASCADE, primary_key=True)
    local_connect = models.BooleanField(default=False)
    online_connect = models.BooleanField(default=True)
    rating = models.DecimalField(max_digits=6, decimal_places=2, null=True)
    short_bio = models.TextField(null=True, blank=True)
    show_in_listings = models.BooleanField(default=True)
    updated_at = models.DateTimeField(null=True)

    def __str__(self):
        return f'Educator: {self.id.email}'
