import * as THREE from './lib/three.module.js'
import { OrbitControls } from './lib/OrbitControls.js'

// Constants
const CANVAS_SIZE = {
    width: 800,
    height: 800,
}

const AXIS = {
    x: 'x',
    y: 'y',
    z: 'z',
}

const DIRECTION = {
    antiClockwise: 1,
    clockwise: -1,
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

// Global variable for convinience
const GLOBAL = {
    cubes: null,
}

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

function initKeyboard() {
    const keymap = {
        'q': { axis: 'x', level: -1, },
        'a': { axis: 'x', level: 0, },
        'z': { axis: 'x', level: 1, },
        'w': { axis: 'y', level: 1, },
        's': { axis: 'y', level: 0, },
        'x': { axis: 'y', level: -1, },
        'e': { axis: 'z', level: 1, },
        'd': { axis: 'z', level: 0, },
        'c': { axis: 'z', level: -1, },
    }

    document.addEventListener('keydown', (ev) => {
        const key = ev.key;
        console.log(key);
        const validKeys = 'qazwsxedcQAZWSXEDC';
        if (validKeys.indexOf(key) >= 0) {
            const direction = key.toLowerCase() === key ? DIRECTION.antiClockwise : DIRECTION.clockwise;
            const opKey = key.toLowerCase();
            rotateFace(keymap[opKey].axis, direction, keymap[opKey].level);
        }
    })
}

/**
 * modify cubes' position and rotation
 */

function rotateFace(axis, direction, level) {
    const sinVal = direction === DIRECTION.antiClockwise ? 1 : -1;
    const cosVal = 0;
    const u = new THREE.Vector3(0, 0, 0);
    u[axis] = 1;
    const rotateMat = new THREE.Matrix3();
    // rotate matrix from wikipedia: https://en.wikipedia.org/wiki/Rotation_matrix
    rotateMat.set(
        cosVal + u.x ** 2 * (1 - cosVal), u.x * u.y * (1 - cosVal) - u.z * sinVal, u.x * u.z * (1 - cosVal) + u.y * sinVal,
        u.y * u.x * (1 - cosVal) + u.z * sinVal, cosVal + u.y ** 2 * (1 - cosVal), u.y * u.z * (1 - cosVal) - u.x * sinVal,
        u.z * u.x * (1 - cosVal) - u.y * sinVal, u.z * u.y * (1 - cosVal) + u.x * sinVal, cosVal + u.z ** 2 * (1 - cosVal),
    );

    for (const cube of GLOBAL.cubes) {
        if (cube.position[axis] === level) {
            cube.rotateOnWorldAxis(u, (direction === DIRECTION.antiClockwise ? 1 : -1) * Math.PI / 2);
            const posVec = new THREE.Vector3(cube.position.x, cube.position.y, cube.position.z);
            posVec.applyMatrix3(rotateMat);
            cube.position.x = posVec.x;
            cube.position.y = posVec.y;
            cube.position.z = posVec.z;
        }
    }

}

// global objects
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, CANVAS_SIZE.width / CANVAS_SIZE.height, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#main-canvas'),
    antialias: true,
});

const controls = new OrbitControls(camera, renderer.domElement);


// configs
renderer.setSize(CANVAS_SIZE.width, CANVAS_SIZE.height);

camera.position.x = 3;
camera.position.y = 4;
camera.position.z = 5;
camera.lookAt(0, 0, 0);

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
GLOBAL.cubes = []
for (let x of [-1, 0, 1]) {
    for (let y of [-1, 0, 1]) {
        for (let z of [-1, 0, 1]) {
            const cube = new THREE.Mesh(cubeGeometry, generateCubeMaterial(x, y, z));
            cube.position.x = x;
            cube.position.y = y;
            cube.position.z = z;
            GLOBAL.cubes.push(cube);
            scene.add(cube);
        }
    }
}

initKeyboard();

// render function

function render() {
    controls.update();

    renderer.render(scene, camera);

    requestAnimationFrame(render);
};

render()
