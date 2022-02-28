from django.urls import path, include
from rest_framework.routers import SimpleRouter
from . import views
from django.contrib import admin

router = SimpleRouter()
router.register(r'activities', views.ActivityViewSet)
router.register(r'sports', views.SportsViewSet)
router.register(r'userdata', views.UserDataViewSet )

urlpatterns =[
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
] 
    

