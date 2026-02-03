"use client";
import React, { useState, useEffect } from "react";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Works from "@/components/Works";
import Projects from "@/components/Projects";
import Process from "@/components/Process";
import Awards from "@/components/Awards";
import Testimonials from "@/components/Testimonials";
import WorkWith from "@/components/WorkWith";
import ReactLenis from "lenis/react";
import Preloader from "@/components/Preloader";
import { Scroll } from "lucide-react";
import ScrollSection from "@/components/ScrollSection";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This waits for ALL images, fonts, and 3D models to finish
    if (document.readyState === "complete") {
      setLoading(false);
    } else {
      const onPageLoad = () => {
        // Small timeout for a smooth transition
        setTimeout(() => setLoading(false), 800);
      };

      window.addEventListener("load", onPageLoad);
      return () => window.removeEventListener("load", onPageLoad);
    }
  }, []);

  return (
    <>
      {loading && <Preloader />}
      
      {/* We keep the content in the DOM but hidden for SEO, 
          then fade it in smoothly once ready */}
      <div className={loading ? "opacity-0" : "opacity-100 transition-opacity duration-1000"}>
        <ReactLenis root>
          <Hero />
          <ScrollSection />
          <About />
          <Process />
          <WorkWith />
          <Works />
          <Projects />
          <Awards />
          <Testimonials />
        </ReactLenis>
      </div>
    </>
  );
}