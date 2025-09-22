const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
const orbit = new THREE.OrbitControls(camera, renderer.domElement);
camera.position.set(0, 0, 14);
orbit.update();

const textureLoader = new THREE.TextureLoader();
const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
  'img/stars.jpg', 'img/stars.jpg', 'img/stars.jpg',
  'img/stars.jpg', 'img/stars.jpg', 'img/stars.jpg'
]);

const sphereGeometry = new THREE.SphereGeometry(5, 360, 180);
let moonTexture;
try {
  moonTexture = textureLoader.load('img/Pt_detect.png');
} catch (e) {
  console.warn('Moon texture not found, using fallback color');
}
const sphereMaterial = new THREE.MeshBasicMaterial({
  color: moonTexture ? undefined : '#F6F1D5', // Fallback if image missing
  map: moonTexture,
  wireframe: false
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphere);

// Optional markers/popups as in script.js above

// Conditional event listener to avoid null error
const submitButton = document.querySelector('.sub');
if (submitButton) {
  submitButton.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('Form submitted'); // Add your handleSubmit logic here if needed
  });
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();