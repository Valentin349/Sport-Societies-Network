from django.shortcuts import render
from rest_framework import mixins, viewsets
from django_filters.rest_framework import DjangoFilterBackend
from .models import UserData, Sports, Activity
from .serializers import UserDataSerializer, SportSerializer, ActivitySerializer

# Create your views here.
class SportsViewSet(viewsets.GenericViewSet, mixins.ListModelMixin):
    queryset = Sports.objects.all()
    serializer_class = SportSerializer

class ActivityViewSet(viewsets.GenericViewSet, mixins.ListModelMixin):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer
    filter_backends = [DjangoFilterBackend]
    filter_fields = ['sport', 'id']
    

class UserDataViewSet(viewsets.ModelViewSet):
    queryset = UserData.objects.all()
    serializer_class = UserDataSerializer
