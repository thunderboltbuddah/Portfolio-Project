"use client";
import React from "react";
import dynamic from "next/dynamic";
import { Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
import { navItems } from "@/data/data";

// Import the specific Easter Egg version
const ShrekModel = dynamic(() => import('./ShrekEasterEgg'), { ssr: false });

export default function Footer() {
  return (
    // Changed h-[70vh] to min-h-[70vh] so it can expand on small phones if needed
    <footer id="contact" className="bg-neutral-900 min-h-[70vh] text-neutral-50 w-full flex items-center">
      <div className="container py-12 flex flex-col justify-center">
        
        {/* Changed to flex-col for mobile, flex-row for desktop */}
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-20">
          
          {/* LEFT SIDE */}
          <div className="w-full lg:w-auto">
            <div className="flex gap-10 mb-6 sm:gap-14">
              <div className="grid gap-1">
        {navItems.map((item) => (
          <a
            key={item.id}            // unique key
            href={`${item.href}`}     // link points to the id
            className="uppercase text-sm hover:underline"
          >
            {item.label}             {/* display the name */}
          </a>
        ))}
      </div>

              <div className="grid gap-1">
               <div className="flex items-center gap-4">
      {/* GitHub */}
      <Link
        href="https://github.com/thunderboltbuddah"
        target="_blank"
        aria-label="GitHub"
        className="text-gray-400 hover:text-gray-500 transition-colors"
      >
        <Github size={24} />
      </Link>

      {/* LinkedIn */}
      <Link
        href="https://linkedin.com/in/aun-muhammad-hanif"
        target="_blank"
        aria-label="LinkedIn"
        className="text-gray-400 hover:text-gray-500 transition-colors"
      >
        <Linkedin size={24} />
      </Link>

      {/* Twitter */}
    
    </div>
              </div>
            </div>
            
            <p className="text-xs opacity-60">&copy; Made with ❤️ with Next.JS and Three.js {new Date().getFullYear()}.</p>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex-1 flex flex-col sm:flex-row items-center justify-between w-full">
            <div className="text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-6">
                {/* FONT SIZE FIX: 
                   text-4xl on mobile (phone)
                   md:text-6xl+ restored for desktop
                */}
                <h3 className="text-4xl font-medium uppercase md:text-6xl lg:text-7xl xl:text-8xl leading-none">
                  let's chat
                </h3>
              </div>
              <p className="max-w-md mt-4 text-sm md:text-base opacity-80">
                Have a project in mind, a question, or just want to say hello? HMU !
              </p>
              <div className="mt-6 text-xs md:text-sm space-y-1">
                <p>Email: <a href="mailto:aownmuhammad070@gmail.com" className="underline">aownmuhammad070@gmail.com</a></p>
                <p>Based worldwide · Working remotely</p>
                <p className="italic text-neutral-500">p.s dont touch shrek</p>
              </div>
            </div>

            {/* THE EASTER EGG - Adjusted size for mobile */}
            <div className="w-full max-w-[200px] md:max-w-[300px] aspect-square relative mt-8 sm:mt-0">
               <ShrekModel resourcePath="/models/cat.glb" />
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
}