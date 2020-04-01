from django.contrib import admin

# Register your models here.
from .models import Student, StudentCourse, StudentModule, StudentLesson

admin.site.register(Student)
admin.site.register(StudentCourse)
admin.site.register(StudentModule)
admin.site.register(StudentLesson)
