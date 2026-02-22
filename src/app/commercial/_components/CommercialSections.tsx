"use client";

import { CheckCircle, XCircle, ArrowRight } from "lucide-react";
import { useScrollReveal } from "@/components/landing/useScrollReveal";
import ROICalculator from "./ROICalculator";
import { useEffect, useState } from "react";

/* ─────────────────── DATA ─────────────────── */

const straightTalkCards = [
  {
    objection: "\u201CLast court sub ghosted us mid-project.\u201D",
    heading: "We show up. Every day we\u2019re scheduled.",
    body: "Court surfacing is all we do \u2014 not a side job. You get a dedicated crew that communicates daily and stays until the scope is closed out. No chasing us down.",
  },
  {
    objection: "\u201CThe surface failed within a year.\u201D",
    heading: "ATS Sports Acrytech doesn\u2019t fail.",
    body: "We install ATS Sports Acrytech \u2014 a professional-grade acrylic system built for Central Texas heat and high-traffic amenity centers. You get the manufacturer\u2019s warranty on materials plus our 2-year workmanship warranty on the install. Both go in your closeout package.",
  },
  {
    objection: "\u201CI can\u2019t get a straight number for my estimate.\u201D",
    heading: "You\u2019ll have a detailed bid in 48 hours.",
    body: "We know you\u2019re building an estimate for your GC. We send clear, line-item pricing \u2014 surface prep, materials, labor, striping \u2014 so you can plug our numbers in and move on.",
  },
];

const scopeYes = [
  "Tennis court surfacing (ATS Sports Acrytech)",
  "Pickleball court surfacing",
  "Multi-sport court surfaces",
  "Surface preparation and repair",
  "Acrylic color coating systems",
  "Game line striping and court markings",
  "Resurfacing and recoating existing courts",
];

const scopeNo = [
  "Fencing and windscreens",
  "Lighting and electrical",
  "Net posts and accessories",
  "Concrete / asphalt base work",
  "Drainage and grading",
];

const benefits = [
  {
    title: "Fast, Accurate Bids",
    desc: "Detailed line-item pricing within 48 hours. No vague allowances \u2014 real numbers you can put in your estimate and stand behind.",
  },
  {
    title: "We Fit Your Schedule",
    desc: "We coordinate around your construction timeline. When the slab is ready, we\u2019re ready. No delays holding up your other trades.",
  },
  {
    title: "Quality That Doesn\u2019t Come Back",
    desc: "ATS Sports Acrytech surfaces are built for Central Texas conditions \u2014 UV stable, crack resistant, and designed for years of heavy resident use without callbacks.",
  },
  {
    title: "Clean Scope, No Surprises",
    desc: "Surfacing only. We don\u2019t creep into other trades\u2019 territory. You know exactly what you\u2019re getting, and so does the owner.",
  },
];

const faqs = [
  {
    q: "What surface system do you install?",
    a: "We install ATS Sports Acrytech \u2014 a professional-grade acrylic sport court surface system. It\u2019s engineered for high-traffic environments like multi-family amenity centers and holds up to the Central Texas heat and UV exposure.",
  },
  {
    q: "Do you work as a subcontractor under a GC?",
    a: "Yes. That\u2019s our primary model. We carry our own insurance, provide W-9s, and work within your project management structure. We\u2019re used to GC workflows \u2014 submittals, schedules, site meetings, all of it.",
  },
  {
    q: "What do you need from us before you can bid?",
    a: "Court dimensions, surface type (tennis, pickleball, multi-sport), color preferences, and your project timeline. If you have site plans, even better \u2014 send them over and we\u2019ll turn around a bid in 48 hours.",
  },
  {
    q: "How long does a typical court surfacing job take?",
    a: "Most amenity center courts take 5\u201310 business days depending on court count and weather. We\u2019ll give you an exact timeline in our bid so you can plan your schedule around it.",
  },
  {
    q: "What areas do you serve?",
    a: "We serve the Central Texas region \u2014 Austin, San Antonio, Waco, and surrounding areas. If your project is in Central Texas, we can get there.",
  },
  {
    q: "Are your surfaces warrantied?",
    a: "Yes. You get two layers of coverage: ATS Sports Acrytech\u2019s manufacturer warranty on materials, plus our 2-year workmanship warranty on the install. Both sets of documentation go straight into your project closeout package.",
  },
];

/* ─────────────────── COMPONENT ─────────────────── */

