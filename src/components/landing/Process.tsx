import { ClipboardCheck, FileText, HardHat, Trophy } from "lucide-react";

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
  return (
    <section id="process" aria-label="Our process" className="py-24 sm:py-32 bg-[#FAFAF8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] text-center">
          How It Works
        </h2>
        <p className="mt-4 text-center text-[#1A1A1A]/60 max-w-xl mx-auto">
          Most resurfacing projects are completed in 3 to 5 working days.
        </p>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6">
          {steps.map((step) => (
            <div key={step.number} className="relative text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-blue/5 text-brand-blue mb-5">
                <step.icon className="h-7 w-7" strokeWidth={1.5} />
              </div>
              <div className="text-xs font-bold text-brand-blue/40 tracking-widest uppercase mb-2">
                Step {step.number}
              </div>
              <h3 className="text-xl font-semibold text-[#1A1A1A]">
                {step.title}
              </h3>
              <p className="mt-2 text-[#1A1A1A]/60 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
