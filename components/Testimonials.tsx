"use client";

import { testimonialsItems } from "@/data/data";
import { gsap, useGSAP, SplitText } from "@/lib/gsap-util";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const testimonialRef = useRef<HTMLDivElement | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");

  const total = testimonialsItems.length;
  const item = testimonialsItems[currentIndex];

  /* ------------------ Title Animation ------------------ */
  useGSAP(
    () => {
      const textSplit = SplitText.create(".text", {
        type: "words lines",
        linesClass: "text-line",
      });

      gsap.from(textSplit.words, {
        yPercent: 100,
        ease: "power2.inOut",
        duration: 1,
        stagger: 0.03,
        scrollTrigger: {
          trigger: ".testimonials-title",
          start: "top center",
        },
      });
    },
    { scope: containerRef }
  );

  /* ------------------ Slide Animation ------------------ */
  useGSAP(
    () => {
      if (!testimonialRef.current) return;

      gsap.fromTo(
        testimonialRef.current,
        {
          x: direction === "right" ? 980 : -980,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
        }
      );
    },
    { dependencies: [currentIndex] }
  );

  /* ------------------ Handlers ------------------ */
  const next = () => {
    setDirection("right");
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const prev = () => {
    setDirection("left");
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  return (
    <section className="section" ref={containerRef}>
      <div className="container">
        {/* Title */}
        <div className="sm:mx-auto testimonials-title">
          <div className="flex gap-5 items-end">
            <h2 className="section-title text">What</h2>
            <p className="max-w-60 uppercase font-medium hidden md:block text">
              Freelance clients who I’ve had the pleasure to work with.
            </p>
          </div>

          <h2 className="section-title text">people say</h2>
        </div>

        {/* Testimonial Banner */}
        <div className="border rounded-2xl container mt-16 lg:mt-24 overflow-hidden">
          <div className="divide-y">
            {/* Animated Testimonial */}
        <div
  key={currentIndex}
  ref={testimonialRef}
  className="grid gap-5 lg:grid-cols-[0.8fr_1fr] lg:items-center p-4 sm:p-6"
>
  {/* Image */}
  <div className="max-w-115 w-full h-52 sm:h-80 mx-auto">
    <Image
      src={item.img}
      alt={item.name}
      width={640}
      height={965}
      className="grayscale opacity-60 rounded-xl w-full h-full object-cover"
    />
  </div>

  {/* Content */}
  <div className="border-t lg:border-l lg:border-t-0 lg:pl-4 sm:pl-5">
    <div className="flex flex-wrap py-3 sm:py-5 px-2.5 gap-3 justify-between">
      <p className="text-base sm:text-lg uppercase">
        <span className="font-medium">Name:</span> {item.name}
      </p>
      <p className="text-base sm:text-lg uppercase">
        <span className="font-medium">Company:</span> {item.company}
      </p>
      <p className="text-base sm:text-lg uppercase">
        <span className="font-medium">Project:</span> {item.project}
        {item.contact && (
          <Link
            href={item.contact}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium uppercase flex items-center gap-2 text-sm sm:text-base"
          >
            Contact
          </Link>
        )}
      </p>
    </div>

    <p className="text-base sm:text-xl">{item.desc}</p>
  </div>
</div>


            {/* Controls */}
            <div className="flex justify-between items-center px-6 py-4">
              <button onClick={prev} aria-label="Previous testimonial">
                <ArrowBigLeft
                  size={40}
                  className="hover:fill-neutral-900 transition-colors"
                />
              </button>

              <span className="uppercase text-sm tracking-widest">
                {String(currentIndex + 1).padStart(2, "0")} /{" "}
                {String(total).padStart(2, "0")}
              </span>

              <button onClick={next} aria-label="Next testimonial">
                <ArrowBigRight
                  size={40}
                  className="hover:fill-neutral-900 transition-colors"
                />
              </button>
            </div>
          </div>
        </div>

        <div>
          <br />
          <br />
          <br />
        </div>
      </div>
    </section>
  );
}
