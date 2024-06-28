from django.urls import re_path
from .views import redirect_view

urlpatterns = [
    re_path(r'^(?P<path>.*)$', redirect_view, name='redirect_view'),
]
