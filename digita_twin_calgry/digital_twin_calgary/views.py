from django.shortcuts import render
from django.http import JsonResponse
import requests

def index(request):
    return render(request, 'index.html')
def get_data(request):
    url = 'https://data.calgary.ca/resource/cchr-krqg.json'
    response = requests.get(url)
    data = response.json()

    # Process the data if necessary
    features = []
    for item in data:
        if 'polygon' in item:
            coordinates = [[coord[1], coord[0]] for coord in eval(item['polygon'])['coordinates'][0]]
            features.append({
                'type': 'Feature',
                'geometry': {
                    'type': 'Polygon',
                    'coordinates': [coordinates]
                },
                'properties': item
            })
    
    geojson = {
        'type': 'FeatureCollection',
        'features': features
    }
    
    return JsonResponse(geojson)

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
