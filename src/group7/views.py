import logging
import requests
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render

logger = logging.getLogger(__name__)

def index(request):
    return render(request, 'index.html')

@csrf_exempt
def redirect_view(request, path):
    # Base URL of the localhost server to redirect to
    target_base_url = 'http://localhost:5173'

    # Ensure path does not start with a slash
    if path.startswith('/'):
        path = path[1:]

    # Construct the full target URL
    target_url = f'{target_base_url}/{path}'

    # Log the incoming request details
    logger.debug(f'Request method: {request.method}')
    logger.debug(f'Request path: {path}')
    logger.debug(f'Request headers: {request.headers}')
    logger.debug(f'Request GET params: {request.GET}')
    logger.debug(f'Request POST data: {request.POST}')
    logger.debug(f'Request body: {request.body}')

    # Prepare the headers, excluding 'Host' as it's managed by requests
    headers = {key: value for key, value in request.headers.items() if key.lower() != 'host'}

    # Prepare the request parameters and body
    params = request.GET if request.method == 'GET' else None
    data = request.body if request.method in ['POST', 'PUT', 'PATCH'] else None

    # Log the request details before sending
    logger.debug(f'Target URL: {target_url}')
    logger.debug(f'Headers: {headers}')
    logger.debug(f'Params: {params}')
    logger.debug(f'Data: {data}')

    # Send the request to the target URL and get the response
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
        logger.error(f'RequestException: {e}')
        return HttpResponse(f'Error: {e}', status=502)

    # Log the response details
    logger.debug(f'Response status: {response.status_code}')
    logger.debug(f'Response headers: {response.headers}')
    logger.debug(f'Response content: {response.content}')

    # Create the Django response object
    django_response = HttpResponse(
        response.content,
        status=response.status_code,
        content_type=response.headers.get('Content-Type', 'application/octet-stream')
    )

    # Copy the headers from the response
    for key, value in response.headers.items():
        if key.lower() != 'transfer-encoding':  # Skip transfer-encoding to avoid issues
            django_response[key] = value

    return django_response
