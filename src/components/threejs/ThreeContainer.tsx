"use client";

import ShowRoom from "@/components/threejs/ShowRoom";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";

function ThreeContainer() {
  let angle = 0;
  let distance = 2.0;

  return (
    <>
      <Canvas
        // shadows
        camera={{
          position: [distance * Math.sin(angle), 2, distance * Math.cos(angle)],
        }}
      >
        {/* <Text fontSize={1} color="hotpink" position={[-2, 0, 0]}>
          Hello R3F!
        </Text> */}
        {/* <color attach={"background"} args={["black"]} /> */}
        {/* <ToyStory /> */}
        <Suspense>
          <ShowRoom />
        </Suspense>
      </Canvas>
    </>
  );
}

export default ThreeContainer;
