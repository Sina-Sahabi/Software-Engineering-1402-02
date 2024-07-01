import requests
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render
import json

from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from django.views.decorators.http import require_POST
from .models import Game, Word
import random


def create_game(request):
    words = Word.objects.all()
    if not words.exists():
        game = Game.objects.create(target_word='SCORE')
        return JsonResponse({'game_id': game.id})
        # return JsonResponse({'error': 'No words available for the game'}, status=400)
    target_word = (random.choice(words).text).upper()
    print(">><< ", target_word)
    game = Game.objects.create(target_word=target_word)
    return JsonResponse({'game_id': game.id})


def get_game(request, game_id):
    game = get_object_or_404(Game, id=game_id)
    return JsonResponse({
        'target_word': game.target_word,
        'guesses': game.guesses,
        'is_active': game.is_active
    })

# @require_POST


def make_guess(request, game_id):
    game = get_object_or_404(Game, id=game_id)
    if not game.is_active:
        return JsonResponse({'error': 'Game is not active'}, status=400)

    data = json.loads(request.body)
    guess = data.get('guess')

    # guess = request.POST.get("guess")
    print(guess)
    if len(str(guess)) != 5:
        return JsonResponse({'error': 'Guess must be a 5-letter word'}, status=400)
    feedback = []
    target = list(game.target_word)

    print("... ", target, guess)

    for i, char in enumerate(guess):
        if char == target[i]:
            feedback.append('correct')
            target[i] = None
        elif char in target:
            feedback.append('present')
            target[target.index(char)] = None
        else:
            feedback.append('notIn')

    game.guesses.append({'guess': guess, 'feedback': feedback})
    if guess == game.target_word:
        game.is_active = False
    elif len(game.guesses) >= 6:
        game.is_active = False

    game.save()
    print("~~~ ", game.is_active)

    return JsonResponse({'feedback': feedback, 'is_active': game.is_active})

# @require_POST


def add_word(request):
    word = request.POST.get('word')
    if len(word) != 5:
        return JsonResponse({'error': 'Word must be 5 letters long'}, status=400)

    if Word.objects.filter(text=word).exists():
        return JsonResponse({'error': 'Word already exists'}, status=400)

    Word.objects.create(text=word)
    return JsonResponse({'message': 'Word added successfully'})


def index(request):
    return render(request, 'index.html')


def wordel_page(request):
    return render(request, '???.html')


def hangman_page(request):
    return render(request, '???.html')


@csrf_exempt  # ! did not work properly
def redirect_view(request, path):
    target_base_url = 'http://localhost:5173'

    if path.startswith('/'):
        path = path[1:]

    target_url = f'{target_base_url}/{path}'

    headers = {key: value for key, value in request.headers.items()
               if key.lower() != 'host'}

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
        content_type=response.headers.get(
            'Content-Type', 'application/octet-stream')
    )

    for key, value in response.headers.items():
        if key.lower() != 'transfer-encoding':
            django_response[key] = value

    return django_response

def make_guess_h(request, game_id):
    game = get_object_or_404(Game, id=game_id)
    # if not game.is_active:
    #     return JsonResponse({'error': 'Game is not active'}, status=400)

    data = json.loads(request.body)
    guess = data.get('guess')

    print(guess)
   
    feedback = []
    target = list(game.target_word)

    

    for i, char in enumerate(target):
        if char == guess:
            feedback.append(i)

    game.guesses.append({'guess': guess, 'feedback': feedback})
    if guess == game.target_word:
        game.is_active = False
    elif len(game.guesses) >= 6:
        game.is_active = False

    game.save()

    return JsonResponse({'feedback': feedback, 'is_active': game.is_active})

