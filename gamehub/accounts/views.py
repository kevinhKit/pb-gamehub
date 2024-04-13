
from django.shortcuts import render, redirect
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
from django.contrib.auth import authenticate, login as auth_login
from django.contrib.auth.forms import AuthenticationForm
from django.contrib import messages
from .models import Role
from .forms import CustomUserCreationForm
from .forms import CustomAuthenticationForm

def register(request):
    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            try:
                default_role = Role.objects.get(name='Usuario')
                user.role = default_role
            except Role.DoesNotExist:
                
                messages.error(request, 'El rol necesario no existe.')
                return render(request, 'accounts/register.html', {'form': form})
            user.save() 
            messages.success(request, 'Registro exitoso. Ahora puedes iniciar sesión.')
            return redirect('home')
        else:
            messages.error(request, 'Por favor corrige los errores en el formulario.')
    else:
        form = CustomUserCreationForm()
    return render(request, 'accounts/register.html', {'form': form})


def custom_login(request):
    if request.method == 'POST':
        form = CustomAuthenticationForm(request, data=request.POST)
        if form.is_valid():
            auth_login(request, form.get_user())
            return redirect('home')
    else:
        form = CustomAuthenticationForm()
    return render(request, "accounts/login.html", {'form': form})
