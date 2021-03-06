# Generated by Django 3.0.3 on 2020-04-02 08:58

from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('educator', '0001_initial'),
        ('accounts', '0001_initial'),
        ('course', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Student',
            fields=[
                ('active', models.BooleanField(default=True)),
                ('created_at', models.DateTimeField(auto_now=True)),
                ('id', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, related_name='student', serialize=False, to='accounts.UserProfile')),
                ('local_connect', models.BooleanField(default=True)),
                ('online_connect', models.BooleanField(default=True)),
                ('short_bio', models.TextField(blank=True, null=True)),
                ('show_in_listings', models.BooleanField(default=True)),
                ('updated_at', models.DateTimeField(null=True)),
                ('categories', models.ManyToManyField(blank=True, related_name='students', to='accounts.Category')),
                ('courses', models.ManyToManyField(blank=True, related_name='students', to='course.Course')),
                ('educators', models.ManyToManyField(blank=True, related_name='students', to='educator.Educator')),
            ],
        ),
        migrations.CreateModel(
            name='StudentCourse',
            fields=[
                ('created_at', models.DateTimeField(auto_now=True)),
                ('finished', models.BooleanField(default=False)),
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('updated_at', models.DateTimeField(null=True)),
                ('course', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='student_courses', to='course.Course')),
                ('student', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='student_courses', to='student.Student')),
            ],
        ),
        migrations.CreateModel(
            name='StudentModule',
            fields=[
                ('created_at', models.DateTimeField(auto_now=True)),
                ('finished', models.BooleanField(default=False)),
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('updated_at', models.DateTimeField(null=True)),
                ('module', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='student_modules', to='course.Module')),
                ('student', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='student_modules', to='student.Student')),
                ('student_course', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='student_modules', to='student.StudentCourse')),
            ],
        ),
        migrations.CreateModel(
            name='StudentLesson',
            fields=[
                ('created_at', models.DateTimeField(auto_now=True)),
                ('finished', models.BooleanField(default=False)),
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('updated_at', models.DateTimeField(null=True)),
                ('lesson', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='student_lessons', to='course.Lesson')),
                ('student', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='student_lessons', to='student.Student')),
                ('student_module', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='student_lessons', to='student.StudentModule')),
            ],
        ),
    ]
