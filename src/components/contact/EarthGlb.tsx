"use client";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const variants = cva("", {
  variants: {},
  defaultVariants: {},
});

interface EarthGlbProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof variants> {}

const EarthGlb: React.FC<EarthGlbProps> = ({ className, children }) => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    // SCENE
    const scene = new THREE.Scene();
    const sceneWidth = window.innerWidth;
    const sceneHeight = window.innerHeight;

    // 카메라
    const camera = new THREE.PerspectiveCamera(
      45,
      sceneWidth / sceneHeight,
      0.1,
      1000,
    );
    camera.position.set(0, 0, 500);

    // 렌더러
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
    });
    renderer.setSize(sceneWidth, sceneHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // GLTFLoader 생성
    const loader = new GLTFLoader();

    // 지구 모델 로드
    let earthGlb: THREE.Group | undefined;
    loader.load("/assets/images/earth.glb", (gltf) => {
      earthGlb = gltf.scene;
      earthGlb.scale.set(10, 10, 10);
      scene.add(earthGlb);
    });

    // 달 모델 로드
    let moonGlb: THREE.Group | undefined;
    const moonOrbitRadius = 200;
    loader.load("/assets/images/moon.glb", (gltf) => {
      moonGlb = gltf.scene;
      moonGlb.scale.set(0.2, 0.2, 0.2);
      scene.add(moonGlb);
    });

    // 파티클 설정
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

    // 조명 설정
    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    const sunLight = new THREE.PointLight(0xffffff, 2);
    sunLight.position.set(500, 200, 0);
    sunLight.decay = 1;
    sunLight.power = 1000;
    scene.add(sunLight);

    const clock = new THREE.Clock();

    // 마우스 커서에 따른 카메라 이동용 변수
    const cursor = { x: 0, y: 0 };

    // 화면 크기에 따른 카메라의 lookAt 대상 계산 함수
    const getCameraTarget = () => {
      return window.innerWidth > window.innerHeight
        ? new THREE.Vector3(150, 0, 0)
        : new THREE.Vector3(0, -50, 0);
    };

    // 달의 위치 계산 함수 (지구 기준)
    const getMoonPosition = (earthPos: THREE.Vector3, angle: number) => {
      const x = earthPos.x + moonOrbitRadius * Math.cos(angle);
      const z = earthPos.z + moonOrbitRadius * Math.sin(angle);
      return new THREE.Vector3(x, 0, z);
    };

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      if (earthGlb) {
        // 지구 자전
        earthGlb.rotation.y = -elapsedTime * 0.5;
        camera.lookAt(getCameraTarget());
      }

      // 파티클 공전
      particles.rotation.y = elapsedTime * 0.1;
      particles.rotation.x = elapsedTime * 0.1;

      // 달 공전
      if (earthGlb && moonGlb) {
        const moonAngle = elapsedTime * 0.5;
        const newMoonPos = getMoonPosition(earthGlb.position, moonAngle);
        moonGlb.position.copy(newMoonPos);
        moonGlb.lookAt(earthGlb.position);
        sunLight.position.set(newMoonPos.x, 50, newMoonPos.z);
      }

      // 커서에 따른 카메라 이동
      camera.position.x += (cursor.x * 50 - camera.position.x) * 0.5;
      camera.position.y += (cursor.y * 50 - camera.position.y) * 0.5;

      renderer.render(scene, camera);
      sceneRef.current?.appendChild(renderer.domElement);
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (event: MouseEvent) => {
      cursor.x = (event.clientX / window.innerWidth - 0.5) * 2;
      cursor.y = -(event.clientY / window.innerHeight - 0.5) * 2;
    };

    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.lookAt(getCameraTarget());
      camera.updateProjectionMatrix();
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    animationFrameRef.current = requestAnimationFrame(animate);

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

export default EarthGlb;
