import { OrbitControls } from 'https://unpkg.com/three/examples/jsm/controls/OrbitControls.js';
import { RGBELoader } from 'https://unpkg.com/three@0.162.0/examples/jsm/loaders/RGBELoader.js';
import { EXRLoader } from 'https://unpkg.com/three@0.162.0/examples/jsm/loaders/EXRLoader.js';

const scene = new THREE.Scene();
// scene.background = new THREE.Color(0xbdbfbf);
scene.rotation.y = Math.PI / 2;

const aspectRatio = window.innerWidth / window.innerHeight;
const cameraWidth = 150;
const cameraHeight = cameraWidth / aspectRatio;

const camera = new THREE.PerspectiveCamera(25, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(350, 350, 350);
camera.lookAt(0, 10, 0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

const AmbientLight = new THREE.AmbientLight(0x404040, 0.3);
AmbientLight.position.set(0, 0, 0);
scene.add(AmbientLight);
camera.position.z = 5;

const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1);
directionalLight.position.set(-30, 120, 30);
directionalLight.castShadow = true;
scene.add(directionalLight);

const pmremGenerator = new THREE.PMREMGenerator(renderer);



const loader = new THREE.TextureLoader();

function createSun() {
    const sun = new THREE.Group();

    const geometry1 = new THREE.SphereGeometry(80, 28, 32);
    const material1 = new THREE.MeshStandardMaterial({
        map: loader.load('sun.png'),
        metalness: 1,
        emissive: 0xffca0a,
        emissiveIntensity: 0.5
    });
    const main = new THREE.Mesh(geometry1, material1);
    sun.add(main);

    const hdriLoader = new RGBELoader()
    hdriLoader.load('http://127.0.0.1:5500/environment.hdr', function (texture) {
        const envMap = pmremGenerator.fromEquirectangular(texture).texture;
        texture.dispose();
        material1.envMap = envMap
    });

    const light = new THREE.PointLight(0xffca0a, 2, 0, 1);
    sun.add(light);

    return sun;
}

function createMercury() {
    const mercury = new THREE.Group();

    const geometry1 = new THREE.SphereGeometry(1, 64, 32);
    const material1 = new THREE.MeshStandardMaterial({
        map: loader.load('mercury.webp')
    });
    const main = new THREE.Mesh(geometry1, material1);
    mercury.add(main);

    return mercury;
}

function createVenus() {
    const venus = new THREE.Group();

    const geometry1 = new THREE.SphereGeometry(3, 64, 32);
    const material1 = new THREE.MeshStandardMaterial({
        map: loader.load('venus.jpg')
    });
    const main = new THREE.Mesh(geometry1, material1);
    venus.add(main);

    return venus;
}

function createEarth() {
    const earth = new THREE.Group();

    const geometry1 = new THREE.SphereGeometry(4, 64, 32);
    const material1 = new THREE.MeshStandardMaterial({
        map: loader.load('earth.jpg')
    });
    const main = new THREE.Mesh(geometry1, material1);
    earth.add(main);

    return earth;
}

function createMars() {
    const mars = new THREE.Group();

    const geometry1 = new THREE.SphereGeometry(2.5, 64, 32);
    const material1 = new THREE.MeshStandardMaterial({
        map: loader.load('mars.jpg')
    });
    const main = new THREE.Mesh(geometry1, material1);
    mars.add(main);

    return mars;
}

function createJupiter() {
    const jupiter = new THREE.Group();

    const geometry1 = new THREE.SphereGeometry(14, 64, 32);
    const material1 = new THREE.MeshStandardMaterial({
        map: loader.load('jupiter.jpg'),
        metalness: 0.3
    });
    const main = new THREE.Mesh(geometry1, material1);
    jupiter.add(main);

    return jupiter;
}

function createSaturn() {
    const saturn = new THREE.Group();

    const geometry1 = new THREE.SphereGeometry(13, 64, 32);
    const material1 = new THREE.MeshStandardMaterial({
        map: loader.load('saturn.jfif'),
        metalness: 0.3
    });
    const main = new THREE.Mesh(geometry1, material1);
    saturn.add(main);

    const geometry2 = new THREE.TorusGeometry(22, 3, 2, 100);
    const material2 = new THREE.MeshStandardMaterial({
        metalness: 1
    })
    const ring = new THREE.Mesh(geometry2, material2);
    ring.rotation.x = Math.PI / 2;
    saturn.add(ring);

    return saturn;
}

function createUranus() {
    const uranus = new THREE.Group();

    const geometry1 = new THREE.SphereGeometry(6, 64, 32);
    const material1 = new THREE.MeshStandardMaterial({
        map: loader.load('uranus.webp'),
        metalness: 0.3
    });
    const main = new THREE.Mesh(geometry1, material1);
    uranus.add(main);

    return uranus;
}

function createNeptune() {
    const neptune = new THREE.Group();

    const geometry1 = new THREE.SphereGeometry(6, 64, 32);
    const material1 = new THREE.MeshStandardMaterial({
        map: loader.load('neptune.jpg'),
        metalness: 0.3
    });
    const main = new THREE.Mesh(geometry1, material1);
    neptune.add(main);

    return neptune;
}

function createSolarSystem() {
    const solarSystem = new THREE.Group();


    const sun = createSun();
    solarSystem.add(sun);

    const mercury = createMercury();
    mercury.position.set(-100, 0, 0);
    solarSystem.add(mercury);

    const venus = createVenus();
    venus.position.set(-110, 0, 0);
    solarSystem.add(venus);

    const earth = createEarth();
    earth.position.set(-130, 0, 0);
    solarSystem.add(earth);

    const mars = createMars();
    mars.position.set(-150, 0, 0);
    solarSystem.add(mars);

    const jupiter = createJupiter();
    jupiter.position.set(-200, 0, 0);
    solarSystem.add(jupiter);

    const saturn = createSaturn();
    saturn.position.set(-260, 0, 0);
    solarSystem.add(saturn);

    const uranus = createUranus();
    uranus.position.set(-320, 0, 0);
    solarSystem.add(uranus);

    const neptune = createNeptune();
    neptune.position.set(-350, 0, 0);
    solarSystem.add(neptune);

    return solarSystem;
}

const solarSystem = createSolarSystem();
solarSystem.position.set(150, 0, 0);
scene.add(solarSystem);

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    controls.update();
}
animate();