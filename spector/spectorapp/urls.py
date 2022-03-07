from django.urls import path, include
from rest_framework.routers import SimpleRouter
from . import views
from django.contrib import admin

router = SimpleRouter()
router.register(r'activities', views.ActivityViewSet)
router.register(r'sports', views.SportsViewSet)
router.register(r'profile', views.ProfileViewSet )

urlpatterns =[
    path('', include(router.urls)),
] 
    

