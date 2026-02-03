"use client";
import { gsap, useGSAP, SplitText } from "@/lib/gsap-util";
import { processItems } from "@/data/data";
import { useRef ,Suspense} from "react";
import dynamic from "next/dynamic";
import { Canvas } from '@react-three/fiber';
import { useGLTF, Center } from '@react-three/drei';
const Rendering = dynamic(() => import('./rendering'), { ssr: false });

export default function Process() {




  const containerRef = useRef<HTMLDivElement | null>(null);
  useGSAP(
    () => {
      const textSplit = SplitText.create(".text", {
        type: "words",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".precess-wrapper",
          start: "top center",
          
        },
      });

      tl.from(textSplit.words, {
        yPercent: 100,
        ease: "power2.inOut",
        duration: 1,
        stagger: 0.03,
      });
    },
    {
      scope: containerRef,
    }
  );
  return (
    <section className="section" ref={containerRef}>
      
      <div className="container precess-wrapper">
       
        <div>
          <h2 className="section-title text overflow-hidden">A few </h2>
          {/* Wrapper */}
          <div className="flex items-center gap-5">
            <h2 className="section-title text overflow-hidden">things</h2>
            <p className="uppercase font-medium text-sm sm:text-base overflow-hidden">
  I’m actually good at
</p>

          </div>
        </div>
        {/* Card wrapper */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 mt-24 lg:mt-28">
          {processItems.map((item) => (

           <div
  key={item.id}
  className="
    border rounded-2xl
    p-4 sm:p-6      /* smaller padding on mobile */
    hover:shadow-lg transition-shadow duration-300
  "
>
  {/* Icon / 3D Model */}
  <div className="h-40 sm:h-[250px] w-full relative max-w-max mx-auto group z-10 m-4 sm:m-7">
    <Rendering resourcePath={`/models/${item.iconName}.glb`} />

    {/* Optional hover glow */}
    <div className="absolute inset-0 bg-cyan-500/5 blur-[50px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
  </div>

  {/* Content */}
  <div className="space-y-1 sm:space-y-2">
    <div className="flex items-start gap-1.5">
      <h3 className="card-title text-blue-300 text-base sm:text-lg">{item.title}</h3>
    </div>
    <p className="text-sm sm:text-base">{item.text}</p>
  </div>
</div>

          ))}
        </div>
      </div>
    </section>
  );
}
