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

//Dessine les axes de la scène
const axisHelper = new THREE.AxisHelper(10);
scene.add(axisHelper);

//Read the fucking manual : Geometry
const geometry = new THREE.BoxGeometry(2, 1, 1);
const material = new THREE.MeshBasicMaterial({
    color: 'red',
});

//Premier bloc
const mesh = new THREE.Mesh(geometry, material);
let firstGroup = new THREE.Group();
firstGroup.add( mesh );

//Deuxieme bloc
const mesh2 = new THREE.Mesh(geometry, material);
mesh2.position.set(0, 5, 0);
firstGroup.add( mesh2 );
scene.add(firstGroup);

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let i = mesh.position.x;
// let lastTimeStamp = 0;
// const INTERVAL = 200;
const animate = timestamp => {
    stats.begin();
    stats.end();

    firstGroup.position.x = i;
    i += 0.01;

    // Gestion du temps avec lasttimestamp
    // if(timestamp - lastTimeStamp > INTERVAL) {
    //     mesh.position.x = i % 10;
    //     i++;
    //     lastTimeStamp = timestamp;
    // }
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
};
animate();