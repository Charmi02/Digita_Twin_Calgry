require([
    "esri/config",
    "esri/Map",
    "esri/views/SceneView",
    "esri/layers/GeoJSONLayer",
    "esri/layers/SceneLayer"
], function(esriConfig, Map, SceneView, GeoJSONLayer, SceneLayer) {

    // Set your API key
    esriConfig.apiKey = "YOUR_API_KEY";

    // 3D Scene
    var sceneLayer = new SceneLayer({
        portalItem: {
            id: "2342ab7928834076a1240fb93c60e978"
        },
        elevationInfo: {
            mode: "absolute-height",
            offset: 6
        }
    });

    var scene = new Map({
        basemap: "hybrid",
        ground: "world-elevation",
        layers: [sceneLayer]
    });

    var sceneView = new SceneView({
        container: "3dViewDiv",
        map: scene,
        camera: {
            position: [-114.0719, 51.0447, 1500],
            tilt: 82,
            heading: 304
        }
    });

    // Fetch and validate GeoJSON data before adding to the map
    fetch('https://data.calgary.ca/resource/cchr-krqg.json')
        .then(response => response.json())
        .then(data => {
            if (Array.isArray(data) && data.length > 0 && data[0].polygon) {
                const features = data.map(item => ({
                    type: "Feature",
                    geometry: {
                        type: "Polygon",
                        coordinates: JSON.parse(item.polygon.coordinates)
                    },
                    properties: item
                }));

                const geojson = {
                    type: "FeatureCollection",
                    features: features
                };

                const sceneGeojsonLayer = new GeoJSONLayer({
                    source: geojson
                });

                scene.add(sceneGeojsonLayer);
            } else {
                console.error('Invalid GeoJSON data:', data);
            }
        })
        .catch(error => console.error('Error fetching GeoJSON data:', error));
});
