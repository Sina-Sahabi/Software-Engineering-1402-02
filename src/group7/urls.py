from django.urls import path, re_path
from .views import index

from .views import GameCreateAPI
# from .views import GuessCreateAPI

urlpatterns = [
    path('api/game/', GameCreateAPI.as_view(), name='game-create'),
    # path('api/guess/', GuessCreateAPI.as_view(), name='guess-create'),
    # path('<path:path>', index, name='index'),
    path('', index, name='index'),
    re_path(r'^(?:.*)/?$', index, name='index'),
]
# urlpatterns = [
#     re_path(r'^(?P<path>.*)$', redirect_view),
# ]
