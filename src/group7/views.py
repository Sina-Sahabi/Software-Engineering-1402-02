import requests
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def redirect_view(request, path):
    target_base_url = 'http://localhost:5000'
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