document.addEventListener("DOMContentLoaded", function() {
    const container = document.getElementById("canvas-container");
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    const clock = new THREE.Clock();
    

    const vertexShader = `
    vec2 hash(vec2 p) {
        p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
        return -1.0 + 2.0 * fract(sin(p) * 0.001);
    }
    
    uniform float time;
    varying vec3 vNormal;
    
    void main() {
        vNormal = normalize(normalMatrix * normal);
        
        // Call hash with some position or normal to affect your position variation
        vec2 offset = hash(vNormal.xy + time*0.001); 
        
        // Adjust newPosition based on the offset, here x and y are affected
        vec3 newPosition = position + 0.25*vec3(offset * 0.1, 0.0) + sin(time + position.x)*2.0 +sin(time + position.y)*0.1; // Scale as needed
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    }
`;
 
    const material = new THREE.ShaderMaterial({
        vertexShader,
        uniforms: {
            time: { value: 0.0 }
        },
        wireframe: true
    });

    const geometry = new THREE.SphereGeometry(4, 40, 40);
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    camera.position.z = 15;

    function animate() {
        requestAnimationFrame(animate);
        material.uniforms.time.value = clock.getElapsedTime();
        sphere.rotation.x += 0.005;
        sphere.rotation.y += 0.005;
        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener("resize", function() {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    });
});
