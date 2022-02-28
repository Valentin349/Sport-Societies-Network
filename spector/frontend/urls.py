from django.urls import path, re_path
from .views import index

urlpatterns = [
    # match the root
    path('', index),
    # match all other pages using a regex path
    re_path(r'^(?:.*)/?$', index),
]

