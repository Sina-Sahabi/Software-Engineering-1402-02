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