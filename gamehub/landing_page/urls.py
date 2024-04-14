from django.urls import path
from .views import home, handle_game_selection

urlpatterns = [
    path('', home, name='home'),  # Ruta de la landing page
    path('api/handle_game_selection/', handle_game_selection, name='handle_game_selection'),  # Ruta de la landing page
    # path('api/no/', handle_action, name='handle_action'),
]