export default function CommercialSections() {
  const talkRef = useScrollReveal();
  const scopeRef = useScrollReveal();
  const whyRef = useScrollReveal();
  const faqRef = useScrollReveal();
  const roiRef = useScrollReveal();
  const quoteRef = useScrollReveal();

  const [heroLoaded, setHeroLoaded] = useState(false);
  useEffect(() => setHeroLoaded(true), []);

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-brand-bg-alt min-h-[90vh] sm:min-h-[85vh] flex items-end">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-bl from-brand-blue/[0.06] to-transparent pointer-events-none" />
        <div
          className="absolute top-0 left-0 w-1/2 h-full opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, #004AAD 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        {/* Decorative court line */}
        <div className="absolute top-[15%] right-[8%] w-[350px] h-[350px] border-2 border-brand-blue/[0.08] rotate-12 hidden lg:block pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-32 sm:pt-40 pb-16 sm:pb-24 w-full relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-end">
            {/* Left — content */}
            <div className="max-w-xl">
              <div
                className={`transition-all duration-700 delay-300 ${
                  heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
              >
                <span className="inline-flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-brand-blue">
                  <span className="w-8 h-px bg-brand-blue" />
                  Sport Court Surfacing Subcontractor &bull; Central Texas
                </span>
              </div>

              <h1
                className={`mt-5 text-[clamp(2.4rem,5.5vw,4.5rem)] font-bold text-brand-text leading-[1.08] tracking-tight transition-all duration-700 delay-500 ${
                  heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                Your Amenity Center Courts,{" "}
                <span className="text-brand-blue">Done Right the First Time</span>
              </h1>

              <p
                className={`mt-5 text-lg text-brand-text-muted leading-relaxed max-w-lg transition-all duration-700 delay-700 ${
                  heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
              >
                We&apos;re the surfacing sub GCs in Central Texas call when the
                courts have to look good, play right, and hold up to hundreds of
                residents. ATS Sports Acrytech surfaces &mdash; installed on
                schedule.
              </p>

              <div
                className={`mt-8 flex flex-col sm:flex-row gap-3 transition-all duration-700 delay-[900ms] ${
                  heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
              >
                <a
                  href="#quote"
                  className="group inline-flex items-center justify-center gap-2 px-7 py-4 rounded-lg bg-brand-blue text-white font-semibold text-sm hover:bg-brand-blue/90 transition-all shadow-xl shadow-brand-blue/15"
                >
                  Request a Bid
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="#scope"
                  className="inline-flex items-center justify-center px-7 py-4 rounded-lg border border-gray-300 text-brand-text-muted font-semibold text-sm hover:border-brand-text-muted hover:text-brand-text transition-all"
                >
                  See Our Scope
                </a>
              </div>
            </div>

            {/* Right — stat cards */}
            <div
              className={`hidden lg:flex flex-col gap-4 justify-self-end transition-all duration-700 delay-[1100ms] ${
                heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              {[
                { value: "48hr", label: "Detailed bid turnaround" },
                { value: "2yr", label: "Workmanship warranty" },
                { value: "0", label: "Scope overlap with your trades" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="group bg-white border border-gray-200 rounded-2xl px-7 py-5 hover:-translate-y-1 hover:shadow-lg hover:border-brand-blue/40 transition-all duration-300"
                >
                  <div className="text-3xl font-bold text-brand-blue leading-none mb-1.5 group-hover:text-brand-navy transition-colors">
                    {stat.value}
                  </div>
                  <div className="text-xs font-medium text-brand-text-muted tracking-wide">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile stat strip */}
          <div
            className={`lg:hidden mt-10 flex flex-wrap gap-6 transition-all duration-700 delay-[1100ms] ${
              heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            {[
              { value: "48hr", label: "Bid Turnaround" },
              { value: "2yr", label: "Warranty" },
              { value: "0", label: "Scope Overlap" },
            ].map((stat) => (
              <div key={stat.label} className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-brand-blue tabular-nums">{stat.value}</span>
                <span className="text-xs text-brand-text-muted uppercase tracking-wider font-medium">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Straight Talk ── */}
      <section className="py-24 sm:py-36 bg-white relative overflow-hidden" id="straight-talk">
        <div
          className="absolute top-0 right-0 w-1/3 h-full opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, #004AAD 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        <div ref={talkRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-brand-blue mb-4">
              <span className="w-6 h-px bg-brand-blue" />
              Straight Talk
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold text-brand-text leading-tight">
              We Know What You&apos;re Thinking
            </h2>
            <p className="mt-4 text-brand-text-muted text-lg max-w-xl">
              You&apos;ve been burned by subs before. Here&apos;s how we&apos;re different.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
            {straightTalkCards.map((card, i) => (
              <div
                key={card.heading}
                className="reveal-item group relative bg-white border border-gray-200 rounded-2xl p-8 overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all duration-500"
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                {/* Accent bar */}
                <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-brand-blue to-brand-navy scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
                {/* Quote mark */}
                <div className="text-brand-blue/10 text-6xl font-bold leading-none mb-2 select-none">
                  &ldquo;
                </div>
                <p className="italic text-brand-text-muted leading-relaxed text-[0.94rem] -mt-4 mb-5">
                  {card.objection}
                </p>
                <h3 className="font-bold text-brand-text text-lg mb-2">
                  {card.heading}
                </h3>
                <p className="text-sm text-brand-text-muted leading-relaxed">
                  {card.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Scope ── */}
      <section className="py-24 sm:py-36 bg-brand-bg-alt relative overflow-hidden" id="scope">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,74,173,0.04),transparent_60%)] pointer-events-none" />

        <div ref={scopeRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-brand-blue mb-4">
              <span className="w-6 h-px bg-brand-blue" />
              Scope of Work
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold text-brand-text leading-tight">
              Sport Court Surfacing for
              <br className="hidden sm:block" />
              Multi-Family Amenity Centers
            </h2>
            <p className="mt-4 text-brand-text-muted text-lg max-w-xl">
              We do one thing and we do it well. Zero scope overlap with your
              other trades.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] gap-6">
            {/* Yes */}
            <div className="reveal-item bg-white border border-green-200 rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-green-500 to-green-400 rounded-t-2xl" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-green-700 mb-6 flex items-center gap-2">
                <span className="w-5 h-5 rounded-md bg-green-100 flex items-center justify-center">
                  <CheckCircle className="w-3.5 h-3.5 text-green-600" />
                </span>
                What We Handle
              </h3>
              <ul>
                {scopeYes.map((item, i) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 py-3 border-b border-gray-100 last:border-b-0 text-[0.94rem] text-brand-text group/item hover:text-brand-blue transition-colors"
                    style={{ transitionDelay: `${i * 60}ms` }}
                  >
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* No */}
            <div className="reveal-item bg-white border border-red-200 rounded-2xl p-8 relative overflow-hidden" style={{ transitionDelay: "150ms" }}>
              <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-red-500 to-red-400 rounded-t-2xl" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-red-700 mb-6 flex items-center gap-2">
                <span className="w-5 h-5 rounded-md bg-red-100 flex items-center justify-center">
                  <XCircle className="w-3.5 h-3.5 text-red-500" />
                </span>
                Not Our Scope
              </h3>
              <ul>
                {scopeNo.map((item, i) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 py-3 border-b border-gray-100 last:border-b-0 text-[0.94rem] text-brand-text-muted"
                    style={{ transitionDelay: `${i * 60 + 150}ms` }}
                  >
                    <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why GCs ── */}
      <section className="py-24 sm:py-36 bg-white relative" id="why-us">
        <div ref={whyRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-brand-blue mb-4">
              <span className="w-6 h-px bg-brand-blue" />
              Why GCs Choose Us
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold text-brand-text leading-tight">
              Built for How Contractors
              <br className="hidden sm:block" />
              Actually Work
            </h2>
            <p className="mt-4 text-brand-text-muted text-lg max-w-xl">
              We&apos;ve worked inside GC timelines on multi-family projects. We
              know what matters to you.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((b, i) => (
              <div
                key={b.title}
                className="reveal-item group flex gap-5 bg-white border border-gray-200 rounded-2xl p-7 hover:-translate-y-1 hover:shadow-xl hover:border-brand-blue/30 transition-all duration-500"
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-brand-blue/5 flex items-center justify-center text-brand-blue font-bold text-lg group-hover:bg-brand-blue group-hover:text-white transition-colors duration-300">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-bold text-brand-text text-lg mb-1.5">
                    {b.title}
                  </h3>
                  <p className="text-[0.94rem] text-brand-text-muted leading-relaxed">
                    {b.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 sm:py-36 bg-brand-bg-alt relative" id="faq">
        <div ref={faqRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-brand-blue mb-4">
              <span className="w-6 h-px bg-brand-blue" />
              FAQ
              <span className="w-6 h-px bg-brand-blue" />
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold text-brand-text leading-tight">
              Questions GCs Ask Us
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, i) => (
              <div
                key={faq.q}
                className="reveal-item group border-b border-gray-200 py-6"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <h3 className="font-bold text-brand-text group-hover:text-brand-blue transition-colors mb-2 text-[1.05rem]">
                  {faq.q}
                </h3>
                <p className="text-[0.94rem] text-brand-text-muted leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ROI Calculator ── */}
      <section className="py-24 sm:py-36 bg-white relative overflow-hidden" id="roi">
        {/* Large decorative watermark */}
        <div className="absolute -right-16 top-1/2 -translate-y-1/2 text-[18rem] font-bold text-brand-blue/[0.025] leading-none select-none pointer-events-none hidden xl:block">
          ROI
        </div>

        <div ref={roiRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-brand-blue mb-4">
              <span className="w-6 h-px bg-brand-blue" />
              ROI Calculator
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold text-brand-text leading-tight">
              See the True Cost Before
              <br className="hidden sm:block" />
              You Award the Bid
            </h2>
            <p className="mt-4 text-brand-text-muted text-lg max-w-xl">
              The cheapest bid isn&apos;t the cheapest project. Plug in your numbers
              and see what callbacks, delays, and early resurfacing actually cost
              over 10 years.
            </p>
          </div>

          <div className="mt-14 reveal-item">
            <ROICalculator />
          </div>
        </div>
      </section>

      {/* ── Quote Form ── */}
      <section className="py-24 sm:py-36 bg-brand-navy text-white relative overflow-hidden" id="quote">
        {/* Gradient orbs */}
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-brand-blue/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-brand-green/10 rounded-full blur-3xl pointer-events-none" />

        <div ref={quoteRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left — copy */}
            <div className="reveal-item">
              <span className="inline-flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-brand-green mb-4">
                <span className="w-6 h-px bg-brand-green" />
                Request a Bid
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold leading-tight">
                Let&apos;s Get You
                <br />
                a Number
              </h2>
              <p className="mt-5 text-white/60 text-lg max-w-md">
                Send us the basics and we&apos;ll have a detailed bid back to you
                within 48 hours.
              </p>

              {/* Trust indicators */}
              <div className="mt-10 flex flex-wrap gap-6">
                {[
                  { value: "48hr", label: "Turnaround" },
                  { value: "Zero", label: "Scope Overlap" },
                  { value: "2yr", label: "Warranty" },
                ].map((stat) => (
                  <div key={stat.label} className="flex items-baseline gap-2">
                    <span className="text-xl font-bold text-brand-green">{stat.value}</span>
                    <span className="text-xs text-white/40 uppercase tracking-wider font-medium">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — form */}
            <div className="reveal-item" style={{ transitionDelay: "200ms" }}>
              <form
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/10 grid gap-5"
                action="https://formspree.io/f/YOUR_FORM_ID"
                method="POST"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Matt Johnson"
                      required
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/15 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-brand-green/50 focus:ring-1 focus:ring-brand-green/30 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-1.5">
                      Company
                    </label>
                    <input
                      type="text"
                      name="company"
                      placeholder="Fazzon Construction"
                      required
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/15 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-brand-green/50 focus:ring-1 focus:ring-brand-green/30 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="matt@fazzon.com"
                      required
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/15 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-brand-green/50 focus:ring-1 focus:ring-brand-green/30 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-1.5">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="(512) 555-0100"
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/15 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-brand-green/50 focus:ring-1 focus:ring-brand-green/30 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-1.5">
                    Court Type
                  </label>
                  <select
                    name="court_type"
                    required
                    defaultValue=""
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/15 text-white text-sm focus:outline-none focus:border-brand-green/50 focus:ring-1 focus:ring-brand-green/30 transition-colors"
                  >
                    <option value="" disabled className="text-gray-900">Select court type</option>
                    <option value="tennis" className="text-gray-900">Tennis</option>
                    <option value="pickleball" className="text-gray-900">Pickleball</option>
                    <option value="multi-sport" className="text-gray-900">Multi-Sport</option>
                    <option value="resurfacing" className="text-gray-900">Resurfacing / Recoating</option>
                    <option value="other" className="text-gray-900">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-1.5">
                    Project Details
                  </label>
                  <textarea
                    name="details"
                    placeholder="Number of courts, dimensions, project timeline, location — whatever you've got."
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/15 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-brand-green/50 focus:ring-1 focus:ring-brand-green/30 resize-y transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  className="group justify-self-start inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-brand-blue text-white font-semibold text-sm hover:bg-brand-blue/90 transition-all shadow-lg shadow-brand-blue/20 mt-1"
                >
                  Send Bid Request
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
