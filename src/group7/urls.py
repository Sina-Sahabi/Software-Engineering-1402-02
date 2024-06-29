from django.urls import path, re_path
from .views import redirect_view
from .views import index

urlpatterns = [
    # path('', index, name='index'),
    # path('<path:path>', index, name='index'),  # This will catch all other paths
    path('', index, name='index'),
    re_path(r'^(?:.*)/?$', index, name='index'),  # Catch all paths
]
# urlpatterns = [
#     re_path(r'^(?P<path>.*)$', redirect_view),
# ]
