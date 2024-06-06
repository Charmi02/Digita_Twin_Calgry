document.addEventListener('DOMContentLoaded', function() {
    // Initialize the Leaflet map
    var map = L.map('map-container').setView([51.0486, -114.0708], 12);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Function to fetch data from the API and add it to the map
    function fetchDataAndAddToMap() {
        fetch('https://data.calgary.ca/resource/cchr-krqg.json')
            .then(response => response.json())
            .then(data => {
                data.forEach(item => {
                    if (item.hasOwnProperty('polygon')) {
                        var coordinates = JSON.parse(item.polygon.coordinates[0]);
                        var latLngs = coordinates.map(coord => [coord[1], coord[0]]);
                        L.polygon(latLngs, { color: 'red' }).addTo(map);
                    }
                });
            })
            .catch(error => console.error('Error fetching data:', error));}

    fetchDataAndAddToMap();

    // 3D Terrain Visualization
    const container = document.getElementById('3d-map-container');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    container.appendChild(renderer.domElement);

    // Function to generate a random terrain
    function generateTerrain() {
        const terrainSize = 100; // Size of the terrain grid
        const terrainGeometry = new THREE.PlaneGeometry(terrainSize, terrainSize, 100, 100);
        
        // Randomly displace vertices to create a rough terrain
        for (let i = 0; i < terrainGeometry.vertices.length; i++) {
            const vertex = terrainGeometry.vertices[i];
            vertex.z = Math.random() * 10;
        }
        
        // Create material and mesh for the terrain
        const terrainMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
        const terrainMesh = new THREE.Mesh(terrainGeometry, terrainMaterial);
        terrainMesh.rotation.x = -Math.PI / 2; // Rotate to lay flat on the ground
        return terrainMesh;
    }

    // Add generated terrain to the scene
    const terrain = generateTerrain();
    scene.add(terrain);

    // Position the camera
    camera.position.z = 50;

    // Render loop
    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }
    animate();
});
