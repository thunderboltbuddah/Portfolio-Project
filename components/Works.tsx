"use client";
import { useGSAP, SplitText, gsap } from "@/lib/gsap-util";
import { useRef } from "react";
import Image from "next/image";
import { workSecItems } from "@/data/data";

export default function Works() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const textSplit = SplitText.create(".text", {
        type: "words lines",
        linesClass: "text-line",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".works-title",
          start: "top 60%",
        },
      });

      tl.from(textSplit.words, {
        yPercent: 100,
        ease: "power2.inOut",
        duration: 1,
        stagger: 0.03,
      });

      // Initialize the starting state here instead of in the style prop to prevent the "tall strip" look
      gsap.set(".section-img", { clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)" });

      gsap.to(".section-img", {
        duration: 1,
        stagger: 0.7,
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        scrollTrigger: {
          trigger: ".works-wrapper",
          start: "top center",
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section id="work" className="section" ref={containerRef}>
      <div className="container">
        {/* Title */}
        <div className="works-title flex flex-wrap items-center justify-between gap-6 mb-24">
          <div>
            <h2 className="section-title text">Work</h2>
            <h2 className="section-title text">Experience</h2>
          </div>
          <div className="sm:text-2xl uppercase font-medium">
            <p className="text">What HAVE I</p>
            <p className="text">done so far</p>
          </div>
        </div>

        {/* Wrapper */}
        <div className="space-y-32 lg:space-y-44 works-wrapper">
          {workSecItems.map((item, index) => (
            <div
              key={item.id}
              className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center group"
            >
              {/* Image Container - Removed the style tag that was crushing the image */}
              <div
                className={`section-img w-full border border-black p-2 rounded-xl flex items-center justify-center
                  ${index % 2 === 0 ? "lg:order-last" : "lg:order-first"} 
                  max-sm:order-first max-sm:aspect-video`} 
              >
                <Image
                  src={item.img}
                  alt={item.title}
                  width={583}
                  height={260}
                  className="w-full h-auto object-contain rounded-lg"
                />
              </div>

              {/* Content - lg:max-w-md ensures it wraps to two lines on PC */}
              <div className="space-y-1.5 w-full">
                <h3 className="text-4xl text-blue-300 uppercase font-medium text max-sm:text-xl max-sm:leading-tight lg:max-w-md">
                  {item.title}
                </h3>
                <p className="opacity-70 mt-5">{item.time}</p>
                <br />
                <ul className="list-none space-y-3">
                  <li className="max-w-md text max-sm:text-sm leading-relaxed">{item.text}</li>
                  <li className="max-w-md text max-sm:text-sm leading-relaxed">{item.text2}</li>
                  <li className="max-w-md text max-sm:text-sm leading-relaxed">{item.text3}</li>
                  <li className="max-w-md text max-sm:text-sm leading-relaxed">{item.text4}</li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}