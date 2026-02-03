"use client";
import { projectItems } from "@/data/data";
import { useGSAP, gsap, SplitText } from "@/lib/gsap-util";
import Image from "next/image";
import { useRef, useEffect } from "react";

export default function Projects() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const projectsRef = useRef<Array<HTMLDivElement | null>>([]);
  const descriptionsRef = useRef<Array<HTMLDivElement | null>>([]);
  const openIndexRef = useRef<number | null>(null);

  // Helper to safely set refs
  const setProjectRef = (el: HTMLDivElement | null, index: number) => {
    projectsRef.current[index] = el;
  };

  const setDescriptionRef = (el: HTMLDivElement | null, index: number) => {
    descriptionsRef.current[index] = el;
  };

  // GSAP Animations
  useGSAP(
    () => {
      if (!containerRef.current) return;

      // Split text animation for titles
      const textSplit = SplitText.create(".text", {
        type: "words lines",
        linesClass: "text-line",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".project-title",
          start: "top 60%",
        },
      });

      tl.from(textSplit.words, {
        yPercent: 100,
        ease: "power2.inOut",
        duration: 1,
        stagger: 0.03,
      });

      // Hover animations for each project
      projectsRef.current.forEach((item) => {
        if (!item) return;

        const imageWrapper = item.querySelector<HTMLDivElement>(".project-img");
        if (!imageWrapper) return;

        const xTo = gsap.quickTo(imageWrapper, "x", { duration: 0.4, ease: "power3" });
        const yTo = gsap.quickTo(imageWrapper, "y", { duration: 0.4, ease: "power3" });

        const onMove = (e: MouseEvent) => {
          const rect = item.getBoundingClientRect();
          const x = e.clientX - rect.left - 150;
          const y = e.clientY - rect.top - 125;
          xTo(x);
          yTo(y);
        };

        const onEnter = () => gsap.to(imageWrapper, { autoAlpha: 1, scale: 1, duration: 0.3 });
        const onLeave = () => gsap.to(imageWrapper, { autoAlpha: 0, scale: 0.5, duration: 0.3 });

        item.addEventListener("mousemove", onMove);
        item.addEventListener("mouseenter", onEnter);
        item.addEventListener("mouseleave", onLeave);

        // Cleanup
        return () => {
          item.removeEventListener("mousemove", onMove);
          item.removeEventListener("mouseenter", onEnter);
          item.removeEventListener("mouseleave", onLeave);
        };
      });
    },
    { scope: containerRef }
  );

  // Toggle collapsible description
  const toggleDescription = (index: number) => {
    const description = descriptionsRef.current[index];
    if (!description) return;

    const isOpen = openIndexRef.current === index;

    if (isOpen) {
      gsap.to(description, {
        height: 0,
        duration: 0.4,
        ease: "power2.inOut",
        onComplete: () => {
          openIndexRef.current = null;
        },
      });
    } else {
      // Collapse any other open description
      if (openIndexRef.current !== null) {
        const openDesc = descriptionsRef.current[openIndexRef.current];
        if (openDesc)
          gsap.to(openDesc, { height: 0, duration: 0.4, ease: "power2.inOut" });
      }

      const contentHeight = description.scrollHeight;
      gsap.to(description, { height: contentHeight, duration: 0.4, ease: "power2.inOut" });
      openIndexRef.current = index;
    }
  };

  return (
    <section id="projects" className="section" ref={containerRef}>
      <div className="container space-y-14 lg:space-y-20">
        {/* Section Title */}
        <div className="project-title">
          <p className="shrink-0 uppercase font-medium text">Recent Projects</p>
          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-medium max-w-2xl lg:max-w-4xl mt-2 text">
            Selected works that demonstrate my approach to digital craft
          </h2>
        </div>

        {/* Project List */}
        <div className="divide-y divide-neutral-300 border-t border-neutral-300 flex-1 max-w-[80%]">
          {projectItems.map((item, index) => (
            <div
              key={item.id}
              ref={(el) => setProjectRef(el, index)}
              className="project-item p-8 hover:bg-neutral-50 focus:bg-neutral-50 transition-all hover:pl-12 cursor-pointer relative"
            >
              {/* Project title button */}
              <button
                className="text-left p-0 m-0"
                onClick={() => toggleDescription(index)}
              >
                <h3 className="text-4xl uppercase font-medium text">{item.title}</h3>
              </button>

              {/* Collapsible description */}
              <div
                ref={(el) => setDescriptionRef(el, index)}
                className="overflow-hidden"
                style={{ height: 0 }}
              >
                <p className="text-xl sm:text-2xl py-3">{item.description}</p>

                {/* Technologies */}
                <div className="mt-3 flex flex-wrap gap-2">
                  {item.technologies?.map((tech) => (
                    <span
                      key={tech}
                      className="bg-none border-2 border-black px-5 py-3 rounded-lg text-sm font-medium"
                      style={{
                        backdropFilter: "blur(6px)",
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hover image */}
              <div className="project-img absolute top-0 left-0 pointer-events-none opacity-0 scale-50 z-20 w-60 h-40">
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  className="w-full h-full object-cover"
                  hidden={openIndexRef.current === index}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
