"use client";

import Image from "next/image";
import Link from "next/link";
import { SectionCTA } from "./SectionCTA";
import { useScrollReveal } from "./useScrollReveal";

type Project = {
  src: string;
  alt: string;
  caption: string;
  span: string;
  href?: string;
};

const projects: Project[] = [
  {
    src: "https://res.cloudinary.com/dwyd4f7lz/image/upload/f_auto,q_auto,w_800/v1769365125/DJI_0054_rgzy6p.jpg",
    alt: "Aerial view of two resurfaced tennis courts with blue and green acrylic surface at Yoakum City Park in Texas",
    caption: "City Park — Yoakum, TX",
    span: "sm:col-span-2 sm:row-span-2",
  },
  {
    src: "https://res.cloudinary.com/dwyd4f7lz/image/upload/f_auto,q_auto,w_800/v1769365087/DJI_0061_kcgxtd.jpg",
    alt: "Close-up aerial view of freshly resurfaced tennis court with crisp white lines and green playing surface",
    caption: "City Park — Yoakum, TX",
    span: "",
  },
  {
    src: "https://res.cloudinary.com/dwyd4f7lz/image/upload/f_auto,q_auto,w_800/v1759802070/DJI_20250917112353_0396_D_2_v1nhyi.jpg",
    alt: "Aerial drone shot of completed residential tennis court resurfacing with custom blue and green color design",
    caption: "Residential Court",
    span: "",
  },
  {
    src: "https://res.cloudinary.com/dwyd4f7lz/image/upload/f_auto,q_auto,w_800/v1759801933/FNGP5107_cdnnzj.jpg",
    alt: "Ground-level view of professional court resurfacing with vibrant acrylic colors and clean line striping",
    caption: "Residential Court",
    span: "",
  },
  {
    src: "https://res.cloudinary.com/dwyd4f7lz/image/upload/f_auto,q_auto,w_800/v1762354989/3_color_straight_1_dtxi5n.heic",
    alt: "Three-color custom court resurfacing with professional pickleball lines in Wimberley Texas",
    caption: "Residential — Wimberley, TX",
    span: "",
  },
  {
    src: "https://res.cloudinary.com/dwyd4f7lz/image/upload/f_auto,q_auto,w_800/v1762309892/2_color_front_j6zp5s.heic",
    alt: "Two-color residential backyard court resurfacing with blue and green custom design in Wimberley Texas",
    caption: "Residential — Wimberley, TX",
    span: "",
  },
  {
    src: "https://res.cloudinary.com/dwyd4f7lz/image/upload/f_auto,q_auto,w_800/v1786902349/richardson_drone_finished_bht0ue.jpg",
    alt: "Aerial drone view of a finished green and blue pickleball court conversion with crisp white lines in Richardson, Texas",
    caption: "Tennis-to-Pickleball Conversion — Richardson, TX",
    span: "sm:col-span-2",
    href: "/projects/richardson-pickleball-conversion",
  },
  {
    src: "https://res.cloudinary.com/dwyd4f7lz/image/upload/f_auto,q_auto,w_800/v1786902350/wimberly_finishe_end_srsnsg.jpg",
    alt: "Finished blue and green multi-sport basketball court with fresh striping in Wimberley, Texas",
    caption: "Multi-Sport Court — Wimberley, TX",
    span: "",
    href: "/projects/wimberley-multi-sport-court",
  },
  {
    src: "https://res.cloudinary.com/dwyd4f7lz/image/upload/f_auto,q_auto,w_800/v1786902349/wahill_finished_side_vr6qqs.jpg",
    alt: "Finished blue and gray residential backyard basketball court next to a pool with a stone and wood fence in Austin, Texas",
    caption: "Backyard Basketball Court — Austin, TX",
    span: "",
  },
  {
    src: "https://res.cloudinary.com/dwyd4f7lz/image/upload/f_auto,q_auto,w_800/v1786904727/georgtown_drone_finoshed_rycfv7.jpg",
    alt: "Aerial view of a finished blue and gold backyard basketball and pickleball court in Georgetown, Texas",
    caption: "Multi-Sport Court — Georgetown, TX",
    span: "sm:col-span-2",
    href: "/projects/georgetown-multi-sport-court",
  },
  {
    src: "https://res.cloudinary.com/dwyd4f7lz/image/upload/f_auto,q_auto,w_800/v1786904827/san_antonio_done_crlmsk.jpg",
    alt: "Finished blue and gray pickleball court on a rural property near San Antonio, Texas",
    caption: "Pickleball Court — San Antonio, TX",
    span: "",
    href: "/projects/san-antonio-pickleball-court",
  },
];

export function Portfolio() {
  const ref = useScrollReveal();

  return (
    <section
      id="portfolio"
      aria-label="Project portfolio"
      className="py-24 sm:py-36 bg-white"
    >
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-brand-blue mb-4">
            <span className="w-6 h-px bg-brand-blue" />
            Portfolio
            <span className="w-6 h-px bg-brand-blue" />
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold text-brand-text leading-tight">
            What courts has Pro Court Surfaces resurfaced?
          </h2>
          <p className="mt-4 text-brand-text-muted text-lg">
            Every court tells a story. Here are some of our favorites.
          </p>
        </div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 auto-rows-[280px] sm:auto-rows-[260px]">
          {projects.map((project, i) => {
            const inner = (
              <>
                <Image
                  src={project.src}
                  alt={project.alt}
                  width={800}
                  height={600}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {/* Hover caption overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                  <p className="text-white text-sm font-medium">
                    {project.caption}
                    {project.href && (
                      <span className="block text-brand-green text-xs font-semibold mt-0.5">
                        View project &rarr;
                      </span>
                    )}
                  </p>
                </div>
              </>
            );
            const className = `reveal-item group relative overflow-hidden rounded-2xl cursor-pointer ${project.span}`;
            const style = { transitionDelay: `${i * 80}ms` };
            return project.href ? (
              <Link key={i} href={project.href} className={className} style={style}>
                {inner}
              </Link>
            ) : (
              <div key={i} className={className} style={style}>
                {inner}
              </div>
            );
          })}
        </div>
        <SectionCTA />
      </div>
    </section>
  );
}
