import * as THREE from 'three';
import ThreeOrbitControls from './utils/OrbitControls';
import snakeSphere from './class/snakeSphere';
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

//Dessine les axes de la scène
const axisHelper = new THREE.AxisHelper(10);
scene.add(axisHelper);

let snakeGroup = new THREE.Group();
let snake = new snakeSphere(1, 1, 1);
snakeGroup.add(snake);
scene.add(snakeGroup);

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const animate = timestamp => {
    stats.begin();
    stats.end();

    // snakeGroup.position.x = i;
    // i += 0.01;

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
};
animate();