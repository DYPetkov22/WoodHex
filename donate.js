const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('threejs-canvas') });

renderer.setSize(window.innerWidth, window.innerHeight);

const geometry = new THREE.BoxGeometry(2, 8, 2);
const material = new THREE.MeshBasicMaterial({ color: "rgb(31, 135, 216)" });
const cube = new THREE.Mesh(geometry, material);
cube.position.y = 3;

const geometry1 = new THREE.BoxGeometry(2, 6, 2);
const material1 = new THREE.MeshBasicMaterial({ color: "rgb(31, 135, 0)" });
const cube1 = new THREE.Mesh(geometry1, material1);
cube1.position.x = 2;
cube1.position.y = 2;

const geometry2 = new THREE.BoxGeometry(2, 4, 2);
const material2 = new THREE.MeshBasicMaterial({ color: "rgb(31, 0, 216)" });
const cube2 = new THREE.Mesh(geometry2, material2);
cube2.position.x = 2;
cube2.position.z = 2;
cube2.position.y = 1;

const geometry3 = new THREE.BoxGeometry(2, 2, 2);
const material3 = new THREE.MeshBasicMaterial({ color: "rgb(200, 135, 216)" });
const cube3 = new THREE.Mesh(geometry3, material3);
cube3.position.y = 0;
cube3.position.z = 2;

const axesHelper = new THREE.AxesHelper(100);

scene.add(cube, cube1, cube2, cube3, axesHelper);

camera.position.z = 10;
camera.position.y = 10;

let radius = 10;
let angle = 20;

function animate() {
	requestAnimationFrame(animate);

	camera.position.x = Math.cos(angle) * radius;
	camera.position.z = Math.sin(angle) * radius;

	camera.lookAt(scene.position);

	angle += 0.01;
	renderer.render(scene, camera);
}

animate();
