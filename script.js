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

var celestialBodies = [];

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
    hdriLoader.load('environment.hdr', function (texture) {
        const envMap = pmremGenerator.fromEquirectangular(texture).texture;
        texture.dispose();
        material1.envMap = envMap
    });

    const light = new THREE.PointLight(0xffca0a, 2, 0, 1);
    sun.add(light);

    celestialBodies.push(sun);

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

    celestialBodies.push(mercury)

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

    celestialBodies.push(venus)

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

    celestialBodies.push(earth)

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

    celestialBodies.push(mars)

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

    celestialBodies.push(jupiter)

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

    celestialBodies.push(saturn)

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

    celestialBodies.push(uranus)

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

    celestialBodies.push(neptune)

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

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

const popup = $("#popup");
const closeBtn = $("#close");
const content = $("#text");
const title = $("#name");

closeBtn.click(function () {
    popup.css("display", "none");
})

const data = [
    {
        name: "Sun",
        text: "The star at the center of our solar system, providing light, heat, and energy for life on Earth."
    },

    {
        name: "Mercury",
        text: "The smallest planet, closest to the Sun, with extreme temperature variations between its scorching days and freezing nights."
    },

    {
        name: "Venus",
        text: "Known as Earth's 'sister planet', Venus has a thick, toxic atmosphere and is the hottest planet in our solar system due to its greenhouse effect."
    },

    {
        name: "Earth",
        text: "The only known planet with life, characterized by its diverse ecosystems, abundant water, and unique atmosphere."
    },

    {
        name: "Mars",
        text: "The 'Red Planet', with a thin atmosphere and surface features including vast deserts, polar ice caps, and evidence of ancient water."
    },

    {
        name: "Jupiter",
        text: "The largest planet, famous for its swirling clouds and the Great Red Spot, a giant storm that has raged for centuries."
    },

    {
        name: "Saturn",
        text: " Known for its stunning rings made of ice and rock particles, Saturn is a gas giant with numerous moons and a complex magnetic field."
    },

    {
        name: "Uranus",
        text: "A gas giant with a unique feature - its axis of rotation is tilted sideways, causing extreme seasons and unusual magnetic field behavior."
    },

    {
        name: "Neptune",
        text: "The farthest known planet from the Sun, Neptune is a blue gas giant with strong winds and a dynamic atmosphere, including the fastest winds in the solar system."
    }
]

window.addEventListener('click', onClick, false);

function onClick(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(celestialBodies, true);

    if (intersects.length > 0) {
        for (let i = 0; i < intersects.length; i++) {

            console.log(intersects[i].object);

            const intersectedObject = intersects[i].object;

            const index = celestialBodies.indexOf(intersectedObject.parent);

            const planetData = data[index];

            const planetPosition = new THREE.Vector3();
            intersectedObject.getWorldPosition(planetPosition);

            const radius = intersectedObject.geometry.parameters.radius;

            const direction = new THREE.Vector3().subVectors(camera.position, planetPosition).normalize();

            const distance = radius * 6;

            const newPosition = planetPosition.clone().add(direction.multiplyScalar(distance));

            const tween = new TWEEN.Tween(camera.position).to(newPosition, 1000);
            tween.easing(TWEEN.Easing.Quadratic.Out);
            tween.start();

            const lookAtTween = new TWEEN.Tween(controls.target).to(planetPosition, 1000);
            lookAtTween.easing(TWEEN.Easing.Quadratic.Out);
            lookAtTween.start();

            popup.css("display", "block");
            title.text(planetData.name);
            content.text(planetData.text);
        }
    }
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    controls.update();
    TWEEN.update();
}
animate();
