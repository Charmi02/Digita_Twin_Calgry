from django.urls import path
from . import views
from django.views.generic import RedirectView

urlpatterns = [
    path('', views.index, name='index'),
    path('api/data/', views.get_data, name='get_data'),
    path('weather/', views.weather, name='weather'),
    path('traffic/', views.traffic, name='traffic')
]


