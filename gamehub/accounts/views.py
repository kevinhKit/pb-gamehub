# accounts/views.py
from django.shortcuts import render, redirect
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
from django.contrib import messages
from .models import Role
from .forms import CustomUserCreationForm  # Asegúrate de crear este formulario

def register(request):
    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)  # No guardes el usuario aún
            try:
                default_role = Role.objects.get(name='Usuario')
                user.role = default_role
            except Role.DoesNotExist:
                # Esto capturará el error si el rol no existe y no interrumpirá tu aplicación
                messages.error(request, 'El rol necesario no existe.')
                return render(request, 'accounts/register.html', {'form': form})
            user.save()  # Guarda el usuario después de asignar el role
            messages.success(request, 'Registro exitoso. Ahora puedes iniciar sesión.')
            return redirect('home')
        else:
            messages.error(request, 'Por favor corrige los errores en el formulario.')
    else:
        form = CustomUserCreationForm()
    return render(request, 'accounts/register.html', {'form': form})



def registrarse(request):
    return render(request, "accounts/register2.html")


# if request.method == 'POST':
#         # procesa el formulario
#         return redirect('nombre_de_la_url_a_redirigir')