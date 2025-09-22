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
let moonTexture = textureLoader.load('img/moonimg.jpg');
const sphereMaterial = new THREE.MeshBasicMaterial({
  map: moonTexture,
  wireframe: false
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphere);

// Sidebar toggle
const sidebar = document.getElementById('sidebar');
sidebar.addEventListener('click', (e) => {
  if (!e.target.classList.contains('sidebar-icon') && !e.target.classList.contains('sidebar-nav')) {
    sidebar.classList.toggle('open');
  }
});

// Heatmap texture switching (matching original images)
const elementTextures = {
  si: 'img/Si_final.png',
  al: 'img/Al_final.png',
  ca: 'img/Ca_final.png',
  mg: 'img/Mg_final.png',
  fe: 'img/Fe_final.png',
  'mg-si': 'img/Mg_Si_final.png',
  'ca-si': 'img/Ca_Si_final.png',
  'al-si': 'img/Al_Si_final.png'
};
const elements = document.querySelectorAll('.sidebar-icon');
elements.forEach(element => {
  element.addEventListener('click', () => {
    const ele = element.getAttribute('data-element');
    if (elementTextures[ele]) {
      textureLoader.load(elementTextures[ele], (newTexture) => {
        sphereMaterial.map = newTexture;
        sphereMaterial.needsUpdate = true;
      });
    }
  });
});

// Optional marker (from original)
function latLonToXYZ(lat, lon, radius) {
  const latRad = THREE.Math.degToRad(lat);
  const lonRad = THREE.Math.degToRad(lon);
  return new THREE.Vector3(
    radius * Math.cos(latRad) * Math.cos(lonRad),
    radius * Math.sin(latRad),
    radius * Math.cos(latRad) * Math.sin(lonRad)
  );
}
const markerGeometry = new THREE.SphereGeometry(0.15, 16, 16);
const markerMaterial = new THREE.MeshBasicMaterial({ color: 'green' });
const marker = new THREE.Mesh(markerGeometry, markerMaterial);
const position = latLonToXYZ(79.137, 67.512, 5);
marker.position.set(position.x, position.y, position.z);
scene.add(marker);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();