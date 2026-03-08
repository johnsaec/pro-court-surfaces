"use client";

import { trackEvent } from "@/lib/analytics";

export function Hero() {
  return (
    <section className="relative h-[100svh] w-full overflow-hidden">
      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        poster="https://res.cloudinary.com/dwyd4f7lz/image/upload/f_auto,q_auto,w_1600/v1769365125/DJI_0054_rgzy6p.jpg"
        className="absolute inset-0 w-full h-full object-cover object-bottom scale-105"
      >
        <source
          src="https://res.cloudinary.com/dwyd4f7lz/video/upload/q_auto/Website_Video_gnp5ib.mp4"
          type="video/mp4"
        />
      </video>

      {/* Cinematic gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

      {/* Content — centered on mobile, bottom-aligned on desktop */}
      <div className="relative z-10 flex flex-col justify-center sm:justify-end h-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-8 sm:pb-24">
        {/* Eyebrow */}
        <span className="inline-flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-brand-green">
          <span className="w-8 h-px bg-brand-green" />
          Austin, TX &bull; Court Resurfacing
        </span>

        {/* Headline */}
        <h1 className="mt-5 text-[clamp(2.5rem,7vw,5.5rem)] font-bold text-white leading-[1.05] tracking-tight max-w-4xl">
          Courts that play
          <br />
          <span className="text-brand-green">as good</span> as they look.
        </h1>

        {/* Subhead */}
        <p className="mt-5 text-lg sm:text-xl text-white/70 font-light max-w-xl leading-relaxed">
          Premium pickleball &amp; tennis court resurfacing across Greater Austin
          and Central Texas.
        </p>

        {/* CTA row */}
        <div className="mt-8 flex flex-col sm:flex-row items-start gap-4">
          <a
            href="#contact"
            onClick={() => trackEvent("cta_click", { cta_text: "Get a Free Estimate", cta_location: "hero", page_path: "/" })}
            className="group inline-flex items-center gap-2 px-7 py-4 rounded-lg bg-brand-blue text-white font-semibold text-sm hover:bg-brand-blue/90 transition-all shadow-xl shadow-brand-blue/20"
          >
            Get a Free Estimate
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <a
            href="#portfolio"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-lg border border-white/25 text-white/90 font-semibold text-sm hover:bg-white/10 hover:border-white/40 transition-all"
          >
            See Our Work
          </a>
        </div>

        {/* Stats ribbon */}
        <div className="mt-12 flex flex-wrap gap-8 sm:gap-12">
          {[
            { value: "100+", label: "Courts Resurfaced" },
            { value: "3–5", label: "Day Turnaround" },
            { value: "Free", label: "On-Site Estimates" },
          ].map((stat) => (
            <div key={stat.label} className="flex items-baseline gap-2.5">
              <span className="text-2xl sm:text-3xl font-bold text-white tabular-nums">
                {stat.value}
              </span>
              <span className="text-xs text-white/50 uppercase tracking-wider font-medium">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center gap-2 animate-bounce">
        <div className="w-5 h-8 rounded-full border-2 border-white/30 flex items-start justify-center pt-1.5">
          <div className="w-1 h-2 rounded-full bg-white/60" />
        </div>
      </div>
    </section>
  );
}
