import * as THREE from './lib/three.module.js'
import { OrbitControls } from './lib/OrbitControls.js'

// Constants
const CANVAS_SIZE = {
    width: 800,
    height: 800,
}

// global objects
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, CANVAS_SIZE.width / CANVAS_SIZE.height, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#main-canvas'),
    antialias: true,
});
THREE.or
const controls = new OrbitControls(camera, renderer.domElement);


// configs
renderer.setSize(CANVAS_SIZE.width, CANVAS_SIZE.height);

camera.position.x = 2;
camera.position.y = 1;
camera.position.z = 3;
camera.lookAt(0, 0, 0);

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterials = [
    new THREE.MeshBasicMaterial({ color: 0xff0000, transparent: true, opacity: 1., side: THREE.DoubleSide }),
    new THREE.MeshBasicMaterial({ color: 0x00ff00, transparent: true, opacity: 1., side: THREE.DoubleSide }),
    new THREE.MeshBasicMaterial({ color: 0x0000ff, transparent: true, opacity: 1., side: THREE.DoubleSide }),
    new THREE.MeshBasicMaterial({ color: 0xffff00, transparent: true, opacity: 1., side: THREE.DoubleSide }),
    new THREE.MeshBasicMaterial({ color: 0xff00ff, transparent: true, opacity: 1., side: THREE.DoubleSide }),
    new THREE.MeshBasicMaterial({ color: 0x00ffff, transparent: true, opacity: 1., side: THREE.DoubleSide }),
];

const cube = new THREE.Mesh(cubeGeometry, cubeMaterials);

scene.add(cube);


// render function

function render() {
    requestAnimationFrame(render);
    controls.update();
    renderer.render(scene, camera);
};

render()
