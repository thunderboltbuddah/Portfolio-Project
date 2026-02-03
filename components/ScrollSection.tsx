"use client";
import { useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

// Load a 3D model
function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={1} />;
}

export default function Scroll3DModels() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const leftModelRef = useRef<THREE.Group>(null!);
  const rightModelRef = useRef<THREE.Group>(null!);

  useEffect(() => {
    if (!containerRef.current) return;

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress; // 0 -> 1

        // Move left model from x = -5 → +5
        if (leftModelRef.current) leftModelRef.current.position.x = -5 + progress * 10;

        // Move right model from x = +5 → -5
        if (rightModelRef.current) rightModelRef.current.position.x = 5 - progress * 10;
      },
    });
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[200vh]  flex items-center justify-center"
    >
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 10]} intensity={1} />

        {/* Left Model */}
        <group ref={leftModelRef} position={[-5, 0, 0]}>
          <Model url="/models/1.glb" />
        </group>

        {/* Right Model */}
        <group ref={rightModelRef} position={[5, 0, 0]}>
          <Model url="/models/2.glb" />
        </group>
      </Canvas>
    </section>
  );
}
