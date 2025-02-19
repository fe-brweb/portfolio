"use client";

import React, { Suspense } from "react";
import ThreeElement from "@/components/threejs/ThreeElement";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import ShowRoom from "@/components/threejs/ShowRoom";
import LoadingSpinner from "../ui/LoadingSpinner";
import { Html } from "next/document";

function ThreeContainer() {
  let angle = 0;
  let dis = 2.0;

  return (
    <Canvas
      // orthographic
      camera={{
        position: [dis * Math.sin(angle), 0.8, dis * Math.cos(angle)],
      }}
      gl={{ antialias: false, powerPreference: "high-performance" }}
      dpr={[1, 2]}
    >
      {/* <OrbitControls />
    <axesHelper args={[10]} /> */}
      <gridHelper args={[10, 10]} />
      {/* <ThreeElement /> */}
      <color attach={"background"} args={["#b7f2f1"]} />
      <Suspense
        fallback={
          <mesh>
            <boxGeometry args={[0.1, 0.1, 0.1]} />
            <meshStandardMaterial color="gray" />
          </mesh>
        }
      >
        <ShowRoom />
      </Suspense>
    </Canvas>
  );
}

export default ThreeContainer;
