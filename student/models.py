from django.db import models
from django.contrib.postgres.fields import JSONField

import uuid

from accounts.models import UserProfile, Category
from course.models import Course, Module, Lesson
from educator.models import Educator


class Student(models.Model):
    """Student Django model"""
    active = models.BooleanField(default=True)
    categories = models.ManyToManyField(Category, related_name='students', blank=True)
    courses = models.ManyToManyField(Course, related_name='students', blank=True)
    created_at = models.DateTimeField(auto_now=True)
    educators = models.ManyToManyField(Educator, related_name='students', blank=True)
    id = models.OneToOneField(UserProfile, related_name='student', on_delete=models.CASCADE, primary_key=True)
    local_connect = models.BooleanField(default=True)
    online_connect = models.BooleanField(default=True)
    short_bio = models.TextField(null=True, blank=True)
    show_in_listings = models.BooleanField(default=True)
    updated_at = models.DateTimeField(null=True)

    def __str__(self):
        return f'Student: {self.id.email}'


class StudentCourse(models.Model):
    """Student's Course Djngo Model"""
    course = models.ForeignKey(Course, related_name='student_courses', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now=True)
    finished = models.BooleanField(default=False)
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    student = models.ForeignKey(Student, related_name='student_courses', on_delete=models.CASCADE)
    updated_at = models.DateTimeField(null=True)

    def __str__(self):
        return f'Student\'s Course: {self.student.id} - {self.course.id}'


class StudentModule(models.Model):
    """Student's Module Djngo Model"""
    created_at = models.DateTimeField(auto_now=True)
    finished = models.BooleanField(default=False)
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    module = models.ForeignKey(Module, related_name='student_modules', on_delete=models.CASCADE)
    student = models.ForeignKey(Student, related_name='student_modules', on_delete=models.CASCADE)
    student_course = models.ForeignKey(StudentCourse, related_name='student_modules', on_delete=models.CASCADE)
    updated_at = models.DateTimeField(null=True)

    def __str__(self):
        return f'Student\'s Module: {self.student.id} - {self.module.id}'


class StudentLesson(models.Model):
    """Student's Lesson Djngo Model"""
    created_at = models.DateTimeField(auto_now=True)
    finished = models.BooleanField(default=False)
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    lesson = models.ForeignKey(Lesson, related_name='student_lessons', on_delete=models.CASCADE)
    student = models.ForeignKey(Student, related_name='student_lessons', on_delete=models.CASCADE)
    student_module = models.ForeignKey(StudentModule, related_name='student_lessons', on_delete=models.CASCADE)
    updated_at = models.DateTimeField(null=True)

    def __str__(self):
        return f'Student\'s Lesson: {self.student.id} - {self.lesson.id}'
