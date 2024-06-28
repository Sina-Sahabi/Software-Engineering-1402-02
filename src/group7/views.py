from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader

def home(request):
    if request.method=='GET':
        template = loader.get_template('index.html')
        return HttpResponse(template.render())
    return render (request,'index.html')

def test(request):
    template = loader.get_template('test.html')
    return HttpResponse(template.render())

def newWordel(request):
    if request.method=='GET':
        template = loader.get_template('??.html')
        return HttpResponse(template.render())