from django.urls import path
from .views import word, get_categories_and_difficulties
# from .views import word, get_categories_and_difficulties, handle_action


urlpatterns = [
    path('word_search/', word, name='word'),
    path('api/categories-difficulties/', get_categories_and_difficulties, name='get_categories_and_difficulties'),
    # path('api/no/', handle_action, name='handle_action'),
]
