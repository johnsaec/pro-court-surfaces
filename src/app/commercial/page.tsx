import type { Metadata } from "next";
import { CheckCircle, XCircle } from "lucide-react";
import ROICalculator from "./_components/ROICalculator";

export const metadata: Metadata = {
  title: "GC Court Surfacing Sub | Pro Court Surfaces",
  description:
    "Pro Court Surfaces is a sport court surfacing subcontractor in Central Texas. ATS Sports Acrytech surfaces for multi-family amenity centers — 48hr bids, 2yr warranty, zero scope overlap.",
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Pro Court Surfaces",
  description:
    "Sport court surfacing subcontractor specializing in tennis and pickleball court surfaces for multi-family amenity centers in Central Texas.",
  areaServed: { "@type": "Place", name: "Central Texas" },
  serviceType: [
    "Sport Court Surfacing",
    "Tennis Court Surfacing",
    "Pickleball Court Surfacing",
  ],
  knowsAbout: [
    "ATS Sports Acrytech",
    "Acrylic Sport Court Surfaces",
    "Multi-Family Amenity Centers",
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What surface system does Pro Court Surfaces install?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We install ATS Sports Acrytech acrylic sport court surfaces. Acrytech is a professional-grade system designed for high-traffic environments like multi-family amenity centers, delivering consistent playability and long-term durability in the Central Texas climate.",
      },
    },
    {
      "@type": "Question",
      name: "Does Pro Court Surfaces work as a subcontractor for general contractors?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We work exclusively as a surfacing subcontractor for general contractors. We handle the sport court surface scope only — no fencing, lighting, or accessories — so there is zero overlap with your other trades.",
      },
    },
    {
      "@type": "Question",
      name: "What areas does Pro Court Surfaces serve?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We serve the Central Texas region, including Austin, San Antonio, Waco, and surrounding areas.",
      },
    },
  ],
};

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

