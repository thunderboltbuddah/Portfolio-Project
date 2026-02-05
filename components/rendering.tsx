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
  isHovered,
  targetRotation,
}: {
  scene: THREE.Group;
  animations: THREE.AnimationClip[];
  isHovered: boolean;
  targetRotation: { x: number; y: number; z: number };
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const { actions, mixer } = useAnimations(animations, groupRef);

  useEffect(() => {
    if (!actions) return;
    Object.values(actions).forEach((action) => action?.reset().play());
  }, [actions]);

  useFrame((state) => {
    if (!groupRef.current) return;
    mixer?.update(state.clock.getDelta());

    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (isMobile) {
      // Smoothly move toward targetRotation
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotation.x, 0.08);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotation.y, 0.08);
      groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, targetRotation.z, 0.08);
    } else {
      const { x: mouseX, y: mouseY } = state.mouse;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouseX * 0.5, 0.1);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -mouseY * 0.2, 0.1);
    }

    // Hover zoom
    const targetScale = isHovered ? 1.2 : 1;
    groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
  });

  return (
    <group ref={groupRef}>
      <primitive object={scene} dispose={null} />
    </group>
  );
};

const Rendering: React.FC<RenderingProps> = ({ resourcePath, canvasProps }) => {
  const gltf = useGLTF(resourcePath);
  const [isHovered, setIsHovered] = useState(false);

  const [targetRotation, setTargetRotation] = useState({ x: 0, y: 0, z: 0 });
  const baselineRef = useRef<{ beta: number; gamma: number; alpha: number } | null>(null);

  useEffect(() => {
    const handleOrientation = (event: DeviceOrientationEvent) => {
      const beta = event.beta || 0;   // X-axis tilt
      const gamma = event.gamma || 0; // Y-axis tilt
      const alpha = event.alpha || 0; // Z-axis rotation

      // Initialize baseline automatically
      if (!baselineRef.current) {
        baselineRef.current = { beta, gamma, alpha };
        return;
      }

      // Subtract baseline to normalize resting position
      const adjBeta = beta - baselineRef.current.beta;
      const adjGamma = gamma - baselineRef.current.gamma;
      const adjAlpha = alpha - baselineRef.current.alpha;

      // Apply multipliers & clamp to avoid crazy spinning
      setTargetRotation({
        x: THREE.MathUtils.clamp(THREE.MathUtils.degToRad(adjBeta) * 0.15, -0.5, 0.5),
        y: THREE.MathUtils.clamp(THREE.MathUtils.degToRad(adjGamma) * 0.15, -0.5, 0.5),
        z: THREE.MathUtils.clamp(THREE.MathUtils.degToRad(adjAlpha) * 0.1, -0.3, 0.3),
      });
    };

    window.addEventListener("deviceorientation", handleOrientation, true);
    return () => window.removeEventListener("deviceorientation", handleOrientation);
  }, []);

  return (
    <div className="relative w-full h-full">
      {/* Debug overlay */}
      <div className="absolute top-2 left-2 bg-black/50 text-white text-xs p-2 rounded z-50">
        <div>X: {targetRotation.x.toFixed(2)}</div>
        <div>Y: {targetRotation.y.toFixed(2)}</div>
        <div>Z: {targetRotation.z.toFixed(2)}</div>
      </div>

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
                targetRotation={targetRotation}
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
