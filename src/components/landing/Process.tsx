"use client";

import { ClipboardCheck, FileText, HardHat, Trophy } from "lucide-react";
import { useScrollReveal } from "./useScrollReveal";

const steps = [
  {
    icon: ClipboardCheck,
    number: "01",
    title: "Assess",
    description: "We inspect your court and discuss your vision.",
  },
  {
    icon: FileText,
    number: "02",
    title: "Quote",
    description: "You get a detailed, transparent quote within 48 hours.",
  },
  {
    icon: HardHat,
    number: "03",
    title: "Surface",
    description: "Our crew transforms your court in 3 to 5 days.",
  },
  {
    icon: Trophy,
    number: "04",
    title: "Play",
    description: "Step onto a court that looks and plays brand new.",
  },
];

export function Process() {
  const ref = useScrollReveal();

  return (
    <section
      id="process"
      aria-label="Our process"
      className="py-24 sm:py-36 bg-brand-bg-alt relative overflow-hidden"
    >
      {/* Large decorative number */}
      <div className="absolute -right-12 top-1/2 -translate-y-1/2 text-[20rem] font-bold text-brand-blue/[0.03] leading-none select-none pointer-events-none hidden lg:block">
        4
      </div>

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-brand-blue mb-4">
            <span className="w-6 h-px bg-brand-blue" />
            Process
            <span className="w-6 h-px bg-brand-blue" />
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold text-brand-text leading-tight">
            How does the court resurfacing process work?
          </h2>
          <p className="mt-4 text-brand-text-muted text-lg">
            Most resurfacing projects are completed in 3 to 5 working days.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className="reveal-item relative"
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              {/* Connector line — hidden on mobile and last item */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-7 left-[calc(50%+28px)] w-[calc(100%-56px)] h-px bg-gray-300" />
              )}

              <div className="text-center">
                <div className="relative inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-blue text-white mb-5">
                  <step.icon className="h-6 w-6" strokeWidth={1.5} />
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-brand-green text-brand-navy text-[0.6rem] font-bold flex items-center justify-center">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-brand-text">
                  {step.title}
                </h3>
                <p className="mt-2 text-brand-text-muted leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
