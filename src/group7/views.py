from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from group7.models import *
import random

def home(request):
	template = loader.get_template('index.html')
	return HttpResponse(template.render())

def test(request):
    template = loader.get_template('test.html')
    return HttpResponse(template.render())

def newWordel(request):
    items = list(Word.objects.all())
    w = random.choice(items)
    session = WordelGameSession(numberOfTries = 0, str = w.str)
    session.save()
    return HttpResponse(str(WordelGameSession.objects.count()))

def wordelPlay(request):
    id = int(request.POST.get('id'))
    guess = request.POST.get('guess')
    answer = WordelGameSession.objects.filter(id=id).values()
    result = ["x", "x", "x", "x", "x"]

    for i in range(0, 5):
        if guess[i] == answer[i]:
            result[i] = "correct"
        else:
            result[i] = "notIn"

    for i in range(0, 5):
        for j in range(0, 5):
            if result[j] != "correct":
                if answer[i] == guess[j]:
                    result[j] = "present"
                    break
    return HttpResponse(result)