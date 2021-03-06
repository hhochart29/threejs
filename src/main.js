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
const renderer = new THREE.WebGLRenderer({
    antialias: true
});
renderer.shadowMap.enabled = true;
//control
const controls = new OrbitControls(camera, renderer.domElement);

//Dessine les axes de la scène
// const axisHelper = new THREE.AxisHelper(10);
// scene.add(axisHelper);

const light = new THREE.AmbientLight(0x404040);
scene.add(light);

const spotLight = new THREE.SpotLight(0xffffff);
spotLight.angle = 5 * (Math.PI / 180);
spotLight.penumbra = 0.9;
spotLight.decay = 2;
spotLight.distance = 2000;
spotLight.position.set(50, 60, 0);
spotLight.castShadow = true;
scene.add(spotLight);

// const spotightHelper = new THREE.SpotLightHelper(spotLight);
// scene.add(spotightHelper);

//Création du corps du serpent
let snakeGroup = new THREE.Group();
for (let i = 0; i < 10; i++) {
    let radius = 1;
    let x = 1.7 * radius * i;
    if (i % 2 === 0) {
        const color = 'green';
        snakeGroup.add(new snakeSphere(18, 18, radius, x, 1, 0, color).draw());
    } else {
        const color = 'lightgreen';
        snakeGroup.add(new snakeSphere(18, 18, radius, x, 1, 0, color).draw());
    }
}
scene.add(snakeGroup);

//création des yeux
const eyes = new snakeSphere().drawEye();
scene.add(eyes);

//création de la langue
const tongue = new snakeSphere().drawTongue();
scene.add(tongue);

const planeGeometry = new THREE.PlaneGeometry(50, 50);
const planeMaterial = new THREE.MeshPhongMaterial({
    color: 'lightgreen',
    side: THREE.DoubleSide
});
const floor = new THREE.Mesh(planeGeometry, planeMaterial);
floor.receiveShadow = true;
floor.rotation.x = Math.PI / 2;
scene.add(floor);

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const speed = 0.025;
const amplitude = 2;
let ispeed = 0;

const animate = timestamp => {
    stats.begin();
    stats.end();
    ispeed += speed;
    let i = 0;

    snakeGroup.children.forEach(e => {
        i += 0.75;
        e.position.z = amplitude * Math.sin(ispeed - i);
    });
    eyes.rotation.y = Math.sin(ispeed);
    eyes.position.z = snakeGroup.children[0].position.z;
    tongue.rotation.y = Math.sin(ispeed);
    tongue.position.z = snakeGroup.children[0].position.z;

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
};
animate();