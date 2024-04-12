from django.urls import path
from .views import register, registrarse

urlpatterns = [
    path('register/', register, name='register'),
    path('r/', registrarse, name='registrarse'),
]
