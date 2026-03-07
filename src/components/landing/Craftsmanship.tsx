"use client";

import { CheckCircle } from "lucide-react";
import { SectionCTA } from "./SectionCTA";
import { useScrollReveal } from "./useScrollReveal";

const features = [
  {
    title: "Quality Materials",
    description:
      "Industry-leading acrylic coatings and professional-grade materials for lasting performance.",
  },
  {
    title: "Expert Installation",
    description:
      "Professional craftsmanship with attention to detail for perfect court surfaces.",
  },
  {
    title: "Long-Term Value",
    description:
      "Durable surfaces designed to withstand play and weather for years of reliable use.",
  },
];

export function Craftsmanship() {
  const ref = useScrollReveal();

  return (
    <section
      id="craftsmanship"
      aria-label="Expert craftsmanship"
      className="relative py-20 sm:py-28 overflow-hidden"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://res.cloudinary.com/dwyd4f7lz/image/upload/f_auto,q_auto,w_1600/v1762354561/3_color_straight_h4nhiw.heic)",
        }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-brand-navy/85" />

      <div ref={ref} className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
          Expert Craftsmanship You Can Trust
        </h2>
        <p className="mt-4 text-white/75 text-lg max-w-2xl mx-auto leading-relaxed">
          With over two years in the industry, we bring fresh expertise and a
          commitment to quality. Using only best-in-class materials, our team
          ensures every court is built or resurfaced for durability, performance,
          and lasting play.
        </p>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-5">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className="reveal-item bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center"
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <CheckCircle className="mx-auto h-10 w-10 text-brand-green mb-4" strokeWidth={1.5} />
              <h3 className="text-lg font-bold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-white/70 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
        <SectionCTA dark />
      </div>
    </section>
  );
}
