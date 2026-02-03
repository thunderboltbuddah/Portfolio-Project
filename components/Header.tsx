"use client";
import { navItems } from "@/data/data";
import { useGSAP, gsap, ScrollTrigger } from "@/lib/gsap-util";

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

  // Smooth scroll handler
  const handleScroll = (e, href) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const elem = document.getElementById(targetId);
    
    if (elem) {
      window.scrollTo({
        top: elem.offsetTop - 80, // Adjust this number for your header height
        behavior: "smooth",
      });
    }
  };

  return (
    <header className="fixed top-0 left-0 bg-white/40 backdrop-blur-md w-full py-4 z-50 header">
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <span className="text-2xl sm:text-3xl cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          <span className="font-bold">Aun</span>
          <span className="font-light"> | Software Engineer</span>
        </span>

        {/* Nav */}
        <nav className="flex items-center gap-5">
          <ul className="flex flex-col sm:flex-row sm:items-center sm:gap-5">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  onClick={(e) => handleScroll(e, item.href)}
                  className="uppercase font-medium hover:opacity-75 transition-opacity cursor-pointer"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <button 
            onClick={(e) => handleScroll(e, "#contact")}
            className="bg-neutral-900 text-white uppercase hidden lg:block px-5 py-3 rounded-lg hover:opacity-85 transition-opacity"
          >
            Contact
          </button>
        </nav>
      </div>
    </header>
  );
}