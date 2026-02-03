"use client";
import { navItems } from "@/data/data";
import { useGSAP, gsap, ScrollTrigger } from "@/lib/gsap-util";
import React from "react";
import { Home, Briefcase, Mail } from "lucide-react";

export default function Header() {
  useGSAP(() => {
    const showAnim = gsap.timeline({ paused: true }).fromTo(
      ".header",
      { yPercent: 0 },
      {
        yPercent: -100,
        duration: 0.3,
        ease: "power2.inOut",
      }
    );

    ScrollTrigger.create({
      start: "top top",
      end: "max",
      onUpdate: (self) => {
        self.direction === 1 ? showAnim.play() : showAnim.reverse();
      },
    });
  });

  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
    href: string
  ) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const elem = document.getElementById(targetId);

    if (elem) {
      window.scrollTo({
        top: elem.offsetTop - 70, // smaller mobile header offset
        behavior: "smooth",
      });
    }
  };

  return (
    <header
      className="
        fixed top-0 left-0 w-full z-50 header
        bg-white/40 backdrop-blur-sm sm:backdrop-blur-md
        py-2 sm:py-4
      "
    >
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <span
          className="cursor-pointer whitespace-nowrap
          text-lg sm:text-2xl lg:text-3xl"
          onClick={() =>
            window.scrollTo({ top: 0, behavior: "smooth" })
          }
        >
          <span className="font-bold">Aun</span>
          <span className="font-light hidden sm:inline">
            {" "} | Software Engineer
          </span>
        </span>

        {/* Navigation */}
        <nav className="flex items-center gap-4 sm:gap-5">
        <ul className="flex items-center gap-3 sm:gap-5">
  {navItems.map((item) => {
    const Icon =
      item.href === "#home"
        ? Home
        : item.href === "#projects"
        ? Briefcase
        : Mail;

    return (
      <li key={item.id}>
        {/* Mobile: Icon button */}
        <button
          onClick={(e) => handleScroll(e, item.href)}
          className="
            sm:hidden
            p-2 rounded-lg
            hover:bg-black/10 transition
          "
          aria-label={item.label}
        >
          <Icon size={20} />
        </button>

        {/* Desktop: Text link */}
        <a
          href={item.href}
          onClick={(e) => handleScroll(e, item.href)}
          className="
            hidden sm:block
            uppercase font-medium
            text-sm sm:text-base
            hover:opacity-75 transition-opacity
            cursor-pointer
          "
        >
          {item.label}
        </a>
      </li>
    );
  })}
</ul>


          <button
            onClick={(e) => handleScroll(e, "#contact")}
            className="
              hidden lg:block
              bg-neutral-900 text-white uppercase
              px-5 py-3 rounded-lg
              hover:opacity-85 transition-opacity
            "
          >
            Contact
          </button>
        </nav>
      </div>
    </header>
  );
}
