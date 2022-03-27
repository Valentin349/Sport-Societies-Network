from dataclasses import field
import imp
from pyexpat import model
from rest_framework import serializers
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

        try:
            if instance.maxMembers < len(validated_data.get("members", instance.members)):
                raise serializers.ValidationError("number of members is over max member limit")
            else:
                newelements = UserSerializer(validated_data.get("members", instance.members), many=True).data
                oldelements = UserSerializer(instance.members, many=True).data
                #add case, makes sure new list is +1 in size, other elements are same
                #new list is in form (old list + n)
                if len(oldelements)+1 == len(newelements):
                    for x,y in zip(oldelements, newelements):
                        if x!=y:
                            raise serializers.ValidationError("Database Desynch, Please Refresh")
                    instance.members.set(validated_data.get("members", instance.members))
                ##remove case makes sure new list is -1 in size, elements are same or shifted by 1
                elif len(oldelements)-1 == len(newelements):
                    for x in range(len(newelements)):
                        if oldelements[x] != newelements[x]:
                            if oldelements[x+1] != newelements[x]:
                                raise serializers.ValidationError("Database Desynch, Please Refresh")
                    instance.members.set(validated_data.get("members", instance.members))


                else:
                    raise serializers.ValidationError("Database Desynch, Please Refresh")
        except TypeError:
            pass

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
