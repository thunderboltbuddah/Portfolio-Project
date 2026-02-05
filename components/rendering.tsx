"use client";

import React, { Suspense, useRef, useState } from "react";
import { Canvas, useFrame, CanvasProps } from "@react-three/fiber";
import { useGLTF, Center, OrbitControls, Bounds, useAnimations } from "@react-three/drei";
import * as THREE from "three";

interface RenderingProps {
  resourcePath: string;
  canvasProps?: CanvasProps;
}

const TrackedModel = ({
  scene,
  animations,
  isHovered,
}: {
  scene: THREE.Group;
  animations: THREE.AnimationClip[];
  isHovered: boolean;
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const { actions, mixer } = useAnimations(animations, groupRef);

  useFrame((state) => {
    if (!groupRef.current) return;
    mixer?.update(state.clock.getDelta());

    const { x: mouseX, y: mouseY } = state.mouse;

    // Rotate based on mouse
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouseX * 0.5, 0.1);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -mouseY * 0.2, 0.1);

    // Hover zoom
    const targetScale = isHovered ? 1.2 : 1;
    groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
  });

  // Play all animations
  React.useEffect(() => {
    if (!actions) return;
    Object.values(actions).forEach((action) => action?.reset().play());
  }, [actions]);

  return <primitive ref={groupRef} object={scene} dispose={null} />;
};

const Rendering: React.FC<RenderingProps> = ({ resourcePath, canvasProps }) => {
  const gltf = useGLTF(resourcePath);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative w-full h-full">
      <Canvas
        shadows
        camera={{ position: [92, 92, 92], fov: 12 }}
        gl={{ preserveDrawingBuffer: true, alpha: true }}
        {...canvasProps}
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
    </div>
  );
};

export default Rendering;
