from django.shortcuts import render

def home(request):   
    context={
        'title': 'Título personalizado',
        'main': 'Bienvenido a mi sitio web',
        'footer': 'Este es el contenido principal de la página',
        'aside': '© 2024 Mi Sitio Web',
        'main_content': 'Contenido principal específico de la página de inicio'
    }
    return render(request, "internal.html",context)
