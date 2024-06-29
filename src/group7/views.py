import requests
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render

# wordel/views.py

from rest_framework import generics, status
from rest_framework.response import Response
from .models import Game, Guess
from .serializers import GameSerializer, GuessSerializer
import random

class GameCreateAPI(generics.CreateAPIView):
    queryset = Game.objects.all()
    serializer_class = GameSerializer

    def create(self, request, *args, **kwargs):
        # Generate a random word of length 5 (you may need to adjust this based on your word list)
        word_to_guess = ''.join(random.choices('abcdefghijklmnopqrstuvwxyz', k=5))
        game = Game.objects.create(word_to_guess=word_to_guess)
        serializer = self.get_serializer(game)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

# class GuessCreateAPI(generics.CreateAPIView):
#     queryset = Guess.objects.all()
#     serializer_class = GuessSerializer

#     def create(self, request, *args, **kwargs):
#         game_id = request.data.get('game_id')
#         guessed_word = request.data.get('guessed_word').lower()  # Assuming guesses are case insensitive

#         try:
#             game = Game.objects.get(pk=game_id)
#         except Game.DoesNotExist:
#             return Response({'error': 'Game not found'}, status=status.HTTP_404_NOT_FOUND)

#         if len(guessed_word) != 5:
#             return Response({'error': 'Guessed word must be of length 5'}, status=status.HTTP_400_BAD_REQUEST)

#         is_correct = guessed_word == game.word_to_guess.lower()
#         guess = Guess.objects.create(game=game, guessed_word=guessed_word, is_correct=is_correct)
#         serializer = self.get_serializer(guess)
#         return Response(serializer.data, status=status.HTTP_201_CREATED)


def index(request):
    return render(request, 'index.html')

@csrf_exempt #! did not work properly
def redirect_view(request, path):
    target_base_url = 'http://localhost:5173'

    if path.startswith('/'):
        path = path[1:]

    target_url = f'{target_base_url}/{path}'

    headers = {key: value for key, value in request.headers.items() if key.lower() != 'host'}

    params = request.GET if request.method == 'GET' else None
    data = request.body if request.method in ['POST', 'PUT', 'PATCH'] else None

    try:
        response = requests.request(
            method=request.method,
            url=target_url,
            headers=headers,
            params=params,
            data=data,
            allow_redirects=False
        )
    except requests.RequestException as e:

        return HttpResponse(f'Error: {e}', status=502)    

    django_response = HttpResponse(
        response.content,
        status=response.status_code,
        content_type=response.headers.get('Content-Type', 'application/octet-stream')
    )

    for key, value in response.headers.items():
        if key.lower() != 'transfer-encoding':
            django_response[key] = value

    return django_response
