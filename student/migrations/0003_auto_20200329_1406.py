# Generated by Django 3.0.3 on 2020-03-29 14:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('course', '0008_auto_20200324_2022'),
        ('student', '0002_auto_20200224_2205'),
    ]

    operations = [
        migrations.AddField(
            model_name='student',
            name='active',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='student',
            name='categories',
            field=models.ManyToManyField(blank=True, related_name='students', to='course.Category'),
        ),
        migrations.AddField(
            model_name='student',
            name='local_connect',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='student',
            name='online_connect',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='student',
            name='show_in_listings',
            field=models.BooleanField(default=True),
        ),
    ]
