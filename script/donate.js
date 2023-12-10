import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
const canvas = document.getElementById("threejs-canvas");
const button1 = document.getElementById("3d-position1");
const button2 = document.getElementById("3d-position2");
const button3 = document.getElementById("3d-position3");
const button4 = document.getElementById("3d-position4");
const animationState = { isRunning: true };
const loader = new GLTFLoader();
const tree1 = new URL('../photos/donate/stylized_tree.glb', import.meta.url);
const tree2 = new URL('../photos/donate/Birch-Tree.glb', import.meta.url);
const tree3 = new URL('../photos/donate/Evergreen-Tree.glb', import.meta.url);
const tree4 = new URL('../photos/donate/realistic_tree_models_for_games.glb', import.meta.url);
const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
const directionalLight1 = new THREE.DirectionalLight(0xffffff, 3);
let line, line1, line2, line3, base = -3;

const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({
	antialias: true,
	canvas: canvas,
	alpha: true,
});

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / 2 / window.innerHeight, 0.1, 1000);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth / 2, window.innerHeight);
window.addEventListener("resize", onWindowResize, false);

function onWindowResize() {
	camera.aspect = window.innerWidth / 2 / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth / 2, window.innerHeight);
}

directionalLight.position.set(5, 5, 5);
directionalLight1.position.set(-5, 5, -5);
scene.add(directionalLight, directionalLight1);


loader.load(tree1.href, (gltf) => {
	const modele1 = gltf.scene;
	modele1.scale.set(5, 5, 5);
	modele1.position.set(0, base + 7, 0);

	scene.add(modele1);
}, undefined, (error) => {
	console.error(error);
});

loader.load(tree2.href, (gltf) => {
	const modele2 = gltf.scene;
	modele2.scale.set(5, 5, 5);
	modele2.position.set(2, base + 5, 0);

	scene.add(modele2);
}, undefined, (error) => {
	console.error(error);
});

loader.load(tree3.href, (gltf) => {
	const modele3 = gltf.scene;
	modele3.scale.set(2.5, 2.5, 2.5);
	modele3.position.set(2, base + 3, 2);

	scene.add(modele3);
}, undefined, (error) => {
	console.error(error);
});

loader.load(tree4.href, (gltf) => {
	const modele4 = gltf.scene;
	modele4.scale.set(0.15, 0.15, 0.15);
	modele4.position.set(0, base + 1, 2)

	scene.add(modele4);
}, undefined, (error) => {
	console.error(error);
});

function animateCamera(camera, scene, renderer, startPosition, targetPosition, duration, callback) {
	const startTime = Date.now();

	function animate() {
		const currentTime = Date.now();
		const elapsed = currentTime - startTime;
		const t = Math.min(1, elapsed / 5000);
		const easingT = t * (2 - t);

		camera.position.lerpVectors(startPosition, targetPosition, easingT);
		camera.lookAt(scene.position);
		renderer.render(scene, camera);

		if (t < 1) {
			requestAnimationFrame(animate);
		} else {
			if (callback && typeof callback === 'function') {
				callback();
			}
		}
	}

	animate();
}

const geometry = new THREE.BoxGeometry(2, 8, 2);
const material = new THREE.MeshBasicMaterial({ color: "rgb(31, 135, 216)" });
const cube = new THREE.Mesh(geometry, material);
cube.position.y = base + 3;
scene.add(cube);

const geometry1 = new THREE.BoxGeometry(2, 6, 2);
const material1 = new THREE.MeshBasicMaterial({ color: "rgb(31, 135, 0)" });
const cube1 = new THREE.Mesh(geometry1, material1);
cube1.position.x = 2;
cube1.position.y = base + 2;
scene.add(cube1);

const geometry2 = new THREE.BoxGeometry(2, 4, 2);
const material2 = new THREE.MeshBasicMaterial({ color: "rgb(31, 0, 216)" });
const cube2 = new THREE.Mesh(geometry2, material2);
cube2.position.x = 2;
cube2.position.z = 2;
cube2.position.y = base + 1;
scene.add(cube2);

