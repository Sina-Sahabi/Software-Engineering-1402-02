from django.urls import path
from . import views

urlpatterns = [
    path('/', views.home, name='home page'),
    # path('newGame/wordel', views.newWordel, name='create new Wordel game'),
    # path('newGame/hangman', views.newHangman, name='create new Hangman game'),
    path("<path:req_path>/", views.redirect_view),
]