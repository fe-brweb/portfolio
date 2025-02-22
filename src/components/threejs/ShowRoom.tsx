import { CameraControls, ContactShadows } from "@react-three/drei";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default function ShowRoom() {
  const { raycaster, scene } = useThree();
  const cameraControlsRef = useRef<CameraControls>(null!);
  const gltf = useLoader(GLTFLoader, "./models/woody.glb");

  scene.scale.set(0.1, 0.1, 0.1);
  const [isFitting, setIsFitting] = useState(false);

  useEffect(() => {
    cameraControlsRef.current.addEventListener("control", () => {
      setIsFitting(true);
    });
    cameraControlsRef.current.addEventListener("sleep", () => {
      setIsFitting(false);
    });
  }, []);

  useEffect(() => {
    gltf.scene.traverse((item: any) => {
      if (item.name === "Vamp_Left") {
        const itemMat = item.material as THREE.MeshStandardMaterial;
        const cloneMat = itemMat.clone();
        item.material = cloneMat;
      }
    });
  }, [gltf.scene]);

  // useEffect(() => {
  //   console.log("selectedColorIdx : ", selectedColorIdx);
  //   if (selectedMeshName !== "") {
  //     console.log("selectedMeshName : ", selectedMeshName);
  //     const obj = scene.getObjectByName(selectedMeshName) as THREE.Mesh;
  //     const mat = obj.material as THREE.MeshStandardMaterial;
  //     const color = COLOR_ARR[selectedColorIdx].color;
  //     mat.color = new THREE.Color(color);
  //   }
  // }, [selectedColorIdx, selectedMeshName]);

  let angle = 0;
  let dis = 2.0;
  useFrame(() => {
    if (!isFitting) {
      // cameraControlsRef.current.setPosition(
      //   dis * Math.sin(angle),
      //   0.8,
      //   dis * Math.cos(angle),
      //   true,
      // );
      // angle = angle + 0.01;
    }

    // const rightShoes = gltf.scene.children[0];
    // const leftShoes = gltf.scene.children[1];
    // leftShoes.rotation.y = THREE.MathUtils.degToRad(335);
    // leftShoes.rotation.z = THREE.MathUtils.degToRad(-30);
    // leftShoes.position.x = -0.25;
    // leftShoes.position.z = 0.37;
    // leftShoes.position.y = 0.44;
    // rightShoes.position.x = 0.5;
    // rightShoes.position.y = 0.8;
    // rightShoes.position.z = 1;
    // rightShoes.rotation.x = THREE.MathUtils.degToRad(0);
    // rightShoes.rotation.y = THREE.MathUtils.degToRad(-90);
    // rightShoes.rotation.z = THREE.MathUtils.degToRad(0);
  });

  const shoesClick = () => {
    const intersects = raycaster.intersectObjects(gltf.scene.children, true);

    if (intersects.length > 0) {
      const firstObj = intersects[0].object as THREE.Mesh;
      console.log("firstObj.name : ", firstObj.name);
      const firstMat = firstObj.material as THREE.MeshStandardMaterial;
      const cloneMat = firstMat.clone();

      firstObj.material = cloneMat;
      const mat = firstObj.material as THREE.MeshStandardMaterial;
      mat.emissive = new THREE.Color("#B7F2F1");
      setTimeout(() => {
        mat.emissive = new THREE.Color("black");
      }, 500);

      cameraControlsRef.current.fitToBox(firstObj, true);
    }
  };

  return (
    <>
      <directionalLight position={[3, 3, 3]} />
      <pointLight position={[0, 1, 0]} intensity={1} />
      <ambientLight intensity={1} />
      <CameraControls
        ref={cameraControlsRef}
        enabled={true}
        dollyToCursor={true}
        minDistance={0.5}
        maxDistance={10}
        onChange={(e: any) => {
          // console.log("onChange e : ", e)
        }}
      />
      <mesh scale={5} position={[0, -0.51, 0]}>
        <cylinderGeometry args={[0.4, 0.2, 0.2, 50]} />
        <meshStandardMaterial />
      </mesh>
      <primitive object={gltf.scene} onPointerDown={shoesClick} />

      <ContactShadows
        position={[0, 0, 0]}
        scale={5}
        color="#000000"
        resolution={512}
        opacity={0.8}
        blur={0.5}
      />
    </>
  );
}
