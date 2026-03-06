"use client";

import Image from "next/image";
import { User, ShieldCheck, FileCheck, MapPin } from "lucide-react";
import { useScrollReveal } from "./useScrollReveal";

const differentiators = [
  {
    icon: User,
    title: "Owner-Operated",
    description:
      "You work directly with Patrick, the person doing the work. No sales reps, no middlemen.",
  },
  {
    icon: ShieldCheck,
    title: "Premium Materials",
    description:
      "Same professional-grade acrylic coatings used on tournament-level facilities.",
  },
  {
    icon: FileCheck,
    title: "Transparent Pricing",
    description:
      "Detailed quotes with line-item breakdowns. No surprise upcharges, ever.",
  },
  {
    icon: MapPin,
    title: "Central Texas Experts",
    description:
      "We know Austin soil, drainage, and climate — and how to build courts that last here.",
  },
];

export function WhyUs() {
  const ref = useScrollReveal();

  return (
    <section
      id="why-us"
      aria-label="Why choose Pro Court Surfaces"
      className="py-24 sm:py-36 bg-white"
    >
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Photo side */}
          <div className="relative order-2 lg:order-1 reveal-item">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://res.cloudinary.com/dwyd4f7lz/image/upload/f_auto,q_auto,w_800/v1759809485/IMG_0225_iaakk1.jpg"
                alt="Patrick, owner of Pro Court Surfaces, on site during a professional court resurfacing project"
                width={800}
                height={600}
                className="w-full h-auto object-cover"
              />
            </div>
            {/* Floating accent card */}
            <div className="absolute -bottom-6 -right-4 sm:-right-6 bg-brand-blue text-white rounded-xl px-5 py-4 shadow-xl">
              <div className="text-2xl font-bold">100+</div>
              <div className="text-xs text-white/70 font-medium">Courts Done</div>
            </div>
          </div>

          {/* Content side */}
          <div className="order-1 lg:order-2">
            <span className="inline-flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-brand-blue mb-4">
              <span className="w-6 h-px bg-brand-blue" />
              Why Pro Court
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold text-brand-text leading-tight">
              What makes Pro Court Surfaces different?
            </h2>
            <p className="mt-4 text-brand-text-muted text-lg">
              An owner-operated court resurfacing company based in Austin,
              Texas.
            </p>

            <div className="mt-10 space-y-6">
              {differentiators.map((item, i) => (
                <div
                  key={item.title}
                  className="reveal-item flex gap-4 group"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-brand-blue/5 text-brand-blue flex items-center justify-center group-hover:bg-brand-blue group-hover:text-white transition-colors duration-300">
                    <item.icon className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-bold text-brand-text">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm text-brand-text-muted leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
