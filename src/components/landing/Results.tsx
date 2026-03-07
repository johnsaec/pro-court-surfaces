"use client";

import Image from "next/image";
import { SectionCTA } from "./SectionCTA";
import { useScrollReveal } from "./useScrollReveal";

export function Results() {
  const ref = useScrollReveal();

  return (
    <section
      id="results"
      aria-label="Professional results showcase"
      className="py-24 sm:py-32 bg-white relative"
    >
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — Text */}
          <div className="reveal-item">
            <h2 className="text-3xl sm:text-5xl font-bold text-brand-navy leading-tight">
              Professional Results Every Time
            </h2>
            <p className="mt-6 text-brand-text-muted text-lg leading-relaxed max-w-lg">
              Our completed projects showcase the quality and attention to detail
              that sets us apart. From residential backyard courts to commercial
              facilities, every surface meets the highest standards.
            </p>
          </div>

          {/* Right — Before & After */}
          <div className="reveal-item" style={{ transitionDelay: "200ms" }}>
            <h3 className="text-lg font-bold text-brand-navy mb-6">
              Before &amp; After Transformation
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {/* Before */}
              <div>
                <div className="overflow-hidden rounded-2xl shadow-lg">
                  <Image
                    src="https://res.cloudinary.com/dwyd4f7lz/image/upload/f_auto,q_auto,w_600/v1759801129/IMG_0037_xclgpd.jpg"
                    alt="Before: cracked and worn court surface needing resurfacing"
                    width={600}
                    height={450}
                    className="w-full h-auto object-cover aspect-[4/3]"
                  />
                </div>
                <p className="mt-3 text-sm font-medium text-brand-blue text-center">
                  Before: Cracked &amp; Worn
                </p>
              </div>

              {/* After */}
              <div>
                <div className="overflow-hidden rounded-2xl shadow-lg">
                  <Image
                    src="https://res.cloudinary.com/dwyd4f7lz/image/upload/f_auto,q_auto,w_600/v1759800811/DJI_20250917112633_0423_D_kiqa0u.jpg"
                    alt="After: professionally resurfaced court with vibrant blue and green colors"
                    width={600}
                    height={450}
                    className="w-full h-auto object-cover aspect-[4/3]"
                  />
                </div>
                <p className="mt-3 text-sm font-medium text-brand-blue text-center">
                  After: Professional Finish
                </p>
              </div>
            </div>
          </div>
        </div>
        <SectionCTA />
      </div>
    </section>
  );
}
