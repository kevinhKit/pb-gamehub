"""
URL configuration for gamehub project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include  
# from django.urls import path

urlpatterns = [
    # path('admin/', admin.site.urls),
    path('', include('landing_page.urls')),
    # path("chat/", include("chat.urls")),
    path("accounts/", include(('accounts.urls', 'accounts'), namespace='accounts')),
    path("checkers/", include(('chinese_checkers.urls', 'checkers'), namespace='checkers')),
    path("words/", include(('word_search.urls', 'words'), namespace='words')),
    path("tictactoe/", include(('tic_tac_toe.urls', 'tictactoe'), namespace='tictactoe')),
]
