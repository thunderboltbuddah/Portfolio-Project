"use client";

import { useState } from "react";
import {
  Users,
  Activity,
  Eye,
  Layers,
  Cpu,
  Globe,
  BarChart,
  Calendar,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Leaf,
} from "lucide-react";

export const projects = [
  {
    title: "Sales & Retail XR Store",
    video: "https://www.youtube.com/embed/ikSIS_OIP5U?si=c8WXEtPYBw1l8fXF",
    sections: [
      {
        heading: "Why is this needed?",
        subheading:
          "Shoppers are flooded with online information. XR lets customers experience your products in an immersive, interactive store before purchasing.",
      },
      {
        heading: "What this is about",
        subheading:
          "An immersive virtual store allowing users to explore, interact with products, and engage with your brand in 3D.",
      },
      {
        heading: "Key Features",
    bullets: [
  {
    icon: <Eye className="w-5 h-5 text-blue-400" />,
    title: "Interactive Exploration",
    description:
      "Customers can walk through a virtual store and inspect products from every angle.",
  },
  {
    icon: <Users className="w-5 h-5 text-green-400" />,
    title: "Enhanced Engagement",
    description:
      "A memorable, immersive shopping experience beyond traditional e-commerce.",
  },
  {
    icon: <Layers className="w-5 h-5 text-orange-400" />,
    title: "Brand Differentiation",
    description:
      "Helps brands stand out using cutting-edge XR technology.",
  },
  {
    icon: <Activity className="w-5 h-5 text-pink-400" />,
    title: "Display Banners & Share Content",
    description:
      "Easily share promotional videos, product demos, and PDFs within the virtual store.",
  },
  {
    icon: <CreditCard className="w-5 h-5 text-yellow-400" />,
    title: "Sales & Easy Checkout Integration",
    description:
      "Enable in-experience purchases with seamless checkout for a smooth customer journey.",
  },
  {
    icon: <Globe className="w-5 h-5 text-cyan-400" />,
    title: "VR & Non-VR Access",
    description:
      "The store experience is accessible in full VR or standard browser mode, usable for all customers.",
  },
],

      },
    ],
  },
  {
    title: "XR Training & Visual Learning",
    video: "https://www.youtube.com/embed/Pv_fudcAg7A?si=BTnEAjXqGIsHk09t",
    sections: [
      {
        heading: "Why is this needed?",
        subheading:
          "Traditional manuals and slides are limited. XR training shows how components and systems work visually in 3D, improving understanding and retention.",
      },
      {
        heading: "What this is about",
        subheading:
          "An interactive XR training environment for factories and organizations to showcase processes, components, and systems safely and effectively.",
      },
      {
        heading: "Key Features",
        bullets: [
          {
            icon: <Cpu className="w-5 h-5 text-red-400" />,
            title: "Visual Learning",
            description:
              "See how components and machinery work together with step-by-step 3D walkthroughs.",
          },
          {
            icon: <Eye className="w-5 h-5 text-blue-400" />,
            title: "Safe Training",
            description:
              "Explore systems without operational downtime or safety risks.",
          },
          {
            icon: <Users className="w-5 h-5 text-green-400" />,
            title: "Faster Knowledge Retention",
            description:
              "Interactive visual learning improves comprehension over manuals or slides.",
          },
          {
            icon: <Layers className="w-5 h-5 text-orange-400" />,
            title: "Scalable Delivery",
            description:
              "Consistent training experience for multiple teams and locations.",
          },
          
          {
            icon: <Globe className="w-5 h-5 text-cyan-400" />,
            title: "VR & Non-VR Access",
            description:
              "Training can be accessed in full VR or standard browser mode for all learners.",
          },
        ],
      },
    ],
  },
  {
    title: "Metaverse Campus",
    video: "https://www.youtube.com/embed/yERxym4K6tw?si=YKTsh_dZ_K1KDPfS",
    sections: [
      {
        heading: "Why is this needed?",
        subheading:
          "People are overwhelmed with information. Metaverse Campus helps organisations deliver education, training, and events in a fully immersive 3D environment to cut through the noise.",
      },
      {
        heading: "What this is about",
        subheading:
          "A fully configurable 3D campus where learners, educators, and staff can engage, explore content, and interact globally, all from a browser.",
      },
      {
        heading: "Key Features",
        bullets: [
          {
            icon: <Users className="w-5 h-5 text-green-400" />,
            title: "Engagement & Inclusion",
            description:
              "Interactive 3D campus that brings content to life for all learners.",
          },
          {
            icon: <Calendar className="w-5 h-5 text-blue-400" />,
            title: "Elevated Events",
            description:
              "Host career days, onboarding, and virtual events in a fresh, innovative way.",
          },
          {
            icon: <BarChart className="w-5 h-5 text-purple-400" />,
            title: "Virtual Campus Analytics",
            description:
              "Collect insights and data to continuously improve your digital campus experience.",
          },
          
          {
            icon: <Globe className="w-5 h-5 text-orange-400" />,
            title: "Browser-Based Access",
            description:
              "Learners can access the campus from PC, laptop, or tablet without special hardware.",
          },
          {
            icon: <Activity className="w-5 h-5 text-pink-400" />,
            title: "Stream Lectures & Share Content",
            description:
              "Easily stream live lectures, upload PDFs, and share videos to enhance learning.",
          },
          {
            icon: <Globe className="w-5 h-5 text-cyan-400" />,
            title: "VR & Non-VR Access",
            description:
              "The experience is accessible in full VR or standard browser mode for all learners.",
          },
        ],
      },
    ],
  },
];


