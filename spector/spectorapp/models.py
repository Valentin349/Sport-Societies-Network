from django.db import models
from django.forms import CharField

# Create your models here.
class userData(models.Model):
    name=models.CharField(max_length=30)
    bio=models.CharField(max_length=100)
    age = models.IntegerField(default=18)
    def __str__(self):
        return self.name

   