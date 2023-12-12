// Import necessary modules from the three.js library
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

// Get DOM elements and set initial state
const canvas = document.getElementById("threejs-canvas");
const button1 = document.getElementById("3d-position1");
const button2 = document.getElementById("3d-position2");
const button3 = document.getElementById("3d-position3");
const button4 = document.getElementById("3d-position4");
const animationState = { isRunning: true };

// Create a GLTFLoader instance for loading 3D models
const loader = new GLTFLoader();

// Define URLs for different 3D tree models
const tree1 = new URL('../photos/donate/stylized_tree.glb', import.meta.url);
const tree2 = new URL('../photos/donate/Birch-Tree.glb', import.meta.url);
const tree3 = new URL('../photos/donate/Evergreen-Tree.glb', import.meta.url);
const tree4 = new URL('../photos/donate/realistic_tree_models_for_games.glb', import.meta.url);

// Create ambient light for the scene
const AmbientLight = new THREE.AmbientLight(0xffffff);

// Set initial parameters for the rounded box geometry
const base = -3, radius0 = 4, smoothness = 0.2;
let line, line1, line2, line3;

// Create a three.js scene, renderer, and camera
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({
	antialias: true,
	canvas: canvas,
	alpha: true,
});

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / 2 / window.innerHeight, 0.1, 1000);

// Set renderer pixel ratio and size
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth / 2, window.innerHeight);

// Add a window resize event listener
window.addEventListener("resize", onWindowResize, false);

// Function to handle window resize events
function onWindowResize() {
	camera.aspect = window.innerWidth / 2 / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth / 2, window.innerHeight);
}

// Set the scene background color
scene.background = new THREE.Color(0x0B110C);

// Add ambient light to the scene
scene.add(AmbientLight);

// Load the first 3D tree model
loader.load(tree1.href, (gltf) => {
	const modele1 = gltf.scene;
	modele1.scale.set(5, 5, 5);
	modele1.position.set(0, base + 7, 0);

	scene.add(modele1);
}, undefined, (error) => {
	console.error(error);
});

// Load the second 3D tree model
loader.load(tree2.href, (gltf) => {
	const modele2 = gltf.scene;
	modele2.scale.set(5, 5, 5);
	modele2.position.set(2, base + 5, 0);

	scene.add(modele2);
}, undefined, (error) => {
	console.error(error);
});

// Load the third 3D tree model
loader.load(tree3.href, (gltf) => {
	const modele3 = gltf.scene;
	modele3.scale.set(2.5, 2.5, 2.5);
	modele3.position.set(2, base + 3, 2);

	scene.add(modele3);
}, undefined, (error) => {
	console.error(error);
});

// Load the fourth 3D tree model
loader.load(tree4.href, (gltf) => {
	const modele4 = gltf.scene;
	modele4.scale.set(0.15, 0.15, 0.15);
	modele4.position.set(0, base + 1, 2);

	scene.add(modele4);
}, undefined, (error) => {
	console.error(error);
});

// Function to set the initial positions of lines in the scene
function lineSet() {
	line.position.y = base + 3;

	line1.position.x = 2;
	line1.position.y = base + 2;

	line2.position.x = 2;
	line2.position.z = 2;
	line2.position.y = base + 1;

	line3.position.y = base;
	line3.position.z = 2;
}

// Function to animate the camera movement
function animateCamera(camera, scene, renderer, startPosition, targetPosition, duration, callback) {
	const startTime = Date.now();

	function animate() {
		const currentTime = Date.now();
		const elapsed = currentTime - startTime;
		const t = Math.min(1, elapsed / 5000);
		const easingT = t * (2 - t);

		// Move the camera position gradually
		camera.position.lerpVectors(startPosition, targetPosition, easingT);
		camera.lookAt(scene.position);
		renderer.render(scene, camera);

		if (t < 1) {
			requestAnimationFrame(animate);
		} else {
			// Execute the callback function after the animation is complete
			if (callback && typeof callback === 'function') {
				callback();
			}
		}
	}

	animate();
}

