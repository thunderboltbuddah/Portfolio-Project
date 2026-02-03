"use client";
import { projectItems } from "@/data/data";
import { useGSAP, gsap, SplitText } from "@/lib/gsap-util";
import Image from "next/image";
import { useRef } from "react";

export default function Projects() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const projectsRef = useRef<Array<HTMLDivElement | null>>([]);
  const descriptionsRef = useRef<Array<HTMLDivElement | null>>([]);
  const openIndexRef = useRef<number | null>(null);

  const setProjectRef = (el: HTMLDivElement | null, index: number) => {
    projectsRef.current[index] = el;
  };

  const setDescriptionRef = (el: HTMLDivElement | null, index: number) => {
    descriptionsRef.current[index] = el;
  };

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const textSplit = SplitText.create(".text", {
        type: "words lines",
        linesClass: "text-line",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".project-title",
          start: "top 80%", // Adjusted for better mobile triggering
        },
      });

      tl.from(textSplit.words, {
        yPercent: 100,
        ease: "power2.inOut",
        duration: 1,
        stagger: 0.03,
      });

      projectsRef.current.forEach((item) => {
        if (!item) return;

        const imageWrapper = item.querySelector<HTMLDivElement>(".project-img");
        if (!imageWrapper) return;

        const xTo = gsap.quickTo(imageWrapper, "x", { duration: 0.4, ease: "power3" });
        const yTo = gsap.quickTo(imageWrapper, "y", { duration: 0.4, ease: "power3" });

        const onMove = (e: MouseEvent) => {
          const rect = item.getBoundingClientRect();
          const x = e.clientX - rect.left - 120;
          const y = e.clientY - rect.top - 80;
          xTo(x);
          yTo(y);
        };

        const onEnter = () => gsap.to(imageWrapper, { autoAlpha: 1, scale: 1, duration: 0.3 });
        const onLeave = () => gsap.to(imageWrapper, { autoAlpha: 0, scale: 0.5, duration: 0.3 });

        // Only attach mouse listeners if NOT on a touch device
        if (window.matchMedia("(pointer: fine)").matches) {
          item.addEventListener("mousemove", onMove);
          item.addEventListener("mouseenter", onEnter);
          item.addEventListener("mouseleave", onLeave);
        }
      });
    },
    { scope: containerRef }
  );

  const toggleDescription = (index: number) => {
    const description = descriptionsRef.current[index];
    if (!description) return;
    const isOpen = openIndexRef.current === index;

    if (isOpen) {
      gsap.to(description, { height: 0, duration: 0.4, ease: "power2.inOut" });
      openIndexRef.current = null;
    } else {
      if (openIndexRef.current !== null) {
        const openDesc = descriptionsRef.current[openIndexRef.current];
        if (openDesc) gsap.to(openDesc, { height: 0, duration: 0.4, ease: "power2.inOut" });
      }
      const contentHeight = description.scrollHeight;
      gsap.to(description, { height: contentHeight, duration: 0.4, ease: "power2.inOut" });
      openIndexRef.current = index;
    }
  };

  return (
    <section id="projects" className="section py-10 md:py-20" ref={containerRef}>
      <div className="container space-y-10 lg:space-y-20">
        
        {/* Responsive Section Title */}
        <div className="project-title px-4 md:px-0">
          <p className="uppercase text-xs md:text-sm font-bold tracking-widest text-neutral-500 text">Recent Projects</p>
          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-medium max-w-full lg:max-w-4xl mt-2 text leading-tight">
            Selected works that demonstrate my approach to digital craft
          </h2>
        </div>

        {/* Project List: Removed the fixed 80% width on mobile for better space */}
        <div className="divide-y divide-neutral-300 border-t border-neutral-300 w-full lg:max-w-[85%]">
          {projectItems.map((item, index) => (
            <div
              key={item.id}
              ref={(el) => setProjectRef(el, index)}
              className="project-item group px-4 py-6 md:p-8 hover:bg-neutral-50 transition-all cursor-pointer relative"
              onClick={() => toggleDescription(index)}
            >
              <div className="flex justify-between items-center">
                {/* Responsive Project Title */}
                <h3 className="text-xl sm:text-3xl text-blue-300 md:text-4xl uppercase font-medium text group-hover:translate-x-2 transition-transform duration-300">
                  {item.title}
                </h3>
                <span className="text-2xl md:hidden opacity-40">+</span>
              </div>

              <div
                ref={(el) => setDescriptionRef(el, index)}
                className="overflow-hidden"
                style={{ height: 0 }}
              >
                <p className="text-base sm:text-xl md:text-2xl py-3 text-neutral-700 leading-relaxed">
                  {item.description}
                </p>

                {/* Smaller Tech Badges for Mobile */}
                <div className="mt-3 flex flex-wrap gap-2 pb-2">
                  {item.technologies?.map((tech) => (
                    <span
                      key={tech}
                      className="border border-black px-3 py-1.5 md:px-5 md:py-3 rounded-full text-[10px] md:text-sm font-bold uppercase tracking-tighter md:tracking-normal"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hover Image: Only visible on desktop via CSS */}
              <div className="project-img hidden md:block absolute top-0 left-0 pointer-events-none opacity-0 scale-50 z-20 w-60 h-40">
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  className="w-full h-full object-cover rounded-lg shadow-2xl"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}