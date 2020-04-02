from django.db import models
import uuid

from accounts.models import Category
from educator.models import Educator


class Course(models.Model):
    """Course Django model"""
    active = models.BooleanField(default=True)
    category = models.ForeignKey(Category, related_name='courses', null=True, on_delete=models.SET_NULL)
    created_at = models.DateTimeField(auto_now=True)
    description = models.TextField(null=True, blank=True)
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    image = models.ImageField(null=True, upload_to='course_pictures')
    owner = models.ForeignKey(Educator, related_name='courses', null=True, on_delete=models.SET_NULL)
    price = models.DecimalField(max_digits=6, decimal_places=2, null=True)
    rating = models.DecimalField(max_digits=6, decimal_places=2, null=True)
    title = models.CharField(null=False, blank=False, max_length=100, unique=True)
    updated_at = models.DateTimeField(null=True)

    def __str__(self):
        return f'Course: {self.title}'


class Module(models.Model):
    """Module Django model"""
    active = models.BooleanField(default=True)
    course = models.ForeignKey(Course, related_name='modules', null=True, on_delete=models.SET_NULL)
    created_at = models.DateTimeField(auto_now=True)
    description = models.TextField(null=True, blank=True)
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    rating = models.DecimalField(max_digits=6, decimal_places=2, null=True)
    image = models.ImageField(null=True, upload_to='course_pictures/module_pictures')
    owner = models.ForeignKey(Educator, related_name='modules', null=True, on_delete=models.SET_NULL)
    title = models.CharField(null=False, blank=False, max_length=100)
    updated_at = models.DateTimeField(null=True)

    def __str__(self):
        return f'Module: {self.title}'


class Lesson(models.Model):
    """Lesson Django model"""
    active = models.BooleanField(default=True)
    course = models.ForeignKey(Course, related_name='lessons', null=True, on_delete=models.SET_NULL)
    created_at = models.DateTimeField(auto_now=True)
    description = models.TextField(null=True, blank=True)
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    duration = models.DecimalField(max_digits=6, decimal_places=2, null=True)
    image = models.ImageField(null=True, upload_to='course_pictures/module_pictures/lesson_pictures')
    rating = models.DecimalField(max_digits=6, decimal_places=2, null=True)
    module = models.ForeignKey(Module, related_name='lessons', null=True, on_delete=models.SET_NULL)
    owner = models.ForeignKey(Educator, related_name='lessons', null=True, on_delete=models.SET_NULL)
    title = models.CharField(null=False, blank=False, max_length=100)
    updated_at = models.DateTimeField(null=True)

    def __str__(self):
        return f'Lesson: {self.title}'
