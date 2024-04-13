from django.urls import path
from .views import tic


urlpatterns = [
    path('tictactoe/', tic, name='tictactoe'),
]
