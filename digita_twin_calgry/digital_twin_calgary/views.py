from django.shortcuts import render
import requests

def index(request):
    return render(request, 'index.html')

def weather(request):
    # Assuming you have an API endpoint to fetch weather data
    response = requests.get('')
    weather_data = response.json()
    return render(request, 'weather.html', {'weather_data': weather_data})

def traffic(request):
    # Assuming you have an API endpoint to fetch traffic data
    response = requests.get('')
    traffic_data = response.json()
    return render(request, 'traffic.html', {'traffic_data': traffic_data})
