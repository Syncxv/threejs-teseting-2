import './scss/_main.scss';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import { SphereTesting } from './testing/sphere';
import { Plane as PlaneTesting } from './testing/plane-test';

let zDistance = 600;

const mouse = new THREE.Vector2();
const container = document.querySelector('.container')!;
export const getHeight = () => container.getBoundingClientRect().height;
export const getWidth = () => container.getBoundingClientRect().width;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(80, getWidth() / getHeight(), 10, 1000);

camera.fov = (2 * Math.atan(getHeight() / 2 / zDistance) * 180) / Math.PI;

const clock = new THREE.Clock();
camera.aspect = getWidth() / getHeight();
camera.updateProjectionMatrix();
camera.position.setZ(zDistance);

// const light = new THREE.AmbientLight(0xffffff); // soft white light

// scene.add(light);

const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    logarithmicDepthBuffer: true,
});

renderer.setPixelRatio(window.devicePixelRatio);

// renderer.setClearColor(0xebebeb, 1);
//renderer.sortObjects = false;
console.log(getHeight(), window.innerHeight);
renderer.setSize(getWidth(), getHeight());

renderer.domElement.id = 'main-canvas';

container.appendChild(renderer.domElement);

new OrbitControls(camera, renderer.domElement);
window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
    camera.aspect = getWidth() / getHeight();
    camera.updateProjectionMatrix();

    renderer.setSize(getWidth(), getHeight());
}
function onDocumentMouseMove(event: MouseEvent) {
    mouse.set((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1);
}

document.addEventListener('mousemove', onDocumentMouseMove, false);
let plane = new PlaneTesting(scene).addObjects();
(window as any).plane = plane;

function animate(t?: number) {
    plane.render();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}
animate();
