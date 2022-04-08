from django.test import TestCase
from django.utils import timezone
from django.urls import reverse
from spectorapp.models import Sports, Activity, Profile
from spectorapp.serializers import ActivitySerializer, ProfileSerializer
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.test import APITestCase, force_authenticate, APIClient
import datetime, json

# Create your tests here.
class ActivityTestCase(APITestCase):
    def setUp(self):
        self.admin = User.objects.create_superuser('admin', 'password', 'admin@email.com')
        
        Sports.objects.create(name="Football")
        Sports.objects.create(name="Tennis")

        Activity.objects.create(
            sport=Sports.objects.get(name="Tennis"), name="1v1", description="test",
            startTime=timezone.localtime(), duration=datetime.timedelta(hours=1),
            maxMembers=5, owner=self.admin
        )
        
        self.validPayload = {
            "sport" : "Football",
            "name" : "TestName",
            "description" : "This is a test.",
            "startTime" : timezone.localtime(),
            "Duration" : datetime.timedelta(hours=1),
            "members" : [1],
            "maxMembers": 5,
        }

        self.invalidPayload = {
            "name" : "TestName",
            "description" : "This is a test.",
            "startTime" : timezone.localtime(),
            "Duration" : datetime.timedelta(hours=1),
            "maxMembers": 5,
        }
    
    def test_createValidActivity(self):
        self.client.force_authenticate(user=self.admin)
        response = self.client.post(
            reverse('activity-list'),
            self.validPayload,
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_createInvalidActivity(self):
        self.client.force_authenticate(user=self.admin)
        response = self.client.post(
            reverse('activity-list'),
            self.invalidPayload,
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_noAuthentication(self):
        response = self.client.post(
            reverse('activity-list'),
            self.validPayload,
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_retrieveAllActivites(self):
        self.client.force_authenticate(user=self.admin)
        activities = Activity.objects.all()
        serializer = ActivitySerializer(activities, many=True)
        response = self.client.get(reverse('activity-list'))

        self.assertEqual(response.data, serializer.data)
        self.assertIn('members', response.data[0])
        self.assertIn('owner', response.data[0])
        self.assertIn('name', response.data[0])
        self.assertIn('sport', response.data[0])
        self.assertIn('duration', response.data[0])
        self.assertIn('startTime', response.data[0])
        self.assertIn('maxMembers', response.data[0])
        self.assertIn('description', response.data[0])

    def test_filtering(self):
        self.client.force_authenticate(user=self.admin)
        response = self.client.get('/api/activities/?sport=Tennis')
        self.assertEqual(len(response.data), 1)
    
    def test_PutActivity(self):
        self.client.force_authenticate(user=self.admin)
        response = self.client.patch(
            '/api/activities/1/',
            {"name":"newName"},
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], "newName")

class AuthenticationTestCase(APITestCase):
    def setUp(self):
        self.admin = User.objects.create_superuser('admin', 'password', 'admin@email.com')

    def test_register(self):
        response = self.client.post(
            reverse('register'),
            {
                "username":"normalUser",
                "email":"email@email.com",
                "password":"password123",
            },
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(len(User.objects.all()), 2)
        self.assertIn('token', response.data)

    def test_login(self):
        user = User.objects.create(username='normalUser', email="email@email.com")
        user.set_password('password123')
        user.save()
        response = self.client.post(
            reverse('login'),
            {
                "username":"normalUser",
                "password":"password123",
            },
            format='json'
        )
        self.assertEqual(len(User.objects.all()), 2)
        self.assertIn('token', response.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK, msg=response.data)

    def test_registerNonUniqueUsername(self):
        response = self.client.post(
            reverse('register'),
            {
                "username":"admin",
                "email":"email@email.com",
                "password":"password123",
            },
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    
    def test_registerNonUniqueEmail(self):
        User.objects.create(username='normalUser', email="email@email.com")
        response = self.client.post(
            reverse('register'),
            {
                "username":"newUser",
                "email":"email@email.com",
                "password":"password123",
            },
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    
    def test_loginWrongPassword(self):
        user = User.objects.create(username='normalUser', email="email@email.com")
        user.set_password('password123')
        user.save()
        response = self.client.post(
            reverse('login'),
            {
                "username":"normalUser",
                "password":"password",
            },
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    
    def test_loginWrongUsername(self):
        user = User.objects.create(username='normalUser', email="email@email.com")
        user.set_password('password123')
        user.save()
        response = self.client.post(
            reverse('login'),
            {
                "username":"User",
                "password":"password123",
            },
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

class ProfileTestCase(APITestCase):
    def setUp(self):
        self.admin = User.objects.create_superuser('admin', 'password', 'admin@email.com')
        Profile.objects.create(name="test name", bio="test", owner=self.admin)
    
    def test_retrieveAllProfiles(self):
        self.client.force_authenticate(user=self.admin)
        profiles = Profile.objects.all()
        serializer = ProfileSerializer(profiles, many=True)
        response = self.client.get(reverse('profile-list'))

        self.assertEqual(response.data, serializer.data)
        self.assertIn('name', response.data[0])
        self.assertIn('owner', response.data[0])
        self.assertIn('bio', response.data[0])
        self.assertIn('age', response.data[0])

    
    def test_retrieveSingleProfile(self):
        self.client.force_authenticate(user=self.admin)
        response = self.client.get('/api/profile/1/')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('name', response.data)
        self.assertIn('owner', response.data)
        self.assertIn('bio', response.data)
        self.assertIn('age', response.data)

    def test_patchProfile(self):
        self.client.force_authenticate(user=self.admin)
        response = self.client.patch(
            '/api/profile/1/',
            {"name":"newName"},
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], "newName")

    def test_putProfile(self):
        self.client.force_authenticate(user=self.admin)
        response = self.client.patch(
            '/api/profile/1/',
            {
                "name":"newName",
                "bio": "new Bio",
                "owner": 1
            },
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], "newName")
        self.assertEqual(response.data['bio'], "new Bio")
        self.assertEqual(response.data['owner'], 1)
    
