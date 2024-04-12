
<p align="center">
  <a href="https://www.djangoproject.com/" target="blank"><img src="https://static.djangoproject.com/img/logos/django-logo-positive.svg" width="200" alt="Django Logo" /></a>
</p>

<p align="center">
Un proyecto Django para integrar distintos juegos accesibles desde una plataforma web.
</p>

<p align="center">
<img src="https://img.shields.io/badge/Django-3.2-green.svg" alt="Django Version" />
<img src="https://img.shields.io/badge/Python-3.x-blue.svg" alt="Python Version" />
<img src="https://img.shields.io/badge/license-MIT-lightgrey.svg" alt="License" />
</p>

## Descripción

GameHub es un proyecto que integra distintos juegos accesibles desde una plataforma web. Este repositorio contiene el código necesario para configurar y ejecutar el proyecto localmente.

## Requisitos del sistema

Antes de comenzar, asegúrate de cumplir con los siguientes requisitos del sistema:

- Git
- Python 3.x
- Venv (para el entorno virtual del proyecto)
- MySQL
- Redis (opcional para comunicación en tiempo real)

## Configuración Inicial

Para descargar y utilizar el repositorio siga los siguiente pasos

## clonar repositorio
Clona el repositorio en tu máquina local:
``` git clone https://github.com/kevinhKit/pb-gamehub.git ```

## Activar el Entorno Virtual
Entrar en la carpeta del proyecto ``` pb-gamehub ```, si no tiene creado el entorno virtual, creelo con el siguiente comadno ``` python3 -m venv venv ```

Para usuarios de Unix o MacOS:

```
    python3 -m venv venv
    source venv/bin/activate
```
Para usuarios de Windows:

```
    python -m venv venv
    .\venv\Scripts\activate
```



## Instalar dependencias
```
    pip install -r requirements.txt
```

## Crear una base de datos en MySQL
Asegúrate de tener MySQL instalado y luego crea una nueva base de datos.

## Configurar base de datos en django
Nota: Entrar en el archivo ``` settings.py  ``` del proyecto y configurar los meta datos de conexión

``` 
    DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': '<database>',
        'USER': '<username>',
        'PASSWORD': '<password>',
        'HOST': '<host>',
        'PORT': '<port>',
    }
}
```


## Ejecutar Migraciones y Servidor
```
    python manage.py migrate
    python manage.py runserver
```

Visita http://127.0.0.1:8000 en tu navegador para acceder a la aplicación.

## Contribución
Si estás interesado en contribuir al proyecto, considera hacer fork del repositorio y envía tus pull requests para revisión.

## Licencia
Este proyecto se distribuye bajo la Licencia MIT.
