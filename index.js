import * as THREE from './lib/three.module.js'
import { OrbitControls } from './lib/OrbitControls.js'

// Constants
const CANVAS_SIZE = {
    width: 800,
    height: 800,
}

const FACE_COLORS = {
    front: 0xff0000,
    back: 0x00ff00,
    top: 0x0000ff,
    bottom: 0xffff00,
    left: 0xff00ff,
    right: 0x00ffff,
    internal: 0xa0a0a0,
};

const CUBES_INFO = [
    {
        pos: { x: -1, y: -1, z: -1 },
    },
]

// functions

function generateCubeMaterial(x, y, z) {
    const cubeMaterials = [
        new THREE.MeshBasicMaterial({ color: x == 1 ? FACE_COLORS.right : FACE_COLORS.internal, transparent: true, opacity: 1., side: THREE.DoubleSide }),
        new THREE.MeshBasicMaterial({ color: x == -1 ? FACE_COLORS.left : FACE_COLORS.internal, transparent: true, opacity: 1., side: THREE.DoubleSide }),
        new THREE.MeshBasicMaterial({ color: y == 1 ? FACE_COLORS.top : FACE_COLORS.internal, transparent: true, opacity: 1., side: THREE.DoubleSide }),
        new THREE.MeshBasicMaterial({ color: y == -1 ? FACE_COLORS.bottom : FACE_COLORS.internal, transparent: true, opacity: 1., side: THREE.DoubleSide }),
        new THREE.MeshBasicMaterial({ color: z == 1 ? FACE_COLORS.front : FACE_COLORS.internal, transparent: true, opacity: 1., side: THREE.DoubleSide }),
        new THREE.MeshBasicMaterial({ color: z == -1 ? FACE_COLORS.back : FACE_COLORS.internal, transparent: true, opacity: 1., side: THREE.DoubleSide }),
    ];
    return cubeMaterials;
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

camera.position.x = 3;
camera.position.y = 4;
camera.position.z = 5;
camera.lookAt(0, 0, 0);

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
for (let x of [-1, 0, 1]) {
    for (let y of [-1, 0, 1]) {
        for (let z of [-1, 0, 1]) {
            const cube = new THREE.Mesh(cubeGeometry, generateCubeMaterial(x, y, z));
            cube.position.x = x;
            cube.position.y = y;
            cube.position.z = z;
            scene.add(cube);
        }
    }
}


// render function

function render() {
    requestAnimationFrame(render);
    controls.update();
    renderer.render(scene, camera);
};

render()
