



clonar repositorio


instalar dependencias


instalar mysql


crear base de datos de mysql 


configurar base de datos

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'gamehub',  # Nombre de la base de datos creada
        'USER': 'admindj',  # Usuario con privilegios sobre la base de datos
        'PASSWORD': 'asd.123',  # Contraseña del usuario
        'HOST': 'localhost',   # Host donde se aloja la base de datos, localhost indica que está en el mismo servidor
        'PORT': '3306',        # Puerto por defecto para MySQL
    }
}


realizar las migraciones de django con mysql

instalar redis


configurar redis


realizar las migraciones de django con redis