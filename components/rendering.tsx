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
  deviceRotation,
}: {
  scene: THREE.Group;
  animations: THREE.AnimationClip[];
  isHovered: boolean;
  deviceRotation: { alpha: number; beta: number; gamma: number };
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const { actions, mixer } = useAnimations(animations, groupRef);

  // Play all animations
  useEffect(() => {
    if (!actions) return;
    Object.values(actions).forEach((action) => action?.reset().play());
  }, [actions]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    mixer?.update(delta);

    const { x: mouseX, y: mouseY } = state.mouse;
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (isMobile) {
      // Gyro rotation
      const rotationSpeed = 0.05;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        THREE.MathUtils.degToRad(deviceRotation.gamma) * rotationSpeed,
        0.1
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        THREE.MathUtils.degToRad(deviceRotation.beta) * rotationSpeed,
        0.1
      );
    } else {
      // Mouse rotation (desktop)
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

  // Device rotation state
  const [deviceRotation, setDeviceRotation] = useState({ alpha: 0, beta: 0, gamma: 0 });

  // Listen to device orientation immediately
  useEffect(() => {
    const handleOrientation = (event: DeviceOrientationEvent) => {
      setDeviceRotation({
        alpha: event.alpha || 0,
        beta: event.beta || 0,
        gamma: event.gamma || 0,
      });
    };

    window.addEventListener("deviceorientation", handleOrientation, true);

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
    };
  }, []);

  return (
    <div className="relative w-full h-full">
      {/* Debug overlay */}
      <div className="absolute top-2 left-2 bg-black/50 text-white text-xs p-2 rounded z-50">
        <div>Alpha: {deviceRotation.alpha.toFixed(2)}</div>
        <div>Beta: {deviceRotation.beta.toFixed(2)}</div>
        <div>Gamma: {deviceRotation.gamma.toFixed(2)}</div>
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
                deviceRotation={deviceRotation}
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
