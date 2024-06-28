from django.urls import path
from django.conf.urls.static import static
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('test/', views.test, name='test'),
    path('nwl/', views.newWordel, name='newWordel'),
    path('wlplay/', views.wordelPlay, name='wordelPlay'),
]
