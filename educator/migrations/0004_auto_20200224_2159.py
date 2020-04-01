# Generated by Django 3.0.3 on 2020-02-24 21:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('course', '0003_auto_20200224_1627'),
        ('educator', '0003_auto_20200224_2156'),
    ]

    operations = [
        migrations.AlterField(
            model_name='educator',
            name='contributing_to_courses',
            field=models.ManyToManyField(blank=True, related_name='contributors', to='course.Course'),
        ),
    ]
