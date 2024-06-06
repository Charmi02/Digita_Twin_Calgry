from django.urls import path
from . import views
from django.views.generic import RedirectView

urlpatterns = [
    path('', views.index, name='index'),
    path('weather/', views.weather, name='weather'),
    path('traffic/', views.traffic, name='traffic')
]


