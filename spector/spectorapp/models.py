from django.db import models
from django.forms import CharField
from django.forms import DateTimeField
from django.forms import DurationField
from django.utils import timezone
from django.contrib.auth.models import User
from datetime import timedelta

# Create your models here.
class Profile(models.Model):
    name = models.CharField(max_length=30, default="Full Name")
    bio = models.CharField(max_length=100, default="Bio")
    age = models.IntegerField(default=18)
    owner = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
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
    startTime = models.DateTimeField("Start Time", default=timezone.now)
    creationTime = models.DateTimeField("Time of Creation", auto_now_add=True)
    duration = models.DurationField(default=timedelta)
    members = models.ManyToManyField(User, related_name='activities')
    maxMembers = models.IntegerField(null=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    def __str__(self):
        return self.name
