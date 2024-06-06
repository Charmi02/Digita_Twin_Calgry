
// cityscape.js
document.addEventListener('DOMContentLoaded', function () {
    const cityscapeImage = document.getElementById('cityscape');
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(cityscapeImage.width, cityscapeImage.height);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, cityscapeImage.width / cityscapeImage.height, 0.1, 1000);

    const texture = new THREE.TextureLoader().load(cityscapeImage.src);
    const geometry = new THREE.PlaneGeometry(cityscapeImage.width, cityscapeImage.height);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    camera.position.z = 5;

    function animate() {
        requestAnimationFrame(animate);
        plane.rotation.y += 0.01;
        renderer.render(scene, camera);
    }
    animate();

    cityscapeImage.parentNode.replaceChild(renderer.domElement, cityscapeImage);
});
