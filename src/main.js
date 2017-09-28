import * as THREE from 'three';
import ThreeOrbitControls from './utils/OrbitControls';
import snakeSphere from './class/snakeSphere';
import Stats from 'stats.js';
import './main.css';

let sphereArray = [];
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

const light = new THREE.AmbientLight(0x404040);
scene.add(light);

const spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(50,50,0);
scene.add(spotLight);

const spotightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(spotightHelper);

let snakeBodyGroup = new THREE.Group();

//Création du corps du serpent
for (let i = 0; i < 10; i++) {
    let radius = 1;
    let x = 1.7 * radius * i;
    if (i % 2 === 0) {
        const color = 'green';
        snakeBodyGroup.add(new snakeSphere(18, 18, radius, x, 1, 0, color).draw());
    } else {
        const color = 'lightgreen';
        snakeBodyGroup.add(new snakeSphere(18, 18, radius, x, 1, 0, color).draw());
    }
}
scene.add(snakeBodyGroup);

//création des yeux
const eyes = new snakeSphere().drawEye();
scene.add(eyes);


//TODO: add ground to the scene & shadows according to the snake - reflecting on the ground
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