"use client";

import React, { Suspense, useRef, useEffect, useState } from "react";
import { Canvas, CanvasProps, useFrame } from "@react-three/fiber";
import { useGLTF, Center, OrbitControls, Bounds, useAnimations } from "@react-three/drei";
import * as THREE from "three";

interface RenderingProps {
  resourcePath: string;
  canvasProps?: CanvasProps;
}

const TrackedModel = ({
  scene,
  animations,
  isHovered, // Pass this in as a prop now
}: {
  scene: THREE.Group;
  animations: THREE.AnimationClip[];
  isHovered: boolean;
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const { actions, mixer } = useAnimations(animations, groupRef);

  useEffect(() => {
    if (!actions) return;
    Object.values(actions).forEach((action) => {
      action?.reset().play();
    });
  }, [actions]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    mixer?.update(delta);

    const { x, y } = state.mouse;

    // Mouse tracking rotation
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, x * 0.5, 0.1);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -y * 0.2, 0.1);

    // Hover zoom - now reacts to the parent Canvas hover state
    const targetScale = isHovered ? 1.2 : 1;
    groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
  });

  return (
    <group ref={groupRef}>
      <primitive object={scene} dispose={null}  />
    </group>
  );
};

const Rendering: React.FC<RenderingProps> = ({ resourcePath, canvasProps }) => {
  const gltf = useGLTF(resourcePath);
  const [isHovered, setIsHovered] = useState(false); // Use standard React state

  return (
    <Canvas
      shadows
      camera={{ position: [92, 92, 92], fov: 12 }}
      gl={{ preserveDrawingBuffer: true, alpha: true }}
      {...canvasProps}
      // Trigger hover for the entire Canvas area
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
    >
      <Suspense fallback={null}>
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} makeDefault />

        <Bounds fit clip observe margin={1.5}>
          <Center>
            <TrackedModel
              scene={gltf.scene}
              animations={gltf.animations}
              isHovered={isHovered}
            />
          </Center>
        </Bounds>

        <ambientLight intensity={0.8} />
        <pointLight intensity={1} position={[0, 6, 0]} />
      </Suspense>
    </Canvas>
  );
};

export default Rendering;