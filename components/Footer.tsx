"use client";
import React from "react";
import dynamic from "next/dynamic";
import ShrekModel from "./ShrekEasterEgg";
// Import the specific Easter Egg version
const Rendering = dynamic(() => import('./ShrekEasterEgg'), { ssr: false });

export default function Footer() {
  return (
    <footer id="contact" className="bg-neutral-900 h-[70vh] text-neutral-50 w-full">
      <div className="container py-8 flex flex-wrap flex-col justify-center min-h-full">
        
        <div className="flex flex-wrap items-center gap-7 sm:gap-14 lg:gap-20">
          
          {/* LEFT SIDE (Original Margins Restored) */}
          <div>
            <div className="flex gap-2 mb-3 sm:gap-5">
              <div className="grid gap-1">
                {["home", "work", "contact"].map((label) => (
                  <a href="#" className="uppercase hover:underline" key={label}>{label}</a>
                ))}
              </div>
              <div className="grid gap-1">
                {["instagram", "linkedin", "awwwards"].map((label) => (
                  <a href="#" key={label} className="uppercase hover:underline">{label}</a>
                ))}
              </div>
            </div>
            
            <p>&copy; Made with ❤️ with Next.JS and Three.js {new Date().getFullYear()}.</p>
          </div>

          {/* RIGHT SIDE (Split for Text and Easter Egg) */}
          <div className="flex-1 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-6">
                <h3 className="text-4xl font-medium uppercase md:text-6xl lg:text-7xl xl:text-8xl">
                  let's chat
                </h3>
              </div>
              <p className="max-w-md mt-2 opacity-80">
                Have a project in mind, a question, or just want to say hello? HMU !
              </p>
              <div className="mt-4 text-sm">
                <p>Email: <a href="mailto:aownmuhammad070@gmail.com" className="underline">aownmuhammad070@gmail.com</a></p>
                <p>Based worldwide · Working remotely</p>
                <p>p.s dont touch shrek</p>
              </div>
            </div>

            {/* THE EASTER EGG */}
          <div className="w-full max-w-[300px] aspect-square relative overflow-hidden">

          
               <ShrekModel resourcePath="/models/cat.glb" />
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
}