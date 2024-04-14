from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.urls import reverse
# from django.views.decorators.http import require_POST
# from django.views.decorators.csrf import csrf_exempt
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

# @csrf_exempt
# @require_POST
def handle_game_selection(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        category = data.get('category')
        difficulty = data.get('difficulty')
        print("category:", category)
        print("difficulty:", difficulty)
        # return redirect('word')

        # return redirect('words:word')
        redirect_url = reverse('words:word')
        return JsonResponse({'status': 'success', 'redirect_url': redirect_url})
        # return JsonResponse({'status': 'success', 'message': f'recibiendo, categoria: {category}, dificultad: {difficulty}, inicien!'})
    else:
        return JsonResponse({'status': 'error', 'message': 'Invalid request'}, status=400)

