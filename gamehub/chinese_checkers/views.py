from django.shortcuts import render


def checkers(request):   
    return render(request, "game.html")
