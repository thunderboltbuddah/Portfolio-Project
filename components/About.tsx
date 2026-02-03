"use client";
import { useGSAP, SplitText, gsap } from "@/lib/gsap-util";
import { useRef } from "react";

export default function About() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  useGSAP(
    () => {
      const textSplit = SplitText.create(".text", {
        type: "words lines",
        linesClass: "text-line",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".about-content",
          start: "top 60%",
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
    <section className="pt-20 sm:pt-24" ref={containerRef}>
      <div className="container flex justify-end-safe">
        {/* Wrapper */}
        <div className="lg:max-w-5xl w-full about-content">
          {/* Text */}
          <div className="flex flex-col md:items-center md:flex-row">
            <p className="uppercase text-xl md:px-7 font-medium overflow-hidden text mb-2 sm:mb-0">
              about
            </p>
            <h2 className="text-xl sm:text-2xl lg:text-4xl text overflow-hidden">
              I am a Software Engineer
            </h2>
          </div>

          {/* text */}
          <div className="text-xl sm:text-2xl lg:text-4xl text">
            <p>
             with a strong foundation in building scalable, high-performance web applications using modern architectural patterns. My technical expertise spans the full development lifecycle, with a focus on both frontend and backend ecosystems.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
