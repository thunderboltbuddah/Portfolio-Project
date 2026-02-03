"use client";
import { gsap, useGSAP, SplitText } from "@/lib/gsap-util";
import { awards } from "@/data/data";
import Image from "next/image";
import { useRef } from "react";
import Link from "next/dist/client/link";

export default function Awards() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  useGSAP(
    () => {
      const textSplit = SplitText.create(".text", {
        type: "words lines",
        linesClass: "text-line",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".awards-title",
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
    <section className="section" ref={containerRef}>
      <div>
        {/* title */}
        <div className="container awards-title">
          <h2 className="section-title text">Certification &</h2>
          <h2 className="section-title text">Courses</h2>
        </div>
        {/* wrapper */}
        <div className="flex items-center flex-wrap gap-7 overflow-x-hidden mt-16 py-16 justify-center">
          {awards.map((award) => (
            
           <div className="border p-6 rounded-2xl hover:shadow-lg transition-shadow duration-300 shrink-0 odd:-mt-8 lg:odd:-mt-18" key={award.id}>
  <Link 
    href={award.link || "#"} 
    className="flex items-center justify-center w-full h-full overflow-hidden"
  >
    {/* Image */}
    <Image
      src={award.img}
      alt="award image"
      width={150}
      height={150}
      className="object-cover transition-transform duration-500 hover:scale-110"
    />
<div className="p-6">
<button className="ml-6 bg-neutral-900 text-white hidden lg:block px-5 py-3 rounded-lg hover:opacity-85 focus:opacity-85 transition-opacity whitespace-nowrap">
      verify
    </button>
</div>
    {/* The Margin (ml-6 adds space to the left of the button) */}
    
  </Link>
</div>
          ))}
        </div>
      </div>
    </section>
  );
}
