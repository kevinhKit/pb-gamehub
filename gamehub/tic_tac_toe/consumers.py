import json
from channels.generic.websocket import AsyncWebsocketConsumer
import random

class TicTacToeConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = f'tictactoe_{self.room_name}'

        # pendiente,lógica para unirse al grupo si hay menos de dos personas


        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        # Salir del grupo
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    async def receive(self, text_data):
        data_json = json.loads(text_data)
        if data_json['action'] == 'generate':
            numbers = [random.randint(0, 100) for _ in range(10)]
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'send_numbers',
                    'numbers': numbers,
                    'username': data_json['username']
                }
            )

    async def send_numbers(self, event):
        await self.send(text_data=json.dumps(event))
