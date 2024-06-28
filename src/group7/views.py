from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader

def home(request):
	template = loader.get_template('home.html')
	return HttpResponse(template.render())

def test(request):
    template = loader.get_template('test.html')
    return HttpResponse(template.render())

def newWordel(request):
    if request.method=='GET':
        template = loader.get_template('??.html')
        return HttpResponse(template.render())