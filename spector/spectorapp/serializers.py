from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from .models import Profile, Sports, Activity
from django.contrib.auth.models import User

class ActivitySerializer(serializers.ModelSerializer):
    members = serializers.PrimaryKeyRelatedField(many=True, queryset=User.objects.all())
    membersName = serializers.StringRelatedField(source='members', many=True, read_only=True)
    owner = serializers.ReadOnlyField(source='owner.id')
    ownerName = serializers.StringRelatedField(source='owner')

    def validate(self, data):
        if not self.partial:
            if data['maxMembers'] < len(data['members']):
                raise serializers.ValidationError("more members than max members")
        return data

    def update(self, instance, validated_data):
        instance.name = validated_data.get("name", instance.name)
        instance.description = validated_data.get("description", instance.description)
        instance.startTime = validated_data.get("startTime", instance.startTime)
        instance.duration = validated_data.get("duration", instance.duration)
        instance.maxMembers = validated_data.get("maxMembers", instance.maxMembers)

        if instance.maxMembers < len(validated_data.get("members", instance.members)):
            raise serializers.ValidationError("number of members is over max member limit")
        else:
            instance.members.set(validated_data.get("members", instance.members))
        
        instance.save()
        return instance

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