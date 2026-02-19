import { MapPin } from "lucide-react";

export function ServiceArea() {
  return (
    <section id="service-area" aria-label="Service area" className="py-24 sm:py-32 bg-[#FAFAF8]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-blue/5 text-brand-blue mb-6">
          <MapPin className="h-7 w-7" strokeWidth={1.5} />
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A1A]">
          Serving Greater Central Texas
        </h2>
        <p className="mt-6 text-lg text-[#1A1A1A]/60 leading-relaxed">
          Proudly serving Austin, Round Rock, Cedar Park, Georgetown, Wimberley,
          San Marcos, Dripping Springs, Kyle, Buda, and the greater Central Texas
          Hill Country.
        </p>
      </div>
    </section>
  );
}
