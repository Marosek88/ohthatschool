from django.db import models

from accounts.models import UserProfile
from student.models import Student


class Parent(models.Model):
    """Parent Django model"""
    created_at = models.DateTimeField(auto_now=True)
    children = models.ManyToManyField(Student, related_name='parents', blank=True)
    id = models.OneToOneField(UserProfile, related_name='parent', on_delete=models.CASCADE, primary_key=True)
    short_bio = models.TextField(null=True, blank=True)
    updated_at = models.DateTimeField(null=True)

    def __str__(self):
        return f'Parent: {self.id}'
