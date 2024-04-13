from django.shortcuts import render


def tic(request):   
    return render(request, "tic_tac_toe.html")
