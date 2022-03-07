from rest_framework import mixins, viewsets, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django_filters.rest_framework import DjangoFilterBackend
from .models import Profile, Sports, Activity
from .serializers import ProfileSerializer, SportSerializer, ActivitySerializer
from rest_framework import permissions
from .permissions import AdminAuthor_elseReadonly


# Create your views here.
class SportsViewSet(viewsets.GenericViewSet, mixins.ListModelMixin):
    queryset = Sports.objects.all()
    serializer_class = SportSerializer

class ActivityViewSet(viewsets.ModelViewSet):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer
    filter_backends = [DjangoFilterBackend]
    filter_fields = ['sport', 'id']
    permission_classes = [AdminAuthor_elseReadonly]
    

class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [AdminAuthor_elseReadonly]
