"use client";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

const ThreeElement = () => {
  const { size } = useThree();

  console.log("size", size);

  const boxRef = useRef<THREE.Mesh>(null);
  const boxCopyRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (boxRef.current) {
      boxRef.current.rotation.x += delta;
      if (boxCopyRef.current) {
        boxCopyRef.current.rotation.copy(boxRef.current.rotation);
      }
    }
  });

  useEffect(() => {
    if (boxCopyRef.current && boxRef.current) {
      boxCopyRef.current.geometry = boxRef.current.geometry;
    }
  }, []);

  return (
    <>
      <directionalLight position={[5, 5, 5]} />
      <group>
        <mesh ref={boxRef} rotation={[0, 0, 0]}>
          <boxGeometry />
          <meshStandardMaterial wireframe />
        </mesh>
        <mesh ref={boxCopyRef}>
          <meshStandardMaterial color="green" />
        </mesh>
        <mesh position={[2, 0, 0]} onClick={() => console.log("onclick")}>
          <boxGeometry />
          <meshBasicMaterial
            color="red"
            visible={true}
            transparent={true}
            opacity={1}
            alphaTest={1}
            depthTest={true}
            depthWrite={false}
            // side={THREE.DoubleSide}
          />
        </mesh>
      </group>
    </>
  );
};

export default ThreeElement;
