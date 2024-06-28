import requests
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt

def home(request):
    return HttpResponse("ok")

@csrf_exempt
def redirect_view(request, req_path):
    target_url = 'https://example.com/' + req_path

    headers = {key: value for key, value in request.headers.items()}

    if request.method == 'GET':
        response = requests.get(target_url, headers=headers, params=request.GET)
    elif request.method == 'POST':
        response = requests.post(target_url, headers=headers, data=request.POST)
    elif request.method == 'PUT':
        response = requests.put(target_url, headers=headers, data=request.body)
    elif request.method == 'DELETE':
        response = requests.delete(target_url, headers=headers)
    elif request.method == 'PATCH':
        response = requests.patch(target_url, headers=headers, data=request.body)
    elif request.method == 'OPTIONS':
        response = requests.options(target_url, headers=headers)
    else:
        return HttpResponse('Method not supported', status=405)

    django_response = HttpResponse(response.content, status=response.status_code)
    for key, value in response.headers.items():
        django_response[key] = value
    
    return django_response