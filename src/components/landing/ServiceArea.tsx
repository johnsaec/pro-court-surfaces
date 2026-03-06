"use client";

import { useScrollReveal } from "./useScrollReveal";

const cities = [
  "Austin",
  "Round Rock",
  "Cedar Park",
  "Georgetown",
  "Wimberley",
  "San Marcos",
  "Dripping Springs",
  "Kyle",
  "Buda",
  "Pflugerville",
  "Lakeway",
  "Bee Cave",
];

export function ServiceArea() {
  const ref = useScrollReveal();

  return (
    <section
      id="service-area"
      aria-label="Service area"
      className="py-24 sm:py-36 bg-brand-bg-alt relative overflow-hidden"
    >
      {/* Subtle radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,74,173,0.04),transparent_70%)] pointer-events-none" />

      <div ref={ref} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        <span className="inline-flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-brand-blue mb-4">
          <span className="w-6 h-px bg-brand-blue" />
          Service Area
          <span className="w-6 h-px bg-brand-blue" />
        </span>
        <h2 className="text-3xl sm:text-5xl font-bold text-brand-text leading-tight">
          What areas does Pro Court Surfaces serve?
        </h2>
        <p className="mt-6 text-lg text-brand-text-muted leading-relaxed max-w-xl mx-auto">
          Proudly resurfacing courts across the Austin metro and Central Texas
          Hill Country.
        </p>

        {/* City pills */}
        <div className="mt-10 flex flex-wrap justify-center gap-2.5">
          {cities.map((city, i) => (
            <span
              key={city}
              className="reveal-item inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-gray-200 text-sm font-medium text-brand-text hover:border-brand-blue hover:text-brand-blue transition-colors duration-200 cursor-default shadow-sm"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-brand-green" />
              {city}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
