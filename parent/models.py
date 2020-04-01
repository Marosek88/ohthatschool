from django.db import models

from accounts.models import UserProfile
from student.models import Student


class Parent(models.Model):
    """Parent Django model"""
    id = models.OneToOneField(UserProfile, related_name='parent', on_delete=models.CASCADE, primary_key=True)
    children = models.ManyToManyField(Student, related_name='parents')

    def __str__(self):
        return f'Parent: {self.id}'
