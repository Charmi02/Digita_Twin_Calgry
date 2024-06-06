function initThreeJS(containerId) {
    const container = document.getElementById(containerId);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Add a simple plane to represent the map
    const geometry = new THREE.PlaneGeometry(1000, 1000);
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('/static/images/cityscape.jpg');
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    // Position the camera
    camera.position.z = 5;

    // Render loop
    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }
    animate();

    // Load and visualize CSV data
    loadCSVData('/data.csv')

    function loadCSVData(csvFilePath) {
        fetch(csvFilePath)
            .then(response => response.text())
            .then(data => {
                const parsedData = parseCSVData(data);
                visualizeData(parsedData);
            });
    }

    function parseCSVData(data) {
        const lines = data.split('\n');
        const headers = lines[0].split(',');

        return lines.slice(1).map(line => {
            const values = line.split(',');
            return headers.reduce((obj, header, index) => {
                obj[header] = values[index];
                return obj;
            }, {});
        });
    }

    function visualizeData(data) {
        data.forEach(item => {
            // Example: Create a cube for each data point
            const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
            const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
            const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

            // Position the cube based on data (example)
            cube.position.set(item.GRD_ELEV_MIN_X, item.GRD_ELEV_MIN_Y, item.GRD_ELEV_MIN_Z);
            scene.add(cube);
        });
    }
}
