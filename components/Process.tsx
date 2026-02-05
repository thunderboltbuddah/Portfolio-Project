"use client";
import { gsap, useGSAP, SplitText } from "@/lib/gsap-util";
import { processItems } from "@/data/data";
import { useRef } from "react";
import dynamic from "next/dynamic";

const Rendering = dynamic(() => import('./rendering'), { ssr: false });

export default function Process() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      // 1. Title Text Animation
      const textSplit = SplitText.create(".text", {
        type: "words",
      });

      gsap.from(textSplit.words, {
        scrollTrigger: {
          trigger: ".precess-wrapper",
          start: "top 80%",
        },
        yPercent: 100,
        ease: "power2.out",
        duration: 1,
        stagger: 0.03,
      });

      // 2. Cards Slide From Right Animation
      gsap.from(".process-card", {
        scrollTrigger: {
          trigger: ".grid",        // Trigger when the grid enters
          start: "top 80%",       // Start when top of grid is 80% down
          once: true,             // Only play once when going top -> bottom
        },
        x: 100,                   // Slide from 100px to the right
        autoAlpha: 0,             // Fade in (opacity + visibility)
        duration: 1,
        ease: "power3.out",
        stagger: 0.2,             // Sequential delay between cards
      });
    },
    {
      scope: containerRef,
    }
  );

  return (
    <section className="section overflow-x-hidden" ref={containerRef}>
      <div className="container precess-wrapper">
        <div>
          <h2 className="section-title text overflow-hidden">A few </h2>
          <div className="flex items-center gap-5">
            <h2 className="section-title text overflow-hidden">things</h2>
            <p className="uppercase font-medium text overflow-hidden">
               I’m actually good at
            </p>
          </div>
        </div>

        {/* Card wrapper */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 mt-24 lg:mt-28">
          {processItems.map((item) => (
            <div
              key={item.id}
              // Added 'process-card' class for GSAP targeting
              className="process-card border rounded-2xl p-4 sm:p-6 hover:shadow-lg transition-shadow duration-300 w-[80%] sm:w-auto mx-auto flex flex-col items-center group bg-white/5"
            >
              {/* Icon / 3D Model Wrapper */}
              <div className="h-[250px] w-full relative flex justify-center items-center">
                <div className="w-full h-full flex items-center justify-center">
                   <Rendering resourcePath={`/models/${item.iconName}.glb`} />
                </div>

                {/* Optional glow */}
                <div className="absolute inset-0 bg-cyan-500/5 blur-[50px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>

              {/* Content */}
              <div className="space-y-2 mt-4 w-full">
                <h3 className="card-title text-blue-300 font-bold text-xl">{item.title}</h3>
                <p className="text-sm sm:text-base text-neutral-400">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}