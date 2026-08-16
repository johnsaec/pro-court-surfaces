"use client";

import Image from "next/image";
import { SectionCTA } from "./SectionCTA";
import { useScrollReveal } from "./useScrollReveal";

const transformations = [
  {
    id: "lakeside",
    before: {
      src: "https://res.cloudinary.com/dwyd4f7lz/image/upload/f_auto,q_auto,w_800/v1759801129/IMG_0037_xclgpd.jpg",
      alt: "Before photo showing cracked and faded tennis court surface needing resurfacing",
    },
    after: {
      src: "https://res.cloudinary.com/dwyd4f7lz/image/upload/f_auto,q_auto,w_800/v1759800811/DJI_20250917112633_0423_D_kiqa0u.jpg",
      alt: "Aerial view of beautifully resurfaced tennis court with vibrant blue and green colors",
    },
    label: "Residential Tennis Court",
  },
  {
    id: "wimberley2",
    before: {
      src: "https://res.cloudinary.com/dwyd4f7lz/image/upload/f_auto,q_auto,w_800/v1762354899/before_2_dyksr6.heic",
      alt: "Before photo of worn residential court surface before resurfacing",
    },
    after: {
      src: "https://res.cloudinary.com/dwyd4f7lz/image/upload/f_auto,q_auto,w_800/v1762354561/3_color_straight_h4nhiw.heic",
      alt: "After photo of stunning three-color custom court resurfacing with professional lines",
    },
    label: "Three-Color Custom Design",
  },
  {
    id: "wimberley-multisport",
    before: {
      src: "https://res.cloudinary.com/dwyd4f7lz/image/upload/f_auto,q_auto,w_800/v1786902349/wimberly_before_llpwkk.jpg",
      alt: "Before photo of a worn, faded multi-sport tile court with cracked teal and maroon surface in Wimberley, Texas",
    },
    after: {
      src: "https://res.cloudinary.com/dwyd4f7lz/image/upload/f_auto,q_auto,w_800/v1786902350/wimberly_finishe_end_srsnsg.jpg",
      alt: "After photo of a freshly resurfaced blue and green multi-sport basketball court with crisp white lines in Wimberley, Texas",
    },
    label: "Multi-Sport Court — Wimberley, TX",
  },
  {
    id: "richardson-pickleball",
    before: {
      src: "https://res.cloudinary.com/dwyd4f7lz/image/upload/f_auto,q_auto,w_800/v1786902350/richardson_before_side_f8mt9l.jpg",
      alt: "Before photo of a weathered red and blue tennis court with faded surface before resurfacing in Richardson, Texas",
    },
    after: {
      src: "https://res.cloudinary.com/dwyd4f7lz/image/upload/f_auto,q_auto,w_800/v1786902349/richardson_drone_finished_bht0ue.jpg",
      alt: "Aerial drone view of a finished green and blue pickleball court conversion with fresh white striping in Richardson, Texas",
    },
    label: "Tennis-to-Pickleball Conversion — Richardson, TX",
  },
];

export function BeforeAfter() {
  const ref = useScrollReveal();

  return (
    <section
      id="before-after"
      aria-label="Before and after project showcase"
      className="py-24 sm:py-36 bg-brand-bg-alt relative"
    >
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-brand-blue mb-4">
            <span className="w-6 h-px bg-brand-blue" />
            Transformations
            <span className="w-6 h-px bg-brand-blue" />
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold text-brand-text leading-tight">
            What does a court look like before and after resurfacing?
          </h2>
          <p className="mt-4 text-brand-text-muted text-lg">
            Real projects. Real transformations. No stock photos.
          </p>
        </div>

        <div className="space-y-16 sm:space-y-24">
          {transformations.map((project, i) => (
            <article
              key={project.id}
              className="reveal-item"
              style={{ transitionDelay: `${i * 200}ms` }}
            >
              <h3 className="text-sm font-semibold text-brand-blue uppercase tracking-wider mb-5 text-center">
                {project.label}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="relative group overflow-hidden rounded-2xl">
                  <div className="absolute top-4 left-4 z-10 bg-black/70 backdrop-blur-sm text-white text-[0.7rem] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                    Before
                  </div>
                  <Image
                    src={project.before.src}
                    alt={project.before.alt}
                    width={800}
                    height={600}
                    className="w-full h-full object-cover aspect-[4/3] group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Desaturated overlay to emphasize "old" */}
                  <div className="absolute inset-0 bg-black/5 mix-blend-saturation pointer-events-none" />
                </div>
                <div className="relative group overflow-hidden rounded-2xl">
                  <div className="absolute top-4 left-4 z-10 bg-brand-blue backdrop-blur-sm text-white text-[0.7rem] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                    After
                  </div>
                  <Image
                    src={project.after.src}
                    alt={project.after.alt}
                    width={800}
                    height={600}
                    className="w-full h-full object-cover aspect-[4/3] group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </article>
          ))}
        </div>
        <SectionCTA />
      </div>
    </section>
  );
}
