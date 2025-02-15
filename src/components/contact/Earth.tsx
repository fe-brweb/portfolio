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
    const scene = new THREE.Scene();
    const sceneWidth = window.innerWidth;
    const sceneHeight = window.innerHeight;

    const camera = new THREE.PerspectiveCamera(
      50,
      sceneWidth / sceneHeight,
      0.1,
      1000,
    );

    camera.position.set(0, 0, 500);

    let renderer = new THREE.WebGLRenderer({
      alpha: true,
    });
    renderer.setSize(sceneWidth, sceneHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const earthTexture = new THREE.TextureLoader().load(
      "/assets/images/earth.jpg",
    );
    const earthGeometry = new THREE.SphereGeometry(100, 64, 32);
    const earthMaterial = new THREE.MeshPhysicalMaterial({
      map: earthTexture,
    });
    let earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
    earthMesh.position.set(-150, 0, 0);
    scene.add(earthMesh);

    const moonOrbitRadius = 200;
    const moonTexture = new THREE.TextureLoader().load(
      "/assets/images/moon.jpg",
    );
    const moonGeometry = new THREE.SphereGeometry(27, 32, 16);
    const moonMeterial = new THREE.MeshPhysicalMaterial({
      map: moonTexture,
    });

    let moonMesh = new THREE.Mesh(moonGeometry, moonMeterial);
    scene.add(moonMesh);

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

    const colock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = colock.getElapsedTime();
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
      renderer.render(scene, camera);
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      renderer.setSize(sceneWidth, sceneHeight);
      camera.aspect = sceneWidth / sceneHeight;
      camera.updateProjectionMatrix();
    };

    window.addEventListener("resize", handleResize);
    animationFrameRef.current = requestAnimationFrame(animate);
    sceneRef.current?.appendChild(renderer.domElement);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameRef.current)
        cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  return (
    <div ref={sceneRef} className={cn(variants({ className }), "bg-primary")}>
      {children}
    </div>
  );
};

export default Earth;
