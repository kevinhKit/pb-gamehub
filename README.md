
# Configuración del repositorio
Para descargar e utilizar el repositorio siga los siguiente pasos

# 1. clonar repositorio
``` git clone https://github.com/kevinhKit/pb-gamehub.git ```

# Instalar dependencias
```  ```

# Crear una base de datos en MySQL
Nota: Debe tener instalado MySQL

# Configurar base de datos en django
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


# Levantar el proyecto y realizar las migraciones
1. Levantar el entorno virtual
    ``` source gamehub/Scripts/activate  ```
2. Entrar dentro del directorio que tenga el archivo ```manage.py```
    ``` cd <path>  ```
3. Realizar las migraciones de la base de datos
    ``` python manage.py migrate ```
4. Levantar el proyecto
    ``` python manage.py runserver ```




<!-- instalar redis -->
<!-- configurar redis -->
<!-- realizar las migraciones de django con redis -->