from django.shortcuts import render
from django.http import JsonResponse
from .models import Category, Word


# from django.views.decorators.http import require_POST
# from django.views.decorators.csrf import csrf_exempt
# import json


def word(request):   
    return render(request, "words.html")

def get_categories_and_difficulties(request):
    categories = list(Category.objects.values('name', 'id'))
    difficulties = Word.objects.order_by().values_list('difficulty', flat=True).distinct()
    data = {
        'categories': categories,
        'difficulties': list(difficulties)
    }
    return JsonResponse(data)


# @csrf_exempt
# @require_POST
# def handle_action(request):
#     data = json.loads(request.body)
#     action = data.get('action')
#     print('Acción recibida:', action)
#     return JsonResponse({'message': 'Se imprimió'})
