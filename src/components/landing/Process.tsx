"use client";

import { Phone, Eye, FileText, HardHat } from "lucide-react";
import { SectionCTA } from "./SectionCTA";
import { useScrollReveal } from "./useScrollReveal";

const steps = [
  {
    icon: Phone,
    number: "1",
    title: "You Call or Fill Out the Form",
    description:
      "You talk to Patrick directly (not a sales rep). We schedule a free on-site visit within the week.",
  },
  {
    icon: Eye,
    number: "2",
    title: "Patrick Walks the Court With You",
    description:
      "I'll show you what's happening — cracks, drainage issues, surface wear — and explain exactly how we'll fix it. No pressure, no sales pitch.",
  },
  {
    icon: FileText,
    number: "3",
    title: "You Get a Detailed Quote in 48 Hours",
    description:
      "Clear pricing, timeline, and scope. No hidden fees. No surprises.",
  },
  {
    icon: HardHat,
    number: "4",
    title: "We Transform Your Court in 3–5 Days",
    description:
      "Grinding, crack repair, ASBA drainage test, filling, coating, striping. Your court looks and plays brand new.",
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
      <div className="absolute -right-12 top-1/2 -translate-y-1/2 text-[20rem] font-bold text-brand-blue/[0.03] leading-none select-none pointer-events-none hidden lg:block">
        4
      </div>

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-brand-blue mb-4">
            <span className="w-6 h-px bg-brand-blue" />
            How It Works
            <span className="w-6 h-px bg-brand-blue" />
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold text-brand-text leading-tight">
            We Handle Everything
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className="reveal-item relative"
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-7 left-[calc(50%+28px)] w-[calc(100%-56px)] h-px bg-gray-300" />
              )}

              <div className="text-center">
                <div className="relative inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-blue text-white mb-5">
                  <step.icon className="h-6 w-6" strokeWidth={1.5} />
                  <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-brand-green text-brand-navy text-xs font-bold flex items-center justify-center">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-brand-text mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-brand-text-muted leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        <SectionCTA />
      </div>
    </section>
  );
}
