"use client";
import { gsap, useGSAP } from "@/lib/gsap-util";
import { useRef, useEffect } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    if (!cursorRef.current) return;

    gsap.set(cursorRef.current, { xPercent: -50, yPercent: -50 });

    const xTo = gsap.quickTo(cursorRef.current, "x", { duration: 0.15, ease: "power3" });
    const yTo = gsap.quickTo(cursorRef.current, "y", { duration: 0.15, ease: "power3" });
    const scaleXTo = gsap.quickTo(cursorRef.current, "scaleX", { duration: 0.2, ease: "power3" });
    const scaleYTo = gsap.quickTo(cursorRef.current, "scaleY", { duration: 0.2, ease: "power3" });
    const rotationTo = gsap.quickTo(cursorRef.current, "rotation", { duration: 0.2, ease: "power3" });

    let lastMouse = { x: 0, y: 0 };
const onEnter = () => {
  gsap.to(cursorRef.current, {
    scale: 1.8, // Physical magnification
    backdropFilter: "blur(2px) saturate(200%) contrast(120%)", 
    duration: 0.4,
    ease: "power3.out",
  });
};

    const moveCursor = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const dx = clientX - lastMouse.x;
      const dy = clientY - lastMouse.y;
      const velocity = Math.sqrt(dx * dx + dy * dy);
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);
      
      const stretch = Math.min(velocity * 0.012, 0.4); 
      
      xTo(clientX);
      yTo(clientY);
      scaleXTo(1 + stretch);
      scaleYTo(1 - (stretch * 0.5));
      rotationTo(angle);

      lastMouse = { x: clientX, y: clientY };
    };

    // Click Animation: Compression effect
    const handleMouseDown = () => {
      gsap.to(cursorRef.current, {
        scale: 0.8,
        duration: 0.1,
        ease: "power2.out"
      });
    };
    
    const handleMouseUp = () => {
      gsap.to(cursorRef.current, {
        scale: 1,
        duration: 0.4,
        ease: "elastic.out(1, 0.3)"
      });
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  });

  return (
    <div
      ref={cursorRef}
      className="

      hidden md:block fixed pointer-events-none z-[9999]
      shadow-[0_10px_40px_rgba(0,0,0,0.15),0_2px_10px_rgba(0,0,0,0.1),inset_0_0_15px_rgba(255,255,255,0.5)]
       top-0 left-0
        w-14 h-14
    
       
        rounded-full
        backdrop-blur-[1px]
        /* THE GLASS PHYSICS */
      
        
        /* THE VISIBILITY BORDER (Works on white surfaces) */
        /* A very thin dark-ish border plus a bright inner edge */
       
       
        shadow-[
          inset_0_0_12px_rgba(255,255,255,0.6),
          0_10px_30px_-5px_rgba(0,0,0,0.2),
          0_4px_10px_-2px_rgba(0,0,0,0.1)
        ]
        
        will-change-transform
        
        bg-white/5
  backdrop-blur-[2px]
  backdrop-saturate-[200%]
  backdrop-contrast-[120%]
        /* The Specular Reflection */
        before:absolute before:top-[15%] before:left-[20%] 
        before:w-[25%] before:h-[15%] 
        before:bg-white/60 before:rounded-[100%] before:blur-[1px]
        before:rotate-[-15deg]
      "
    />
  );
}