from channels import route

# Esta función mostrará en consola los mensajes que reciba.
def message_handler(message):
    print(message['text'])


channel_routing = [
		# Registramos nuestro manejador de mensajes
    route("websocket.receive", message_handler)
]