const geometry3 = new THREE.BoxGeometry(2, 2, 2);
const material3 = new THREE.MeshBasicMaterial({ color: "rgb(200, 135, 216)" });
const cube3 = new THREE.Mesh(geometry3, material3);
cube3.position.y = base;
cube3.position.z = 2;
scene.add(cube3);

function edge() {
	const edges = new THREE.EdgesGeometry(geometry);
	line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0xffffff }));
	line.position.y = base + 3;
	scene.add(line);
	scene.remove(line1, line2, line3);

	button1.disabled = true;
	button2.disabled = false;
	button3.disabled = false;
	button4.disabled = false;

	animationState.isRunning = false;

	const startPosition = camera.position.clone();
	const targetPosition = new THREE.Vector3(Math.cos(angle) * radius, 8, 10);
	const duration = 5000;

	animateCamera(camera, scene, renderer, startPosition, targetPosition, duration, function () {
		animationState.isRunning = true;
		animate();
	});
}

function edge1() {
	const edges1 = new THREE.EdgesGeometry(geometry1);
	line1 = new THREE.LineSegments(edges1, new THREE.LineBasicMaterial({ color: 0xffffff }));
	line1.position.x = 2;
	line1.position.y = base + 2;

	directionalLight.position.set(2, base + 3.1, 2);

	scene.add(line1, directionalLight);
	scene.remove(line, line2, line3);

	button1.disabled = false;
	button2.disabled = true;
	button3.disabled = false;
	button4.disabled = false;

	animationState.isRunning = false;

	const startPosition = camera.position.clone();
	const targetPosition = new THREE.Vector3(Math.cos(angle) * radius, 8, 10);
	const duration = 5000;

	animateCamera(camera, scene, renderer, startPosition, targetPosition, duration, function () {
		animationState.isRunning = true;
		animate();
	});
}

function edge2() {
	const edges = new THREE.EdgesGeometry(geometry2);
	line2 = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0xffffff }));
	line2.position.x = 2;
	line2.position.z = 2;
	line2.position.y = base + 1;
	scene.add(line2);
	scene.remove(line1, line, line3);

	button1.disabled = false;
	button2.disabled = false;
	button3.disabled = true;
	button4.disabled = false;

	animationState.isRunning = false;

	const startPosition = camera.position.clone();
	const targetPosition = new THREE.Vector3(Math.cos(angle) * radius, 8, 10);
	const duration = 5000;

	animateCamera(camera, scene, renderer, startPosition, targetPosition, duration, function () {
		animationState.isRunning = true;
		animate();
	});
}

function edge3() {
	const edges = new THREE.EdgesGeometry(geometry3);
	line3 = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0xffffff }));
	line3.position.y = base;
	line3.position.z = 2;
	scene.add(line3);
	scene.remove(line1, line2, line);

	button1.disabled = false;
	button2.disabled = false;
	button3.disabled = false;
	button4.disabled = true;

	animationState.isRunning = false;

	const startPosition = camera.position.clone();
	const targetPosition = new THREE.Vector3(Math.cos(angle) * radius, 8, 10);
	const duration = 5000;

	animateCamera(camera, scene, renderer, startPosition, targetPosition, duration, function () {
		animationState.isRunning = true;
		animate();
	});
}

camera.position.z = 10;
camera.position.y = 8;

let radius = 10;
let angle = 20;

function animate() {
	if (animationState.isRunning == false) return;
	requestAnimationFrame(animate);

	camera.position.x = Math.cos(angle) * radius;
	camera.position.z = Math.sin(angle) * radius;

	camera.lookAt(scene.position);

	angle += 0.005;
	renderer.render(scene, camera);
}

button1.addEventListener('click', edge);
button2.addEventListener('click', edge1);
button3.addEventListener('click', edge2);
button4.addEventListener('click', edge3);
animate();