// Add the the cubes a the eges with there colors
const geometry = new RoundedBoxGeometry(2, 8, 2, radius0, smoothness);
const material = new THREE.MeshBasicMaterial({ color: "rgb(78, 186, 47)" });
const cube = new THREE.Mesh(geometry, material);
cube.position.y = base + 3;
scene.add(cube);

const edges = new THREE.EdgesGeometry(geometry);
line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0xffffff }));

const geometry1 = new RoundedBoxGeometry(2, 6, 2, radius0, smoothness);
const material1 = new THREE.MeshBasicMaterial({ color: "rgb(78, 186, 47)" });
const cube1 = new THREE.Mesh(geometry1, material1);
cube1.position.x = 2;
cube1.position.y = base + 2;
scene.add(cube1);

const edges1 = new THREE.EdgesGeometry(geometry1);
line1 = new THREE.LineSegments(edges1, new THREE.LineBasicMaterial({ color: 0xffffff }));

const geometry2 = new RoundedBoxGeometry(2, 4, 2, radius0, smoothness);
const material2 = new THREE.MeshBasicMaterial({ color: "rgb(78, 186, 47)" });
const cube2 = new THREE.Mesh(geometry2, material2);
cube2.position.x = 2;
cube2.position.z = 2;
cube2.position.y = base + 1;
scene.add(cube2);

const edges2 = new THREE.EdgesGeometry(geometry2);
line2 = new THREE.LineSegments(edges2, new THREE.LineBasicMaterial({ color: 0xffffff }));

const geometry3 = new RoundedBoxGeometry(2, 2, 2, radius0, smoothness);
const material3 = new THREE.MeshBasicMaterial({ color: "rgb(78, 186, 47)" });
const cube3 = new THREE.Mesh(geometry3, material3);
cube3.position.y = base;
cube3.position.z = 2;
scene.add(cube3);

const edges3 = new THREE.EdgesGeometry(geometry3);
line3 = new THREE.LineSegments(edges3, new THREE.LineBasicMaterial({ color: 0xffffff }));

lineSet()
scene.add(line, line1, line2, line3);

// Function to handle the first button click
function edge() {
	// Remove existing lines and set new ones with updated colors
	scene.remove(line, line1, line2, line3);
	line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: "rgb(22, 167, 255)" }));
	line1 = new THREE.LineSegments(edges1, new THREE.LineBasicMaterial({ color: 0xffffff }));
	line2 = new THREE.LineSegments(edges2, new THREE.LineBasicMaterial({ color: 0xffffff }));
	line3 = new THREE.LineSegments(edges3, new THREE.LineBasicMaterial({ color: 0xffffff }));
	lineSet();
	scene.add(line, line1, line2, line3);

	// Manage visibility of tree labels based on the selected tree
	document.getElementById("linden").classList.remove('is-hidden');
	document.getElementById("pine").classList.add('is-hidden');
	document.getElementById("birch").classList.add('is-hidden');
	document.getElementById("oak").classList.add('is-hidden');

	// Disable/enable buttons and initiate camera animation
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

// Functions edge1, edge2, and edge3 follow a similar structure with different tree labels and button controls
// They handle button clicks for different tree options

// Function to handle the second button click
function edge1() {
	// Remove existing lines and set new ones with updated colors
	scene.remove(line, line1, line2, line3);
	line1 = new THREE.LineSegments(edges1, new THREE.LineBasicMaterial({ color: "rgb(22, 167, 255)" }));
	line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0xffffff }));
	line2 = new THREE.LineSegments(edges2, new THREE.LineBasicMaterial({ color: 0xffffff }));
	line3 = new THREE.LineSegments(edges3, new THREE.LineBasicMaterial({ color: 0xffffff }));
	lineSet();
	scene.add(line, line1, line2, line3);

	// Manage visibility of tree labels based on the selected tree
	document.getElementById("linden").classList.add('is-hidden');
	document.getElementById("pine").classList.remove('is-hidden');
	document.getElementById("birch").classList.add('is-hidden');
	document.getElementById("oak").classList.add('is-hidden');

	// Disable/enable buttons and initiate camera animation
	button1.disabled = false;
	button2.disabled = true;
	button3.disabled = false;
	button4.disabled = false;

	animationState.isRunning = false;

	const startPosition = camera.position.clone();
	const targetPosition = new THREE.Vector3(Math.sin(angle) * radius, 8, 10);
	const duration = 5000;

	animateCamera(camera, scene, renderer, startPosition, targetPosition, duration, function () {
		animationState.isRunning = true;
		animate();
	});
}

