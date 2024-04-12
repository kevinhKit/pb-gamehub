# accounts/forms.py
from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import get_user_model

User = get_user_model()

# class CustomUserCreationForm(UserCreationForm):
#     class Meta(UserCreationForm.Meta):
#         model = User
#         fields = ['email', 'first_name', 'last_name', 'username', 'profile_picture', 'password1', 'password2']



class CustomUserCreationForm(UserCreationForm):
    class Meta(UserCreationForm.Meta):
        model = User
        # fields = ['email', 'first_name', 'last_name', 'username', 'profile_picture', 'password1', 'password2']
        fields = ['email', 'first_name', 'last_name', 'username', 'password1', 'password2']
        labels = {
            'email': 'Correo electrónico',
            'first_name': 'Nombre',
            'last_name': 'Apellidos',
            'username': 'Nombre de usuario',
            # 'profile_picture': 'Imagen de perfil',
            'password1': 'Contraseña',
            'password2': 'Confirmar contraseña',
        }
