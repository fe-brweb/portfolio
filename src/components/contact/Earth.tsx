"use client";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const variants = cva("", {
  variants: {},
  defaultVariants: {},
});

interface EarthProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof variants> {}

const Earth: React.FC<EarthProps> = ({ className, children }) => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    // SCENE
    const scene = new THREE.Scene();
    const sceneWidth = window.innerWidth;
    const sceneHeight = window.innerHeight;

    // 카메라
    const camera = new THREE.PerspectiveCamera(
      50,
      sceneWidth / sceneHeight,
      0.1,
      1000,
    );
    camera.position.set(0, 0, 500);

    // 렌더링
    let renderer = new THREE.WebGLRenderer({
      alpha: true,
    });
    renderer.setSize(sceneWidth, sceneHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 지구
    const earthTexture = new THREE.TextureLoader().load(
      "/assets/images/earth.jpg",
    );
    const earthGeometry = new THREE.SphereGeometry(100, 32, 16);
    const earthMaterial = new THREE.MeshPhysicalMaterial({
      map: earthTexture,
    });
    let earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
    earthMesh.position.set(-150, 0, 0);
    scene.add(earthMesh);

    // 달
    const moonOrbitRadius = 200;
    const moonTexture = new THREE.TextureLoader().load(
      "/assets/images/moon.jpg",
    );
    const moonGeometry = new THREE.SphereGeometry(25, 32, 16);
    const moonMeterial = new THREE.MeshPhysicalMaterial({
      map: moonTexture,
    });

    let moonMesh = new THREE.Mesh(moonGeometry, moonMeterial);
    scene.add(moonMesh);

    // 파티클
    const particleTexture = new THREE.TextureLoader().load(
      "/assets/images/particle.png",
    );
    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 2000;
    const particlePosition = new Float32Array(particleCount * 3);
    const particleColor = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i++) {
      particlePosition[i] = (Math.random() - 0.5) * 1000;
      particleColor[i] = Math.random() * 30;
    }

    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePosition, 3),
    );

    particleGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(particleColor, 3),
    );

    const particleMaterial = new THREE.PointsMaterial({
      size: 5,
      color: "white",
      sizeAttenuation: true,
      alphaMap: particleTexture,
      transparent: true,
      depthWrite: false,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
    });
    particleMaterial.map = particleTexture;

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    let directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    let sunLight = new THREE.PointLight(0xffffff, 2);
    sunLight.position.set(500, 200, 0);
    sunLight.decay = 1;
    sunLight.power = 1000;
    scene.add(sunLight);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    const clock = new THREE.Clock();

    let speed = 0;
    let cursor = {
      x: 0,
      y: 0,
    };

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      earthMesh.rotation.y = -elapsedTime * 0.5;

      const moonAngle = elapsedTime * 0.5;
      moonMesh.position.x =
        earthMesh.position.x + moonOrbitRadius * Math.cos(moonAngle);
      moonMesh.position.z =
        earthMesh.position.z + moonOrbitRadius * Math.sin(moonAngle);

      const moonX =
        earthMesh.position.x + moonOrbitRadius * Math.cos(moonAngle);
      const moonZ =
        earthMesh.position.z + moonOrbitRadius * Math.sin(moonAngle);
      moonMesh.position.set(moonX, 0, moonZ);
      moonMesh.lookAt(earthMesh.position);

      sunLight.position.set(moonX, 50, moonZ);

      // 카메라 시점 이동
      camera.position.x += (cursor.x * 50 - camera.position.x) * 0.5;
      camera.position.y += (cursor.y * 50 - camera.position.y) * 0.5;
      camera.lookAt(earthMesh.position);

      // controls.update();

      renderer.render(scene, camera);
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (event: MouseEvent) => {
      cursor.x = (event.clientX / window.innerWidth - 0.5) * 2;
      cursor.y = -(event.clientY / window.innerHeight - 0.5) * 2;
    };

    const handleResize = () => {
      console.log("resize");
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    animationFrameRef.current = requestAnimationFrame(animate);

    sceneRef.current?.appendChild(renderer.domElement);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);

      if (animationFrameRef.current)
        cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  return (
    <div ref={sceneRef} className={cn(variants({ className }))}>
      {children}
    </div>
  );
};

export default Earth;
