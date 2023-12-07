const canvas = document.getElementById("threejs-canvas");
const button1 = document.getElementById("3d-position1");
const button2 = document.getElementById("3d-position2");
const button3 = document.getElementById("3d-position3");
const button4 = document.getElementById("3d-position4");

const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({
	antialias: true,
	canvas: canvas,
	alpha: true,
});

let line, line1, line2, line3;

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / 2 / window.innerHeight, 0.1, 1000);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth / 2, window.innerHeight);
window.addEventListener("resize", onWindowResize, false);

function onWindowResize() {
	camera.aspect = window.innerWidth / 2 / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize(window.innerWidth / 2, window.innerHeight);
}

const geometry = new THREE.BoxGeometry(2, 8, 2);
const material = new THREE.MeshBasicMaterial({ color: "rgb(31, 135, 216)" });
const cube = new THREE.Mesh(geometry, material);
cube.position.y = 3;

function edge() {
	const edges = new THREE.EdgesGeometry(geometry);
	line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0xffffff }));
	line.position.y = 3;
	scene.add(line);
	scene.remove(line1, line2, line3);
}

const geometry1 = new THREE.BoxGeometry(2, 6, 2);
const material1 = new THREE.MeshBasicMaterial({ color: "rgb(31, 135, 0)" });
const cube1 = new THREE.Mesh(geometry1, material1);
cube1.position.x = 2;
cube1.position.y = 2;

function edge1() {
	const edges1 = new THREE.EdgesGeometry(geometry1);
	line1 = new THREE.LineSegments(edges1, new THREE.LineBasicMaterial({ color: 0xffffff }));
	line1.position.x = 2;
	line1.position.y = 2;
	scene.add(line1);
	scene.remove(line, line2, line3);
}

const geometry2 = new THREE.BoxGeometry(2, 4, 2);
const material2 = new THREE.MeshBasicMaterial({ color: "rgb(31, 0, 216)" });
const cube2 = new THREE.Mesh(geometry2, material2);
cube2.position.x = 2;
cube2.position.z = 2;
cube2.position.y = 1;

function edge2() {
	const edges = new THREE.EdgesGeometry(geometry2);
	line2 = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0xffffff }));
	line2.position.x = 2;
	line2.position.z = 2;
	line2.position.y = 1;
	scene.add(line2);
	scene.remove(line1, line, line3);
}

const geometry3 = new THREE.BoxGeometry(2, 2, 2);
const material3 = new THREE.MeshBasicMaterial({ color: "rgb(200, 135, 216)" });
const cube3 = new THREE.Mesh(geometry3, material3);
cube3.position.y = 0;
cube3.position.z = 2;

function edge3() {
	const edges = new THREE.EdgesGeometry(geometry3);
	line3 = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0xffffff }));
	line3.position.y = 0;
	line3.position.z = 2;
	scene.add(line3);
	scene.remove(line1, line2, line);
}

const axesHelper = new THREE.AxesHelper(100);

scene.add(cube, cube1, cube2, cube3, axesHelper);

camera.position.z = 10;
camera.position.y = 8;

let radius = 10;
let angle = 20;

function animate() {
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