// Wait for the DOM to fully load before executing our code.
document.addEventListener("DOMContentLoaded", function() {

    // ================================
    // Three.js setup
    // ================================

    // Get the container for Three.js canvas.
    const container = document.getElementById("canvas-container");
  
    // Create a new Three.js scene.
    const scene = new THREE.Scene();
  
    // Set up the camera with a field-of-view of 75, an aspect ratio based on the window size,
    // and near/far clipping planes.
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
  
    // Create the WebGL renderer and set its size to fill the window.
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
  
    // Append the renderer's canvas element to our container.
    container.appendChild(renderer.domElement);
  
    // Create a clock for time for our animation.
    const clock = new THREE.Clock();
  
    // ================================
    // Shader Material Setup
    // ================================
  
    // Vertex shader with a custom position variation.
    const vertexShader = `
      // A helper function that generates a pseudo-random 2D vector from a 2D input.
      vec2 hash(vec2 p) {
          p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
          return -1.0 + 2.0 * fract(sin(p) * 0.001);
      }
      
      // Uniform variable for passing in time.
      uniform float time;
      
      // Varying variable to pass the computed normal to the fragment shader (if needed).
      varying vec3 vNormal;
      
      void main() {
          // Compute the normal in view space.
          vNormal = normalize(normalMatrix * normal);
          
          // Calculate an offset based on the normal and time.
          vec2 offset = hash(vNormal.xy + time * 0.001);
          
          // Modify the vertex position by adding a small offset and sine-based variations.
          vec3 newPosition = position 
            + 0.25 * vec3(offset * 0.02, 0.0) 
            + sin(time + position.x) * 2.0 
            + sin(time + position.y) * 0.5;
          
          // Compute the final position of the vertex.
          gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
      }
    `;

    // Fragment Shader
    const fragmentShader = `
varying vec3 vNormal;

void main() {
    vec3 blueColor = vec3(30.0 / 256.0, 70.0 / 256.0, 140.0 / 256.0);
    vec3 whiteColor = vec3(1.0, 1.0, 1.0);

    // Normalize the normal vector.
    vec3 normal = normalize(vNormal);

    // Just the Z-axis.
    vec3 viewDirection = vec3(0.0, 0.0, 1.0); 

    // Calculate the dot product between the normal and the view direction to get a scalar.
    //range is [-1, 1]
    float dotProduct = dot(normal, viewDirection);

    // Map the dot product to the range [0, 1] for interpolation.
    float mixFactor = (dotProduct + 1.0) * 0.25;

    // Interpolate between the blue and white colors based on the mix factor.
    vec3 finalColor = mix(blueColor, whiteColor, mixFactor);
    gl_FragColor = vec4(finalColor, 1.0);
}
    `;
  
    // Create a ShaderMaterial using the custom vertex shader and a simple uniform for time.
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        time: { value: 0.0 }
      },
      wireframe: true  // Render the geometry as a wireframe.
    });
  
    // Create a sphere geometry with a radius of 4 and a detailed mesh (40 segments each for width and height).
    const geometry = new THREE.SphereGeometry(4, 40, 40);
  
    // Create a mesh by combining the geometry and the custom shader material.
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);  // Add the sphere to the scene.
  
    // Position the camera so that the sphere is visible.
    camera.position.z = 15;
  
    // ================================
    // Animation Loop
    // ================================
  
    function animate() {
      // Request the next frame.
      requestAnimationFrame(animate);
  
      // Update the uniform time value.
      material.uniforms.time.value = clock.getElapsedTime();
  
      // Slowly rotate the sphere.
      sphere.rotation.x += 0.003;
      sphere.rotation.y += 0.003;
  
      // Render the scene from the perspective of the camera.
      renderer.render(scene, camera);
    }
  
    // Start the animation loop.
    animate();
  
    // Adjust the renderer and camera when the window is resized.
    window.addEventListener("resize", function() {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    });
  });
  