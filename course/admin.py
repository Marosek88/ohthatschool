from django.contrib import admin

# Register your models here.
from .models import Category, Course, Module, Lesson

admin.site.register(Category)
admin.site.register(Course)
admin.site.register(Module)
admin.site.register(Lesson)
