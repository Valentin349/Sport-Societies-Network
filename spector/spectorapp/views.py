from django.shortcuts import render
from rest_framework import mixins, viewsets
from .models import UserData, Sports, Activity
from .serializers import UserDataSerializer, SportSerializer, ActivitySerializer

# Create your views here.
class SportsViewSet(viewsets.GenericViewSet, mixins.ListModelMixin):
    queryset = Sports.objects.all()
    serializer_class = SportSerializer

class ActivityViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer

