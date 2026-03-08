"use client";

import { useState, useEffect, useRef, type FormEvent } from "react";
import Image from "next/image";
import { ArrowRight, Loader2, Phone, Check, ChevronDown } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Images                                                             */
/* ------------------------------------------------------------------ */
const IMG = {
  hero: "https://res.cloudinary.com/dwyd4f7lz/image/upload/f_auto,q_auto,w_1600/v1759802070/DJI_20250917112353_0396_D_2_v1nhyi.jpg",
  before: "https://res.cloudinary.com/dwyd4f7lz/image/upload/f_auto,q_auto,w_800/v1759801129/IMG_0037_xclgpd.jpg",
  after: "https://res.cloudinary.com/dwyd4f7lz/image/upload/f_auto,q_auto,w_800/v1759800811/DJI_20250917112633_0423_D_kiqa0u.jpg",
  patrick: "https://res.cloudinary.com/dwyd4f7lz/image/upload/f_auto,q_auto,w_800/v1759809485/IMG_0225_iaakk1.jpg",
  grind: "https://res.cloudinary.com/dwyd4f7lz/image/upload/f_auto,q_auto,w_800/v1759801933/FNGP5107_cdnnzj.jpg",
  threeColor: "https://res.cloudinary.com/dwyd4f7lz/image/upload/f_auto,q_auto,w_800/v1762354561/3_color_straight_h4nhiw.heic",
  yoakum: "https://res.cloudinary.com/dwyd4f7lz/image/upload/f_auto,q_auto,w_800/v1769365125/DJI_0054_rgzy6p.jpg",
  twoColor: "https://res.cloudinary.com/dwyd4f7lz/image/upload/f_auto,q_auto,w_800/v1762309892/2_color_front_j6zp5s.heic",
  logoWhite: "https://res.cloudinary.com/dwyd4f7lz/image/upload/f_auto,q_auto/v1767487552/pro_court_logo_white_no_bg_2_ludutv.png",
};

/* ------------------------------------------------------------------ */
/*  Scroll reveal hook                                                 */
/* ------------------------------------------------------------------ */
function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("fb-revealed");
            obs.unobserve(e.target);
          }
        }),
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return ref;
}

/* ------------------------------------------------------------------ */
/*  Inline styles for this page (scoped)                              */
/* ------------------------------------------------------------------ */
function PageStyles() {
  return (
    <style jsx global>{`
      @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap');

      .fb-land * {
        font-family: 'DM Sans', sans-serif;
      }
      .fb-land .font-display {
        font-family: 'Bebas Neue', sans-serif;
        letter-spacing: 0.02em;
      }

      .fb-fade {
        opacity: 0;
        transform: translateY(24px);
        transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1),
                    transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
      }
      .fb-revealed .fb-fade {
        opacity: 1;
        transform: translateY(0);
      }
      .fb-fade-d1 { transition-delay: 100ms; }
      .fb-fade-d2 { transition-delay: 200ms; }
      .fb-fade-d3 { transition-delay: 300ms; }
      .fb-fade-d4 { transition-delay: 400ms; }

      .fb-land .green-glow {
        text-shadow: 0 0 40px rgba(147, 237, 105, 0.3);
      }

      .fb-land .img-reveal {
        clip-path: inset(100% 0 0 0);
        transition: clip-path 0.8s cubic-bezier(0.16, 1, 0.3, 1);
      }
      .fb-revealed .img-reveal {
        clip-path: inset(0 0 0 0);
      }

      @keyframes pulse-green {
        0%, 100% { box-shadow: 0 0 0 0 rgba(147, 237, 105, 0.4); }
        50% { box-shadow: 0 0 0 12px rgba(147, 237, 105, 0); }
      }
      .fb-land .cta-pulse {
        animation: pulse-green 2s infinite;
      }

      @keyframes slide-up-sticky {
        from { transform: translateY(100%); }
        to { transform: translateY(0); }
      }
      .fb-land .sticky-bar {
        animation: slide-up-sticky 0.4s ease-out;
      }
    `}</style>
  );
}

/* ================================================================== */
/*  HERO                                                               */
/* ================================================================== */
function Hero() {
  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden flex items-end">
      <Image
        src={IMG.hero}
        alt="Freshly resurfaced residential court"
        fill
        className="object-cover object-center scale-105"
        priority
      />
      {/* Heavy dark overlay for text contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />

      <div className="relative z-10 w-full px-5 pb-8 pt-20">
        <div className="max-w-xl mx-auto">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
            <span className="text-brand-green text-xs font-semibold uppercase tracking-[0.25em]">
              Austin, TX
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-[clamp(3rem,12vw,6rem)] leading-[0.9] text-white tracking-tight">
            MAKE YOUR
            <br />
            COURT{" "}
            <span className="text-brand-green green-glow">GREAT</span>
            <br />
            AGAIN.
          </h1>

          <p className="mt-5 text-white/60 text-base max-w-sm leading-relaxed">
            Your court has seen better days. Make it play like new.
          </p>

          {/* CTA */}
          <a
            href="#contact"
            className="cta-pulse mt-7 inline-flex items-center gap-2 px-8 py-4 rounded-full bg-brand-green text-brand-navy font-bold text-base hover:brightness-110 transition-all w-full sm:w-auto justify-center"
          >
            Get an Estimate
            <ArrowRight className="w-4 h-4" />
          </a>

          {/* Stats */}
          <div className="mt-8 flex gap-8 border-t border-white/10 pt-6">
            {[
              { val: "2 Weeks", label: "We Can Start" },
              { val: "3 Days", label: "Start to Finish" },
            ].map((s) => (
              <div key={s.label}>
                <div className="font-display text-2xl text-white">{s.val}</div>
                <div className="text-[0.65rem] text-white/40 uppercase tracking-widest mt-0.5">
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* Scroll hint */}
          <div className="flex justify-center mt-8">
            <ChevronDown className="w-5 h-5 text-white/30 animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  THE PROBLEM                                                        */
/* ================================================================== */
function Problem() {
  const ref = useReveal();
  return (
    <section className="bg-[#0a0a0a] py-16 sm:py-24 overflow-hidden">
      <div ref={ref} className="max-w-xl mx-auto px-5 text-center">
        <div className="fb-fade">
          <h2 className="font-display text-[clamp(1.8rem,7vw,3.2rem)] leading-[0.95] text-white">
            YOUR POOL IS PRISTINE.
            <br />
            YOUR LAWN IS PERFECT.
            <br />
            <span className="text-brand-green green-glow">YOUR COURT?</span>
          </h2>
          <p className="mt-6 text-white/50 text-base leading-relaxed max-w-md mx-auto">
            The neighbor&apos;s court looks incredible. Yours has cracks and faded
            colors. You pay for pool service, landscaping, house cleaning — the
            court just got forgotten.
          </p>
          <p className="mt-4 text-white font-semibold text-lg">
            It doesn&apos;t have to stay that way.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  BEFORE / AFTER                                                     */
/* ================================================================== */
function BeforeAfter() {
  const ref = useReveal();
  return (
    <section className="bg-[#0a0a0a] pb-16 sm:pb-24">
      <div ref={ref} className="max-w-xl mx-auto px-5">
        <div className="fb-fade">
          <div className="text-center mb-6">
            <span className="text-brand-green text-xs font-semibold uppercase tracking-[0.25em]">
              Real Results
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="relative overflow-hidden rounded-xl img-reveal">
              <div className="absolute top-3 left-3 z-10 bg-red-500/90 text-white text-[0.6rem] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Before
              </div>
              <Image
                src={IMG.before}
                alt="Cracked court surface"
                width={800}
                height={600}
                className="w-full aspect-[4/3] object-cover"
              />
              {/* Desaturate overlay */}
              <div className="absolute inset-0 bg-black/10 mix-blend-saturation pointer-events-none" />
            </div>
            <div className="relative overflow-hidden rounded-xl img-reveal fb-fade-d2">
              <div className="absolute top-3 left-3 z-10 bg-brand-green text-brand-navy text-[0.6rem] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                After
              </div>
              <Image
                src={IMG.after}
                alt="Professionally resurfaced court"
                width={800}
                height={600}
                className="w-full aspect-[4/3] object-cover"
              />
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 flex justify-center fb-fade fb-fade-d3">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-brand-green text-brand-navy font-bold text-sm hover:brightness-110 transition-all"
          >
            Get an Estimate
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  THE FIX                                                            */
/* ================================================================== */
function TheFix() {
  const ref = useReveal();
  return (
    <section className="relative py-16 sm:py-24 overflow-hidden">
      {/* Background image with overlay */}
      <Image
        src={IMG.grind}
        alt=""
        fill
        className="object-cover"
        aria-hidden
      />
      <div className="absolute inset-0 bg-brand-navy/90 backdrop-blur-sm" />

      <div ref={ref} className="relative z-10 max-w-xl mx-auto px-5">
        <div className="fb-fade">
          <span className="text-brand-green text-xs font-semibold uppercase tracking-[0.25em]">
            The Fix
          </span>
          <h2 className="font-display text-[clamp(2rem,8vw,3.5rem)] leading-[0.95] text-white mt-3">
            DONE RIGHT.
            <br />
            NOT JUST <span className="text-brand-green">DONE FAST.</span>
          </h2>
          <p className="mt-5 text-white/50 text-base leading-relaxed">
            Most companies skip the prep work. No grinding, no drainage
            testing, no adhesion promoter. It looks fine for a year — then it
            peels, cracks, and holds water.
          </p>
          <p className="mt-3 text-white/50 text-base leading-relaxed">
            We do the prep work right — grinding, drainage testing, adhesion
            promoter — so it lasts years, not months.
          </p>
        </div>

        <div className="mt-8 space-y-3">
          {[
            "Proper grinding and surface prep",
            "ASBA drainage guidelines followed",
            "Professional-grade acrylic coatings",
            "Done in 3 days, start to finish",
          ].map((item, i) => (
            <div
              key={item}
              className={`fb-fade fb-fade-d${i + 1} flex items-center gap-3 bg-white/5 border border-white/10 rounded-lg px-4 py-3`}
            >
              <div className="w-5 h-5 rounded-full bg-brand-green/20 flex items-center justify-center flex-shrink-0">
                <Check className="w-3 h-3 text-brand-green" />
              </div>
              <span className="text-white text-sm font-medium">{item}</span>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <a
            href="#contact"
            className="fb-fade fb-fade-d4 inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-brand-green text-brand-navy font-bold text-sm hover:brightness-110 transition-all"
          >
            Get an Estimate
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  WHY OUR COURTS LAST (3 cards)                                      */
/* ================================================================== */
function WhyCourtsLast() {
  const ref = useReveal();
  const cards = [
    {
      img: IMG.grind,
      title: "We Grind, Test & Prep Right",
      text: "Failing spots get ground down. We use top adhesion promoter and follow ASBA recommendations for making courts not hold water.",
    },
    {
      img: IMG.patrick,
      title: "Patrick Walks the Court",
      text: "No sales reps. I walk your court, explain what's happening — why it cracked, why it's holding water — and exactly how we'll fix it.",
    },
    {
      img: IMG.threeColor,
      title: "Done in 3-5 Days",
      text: "Most projects complete in less than a week. We coordinate around your schedule and handle everything from crack repair to final striping.",
    },
  ];

  return (
    <section className="bg-[#0a0a0a] py-16 sm:py-24">
      <div ref={ref} className="max-w-xl mx-auto px-5">
        <div className="text-center mb-10 fb-fade">
          <span className="text-brand-green text-xs font-semibold uppercase tracking-[0.25em]">
            Why Pro Court
          </span>
          <h2 className="font-display text-[clamp(2rem,8vw,3rem)] leading-[0.95] text-white mt-3">
            WHY OUR COURTS
            <br />
            <span className="text-brand-green">LAST YEARS</span>
          </h2>
        </div>

        <div className="space-y-4">
          {cards.map((card, i) => (
            <div
              key={card.title}
              className={`fb-fade fb-fade-d${i + 1} group overflow-hidden rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-brand-green/20 transition-colors`}
            >
              <div className="flex gap-0">
                <div className="relative w-28 sm:w-36 flex-shrink-0">
                  <Image
                    src={card.img}
                    alt={card.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4 sm:p-5 flex-1">
                  <h3 className="text-white font-bold text-sm sm:text-base mb-1.5">
                    {card.title}
                  </h3>
                  <p className="text-white/40 text-xs sm:text-sm leading-relaxed">
                    {card.text}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <a
            href="#contact"
            className="fb-fade fb-fade-d4 inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-brand-green text-brand-navy font-bold text-sm hover:brightness-110 transition-all"
          >
            Get an Estimate
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  HOW IT WORKS                                                       */
/* ================================================================== */
function HowItWorks() {
  const ref = useReveal();
  const steps = [
    { num: "01", title: "Call or Email", sub: "Talk to Patrick directly" },
    { num: "02", title: "On-Site Visit", sub: "Patrick walks the court" },
    { num: "03", title: "Clear Quote", sub: "Detailed pricing in 48 hours" },
    { num: "04", title: "3-5 Days", sub: "Court plays like new" },
  ];

  return (
    <section className="bg-brand-navy py-16 sm:py-24 relative overflow-hidden">
      {/* Giant watermark number */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 font-display text-[16rem] text-white/[0.02] leading-none select-none pointer-events-none">
        04
      </div>

      <div ref={ref} className="max-w-xl mx-auto px-5 relative">
        <div className="text-center mb-10 fb-fade">
          <span className="text-brand-green text-xs font-semibold uppercase tracking-[0.25em]">
            How It Works
          </span>
          <h2 className="font-display text-[clamp(2rem,8vw,3rem)] leading-[0.95] text-white mt-3">
            WE HANDLE <span className="text-brand-green">EVERYTHING</span>
          </h2>
        </div>

        <div className="space-y-0">
          {steps.map((step, i) => (
            <div
              key={step.num}
              className={`fb-fade fb-fade-d${i + 1} flex items-center gap-5 py-5 ${
                i < steps.length - 1 ? "border-b border-white/[0.06]" : ""
              }`}
            >
              <span className="font-display text-3xl text-brand-green/30 w-12 text-right flex-shrink-0">
                {step.num}
              </span>
              <div>
                <h3 className="text-white font-bold text-base">{step.title}</h3>
                <p className="text-white/40 text-sm mt-0.5">{step.sub}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <a
            href="#contact"
            className="fb-fade inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-brand-green text-brand-navy font-bold text-sm hover:brightness-110 transition-all"
          >
            Get an Estimate
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  FAQ                                                                */
/* ================================================================== */
function FAQ() {
  const ref = useReveal();
  const [open, setOpen] = useState<number | null>(null);

  const faqs = [
    {
      q: "I got a cheaper quote. Why pay more?",
      a: "They're not grinding failing spots or following ASBA recommendations for drainage. They spray coating over your existing surface. It looks good for a while, then peels or holds water. We grind it right, use top adhesion promoter, and make sure water drains off. That's why our courts last years longer.",
    },
    {
      q: "How much does it cost?",
      a: "Most projects run $8K-$15K depending on court size, condition, and colors. I'll give you a detailed quote after walking the court.",
    },
    {
      q: "How long does it take?",
      a: "Most courts are done in 3-5 days. Weather affects curing time. I'll give you a realistic timeline when I see the forecast.",
    },
    {
      q: "Can I see your work?",
      a: "Yes. I'll give you references to call, or we can drive by completed courts.",
    },
  ];

  return (
    <section className="bg-[#0a0a0a] py-16 sm:py-24">
      <div ref={ref} className="max-w-xl mx-auto px-5">
        <div className="text-center mb-10 fb-fade">
          <h2 className="font-display text-[clamp(1.8rem,7vw,2.5rem)] text-white">
            STRAIGHT <span className="text-brand-green">ANSWERS</span>
          </h2>
        </div>

        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <button
              key={i}
              onClick={() => setOpen(open === i ? null : i)}
              className={`fb-fade fb-fade-d${i + 1} w-full text-left rounded-xl border transition-all ${
                open === i
                  ? "bg-white/[0.05] border-brand-green/20"
                  : "bg-white/[0.02] border-white/[0.06] hover:border-white/10"
              }`}
            >
              <div className="flex items-center justify-between px-5 py-4">
                <span className="text-white font-semibold text-sm pr-4">
                  &ldquo;{faq.q}&rdquo;
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-white/30 flex-shrink-0 transition-transform ${
                    open === i ? "rotate-180" : ""
                  }`}
                />
              </div>
              {open === i && (
                <div className="px-5 pb-4">
                  <p className="text-white/50 text-sm leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              )}
            </button>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <a
            href="#contact"
            className="fb-fade inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-brand-green text-brand-navy font-bold text-sm hover:brightness-110 transition-all"
          >
            Get an Estimate
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  GALLERY strip                                                      */
/* ================================================================== */
function Gallery() {
  const ref = useReveal();
  return (
    <section className="bg-[#0a0a0a] pb-8">
      <div ref={ref} className="px-2 overflow-hidden">
        <div className="flex gap-2">
          {[
            { src: IMG.yoakum, alt: "Aerial view of resurfaced tennis courts at Yoakum City Park" },
            { src: IMG.twoColor, alt: "Two-color residential court resurfacing with blue and green design" },
            { src: IMG.threeColor, alt: "Three-color custom court resurfacing with professional lines" },
            { src: IMG.after, alt: "Freshly resurfaced court with vibrant acrylic colors" },
          ].map(
            (img, i) => (
              <div
                key={i}
                className={`fb-fade fb-fade-d${i + 1} flex-1 min-w-0 rounded-lg overflow-hidden`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={400}
                  height={300}
                  className="w-full aspect-square object-cover"
                />
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  CONTACT                                                            */
/* ================================================================== */
function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const ref = useReveal();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    const fd = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name"),
          phone: fd.get("phone"),
          city: fd.get("zip"),
          message: "FB landing page lead",
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="contact" className="bg-brand-navy py-16 sm:py-24 relative overflow-hidden">
      {/* Glow orb */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-brand-green/10 rounded-full blur-[100px] pointer-events-none" />

      <div ref={ref} className="max-w-md mx-auto px-5 relative">
        <div className="text-center mb-8 fb-fade">
          <h2 className="font-display text-[clamp(2rem,8vw,3rem)] leading-[0.95] text-white">
            GET AN <span className="text-brand-green green-glow">ESTIMATE</span>
          </h2>
          <p className="mt-3 text-white/40 text-sm">
            Patrick will follow up within 24 hours.
          </p>
        </div>

        <div className="fb-fade fb-fade-d1">
          {submitted ? (
            <div className="rounded-2xl bg-white/5 border border-brand-green/20 p-8 text-center">
              <div className="w-14 h-14 rounded-full bg-brand-green/20 flex items-center justify-center mx-auto mb-4">
                <Check className="w-7 h-7 text-brand-green" />
              </div>
              <p className="text-white text-xl font-bold font-display">GOT IT!</p>
              <p className="mt-2 text-white/50 text-sm">
                Patrick will reach out within 24 hours.
              </p>
              <a
                href="tel:+15128930466"
                className="mt-4 inline-flex items-center gap-2 text-brand-green text-sm font-medium hover:underline"
              >
                <Phone className="w-3.5 h-3.5" />
                Need it sooner? Call Patrick
              </a>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl bg-white/[0.03] border border-white/[0.08] p-5 sm:p-6 space-y-4"
            >
              <div>
                <label className="block text-[0.65rem] font-semibold text-white/30 uppercase tracking-widest mb-1.5">
                  Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Your name"
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3.5 text-white placeholder:text-white/20 text-base focus:outline-none focus:border-brand-green/40 focus:ring-1 focus:ring-brand-green/20 transition-colors"
                />
              </div>
              <div>
                <label className="block text-[0.65rem] font-semibold text-white/30 uppercase tracking-widest mb-1.5">
                  Phone *
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="(512) 555-0000"
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3.5 text-white placeholder:text-white/20 text-base focus:outline-none focus:border-brand-green/40 focus:ring-1 focus:ring-brand-green/20 transition-colors"
                />
              </div>
              <div>
                <label className="block text-[0.65rem] font-semibold text-white/30 uppercase tracking-widest mb-1.5">
                  Zip Code
                </label>
                <input
                  type="text"
                  name="zip"
                  inputMode="numeric"
                  placeholder="78746"
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3.5 text-white placeholder:text-white/20 text-base focus:outline-none focus:border-brand-green/40 focus:ring-1 focus:ring-brand-green/20 transition-colors"
                />
              </div>

              {error && <p className="text-red-400 text-sm">{error}</p>}

              <button
                type="submit"
                disabled={submitting}
                className="cta-pulse w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-brand-green text-brand-navy font-bold text-base hover:brightness-110 transition-all disabled:opacity-60 disabled:animate-none"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Get an Estimate
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <p className="text-center text-white/25 text-xs">
                Or call{" "}
                <a href="tel:+15128930466" className="text-brand-green/70 hover:text-brand-green">
                  (512) 893-0466
                </a>
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  STICKY MOBILE CTA BAR                                              */
/* ================================================================== */
function StickyBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 sm:hidden sticky-bar">
      <div className="bg-[#0a0a0a]/95 backdrop-blur-lg border-t border-white/10 px-4 py-3 flex gap-3">
        <a
          href="#contact"
          className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-full bg-brand-green text-brand-navy font-bold text-sm"
        >
          Get an Estimate
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
        <a
          href="tel:+15128930466"
          className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0"
        >
          <Phone className="w-4 h-4 text-white" />
        </a>
      </div>
    </div>
  );
}

/* ================================================================== */
/*  FOOTER                                                             */
/* ================================================================== */
function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-white/[0.04] py-8">
      <div className="max-w-xl mx-auto px-5 flex flex-col items-center gap-4">
        <Image
          src={IMG.logoWhite}
          alt="Pro Court Surfaces"
          width={100}
          height={25}
          className="h-5 w-auto opacity-40"
        />
        <div className="flex items-center gap-4 text-xs text-white/30">
          <a href="tel:+15128930466" className="hover:text-white/60 transition-colors">
            (512) 893-0466
          </a>
          <span className="text-white/10">|</span>
          <span>Austin, TX</span>
        </div>
        <p className="text-[0.6rem] text-white/20">
          &copy; 2026 Pro Court Surfaces
        </p>
      </div>
    </footer>
  );
}

/* ================================================================== */
/*  PAGE                                                                */
/* ================================================================== */
export default function LandingFBPage() {
  return (
    <div className="fb-land">
      <PageStyles />
      <main>
        <Hero />
        <Problem />
        <BeforeAfter />
        <TheFix />
        <WhyCourtsLast />
        <Gallery />
        <HowItWorks />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <StickyBar />
    </div>
  );
}
