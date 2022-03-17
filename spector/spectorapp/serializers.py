from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from .models import Profile, Sports, Activity
from django.contrib.auth.models import User

class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username')

class ActivitySerializer(serializers.ModelSerializer):
    members = MemberSerializer(many=True)
    owner = MemberSerializer()

    class Meta:
        model = Activity
        fields = '__all__'   

class ProfileSerializer(serializers.ModelSerializer):
    activities = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = '__all__'
    
    def get_activities(self, obj):
        owner = obj.owner.id
        user = User.objects.get(pk=owner)
        activites = user.activities.all()
        response = ActivitySerializer(activites, many=True).data
        return response

class SportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sports
        fields = '__all__'    

class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    username = serializers.CharField(
        max_length = 32,
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    password = serializers.CharField(
        min_length = 8,
        max_length = 100,
        write_only = True
    )

    def create(self, validatedData):
        user = User(email=validatedData['email'], username=validatedData['username'])
        user.set_password(validatedData['password'])
        user.save()
        return user
        
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')