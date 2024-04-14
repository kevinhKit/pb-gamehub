from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.urls import reverse

import json


def home(request):   
    context={
        'title': 'Título personalizado',
        'main': 'Bienvenido a mi sitio web',
        'footer': 'Este es el contenido principal de la página',
        'aside': '© 2024 Mi Sitio Web',
        'main_content': 'Contenido principal específico de la página de inicio'
    }
    return render(request, "home.html",context)

def handle_game_selection(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        category = data.get('category')
        difficulty = data.get('difficulty')
        print("category:", category)
        print("difficulty:", difficulty)
        request.session['category'] = category
        request.session['difficulty'] = difficulty

        print("Session category:", request.session.get('category'))
        print("Session difficulty:", request.session.get('difficulty'))


        # return redirect('words:word')
        redirect_url = reverse('words:word')
        return JsonResponse({'status': 'success', 'redirect_url': redirect_url})
        # return JsonResponse({'status': 'success', 'message': f'recibiendo, categoria: {category}, dificultad: {difficulty}, inicien!'})
    else:
        return JsonResponse({'status': 'error', 'message': 'Solicitud invalida'}, status=400)

