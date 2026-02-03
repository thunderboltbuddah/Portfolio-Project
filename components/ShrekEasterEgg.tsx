"use client";
import * as THREE from "three";
import React, { useState, useRef, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, useAnimations, OrbitControls, Center, ContactShadows } from "@react-three/drei";

interface ShrekProps {
  resourcePath: string;
}

function Model({ resourcePath }: ShrekProps) {
  const group = useRef<THREE.Group>(null);
  const [playing, setPlaying] = useState(false);
  
  const { scene, animations } = useGLTF(resourcePath);
  const { actions } = useAnimations(animations, group);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio("/music/music.mp3");
    audioRef.current.loop = true;
    return () => {
      audioRef.current?.pause();
      if (audioRef.current) audioRef.current.src = "";
    };
  }, []);

  const handleToggle = (e: any) => {
    e.stopPropagation();
    const animationName = Object.keys(actions)[0];
    if (!animationName) return;

    if (!playing) {
      actions[animationName]?.reset().fadeIn(0.5).play();
      audioRef.current?.play().catch(() => console.log("Audio play blocked by browser"));
    } else {
      actions[animationName]?.fadeOut(0.5).stop();
      audioRef.current?.pause();
    }
    setPlaying(!playing);
  };

  return (
    <group 
    ref={group} 
    onClick={handleToggle} 
    dispose={null} 
    scale={2.2}
    position={[0, 1, 0]} // [X, Y, Z] - Change 1.5 to move him higher
  >
    <Center bottom>
      <primitive object={scene} scale={0.7} />
    </Center>
  </group>
  );
}

export default function ShrekEasterEgg({ resourcePath }: ShrekProps) {
  return (
    <div className="w-full h-full">
      <Canvas 
        shadows 
        camera={{ position: [0, 0, 8], fov: 35 }}
      >
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        
        <Suspense fallback={null}>
          <Model resourcePath={resourcePath} />
          {/* Adds a soft shadow on the 'floor' to ground him */}
          <ContactShadows 
            position={[0, -1.5, 0]} 
            opacity={0.4} 
            scale={10} 
            blur={2.5} 
            far={4} 
          />
        </Suspense>
        
        <OrbitControls 
          enableZoom={false}      // Prevents zooming in/out
          enablePan={false}       // PREVENTS TRANSLATING (moving him off-center)
          makeDefault             // Ensures this is the primary control
          minPolarAngle={Math.PI / 3} // Limits vertical rotation so you don't see under the floor
          maxPolarAngle={Math.PI / 1.8}
          target={[0, 0, 0]}      // Keeps the camera locked on the center
        />
      </Canvas>
    </div>
  );
}