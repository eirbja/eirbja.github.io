document.addEventListener("DOMContentLoaded", function() {
    const container = document.getElementById("canvas-container");
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    const geometry = new THREE.SphereGeometry(5, 32, 32);
    const vertexShader = `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `;
    const fragmentShader = `
        varying vec2 vUv;
        uniform sampler2D texture;
        void main() {
            gl_FragColor = texture2D(texture, vUv);
        }
    `;
    const texture = new THREE.TextureLoader().load('https://threejs.org/examples/textures/earth_atmos_2048.jpg');
    const material = new THREE.ShaderMaterial({
        uniforms: {
            texture: { value: texture }
        },
        vertexShader,
        fragmentShader
    });
    
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    camera.position.z = 15;

    function animate() {
        requestAnimationFrame(animate);
        sphere.rotation.x += 0.01;
        sphere.rotation.y += 0.01;
        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener("resize", function() {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    });
});