export default function XRProjects() {
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  };

  const project = projects[current];

  return (
    <section className="py-20 flex flex-col items-center justify-center text-center">
      {/* Title */}
      <h2 className="text-4xl md:text-6xl font-semibold mb-4">XR Projects</h2>

      {/* Subheading */}
      <p className="max-w-xl text-neutral-500 text-base md:text-lg mb-12">
        Real-world XR solutions for sales, retail, and immersive learning
      </p>
 {/* Navigation */}
        <div className="flex justify-between items-center mt-6 mb-6 w-full max-w-5xl px-6">
          <button
            onClick={prevSlide}
            className="p-3 rounded-full border hover:bg-neutral-100 transition"
          >
            <ChevronLeft />
          </button>

          <span className="text-sm text-neutral-400">
            {current + 1} / {projects.length}
          </span>

          <button
            onClick={nextSlide}
            className="p-3 rounded-full border hover:bg-neutral-100 transition"
          >
            <ChevronRight />
          </button>
        </div>
      {/* Carousel */}
      <div className="relative w-full max-w-5xl px-6">
        {/* Card */}
        <div
          className="
            border rounded-3xl
            p-8 md:p-10
            hover:shadow-xl
            transition-shadow duration-300
            w-full
            mx-auto
            flex flex-col items-start
            h-auto
          "
        >
            
          {/* Project Title */}

          <h3 className="uppercase tracking-widest text-sm font-bold text-blue-400 mb-6">
            {project.title}
          </h3>

          {/* Video */}
          <div className="relative w-full h-72 md:h-96 rounded-2xl overflow-hidden mb-8">
            <iframe
              src={project.video}
              title={project.title}
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {/* Sections */}
          {project.sections.map((section, i) => (
            <div key={i} className="mb-8 text-left">
              <h4 className="font-semibold text-xl mb-3">{section.heading}</h4>
              <p className="text-neutral-600 mb-4">{section.subheading}</p>

              {section.bullets && (
                <ul className="space-y-4">
                  {section.bullets.map((bullet, j) => (
                    <li key={j} className="flex items-start gap-4">
                      <span className="mt-1">{bullet.icon}</span>
                      <div>
                        <h5 className="font-semibold text-neutral-800">
                          {bullet.title}
                        </h5>
                        <p className="text-neutral-600 text-sm md:text-base">
                          {bullet.description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

       
      </div>
    </section>
  );
}
