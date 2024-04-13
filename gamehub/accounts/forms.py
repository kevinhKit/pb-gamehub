# accounts/forms.py
from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import get_user_model
from django.contrib.auth.forms import AuthenticationForm

User = get_user_model()
class CustomUserCreationForm(UserCreationForm):
    class Meta(UserCreationForm.Meta):
        model = User

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


class CustomAuthenticationForm(AuthenticationForm):
    # class Meta:
    #     model = get_user_model()
    #     fields = ['username', 'password']
    def __init__(self, *args, **kwargs):
        super(CustomAuthenticationForm, self).__init__(*args, **kwargs)
        # Personaliza las etiquetas aquí
        self.fields['username'].label = 'Nombre de usuario o correo electrónico'
        self.fields['password'].label = 'Contraseña'

    class Meta:
        model = get_user_model()
        fields = ['username', 'password']
