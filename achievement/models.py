from django.db import models

import uuid

from accounts.models import UserProfile
from course.models import Course
from educator.models import Educator
from parent.models import Parent
from student.models import Student


class Achievement(models.Model):
    """Achievement Django model"""
    FROM_STUDENT_TO_COURSE = "FSTC"
    FROM_STUDENT_TO_EDUCATOR = "FSTE"
    FROM_PARENT_TO_EDUCATOR = "FPTE"
    FROM_EDUCATOR_TO_STUDENT = "FETS"
    FROM_COURSE_TO_STUDENT = "FCTS"
    TYPE_CHOICES = [
        (FROM_STUDENT_TO_COURSE, 'From Student to Course'),
        (FROM_STUDENT_TO_EDUCATOR, 'From Student to Educator'),
        (FROM_PARENT_TO_EDUCATOR, 'From Parent to Educator'),
        (FROM_EDUCATOR_TO_STUDENT, 'From Educator to Student'),
        (FROM_COURSE_TO_STUDENT, 'From Course to Student'),
    ]

    active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now=True)
    description = models.TextField(blank=True)
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    image = models.ImageField(null=True, upload_to='achievement_pictures')
    name = models.CharField(null=False, blank=False, max_length=100)
    owner = models.ForeignKey(UserProfile, related_name="created_achievements", on_delete=models.CASCADE, null=True,
                              blank=True)
    related_courses = models.ManyToManyField(Course, related_name='achievements', blank=True)
    related_educators = models.ManyToManyField(Educator, related_name='achievements', blank=True)
    related_parents = models.ManyToManyField(Parent, related_name='achievements', blank=True)
    related_students = models.ManyToManyField(Student, related_name='achievements', blank=True)
    type = models.CharField(null=False, blank=False, max_length=4, choices=TYPE_CHOICES)
    updated_at = models.DateTimeField(null=True)

    def __str__(self):
        return f'Achievement: "{self.name}", Type: {self.type}'
