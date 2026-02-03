"use client";
import { useRef, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

// Hook to track window size
function useWindowSize() {
  const [size, setSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    function updateSize() {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}

// Load a 3D model
function Model({ url, scale }: { url: string; scale?: number }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={scale ?? 1} />;
}

export default function Scroll3DModels() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const leftModelRef = useRef<THREE.Group>(null!);
  const rightModelRef = useRef<THREE.Group>(null!);

  const { width } = useWindowSize();
  const isMobile = width < 768;

  // Adjust model positions and scales for mobile
  const leftStartX = isMobile ? -2 : -5;
  const rightStartX = isMobile ? 2 : 5;
  const leftEndX = isMobile ? 2 : 5;
  const rightEndX = isMobile ? -2 : -5;
  const modelScale = isMobile ? 0.5 : 1;

  useEffect(() => {
    if (!containerRef.current) return;

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress; // 0 -> 1

        if (leftModelRef.current)
          leftModelRef.current.position.x =
            leftStartX + (leftEndX - leftStartX) * progress;

        if (rightModelRef.current)
          rightModelRef.current.position.x =
            rightStartX + (rightEndX - rightStartX) * progress;
      },
    });
  }, [leftStartX, leftEndX, rightStartX, rightEndX]);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[200vh] flex items-center justify-center"
    >
      <Canvas camera={{ position: [0, 0, 10], fov: isMobile ? 40 : 50 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 10]} intensity={1} />

        {/* Left Model */}
        <group ref={leftModelRef} position={[leftStartX, 0, 0]}>
          <Model url="/models/1.glb" scale={modelScale} />
        </group>

        {/* Right Model */}
        <group ref={rightModelRef} position={[rightStartX, 0, 0]}>
          <Model url="/models/2.glb" scale={modelScale} />
        </group>
      </Canvas>
    </section>
  );
}
