# from channels import route

# # Esta función mostrará en consola los mensajes que reciba.
# def message_handler(message):
#     print(message['text'])


# channel_routing = [
# 		# Registramos nuestro manejador de mensajes
#     route("websocket.receive", message_handler)
# ]

# gamehub/routing.py
from channels.routing import ProtocolTypeRouter, URLRouter
from django.urls import path
from tic_tac_toe.consumers import TicTacToeConsumer
from chat.consumers import ChatConsumer

websocket_urlpatterns = [
    path('ws/tictactoe/<room_name>/', TicTacToeConsumer.as_asgi()),
    path('ws/chat/<room_name>/', ChatConsumer.as_asgi()),
    # Incluye todas las demás rutas de las aplicaciones aquí...
]

application = ProtocolTypeRouter({
    "websocket": URLRouter(websocket_urlpatterns),
    # También puedes agregar 'http' aquí si es necesario...
})
