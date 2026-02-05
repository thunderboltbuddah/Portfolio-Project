"use client";
import { useGSAP, SplitText, gsap } from "@/lib/gsap-util";
import { useRef } from "react";
import Gyro from "./Gyro";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const textSplit = SplitText.create(".text", {
        type: "words",
        linesClass: "text-line",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".wrapper",
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
    { scope: containerRef }
  );

  return (
    // Wrap the hero section inside TopographyBackground
   
      <section
        id="home"
        ref={containerRef}
        className="py-21 lg:py-28 relative z-10" // z-10 to be above topography
      >
        <Gyro/>


        <div className="container flex flex-col">
          {/* Wrapper */}
          <div className="wrapper mt-10">
            {/* Title */}
            <h1 className="hero-title text">
              Hi, I am <span className="inline text-blue-300">Aun</span>
            </h1>
            {/* Subtitle */}
            <h2 className="hero-title text">Crafting WebGL</h2>
            {/* Row */}
            <div className="flex items-center gap-6">
              <h2 className="hero-title text">and Business Apps</h2>
              <div className="font-medium tracking-wider -space-y-1 uppercase sm:text-2xl text-neutral-800 hidden sm:block">
                <p className="text hero-text">freelancer</p>
                <p className="text hero-text">software engineer</p>
                <p className="text hero-text">xr developer</p>
              </div>
            </div>
            {/* Tagline */}
            <div className="hero-title mb-2.5 text">
              That People Actually Use.
            </div>
            {/* Mobile text */}
            <div className="font-medium tracking-wider -space-y-1 uppercase sm:text-2xl text-neutral-800 sm:hidden">
              <p className="text hero-text">freelancer</p>
              <p className="text hero-text">software engineer</p>
              <p className="text hero-text">xr developer</p>
            </div>
          </div>
        </div>
      </section>
    
  );
}
