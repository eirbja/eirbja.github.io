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
          return -1.0 + 2.0 * fract(sin(p) * 43758.5453);
      }

      // Function for smooth noise.
      float smoothNoise(vec2 p) {
          vec2 i = floor(p);
          vec2 f = fract(p);
          vec2 u = f * f * (3.0 - 2.0 * f); // Smoothstep interpolation

          // Get random values at the corners of the grid cell
          float a = dot(hash(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0));
          float b = dot(hash(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0));
          float c = dot(hash(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0));
          float d = dot(hash(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0));

          // Interpolate between the corners
          return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
      }

      // Variable for change time.
      uniform float time;

      // Normal to the vertex.
      varying vec3 vNormal;
      varying float vNoiseFactor; // Added varying for noise intensity

      void main() {
          // Compute the normal in view space.
          vNormal = normalize(normalMatrix * normal);

          // Add smooth noise for more pronounced but smooth jitter.
          float noise = smoothNoise(vNormal.xy * 3.0);
          vNoiseFactor = abs(noise); // Calculate the absolute noise intensity (0 to 1)

          vec3 newPosition = position 
<<<<<<< Updated upstream
            + 0.25 * vec3(offset * 0.1, 0.0) 
            + sin(time + position.x) * 2.0 
            + sin(time + position.y) * 0.1;
          
=======
            + sin(time + position.x) * 2.0 
            + sin(time + position.y) * 0.1
            + noise * 0.3; // Add smooth noise for smoother jitter

>>>>>>> Stashed changes
          // Compute the final position of the vertex.
          gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
      }
    `;

<<<<<<< Updated upstream
      // Fragment Shader
      const fragmentShader = `
      varying vec3 vNormal;
      void main() {
          // Set the color of the sphere
          vec3 color = vec3(1, 1, 1);
          gl_FragColor = vec4(color * abs(normalize(vNormal)), 1.0);
=======
    // Fragment Shader
    const fragmentShader = `
      varying vec3 vNormal;

      void main() {
          vec3 baseColor = vec3(240.0 / 256.0, 30.0 / 256.0, 10.0 / 256.0);
          vec3 secondColor = vec3(1.0, 1.0, 0.0);

          // Normalize the normal vector.
          vec3 normal = normalize(vNormal);

          // Just the Z-axis.
          vec3 viewDirection = vec3(0.0, 0.0, 1.0); 

          // Calculate the dot product between the normal and the view direction to get a scalar.
          //range is [-1, 1]
          float dotProduct = dot(normal, viewDirection);

          // Map the dot product to the range [0, 1] for interpolation.
          float mixFactor = (dotProduct + 1.0) * 0.18;

          // Interpolate between the blue and white colors based on the mix factor.
          vec3 finalColor = mix(baseColor, secondColor, mixFactor);
          gl_FragColor = vec4(finalColor, 1.0);
>>>>>>> Stashed changes
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
  