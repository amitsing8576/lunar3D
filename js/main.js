// Loading Three.js and OrbitControls from a reliable CDN
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/controls/OrbitControls.js';

// 1. SCENE AND RENDERER
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 2. CAMERA
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 14);

// 3. CONTROLS
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

// 4. TEXTURES
const textureLoader = new THREE.TextureLoader();
const cubeTextureLoader = new THREE.CubeTextureLoader();

// Pre-load all textures using absolute paths from the project root
const textures = {
    'default': textureLoader.load('/img/Pt_detect.png'),
    'stars': cubeTextureLoader.setPath('/img/').load(['stars.jpg', 'stars.jpg', 'stars.jpg', 'stars.jpg', 'stars.jpg', 'stars.jpg']),
    'si': textureLoader.load('/img/Si_final.png'),
    'al': textureLoader.load('/img/Al_final.png'),
    'mg': textureLoader.load('/img/Mg_final.png'),
    'fe': textureLoader.load('/img/Fe_final.png'),
    'ca': textureLoader.load('/img/Ca_final.png')
};

scene.background = textures.stars;

// 5. THE MOON
const sphereGeometry = new THREE.SphereGeometry(5, 64, 64);
const sphereMaterial = new THREE.MeshBasicMaterial({
    map: textures.default
});
const moon = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(moon);

// 6. EVENT LISTENERS FOR SIDEBAR
document.querySelectorAll('.sidebar-icon').forEach(icon => {
    icon.addEventListener('click', () => {
       const textureKey = icon.getAttribute('data-texture');
        if (textures[textureKey]) {
            sphereMaterial.map = textures[textureKey];
        }
    });
});

// Handle window resizing
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// 7. ANIMATION LOOP
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();

// --- 2D HEATMAP MODAL LOGIC ---
const show2dMapBtn = document.getElementById('show-2d-map');
const modal = document.getElementById('modal-2d');
const closeBtn = document.getElementById('modal-close-btn');
const dropdown = document.getElementById('heatmap-dropdown');
const heatmapImage = document.getElementById('heatmap-image');

if (show2dMapBtn) {
    show2dMapBtn.addEventListener('click', () => {
        modal.style.display = 'flex';
    });
}
if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });
}
window.addEventListener('click', (event) => {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
});
if (dropdown) {
    dropdown.addEventListener('change', () => {
        const selectedImage = dropdown.value;
        heatmapImage.src = `/img/${selectedImage}.png`;
    });
}