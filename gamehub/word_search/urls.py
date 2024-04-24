from django.urls import path
from .views import word, get_categories_and_difficulties


urlpatterns = [
    path('words/', word, name='word'),
    path('api/categories-difficulties/', get_categories_and_difficulties, name='get_categories_and_difficulties'),
]
