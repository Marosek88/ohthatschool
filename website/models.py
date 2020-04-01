from django.db import models
from django.contrib.postgres.fields import JSONField

# Create your models here.


class Website(models.Model):
    language = models.CharField(null=False, blank=False, max_length=10)
    context = JSONField()

    def __str__(self):
        return self.language
