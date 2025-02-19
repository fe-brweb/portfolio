import * as THREE from "three";
import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useThree } from "@react-three/fiber";
import {
  CameraControls,
  ContactShadows,
  useGLTF,
  useHelper,
} from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
// import { selectedColorState, selectedMeshState } from '@src/atoms/Atoms';
// import { useRecoilState } from 'recoil';
// import Constants from '@src/Constants';
export default function ShowRoom() {
  // const [selectedColorIdx, setSelectedColorIdx] = useRecoilState(selectedColorState);
  // const [selectedMeshName, setSelectedMeshName] = useRecoilState(selectedMeshState);
  // const { raycaster, camera, scene } = useThree();
  const cameraControlsRef = useRef<CameraControls>(null!);
  const pointLightRef = useRef<THREE.PointLight>(null!);
  const directionalLightRef = useRef<THREE.DirectionalLight>(null!);
  // useHelper(pointLightRef, THREE.PointLightHelper, 5, "red");
  useHelper(directionalLightRef, THREE.DirectionalLightHelper, 5, "blue");

  const { scene } = useGLTF("./models/woody.glb");
  scene.scale.set(0.1, 0.1, 0.1);

  // const [isFitting, setIsFitting] = useState(false);
  // console.log("gltf : ", gltf);

  // useEffect(() => {
  //   cameraControlsRef.current.addEventListener("control", () => {
  //     console.log("control");
  //     setIsFitting(true);
  //   });
  //   cameraControlsRef.current.addEventListener("sleep", () => {
  //     console.log("sleep");
  //     setIsFitting(false);
  //   });
  // });

  // useEffect(() => {
  //   gltf.scene.traverse((item: any) => {
  //     if (item.name === "Vamp_Left") {
  //       console.log("item : ", item);
  //       const itemMat = item.material as THREE.MeshStandardMaterial;
  //       const cloneMat = itemMat.clone();
  //       item.material = cloneMat;
  //       // setSelectedMeshName(item.name);
  //     }
  //   });
  // }, [gltf.scene]);

  // useEffect(()=>{

  //     console.log("selectedColorIdx : ", selectedColorIdx);
  //     if(selectedMeshName !== ''){
  //         console.log("selectedMeshName : ", selectedMeshName);
  //         const obj = scene.getObjectByName(selectedMeshName) as THREE.Mesh;
  //         const mat = obj.material as THREE.MeshStandardMaterial;
  //         const color = Constants.COLOR_ARR[selectedColorIdx].color;
  //         mat.color = new THREE.Color(color)
  //     }
  // },[selectedColorIdx])

  let angle = 0;
  let dis = 2.0;
  useFrame(() => {
    // console.log("isFitting : ", isFitting);
    // if (!isFitting) {
    // cameraControlsRef.current.setPosition(
    //   dis * Math.sin(angle),
    //   0.8,
    //   dis * Math.cos(angle),
    //   true,
    // );
    // angle = angle + 0.01;
    // }
    //   const rightShoes = gltf.scene.children[0];
    //   const leftShoes = gltf.scene.children[1];
    //   rightShoes.rotation.y = THREE.MathUtils.degToRad(10);
    //   leftShoes.rotation.y = THREE.MathUtils.degToRad(335);
    //   leftShoes.rotation.z = THREE.MathUtils.degToRad(-30);
    //   leftShoes.position.x = -0.25;
    //   leftShoes.position.z = 0.37;
    // leftShoes.position.y = 0.44;
  });

  // const shoesClick = () => {
  //   console.log("shoesClick");
  //   const intersects = raycaster.intersectObjects(gltf.scene.children, true);
  //   console.log("intersects : ", intersects);

  //   if (intersects.length > 0) {
  //     const firstObj = intersects[0].object as THREE.Mesh;
  //     console.log("firstObj.name : ", firstObj.name);
  //     // setSelectedMeshName(firstObj.name);
  //     const firstMat = firstObj.material as THREE.MeshStandardMaterial;
  //     const cloneMat = firstMat.clone();

  //     firstObj.material = cloneMat;
  //     const mat = firstObj.material as THREE.MeshStandardMaterial;
  //     mat.emissive = new THREE.Color("#B7F2F1");
  //     setTimeout(() => {
  //       mat.emissive = new THREE.Color("black");
  //     }, 500);

  //     // cameraControlsRef.current.fitToBox(firstObj, true);
  //   }
  // };

  return (
    <>
      <directionalLight
        ref={directionalLightRef}
        position={[3, 3, 3]}
        intensity={1}
        // castShadow={true}
        // receiveShadow={true}
      />
      {/* <pointLight
        ref={pointLightRef}
        position={[0, 1, 0]}
        intensity={1}
        distance={0}
        // decay={0}
        // power={0}
      /> */}
      <ambientLight intensity={1} />
      <CameraControls
        ref={cameraControlsRef}
        enabled={true}
        dollyToCursor={true}
        minDistance={0.5}
        maxDistance={10}
      />
      <mesh scale={5} position={[0, -0.51, 0]}>
        <cylinderGeometry args={[0.4, 0.2, 0.2, 50]} />
        <meshStandardMaterial />
      </mesh>
      <primitive
        object={scene}
        //  onClick={shoesClick}
      />
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
