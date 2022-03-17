from rest_framework import mixins, viewsets, permissions, status, filters
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django_filters.rest_framework import DjangoFilterBackend
from .models import Profile, Sports, Activity
from .serializers import ProfileSerializer, SportSerializer, ActivitySerializer, UserSerializer
from .permissions import AdminAuthor_elseReadonly
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response

# Create your views here.
class SportsViewSet(viewsets.GenericViewSet, mixins.ListModelMixin):
    queryset = Sports.objects.all()
    serializer_class = SportSerializer

class ActivityViewSet(viewsets.ModelViewSet):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filter_fields = ['sport', 'id']
    permission_classes = [AdminAuthor_elseReadonly]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class CreateUserView(APIView):
    """
    Create/Register new user
    """
    # remove permissions for this view
    permission_classes = []

    def post(self, request, format='json'):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                token = Token.objects.create(user=user)
                json = serializer.data
                json['token'] = token.key
                return Response(json, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [AdminAuthor_elseReadonly]
    lookup_field = "owner"

class CustomObtainAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        response = super(CustomObtainAuthToken, self).post(request, *args, **kwargs)
        token = Token.objects.get(key=response.data['token'])
        return Response({'token': token.key, 'id': token.user_id})