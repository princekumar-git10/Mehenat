import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

function SphereScene() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    // ======================================================
    // SCENE
    // ======================================================

    const scene = new THREE.Scene();

    scene.background = null;

    // ======================================================
    // CAMERA
    // ======================================================

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );

    camera.position.set(0, 0, 7);

    // ======================================================
    // RENDERER
    // ======================================================

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });

    renderer.setSize(
      window.innerWidth,
      window.innerHeight
    );

    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio, 2)
    );

    renderer.setClearColor(0x000000, 0);

    container.appendChild(renderer.domElement);

    // ======================================================
    // SPHERE GEOMETRY
    // ======================================================

    const geometry = new THREE.SphereGeometry(
      0.7,
      64,
      64
    );

    // ======================================================
    // TEXTURE LOADER
    // ======================================================

    const textureLoader = new THREE.TextureLoader();

    // ======================================================
    // TEXTURES
    // ======================================================

    const texture1 = textureLoader.load(
      "/images/ChatGPT Image Aug 30, 2026 at 02_02_55 PM.png" // done
    );

    const texture2 = textureLoader.load(
      "/images/ChatGPT Image Feb 25, 2026 at 07_36_22 PM-2.png" // done
    );

    const texture3 = textureLoader.load(
      "/images/32.png" // done
    );

    const texture4 = textureLoader.load(
      "images/Screenshot 2026-09-05 at 4.57.13 PM.png" // done
    );

    const texture5 = textureLoader.load(
      "images/Screenshot 2026-09-27 at 1.04.13 PM.png" // done 
    );

    const texture6 = textureLoader.load(
      "/images/WhatsApp Image 2026-09-12 at 12.33.32.jpeg" //done
    );

    // ======================================================
    // MATERIAL CREATOR
    // ======================================================

    const createMaterial = (texture) => {
      return new THREE.MeshStandardMaterial({
        map: texture,
        roughness: 0.25,
        metalness: 0.1,
      });
    };

    // ======================================================
    // MATERIALS
    // ======================================================

    const material1 = createMaterial(texture1);
    const material2 = createMaterial(texture2);
    const material3 = createMaterial(texture3);
    const material4 = createMaterial(texture4);
    const material5 = createMaterial(texture5);
    const material6 = createMaterial(texture6);

    // ======================================================
    // SPHERE 1
    // ======================================================

    const sphere1 = new THREE.Mesh(
      geometry,
      material1
    );

    sphere1.position.set(0, 0, 0);

    sphere1.scale.set(
      1.3,
      1.3,
      1.3
    );

    scene.add(sphere1);

    // ======================================================
    // SPHERE 2
    // ======================================================

    const sphere2 = new THREE.Mesh(
      geometry,
      material2
    );

    sphere2.position.set(
      -2,
      1.2,
      -0.5
    );

    sphere2.scale.set(
      0.55,
      0.55,
      0.55
    );

    scene.add(sphere2);

    // ======================================================
    // SPHERE 3
    // ======================================================

    const sphere3 = new THREE.Mesh(
      geometry,
      material3
    );

    sphere3.position.set(
      2,
      1.3,
      -1
    );

    sphere3.scale.set(
      0.35,
      0.35,
      0.35
    );

    scene.add(sphere3);

    // ======================================================
    // SPHERE 4
    // ======================================================

    const sphere4 = new THREE.Mesh(
      geometry,
      material4
    );

    sphere4.position.set(
      2,
      -1.2,
      0
    );

    sphere4.scale.set(
      0.7,
      0.7,
      0.7
    );

    scene.add(sphere4);

    // ======================================================
    // SPHERE 5
    // ======================================================

    const sphere5 = new THREE.Mesh(
      geometry,
      material5
    );

    sphere5.position.set(
      -2,
      -1.3,
      -0.5
    );

    sphere5.scale.set(
      0.4,
      0.4,
      0.4
    );

    scene.add(sphere5);

    // ======================================================
    // SPHERE 6
    // ======================================================

    const sphere6 = new THREE.Mesh(
      geometry,
      material6
    );

    sphere6.position.set(
      0.8,
      2,
      -1
    );

    sphere6.scale.set(
      0.25,
      0.25,
      0.25
    );

    scene.add(sphere6);

    // ======================================================
    // LIGHT 1
    // ======================================================

    const light1 = new THREE.DirectionalLight(
      0xffffff,
      4
    );

    light1.position.set(
      3,
      3,
      5
    );

    scene.add(light1);

    // ======================================================
    // LIGHT 2 - BLUE
    // ======================================================

    const light2 = new THREE.PointLight(
      0x168cff,
      15,
      10
    );

    light2.position.set(
      -3,
      1,
      3
    );

    scene.add(light2);

    // ======================================================
    // LIGHT 3 - WARM
    // ======================================================

    const light3 = new THREE.PointLight(
      0xff9b6b,
      5,
      12
    );

    light3.position.set(
      4,
      -2,
      2
    );

    scene.add(light3);

    // ======================================================
    // AMBIENT LIGHT
    // ======================================================

    const ambientLight = new THREE.AmbientLight(
      0xffffff,
      0.4
    );

    scene.add(ambientLight);

    // ======================================================
    // PARTICLES
    // ======================================================

    const particleCount = 180;

    const particleGeometry =
      new THREE.BufferGeometry();

    const particlePositions =
      new Float32Array(
        particleCount * 3
      );

    for (
      let i = 0;
      i < particleCount;
      i++
    ) {
      particlePositions[i * 3] =
        (Math.random() - 0.5) * 18;

      particlePositions[i * 3 + 1] =
        (Math.random() - 0.5) * 12;

      particlePositions[i * 3 + 2] =
        -2 - Math.random() * 8;
    }

    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(
        particlePositions,
        3
      )
    );

    const particleMaterial =
      new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.025,
        transparent: true,
        opacity: 0.32,
        depthWrite: false,
      });

    const particles =
      new THREE.Points(
        particleGeometry,
        particleMaterial
      );

    scene.add(particles);

    // ======================================================
    // ORBIT CONTROLS
    // ======================================================

    const controls = new OrbitControls(
      camera,
      renderer.domElement
    );

    controls.enableDamping = true;

    controls.dampingFactor = 0.05;

    controls.enableZoom = true;

    controls.autoRotate = false;

    // ======================================================
    // ANIMATION
    // ======================================================

    let time = 0;

    let animationId;

    function animate() {
      animationId =
        requestAnimationFrame(animate);

      time += 0.01;

      // ==================================================
      // SELF ROTATION
      // ==================================================

      sphere1.rotation.y += 0.010;
      sphere1.rotation.x += 0.003;

      sphere2.rotation.y += 0.015;
      sphere2.rotation.x += 0.005;

      sphere3.rotation.y += 0.008;
      sphere3.rotation.z += 0.004;

      sphere4.rotation.y += 0.012;
      sphere4.rotation.x += 0.004;

      sphere5.rotation.y += 0.018;
      sphere5.rotation.z += 0.006;

      sphere6.rotation.y += 0.010;
      sphere6.rotation.x += 0.007;

      // ==================================================
      // FLOATING
      // ==================================================

      sphere1.position.y =
        Math.sin(time) * 0.08;

      sphere2.position.y =
        1.2 +
        Math.sin(time * 1.3) * 0.15;

      sphere3.position.y =
        1.3 +
        Math.sin(time * 0.8) * 0.12;

      sphere4.position.y =
        -1.2 +
        Math.sin(time * 1.1) * 0.10;

      sphere5.position.y =
        -1.3 +
        Math.sin(time * 1.5) * 0.12;

      sphere6.position.y =
        2 +
        Math.sin(time * 0.7) * 0.15;

      // ==================================================
      // PARTICLES
      // ==================================================

      particles.rotation.y += 0.00015;

      particles.rotation.x += 0.00005;

      // ==================================================
      // WARM LIGHT MOVEMENT
      // ==================================================

      light3.position.x =
        4 +
        Math.sin(time * 0.4) * 2;

      light3.position.y =
        -2 +
        Math.cos(time * 0.3);

      // ==================================================
      // BLUE LIGHT MOVEMENT
      // ==================================================

      light2.position.x =
        -3 +
        Math.sin(time * 0.25) * 1.5;

      // ==================================================
      // CONTROLS
      // ==================================================

      controls.update();

      // ==================================================
      // RENDER
      // ==================================================

      renderer.render(
        scene,
        camera
      );
    }

    animate();

    // ======================================================
    // RESIZE
    // ======================================================

    const handleResize = () => {
      camera.aspect =
        window.innerWidth /
        window.innerHeight;

      camera.updateProjectionMatrix();

      renderer.setSize(
        window.innerWidth,
        window.innerHeight
      );

      renderer.setPixelRatio(
        Math.min(
          window.devicePixelRatio,
          2
        )
      );
    };

    window.addEventListener(
      "resize",
      handleResize
    );

    // ======================================================
    // CLEANUP
    // ======================================================

    return () => {
      cancelAnimationFrame(animationId);

      window.removeEventListener(
        "resize",
        handleResize
      );

      controls.dispose();

      geometry.dispose();

      material1.dispose();
      material2.dispose();
      material3.dispose();
      material4.dispose();
      material5.dispose();
      material6.dispose();

      particleGeometry.dispose();
      particleMaterial.dispose();

      renderer.dispose();

      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(
          renderer.domElement
        );
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="sphere-container"
    />
  );
}

export default SphereScene;