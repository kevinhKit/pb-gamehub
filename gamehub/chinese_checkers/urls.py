from django.urls import path
from .views import checkers

urlpatterns = [
    path('chinese_checkers/', checkers, name='checkers'),
]
