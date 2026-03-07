"use client";

import Link from "next/link";
import { PaintBucket, Layers, Palette } from "lucide-react";
import { SectionCTA } from "./SectionCTA";
import { useScrollReveal } from "./useScrollReveal";

const services = [
  {
    icon: PaintBucket,
    title: "Resurfacing",
    description:
      "Breathe new life into cracked, faded courts with a full professional resurface. We handle everything from crack repair to final striping.",
    accent: "from-brand-blue to-blue-700",
  },
  {
    icon: Layers,
    title: "New Court Surfacing",
    description:
      "First-time acrylic surface applications on fresh concrete slabs. Tournament-grade coatings engineered for Texas conditions.",
    accent: "from-brand-navy to-brand-blue",
  },
  {
    icon: Palette,
    title: "Custom Color & Design",
    description:
      "Your court, your colors, your lines. Multi-color designs with professional striping for pickleball, tennis, and multi-sport courts.",
    accent: "from-green-600 to-brand-green",
  },
];

export function Services() {
  const ref = useScrollReveal();

  return (
    <section
      id="services"
      aria-label="Our services"
      className="py-24 sm:py-36 bg-white relative overflow-hidden"
    >
      {/* Decorative dot grid */}
      <div
        className="absolute top-0 right-0 w-1/3 h-full opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, #004AAD 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-brand-blue mb-4">
            <span className="w-6 h-px bg-brand-blue" />
            Services
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold text-brand-text leading-tight">
            What court surfacing services does Pro Court Surfaces offer?
          </h2>
          <p className="mt-4 text-brand-text-muted text-lg max-w-xl">
            Pro Court Surfaces specializes in pickleball and tennis court
            resurfacing across Greater Austin and Central Texas.{" "}
            <Link href="/commercial" className="text-brand-blue hover:underline">
              Working with a GC? See our subcontractor page
            </Link>.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <div
              key={service.title}
              className="reveal-item group relative bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              {/* Gradient top edge on hover */}
              <div
                className={`absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r ${service.accent} rounded-t-2xl scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500`}
              />

              <div className="w-12 h-12 rounded-xl bg-brand-blue/5 flex items-center justify-center text-brand-blue mb-6 group-hover:bg-brand-blue group-hover:text-white transition-colors duration-300">
                <service.icon className="h-6 w-6" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold text-brand-text mb-3">
                {service.title}
              </h3>
              <p className="text-brand-text-muted leading-relaxed text-[0.94rem]">
                {service.description}
              </p>
            </div>
          ))}
        </div>
        <SectionCTA />
      </div>
    </section>
  );
}
