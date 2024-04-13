from django.shortcuts import render


def word(request):   
    return render(request, "words.html")