// Function to handle the third button click
function edge2() {
	// Remove existing lines and set new ones with updated colors
	scene.remove(line, line1, line2, line3);
	line2 = new THREE.LineSegments(edges2, new THREE.LineBasicMaterial({ color: "rgb(22, 167, 255)" }));
	line1 = new THREE.LineSegments(edges1, new THREE.LineBasicMaterial({ color: 0xffffff }));
	line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0xffffff }));
	line3 = new THREE.LineSegments(edges3, new THREE.LineBasicMaterial({ color: 0xffffff }));
	lineSet();
	scene.add(line, line1, line2, line3);

	// Manage visibility of tree labels based on the selected tree
	document.getElementById("linden").classList.add('is-hidden');
	document.getElementById("pine").classList.add('is-hidden');
	document.getElementById("birch").classList.remove('is-hidden');
	document.getElementById("oak").classList.add('is-hidden');

	// Disable/enable buttons and initiate camera animation
	button1.disabled = false;
	button2.disabled = false;
	button3.disabled = true;
	button4.disabled = false;

	animationState.isRunning = false;

	const startPosition = camera.position.clone();
	const targetPosition = new THREE.Vector3(Math.sin(angle) * radius, 8, 10);
	const duration = 5000;

	animateCamera(camera, scene, renderer, startPosition, targetPosition, duration, function () {
		animationState.isRunning = true;
		animate();
	});
}

// Function to handle the fourth button click
function edge3() {
	// Remove existing lines and set new ones with updated colors
	scene.remove(line, line1, line2, line3);
	line3 = new THREE.LineSegments(edges3, new THREE.LineBasicMaterial({ color: "rgb(22, 167, 255)" }));
	line1 = new THREE.LineSegments(edges1, new THREE.LineBasicMaterial({ color: 0xffffff }));
	line2 = new THREE.LineSegments(edges2, new THREE.LineBasicMaterial({ color: 0xffffff }));
	line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0xffffff }));
	lineSet();
	scene.add(line, line1, line2, line3);

	// Manage visibility of tree labels based on the selected tree
	document.getElementById("linden").classList.add('is-hidden');
	document.getElementById("pine").classList.add('is-hidden');
	document.getElementById("birch").classList.add('is-hidden');
	document.getElementById("oak").classList.remove('is-hidden');

	// Disable/enable buttons and initiate camera animation
	button1.disabled = false;
	button2.disabled = false;
	button3.disabled = false;
	button4.disabled = true;

	animationState.isRunning = false;

	const startPosition = camera.position.clone();
	const targetPosition = new THREE.Vector3(Math.sin(angle) * radius, 8, 10);
	const duration = 5000;

	animateCamera(camera, scene, renderer, startPosition, targetPosition, duration, function () {
		animationState.isRunning = true;
		animate();
	});
}

// Set initial camera position
camera.position.z = 10;
camera.position.y = 8;

// Set initial parameters for camera animation
let radius = 10;
let angle = 20;

// Animation loop function
function animate() {
	// Check if the animation is paused
	if (animationState.isRunning == false) return;

	// Request the next animation frame
	requestAnimationFrame(animate);

	// Update camera position based on polar coordinates
	camera.position.x = Math.cos(angle) * radius;
	camera.position.z = Math.sin(angle) * radius;

	// Make the camera look at the center of the scene
	camera.lookAt(scene.position);

	// Increment the angle for continuous animation
	angle += 0.005;

	// Render the scene with the updated camera position
	renderer.render(scene, camera);
}

// Event listeners for buttons triggering different tree views
button1.addEventListener('click', edge);
button2.addEventListener('click', edge1);
button3.addEventListener('click', edge2);
button4.addEventListener('click', edge3);

// Start the initial animation loop
animate();
