from django.urls import path
from .views import word


urlpatterns = [
    path('word_search/', word, name='word'),
]
