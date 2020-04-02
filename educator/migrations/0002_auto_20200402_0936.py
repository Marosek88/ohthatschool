# Generated by Django 3.0.3 on 2020-04-02 09:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
        ('educator', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='educator',
            name='categories',
            field=models.ManyToManyField(blank=True, related_name='educators', to='accounts.Category'),
        ),
    ]
