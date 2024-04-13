from django.urls import path
from .views import checkers
from django.contrib.auth.views import LoginView, LogoutView

urlpatterns = [
    path('chinese_checkers/', checkers, name='checkers'),
]
