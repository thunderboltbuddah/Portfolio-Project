"use client";
import { companyLogos } from "@/data/data";
import Image from "next/image";
import React from "react";
import Marquee from "react-fast-marquee";
export default function WorkWith() {
  return (
    <section className="py-20">
      <div>
        <p className="text-xl font-medium text-center uppercase mb-9">
          Technologies I work with
        </p>
        <div>
          <Marquee autoFill={true}>
            {companyLogos.map((logo) => (
              <div className="px-9 lg:px-16" key={logo.id}>
                <Image
                
                  src={logo.icon}
                  alt="logo"
                  width={140}
                  height={39}
                  className="w-32 h-32 grayscale opacity-60"
                />
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}


