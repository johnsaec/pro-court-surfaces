import Image from "next/image";
import { User, ShieldCheck, FileCheck, MapPin } from "lucide-react";

const differentiators = [
  {
    icon: User,
    title: "Owner-Operated",
    description: "You work directly with Patrick, the person doing the work. No sales reps, no middlemen.",
  },
  {
    icon: ShieldCheck,
    title: "Premium Materials",
    description: "Same professional-grade acrylic coatings used on tournament-level facilities.",
  },
  {
    icon: FileCheck,
    title: "Transparent Pricing",
    description: "Detailed quotes with line-item breakdowns. No surprise upcharges, ever.",
  },
  {
    icon: MapPin,
    title: "Central Texas Experts",
    description: "We know Austin soil, drainage, and climate — and how to build courts that last here.",
  },
];

export function WhyUs() {
  return (
    <section id="why-us" aria-label="Why choose Pro Court Surfaces" className="py-24 sm:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Photo */}
          <div className="relative order-2 lg:order-1">
            <Image
              src="https://res.cloudinary.com/dwyd4f7lz/image/upload/f_auto,q_auto,w_800/v1759809485/IMG_0225_iaakk1.jpg"
              alt="Patrick, owner of Pro Court Surfaces, on site during a professional court resurfacing project"
              width={800}
              height={600}
              className="rounded-2xl w-full h-auto object-cover shadow-lg"
            />
          </div>

          {/* Differentiators */}
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A1A]">
              Why Pro Court Surfaces
            </h2>
            <p className="mt-4 text-[#1A1A1A]/60">
              Pro Court Surfaces is an owner-operated court resurfacing company based in Austin, Texas.
            </p>

            <div className="mt-10 space-y-8">
              {differentiators.map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-brand-blue/5 text-brand-blue flex items-center justify-center">
                    <item.icon className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1A1A1A]">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm text-[#1A1A1A]/60 leading-relaxed">
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
