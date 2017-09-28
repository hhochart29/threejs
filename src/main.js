import * as THREE from 'three';
import ThreeOrbitControls from './utils/OrbitControls';
import Stats from 'stats.js';
import './main.css';

//Gestion des controles
const OrbitControls = ThreeOrbitControls(THREE);

//Stats FPS
const stats = new Stats();
document.body.appendChild(stats.domElement);

//Scene, renderer, camera, mesh (geometry + material)
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 10;

//Renderer
const renderer = new THREE.WebGLRenderer();

//control
const controls = new OrbitControls(camera, renderer.domElement);

//Read the fucking manual : Geometry
const geometry = new THREE.BoxGeometry(2, 1, 1);
const material = new THREE.MeshBasicMaterial({
    color: 'red',
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const animate = timestamp => {
    stats.begin();
    stats.end();

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
};
animate();