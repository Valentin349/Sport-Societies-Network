from django.db import models
from django.forms import CharField
from django.forms import DateTimeField
from django.utils import timezone

# Create your models here.
class UserData(models.Model):
    name = models.CharField(max_length=30)
    bio = models.CharField(max_length=100)
    age = models.IntegerField(default=18)
    def __str__(self):
        return self.name

class Sports(models.Model):
    name = models.CharField(max_length=30, primary_key=True)
    def __str__(self):
        return self.name

class Activity(models.Model):
    sport = models.ForeignKey(Sports, on_delete=models.CASCADE)
    name = models.CharField(max_length=30)
    description = models.CharField(max_length=200)
    dateTime = models.DateTimeField("Date & Time", default=timezone.now)
    
    def __str__(self):
        return self.name
