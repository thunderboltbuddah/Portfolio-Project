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

function Model({ url, scale, progress }: { url: string; scale: number; progress: number }) {
  const { scene } = useGLTF(url);
  useEffect(() => {
    scene.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) {
        const mesh = obj as THREE.Mesh;
        if (mesh.material) {
          const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
          materials.forEach((mat) => {
            mat.transparent = true;
            // Constant visibility until 60% scroll, then fade out
            mat.opacity = progress > 0.6 ? 1 - (progress - 0.6) * 2.5 : 1;
          });
        }
      }
    });
  }, [scene, progress]);
  return <primitive object={scene} scale={scale} />;
}

export default function Scroll3DModels() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const leftModelRef = useRef<THREE.Group>(null!);
  const rightModelRef = useRef<THREE.Group>(null!);
  const [progress, setProgress] = useState(0);

  const { width } = useWindowSize();
  const isMobile = width < 768;

  // Paths: Start Center -> Side -> Fly Away
  const modelScale = isMobile ? 0.6 : 1.3;

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
        onUpdate: (self) => {
          const p = self.progress;
          setProgress(p);

          // LEFT MODEL: Start at 0, move to -15
          if (leftModelRef.current) {
            // X: Moves from center to far left
            leftModelRef.current.position.x = gsap.utils.interpolate(0, -20, p);
            // Z: Swings toward camera for a "pop" effect before diving away
            leftModelRef.current.position.z = Math.sin(p * Math.PI) * 8 - (p * 20);
            // Y: Upward/Downward arc
            leftModelRef.current.position.y = Math.sin(p * Math.PI) * 2;
            
            // Rotation: Increases speed as it moves out
            leftModelRef.current.rotation.y = p * Math.PI * 6;
            leftModelRef.current.rotation.x = p * Math.PI * 2;
            
            // Scale: Shrinks as it flies away
            leftModelRef.current.scale.setScalar(modelScale * (1 - p * 0.9));
          }

          // RIGHT MODEL: Start at 0, move to +15
          if (rightModelRef.current) {
            // X: Moves from center to far right
            rightModelRef.current.position.x = gsap.utils.interpolate(0, 20, p);
            // Z: Mirror the dive
            rightModelRef.current.position.z = Math.sin(p * Math.PI) * 8 - (p * 20);
            // Y: Mirror the arc
            rightModelRef.current.position.y = -Math.sin(p * Math.PI) * 2;

            rightModelRef.current.rotation.y = -p * Math.PI * 6;
            rightModelRef.current.rotation.z = p * Math.PI * 2;

            rightModelRef.current.scale.setScalar(modelScale * (1 - p * 0.9));
          }
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isMobile, modelScale]);

  return (
    <section ref={containerRef} className="relative w-full h-[300vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <Canvas camera={{ position: [0, 0, 15], fov: 45, far: 1000 }}>
          <ambientLight intensity={1} />
          <spotLight position={[10, 20, 10]} intensity={2} />
          <pointLight position={[-10, -10, -10]} color="#60a5fa" intensity={3} />

          {/* Float provides the "idle" animation while they are centered */}
          <Float speed={3} rotationIntensity={1} floatIntensity={2}>
            <group ref={leftModelRef} position={[0, 0, 0]}>
              <Model url="/models/1.glb" scale={modelScale} progress={progress} />
            </group>
          </Float>

          <Float speed={3} rotationIntensity={1} floatIntensity={2}>
            <group ref={rightModelRef} position={[0, 0, 0]}>
              <Model url="/models/2.glb" scale={modelScale} progress={progress} />
            </group>
          </Float>
        </Canvas>
      </div>
    </section>
  );
}