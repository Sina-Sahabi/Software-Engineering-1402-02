from django.urls import path, re_path
from .views import index
from . import views

urlpatterns = [
    path('wordel/create/', views.create_game, name='create_game'),
    path('wordel/game/<int:game_id>/', views.get_game, name='get_game'),
    path('wordel/guess/<int:game_id>/', views.make_guess, name='make_guess'),
    path('wordel/add_word/', views.add_word, name='add_word'),
    # path('api/game/', GameCreateAPI.as_view(), name='game-create'),
    path('hangman/create/', views.create_game, name='create_game'),
    path('hangman/guess/<int:game_id>/', views.make_guess_h, name='make_guess_h'),

    # path('api/guess/', GuessCreateAPI.as_view(), name='guess-create'),
    # path('<path:path>', index, name='index'),
    path('', index, name='index'),
    # re_path(r'^(?:.*)/?$', index, name='index'),
]
# urlpatterns = [
#     re_path(r'^(?P<path>.*)$', redirect_view),
# ]
