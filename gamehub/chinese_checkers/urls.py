from django.urls import path
from .views import checkers

urlpatterns = [
    path('checkers/', checkers, name='checkers'),
]
