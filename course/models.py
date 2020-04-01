from django.db import models
import uuid

from educator.models import Educator


class Category(models.Model):
    """Course Category Django model"""
    class Meta:
        verbose_name_plural = 'categories'
        ordering = ['name']

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(null=False, blank=False, max_length=100, unique=True)
    description = models.TextField(null=True, blank=True)

    def __str__(self):
        return f'Category: {self.name}'


class Course(models.Model):
    """Course Django model"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(null=False, blank=False, max_length=100, unique=True)
    owner = models.ForeignKey(Educator, related_name='courses', null=True, on_delete=models.SET_NULL)
    category = models.ForeignKey(Category, related_name='courses', null=True, on_delete=models.SET_NULL)
    image = models.ImageField(null=True, upload_to='course_pictures')

    def __str__(self):
        return f'Course: {self.title}'


class Module(models.Model):
    """Module Django model"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(null=False, blank=False, max_length=100)
    owner = models.ForeignKey(Educator, related_name='modules', null=True, on_delete=models.SET_NULL)
    course = models.ForeignKey(Course, related_name='modules', null=True, on_delete=models.SET_NULL)
    image = models.ImageField(null=True, upload_to='course_pictures/module_pictures')

    def __str__(self):
        return f'Module: {self.title}'


class Lesson(models.Model):
    """Lesson Django model"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(null=False, blank=False, max_length=100)
    owner = models.ForeignKey(Educator, related_name='lessons', null=True, on_delete=models.SET_NULL)
    module = models.ForeignKey(Module, related_name='lessons', null=True, on_delete=models.SET_NULL)
    image = models.ImageField(null=True, upload_to='course_pictures/module_pictures/lesson_pictures')

    def __str__(self):
        return f'Lesson: {self.title}'
