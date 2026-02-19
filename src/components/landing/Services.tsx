import { PaintBucket, Layers, Palette } from "lucide-react";

const services = [
  {
    icon: PaintBucket,
    title: "Resurfacing",
    description: "Breathe new life into cracked, faded courts with a full professional resurface.",
  },
  {
    icon: Layers,
    title: "New Court Surfacing",
    description: "First-time acrylic surface applications on fresh concrete slabs.",
  },
  {
    icon: Palette,
    title: "Custom Color & Design",
    description: "Your court, your colors, your lines — designed exactly how you want it.",
  },
];

export function Services() {
  return (
    <section id="services" aria-label="Our services" className="py-24 sm:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] text-center">
          What We Do
        </h2>
        <p className="mt-4 text-center text-[#1A1A1A]/60 max-w-2xl mx-auto">
          Pro Court Surfaces specializes in pickleball and tennis court resurfacing across Greater Austin and Central Texas.
        </p>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
          {services.map((service) => (
            <div key={service.title} className="text-center group">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-blue/5 text-brand-blue mb-6 group-hover:bg-brand-blue/10 transition-colors">
                <service.icon className="h-7 w-7" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-semibold text-[#1A1A1A]">
                {service.title}
              </h3>
              <p className="mt-3 text-[#1A1A1A]/60 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
