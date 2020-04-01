# Generated by Django 3.0.3 on 2020-03-29 16:26

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('parent', '0003_auto_20200329_1406'),
    ]

    operations = [
        migrations.AlterField(
            model_name='parent',
            name='id',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, related_name='parent', serialize=False, to=settings.AUTH_USER_MODEL),
        ),
    ]