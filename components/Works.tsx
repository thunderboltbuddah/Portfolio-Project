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

      gsap.to(".section-img", {
        duration: 1,
        stagger: 0.7,
        clipPath: "polygon(0% 0%,100% 0%,100% 100%,0% 100%)",
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
        <div className="works-title flex flex-wrap items-center justify-between gap-6">
          <div>
            <h2 className="section-title text">Work</h2>
            <h2 className="section-title text">Experience</h2>
          </div>
          {/* wrapper */}
          <div className="sm:text-2xl uppercase font-medium">
            <p className="text">What HAVE I</p>
            <p className="text">done so far</p>
          </div>
        </div>
        {/* Wrapper */}
        <div className="space-y-32 lg:space-y-44 mt-24 lg:mt-36 works-wrapper">
          {workSecItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col lg:flex-row lg:justify-center lg:items-center gap-6 lg:gap-9 xl:gap-16 group "
            >
              {/* content */}
              <div className="space-y-1.5">
                <h3 className="text-4xl uppercase font-medium text ">
                  {item.title}
                </h3>
                <h4 >
                  {item.time}
                </h4>
                <br />
                <li className="max-w-md text ">{item.text}</li>
                <li className="max-w-md text">{item.text2}</li>
                <li className="max-w-md text">{item.text3}</li>
                <li className="max-w-md text">{item.text4}</li>
              </div>
              {/* Image */}
              <div
                className="lg:group-nth-[2]:order-first section-img"
                style={{ clipPath: "polygon(0% 0%,0% 0%,0% 100%,0% 100%)" }}
              >
                <Image
                  src={item.img}
                  alt={item.title}
                  width={583}
                  height={260}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