export default function CommercialPage() {
  return (
    <>
      {/* Schema markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ── Hero ── */}
      <section className="bg-brand-bg-alt relative overflow-hidden">
        {/* Subtle gradient accent */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-brand-blue/5 to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-36 pb-16 sm:pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div className="relative z-10 max-w-xl">
              <div className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.15em] text-brand-blue mb-6">
                <span className="w-8 h-0.5 bg-brand-blue" />
                Sport Court Surfacing Subcontractor &bull; Central Texas
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-brand-text leading-tight mb-6">
                Your Amenity Center Courts,{" "}
                <em className="text-brand-blue not-italic">Done Right the First Time</em>
              </h1>
              <p className="text-lg text-brand-text-muted leading-relaxed mb-8 max-w-lg">
                We&apos;re the surfacing sub GCs in Central Texas call when the
                courts have to look good, play right, and hold up to hundreds of
                residents. ATS Sports Acrytech surfaces &mdash; installed on
                schedule.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="#quote"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-brand-blue text-white font-semibold hover:bg-brand-blue/90 transition-colors"
                >
                  Request a Bid
                </a>
                <a
                  href="#scope"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-gray-300 text-brand-text-muted font-semibold hover:border-brand-text-muted hover:text-brand-text transition-colors"
                >
                  See Our Scope
                </a>
              </div>
            </div>

            {/* Right — stat cards */}
            <div className="hidden lg:flex flex-col gap-4 justify-self-end pr-8 relative z-10">
              {[
                { value: "48hr", label: "Detailed bid turnaround" },
                { value: "2yr", label: "Workmanship warranty" },
                { value: "0", label: "Scope overlap with your trades" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white border border-gray-200 rounded-xl px-6 py-5 hover:-translate-y-1 hover:border-brand-blue transition-all duration-300"
                >
                  <div className="text-3xl font-bold text-brand-blue leading-none mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs font-medium text-brand-text-muted tracking-wide">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Straight Talk ── */}
      <section className="bg-white border-t border-gray-200 py-16 sm:py-24" id="straight-talk">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.15em] text-brand-blue mb-4">
            <span className="w-6 h-px bg-brand-blue" />
            Straight Talk
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-text mb-3">
            We Know What You&apos;re Thinking
          </h2>
          <p className="text-brand-text-muted max-w-xl mb-10">
            You&apos;ve been burned by subs before. Here&apos;s how we&apos;re different.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {straightTalkCards.map((card) => (
              <div
                key={card.heading}
                className="group relative bg-white border border-gray-200 rounded-xl p-7 overflow-hidden hover:-translate-y-1 transition-all duration-300"
              >
                {/* Top accent bar on hover */}
                <div className="absolute top-0 left-0 w-full h-[3px] bg-brand-blue scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
                <p className="italic text-brand-text-muted mb-4 leading-relaxed">
                  {card.objection}
                </p>
                <h3 className="font-bold text-brand-text mb-2">{card.heading}</h3>
                <p className="text-sm text-brand-text-muted leading-relaxed">
                  {card.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Scope ── */}
      <section className="bg-brand-bg-alt border-t border-gray-200 py-16 sm:py-24" id="scope">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.15em] text-brand-blue mb-4">
            <span className="w-6 h-px bg-brand-blue" />
            Scope of Work
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-text mb-3">
            Sport Court Surfacing for Multi-Family Amenity Centers
          </h2>
          <p className="text-brand-text-muted max-w-xl mb-10">
            We do one thing and we do it well. Zero scope overlap with your
            other trades.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] gap-5">
            {/* Yes */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-7">
              <h3 className="text-xs font-bold uppercase tracking-wider text-green-700 mb-5">
                What We Handle
              </h3>
              <ul className="space-y-0">
                {scopeYes.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 py-2.5 border-b border-green-200/60 last:border-b-0 text-sm text-brand-text-muted"
                  >
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* No */}
            <div className="bg-red-50 border border-red-200 rounded-xl p-7">
              <h3 className="text-xs font-bold uppercase tracking-wider text-red-700 mb-5">
                Not Our Scope
              </h3>
              <ul className="space-y-0">
                {scopeNo.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 py-2.5 border-b border-red-200/60 last:border-b-0 text-sm text-brand-text-muted"
                  >
                    <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why GCs ── */}
      <section className="bg-white border-t border-gray-200 py-16 sm:py-24" id="why-us">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.15em] text-brand-blue mb-4">
            <span className="w-6 h-px bg-brand-blue" />
            Why GCs Choose Us
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-text mb-3">
            Built for How Contractors Actually Work
          </h2>
          <p className="text-brand-text-muted max-w-xl mb-10">
            We&apos;ve worked inside GC timelines on multi-family projects. We
            know what matters to you.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {benefits.map((b, i) => (
              <div
                key={b.title}
                className="flex gap-4 bg-white border border-gray-200 rounded-xl p-6 hover:-translate-y-1 hover:border-brand-blue transition-all duration-300"
              >
                <div className="flex-shrink-0 w-11 h-11 bg-brand-blue rounded-lg flex items-center justify-center text-white font-bold text-sm">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-semibold text-brand-text mb-1">{b.title}</h3>
                  <p className="text-sm text-brand-text-muted leading-relaxed">
                    {b.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-brand-bg-alt border-t border-gray-200 py-16 sm:py-24" id="faq">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.15em] text-brand-blue mb-4">
            <span className="w-6 h-px bg-brand-blue" />
            Frequently Asked Questions
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-text mb-8">
            Questions GCs Ask Us
          </h2>

          <div className="max-w-3xl">
            {faqs.map((faq) => (
              <div key={faq.q} className="border-b border-gray-200 py-5">
                <h3 className="font-semibold text-brand-text mb-2">{faq.q}</h3>
                <p className="text-sm text-brand-text-muted leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ROI Calculator ── */}
      <section className="bg-white border-t border-gray-200 py-16 sm:py-24" id="roi">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.15em] text-brand-blue mb-4">
            <span className="w-6 h-px bg-brand-blue" />
            ROI Calculator
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-text mb-3">
            See the True Cost Before You Award the Bid
          </h2>
          <p className="text-brand-text-muted max-w-xl mb-10">
            The cheapest bid isn&apos;t the cheapest project. Plug in your numbers
            and see what callbacks, delays, and early resurfacing actually cost
            over 10 years.
          </p>

          <ROICalculator />
        </div>
      </section>

      {/* ── Quote Form ── */}
      <section className="bg-brand-navy py-16 sm:py-24 relative overflow-hidden" id="quote">
        <div className="absolute -top-48 -right-48 w-[500px] h-[500px] bg-brand-blue/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.15em] text-white/60 mb-4">
            <span className="w-6 h-px bg-white/40" />
            Request a Bid
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Let&apos;s Get You a Number
          </h2>
          <p className="text-white/60 max-w-xl mb-10">
            Send us the basics and we&apos;ll have a detailed bid back to you
            within 48 hours.
          </p>

          <form
            className="max-w-xl grid gap-4"
            action="https://formspree.io/f/YOUR_FORM_ID"
            method="POST"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Matt Johnson"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/15 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-white/40"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-1">
                  Company
                </label>
                <input
                  type="text"
                  name="company"
                  placeholder="Fazzon Construction"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/15 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-white/40"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="matt@fazzon.com"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/15 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-white/40"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="(512) 555-0100"
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/15 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-white/40"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-1">
                Court Type
              </label>
              <select
                name="court_type"
                required
                defaultValue=""
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/15 text-white text-sm focus:outline-none focus:border-white/40"
              >
                <option value="" disabled className="text-gray-900">
                  Select court type
                </option>
                <option value="tennis" className="text-gray-900">Tennis</option>
                <option value="pickleball" className="text-gray-900">Pickleball</option>
                <option value="multi-sport" className="text-gray-900">Multi-Sport</option>
                <option value="resurfacing" className="text-gray-900">Resurfacing / Recoating</option>
                <option value="other" className="text-gray-900">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-1">
                Project Details
              </label>
              <textarea
                name="details"
                placeholder="Number of courts, dimensions, project timeline, location — whatever you've got."
                rows={4}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/15 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-white/40 resize-y"
              />
            </div>

            <button
              type="submit"
              className="justify-self-start inline-flex items-center px-8 py-3 rounded-lg bg-brand-blue text-white font-semibold hover:bg-brand-blue/90 transition-colors mt-2"
            >
              Send Bid Request
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
