from django.db import models
import uuid

from accounts.models import UserProfile
from course.models import Category, Course, Module, Lesson
from educator.models import Educator

class Student(models.Model):
    """Student Django model"""
    id = models.OneToOneField(UserProfile, related_name='student', on_delete=models.CASCADE, primary_key=True)
    educators = models.ManyToManyField(Educator, related_name='students', blank=True)
    categories = models.ManyToManyField(Category, related_name='students', blank=True)
    active = models.BooleanField(default=True)
    show_in_listings = models.BooleanField(default=True)
    local_connect = models.BooleanField(default=True)
    online_connect = models.BooleanField(default=True)

    def __str__(self):
        return f'Student: {self.id.id.username}'


class StudentCourse(models.Model):
    """Student's Course Djngo Model"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    student = models.ForeignKey(Student, related_name='student_courses', on_delete=models.CASCADE)
    course = models.ForeignKey(Course, related_name='student_courses', on_delete=models.CASCADE)
    finished = models.BooleanField(default=False)

    def __str__(self):
        return f'Student\'s Course: {self.student.id} - {self.course.id}'


class StudentModule(models.Model):
    """Student's Module Djngo Model"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    student_course = models.ForeignKey(StudentCourse, related_name='student_modules', on_delete=models.CASCADE)
    student = models.ForeignKey(Student, related_name='student_modules', on_delete=models.CASCADE)
    module = models.ForeignKey(Module, related_name='student_modules', on_delete=models.CASCADE)
    finished = models.BooleanField(default=False)

    def __str__(self):
        return f'Student\'s Module: {self.student.id} - {self.module.id}'


class StudentLesson(models.Model):
    """Student's Lesson Djngo Model"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    student_module = models.ForeignKey(StudentModule, related_name='student_lessons', on_delete=models.CASCADE)
    student = models.ForeignKey(Student, related_name='student_lessons', on_delete=models.CASCADE)
    lesson = models.ForeignKey(Lesson, related_name='student_lessons', on_delete=models.CASCADE)
    finished = models.BooleanField(default=False)

    def __str__(self):
        return f'Student\'s Lesson: {self.student.id} - {self.lesson.id}'
