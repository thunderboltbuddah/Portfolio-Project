"use client";
import { useRef, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, Float } from "@react-three/drei";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

function useWindowSize() {
  const [size, setSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    if (typeof window === "undefined") return;
    const updateSize = () => setSize({ width: window.innerWidth, height: window.innerHeight });
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}

function Model({ url, progress }: { url: string; progress: number }) {
  const { scene } = useGLTF(url);
  useEffect(() => {
    scene.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) {
        const mesh = obj as THREE.Mesh;
        if (mesh.material) {
          const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
          materials.forEach((mat) => {
            mat.transparent = true;
            mat.opacity = progress > 0.6 ? 1 - (progress - 0.6) * 2.5 : 1;
          });
        }
      }
    });
  }, [scene, progress]);
  return <primitive object={scene} />;
}

export default function Scroll3DModels() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const leftModelRef = useRef<THREE.Group>(null!);
  const rightModelRef = useRef<THREE.Group>(null!);
  const [progress, setProgress] = useState(0);

  const { width } = useWindowSize();
  const isMobile = width < 768;

  const modelScale = isMobile ? 1.1: 1.7;
  const scrollHeight = isMobile ? "180vh" : "300vh";
  const exitX = isMobile ? 12 : 25;
  const exitZ = isMobile ? 12 : 30;

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: isMobile ? 0.6 : 1.5,
        onUpdate: (self) => {
          const p = self.progress;
          setProgress(p);

          // SAFETY CHECK: If refs aren't ready yet, skip this frame
          if (!leftModelRef.current || !rightModelRef.current) return;

          // Scale Logic - Stays 1.0 until p > 0.1
          const scaleMult = p < 0.1 ? 1 : 1 - (p - 0.1) * 1.2;
          const currentScale = modelScale * Math.max(0, scaleMult);

          // LEFT MODEL
          leftModelRef.current.position.x = gsap.utils.interpolate(0, -exitX, p);
          leftModelRef.current.position.z = Math.sin(p * Math.PI) * (isMobile ? 5 : 10) - (p * exitZ);
          leftModelRef.current.position.y = Math.sin(p * Math.PI) * (isMobile ? 1 : 3);
          leftModelRef.current.rotation.y = p * Math.PI * 6;
          leftModelRef.current.rotation.x = p * Math.PI * 2;
          leftModelRef.current.scale.setScalar(currentScale);

          // RIGHT MODEL
          rightModelRef.current.position.x = gsap.utils.interpolate(0, exitX, p);
          rightModelRef.current.position.z = Math.sin(p * Math.PI) * (isMobile ? 5 : 10) - (p * exitZ);
          rightModelRef.current.position.y = -Math.sin(p * Math.PI) * (isMobile ? 1 : 3);
          rightModelRef.current.rotation.y = -p * Math.PI * 6;
          rightModelRef.current.rotation.z = p * Math.PI * 2;
          rightModelRef.current.scale.setScalar(currentScale);
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isMobile, modelScale, exitX, exitZ]);

  return (
    <section ref={containerRef} style={{ height: scrollHeight }} className="relative w-full">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <Canvas camera={{ position: [0, 0, 18], fov: isMobile ? 50 : 40, far: 1000 }}>
          <ambientLight intensity={1} />
          <spotLight position={[10, 20, 10]} intensity={2.5} />
          <pointLight position={[-10, -10, -10]} color="#60a5fa" intensity={3} />

          <Float speed={isMobile ? 1.5 : 3} rotationIntensity={0.5} floatIntensity={isMobile ? 1 : 2}>
            {/* Setting initial scale here to prevent the "jump" on PC */}
            <group ref={leftModelRef} scale={[modelScale, modelScale, modelScale]}>
              <Model url="/models/1.glb" progress={progress} />
            </group>
          </Float>

          <Float speed={isMobile ? 1.5 : 3} rotationIntensity={0.5} floatIntensity={isMobile ? 1 : 2}>
            <group ref={rightModelRef} scale={[modelScale, modelScale, modelScale]}>
              <Model url="/models/2.glb" progress={progress} />
            </group>
          </Float>
        </Canvas>
      </div>
    </section>
  );
}