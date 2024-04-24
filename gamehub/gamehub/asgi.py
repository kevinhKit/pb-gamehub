
# import os

# from channels.auth import AuthMiddlewareStack
# from channels.routing import ProtocolTypeRouter, URLRouter
# from channels.security.websocket import AllowedHostsOriginValidator
# from django.core.asgi import get_asgi_application

# os.environ.setdefault("DJANGO_SETTINGS_MODULE", "gamehub.settings")

# django_asgi_app = get_asgi_application()

# from chat.routing import websocket_urlpatterns

# application = ProtocolTypeRouter(
#     {
#         "http": django_asgi_app,
#         "websocket": AllowedHostsOriginValidator(
#             AuthMiddlewareStack(URLRouter(websocket_urlpatterns))
#         ),
#     }
# )



# gamehub/asgi.py
import os
from django.core.asgi import get_asgi_application
from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.security.websocket import AllowedHostsOriginValidator
from django.urls import path
from tic_tac_toe.consumers import TicTacToeConsumer
from chat.consumers import ChatConsumer

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'gamehub.settings')

# Define Django's ASGI application for HTTP requests
django_asgi_app = get_asgi_application()

# Define websocket_urlpatterns for the websocket consumers
websocket_urlpatterns = [
    path('ws/tictactoe/<room_name>/', TicTacToeConsumer.as_asgi()),
    path('ws/chat/<room_name>/', ChatConsumer.as_asgi()),
    # Agrega aquí cualquier otro websocket consumer que tengas
]

# Define the top-level ASGI application to handle different protocols like HTTP and WebSocket
application = ProtocolTypeRouter({
    "http": django_asgi_app,  # HTTP requests will be handled by Django ASGI application
    "websocket": AllowedHostsOriginValidator(
        AuthMiddlewareStack(
            URLRouter(
                websocket_urlpatterns  # WebSocket requests will be handled by the routes defined in websocket_urlpatterns
            )
        )
    ),
})
