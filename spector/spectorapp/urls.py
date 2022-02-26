from django.urls import path, include
from rest_framework.routers import SimpleRouter
from . import views

router = SimpleRouter()
router.register(r'activities', views.ActivityViewSet)
router.register(r'sports', views.SportsViewSet)

urlpatterns =[
    path('', include(router.urls))
] 
    

