from django.shortcuts import render
from django.http import JsonResponse
from .models import Category, Word
import unicodedata

# Normalización de palabras
def normalize_word(word):
    normalized_word = unicodedata.normalize('NFD', word)
    return ''.join([c for c in normalized_word if unicodedata.category(c) != 'Mn']).upper()

def word(request):   
    category_id = request.session.get('category', None)
    difficulty = request.session.get('difficulty', None)
    try:
        category = Category.objects.get(id=category_id)
        category_name = normalize_word(category.name)
    except Category.DoesNotExist:
        category_name = 'NO SELECCIONO UNA CATEGORIA'
        words = []
    else:
        words = Word.objects.filter(category=category, difficulty=difficulty)[:10]
    words_list = [normalize_word(word.word) for word in words]
    context = {
        'category': category_name,
        'difficulty': normalize_word(difficulty) if difficulty else 'NO SELECCIONO NINGUNA DIFICULTAD',
        'words': words_list
    }
    return render(request, "words.html", context)



def get_categories_and_difficulties(request):
    categories = list(Category.objects.values('name', 'id'))
    difficulties = Word.objects.order_by().values_list('difficulty', flat=True).distinct()
    data = {
        'categories': categories,
        'difficulties': list(difficulties)
    }
    return JsonResponse(data)