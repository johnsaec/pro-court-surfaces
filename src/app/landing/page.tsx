"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { trackEvent } from "@/lib/analytics";
import { getAttribution } from "@/lib/attribution";
import {
  Phone,
  Mail,
  ArrowRight,
  Loader2,
  Menu,
  X,
  Eye,
  FileText,
  HardHat,
  PhoneCall,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Cloudinary image URLs                                              */
/* ------------------------------------------------------------------ */
const IMG = {
  heroBg:
    "https://res.cloudinary.com/dwyd4f7lz/image/upload/f_auto,q_auto,w_1600/v1759802070/DJI_20250917112353_0396_D_2_v1nhyi.jpg",
  logoWhite:
    "https://res.cloudinary.com/dwyd4f7lz/image/upload/f_auto,q_auto/v1767487552/pro_court_logo_white_no_bg_2_ludutv.png",
  logoColor:
    "https://res.cloudinary.com/dwyd4f7lz/image/upload/f_auto,q_auto/v1767487583/pro_court_logo_full_color_no_bg_2_owjtqf.png",
  droneAfter:
    "https://res.cloudinary.com/dwyd4f7lz/image/upload/f_auto,q_auto,w_800/v1759802070/DJI_20250917112353_0396_D_2_v1nhyi.jpg",
  patrick:
    "https://res.cloudinary.com/dwyd4f7lz/image/upload/f_auto,q_auto,w_800/v1759809485/IMG_0225_iaakk1.jpg",
  courtGrind:
    "https://res.cloudinary.com/dwyd4f7lz/image/upload/f_auto,q_auto,w_800/v1759801933/FNGP5107_cdnnzj.jpg",
  courtFinished:
    "https://res.cloudinary.com/dwyd4f7lz/image/upload/f_auto,q_auto,w_800/v1762354561/3_color_straight_h4nhiw.heic",
  courtYoakum:
    "https://res.cloudinary.com/dwyd4f7lz/image/upload/f_auto,q_auto,w_800/v1769365087/DJI_0061_kcgxtd.jpg",
  beforeCracked:
    "https://res.cloudinary.com/dwyd4f7lz/image/upload/f_auto,q_auto,w_800/v1759801129/IMG_0037_xclgpd.jpg",
  afterResurfaced:
    "https://res.cloudinary.com/dwyd4f7lz/image/upload/f_auto,q_auto,w_800/v1759800811/DJI_20250917112633_0423_D_kiqa0u.jpg",
  beforeWimberley:
    "https://res.cloudinary.com/dwyd4f7lz/image/upload/f_auto,q_auto,w_800/v1762354899/before_2_dyksr6.heic",
  afterWimberley:
    "https://res.cloudinary.com/dwyd4f7lz/image/upload/f_auto,q_auto,w_800/v1762354989/3_color_straight_1_dtxi5n.heic",
  twoColor:
    "https://res.cloudinary.com/dwyd4f7lz/image/upload/f_auto,q_auto,w_800/v1762309892/2_color_front_j6zp5s.heic",
};

/* ------------------------------------------------------------------ */
/*  Scroll-reveal hook (inline to keep single file)                   */
/* ------------------------------------------------------------------ */
import { useEffect, useRef } from "react";

function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("revealed");
            obs.unobserve(e.target);
          }
        }),
      { threshold, rootMargin: "0px 0px -60px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return ref;
}

/* ------------------------------------------------------------------ */
/*  CTA button (scrolls to #contact)                                   */
/* ------------------------------------------------------------------ */
function CTA({ dark = false, className = "", location = "section" }: { dark?: boolean; className?: string; location?: string }) {
  return (
    <div className={`mt-10 flex justify-center ${className}`}>
      <a
        href="#contact"
        onClick={() => trackEvent("cta_click", { cta_text: "Get an Estimate", cta_location: location, page_path: "/landing" })}
        className={`inline-flex items-center gap-2 px-7 py-4 rounded-lg font-semibold text-base transition-all shadow-lg ${
          dark
            ? "bg-brand-green text-brand-navy hover:bg-brand-green/90 shadow-brand-green/20"
            : "bg-brand-blue text-white hover:bg-brand-blue/90 shadow-brand-blue/20"
        }`}
      >
        Get an Estimate
        <ArrowRight className="w-4 h-4" />
      </a>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Navbar (simplified for landing page)                               */
/* ------------------------------------------------------------------ */
function LandingNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex-shrink-0">
            <Image
              src={scrolled ? IMG.logoColor : IMG.logoWhite}
              alt="Pro Court Surfaces logo"
              width={140}
              height={35}
              className="h-8 w-auto"
              priority
            />
          </Link>
          <div className="hidden sm:flex items-center gap-4">
            <a
              href="tel:+15128930466"
              className={`text-sm font-medium transition-colors ${
                scrolled ? "text-brand-text" : "text-white/80"
              }`}
            >
              (512) 893-0466
            </a>
            <a
              href="#contact"
              className="inline-flex items-center px-5 py-2.5 rounded-lg bg-brand-blue text-white text-sm font-semibold hover:bg-brand-blue/90 transition-colors"
            >
              Get an Estimate
            </a>
          </div>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="sm:hidden p-2"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className={`h-6 w-6 ${scrolled ? "text-brand-text" : "text-white"}`} />
            ) : (
              <Menu className={`h-6 w-6 ${scrolled ? "text-brand-text" : "text-white"}`} />
            )}
          </button>
        </div>
      </div>
      {mobileOpen && (
        <div className="sm:hidden bg-white border-t shadow-lg">
          <div className="px-4 py-4 space-y-3">
            <a
              href="tel:+15128930466"
              onClick={() => setMobileOpen(false)}
              className="block text-brand-text text-sm font-medium py-2"
            >
              Call (512) 893-0466
            </a>
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="block text-center px-5 py-2.5 rounded-lg bg-brand-blue text-white text-sm font-semibold"
            >
              Get an Estimate
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

/* ================================================================== */
/*  HERO                                                               */
/* ================================================================== */
function LandingHero() {
  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden flex items-center">
      {/* Static image background */}
      <Image
        src={IMG.heroBg}
        alt="Aerial view of freshly resurfaced court"
        fill
        className="object-cover object-center"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 py-20 pt-24">
        <span className="inline-flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-brand-green">
          <span className="w-8 h-px bg-brand-green" />
          Austin, TX
        </span>

        <h1 className="mt-4 text-[clamp(2.2rem,8vw,4.5rem)] font-bold text-white leading-[1.08] tracking-tight max-w-lg">
          Make Your Court{" "}
          <span className="text-brand-green">Great Again.</span>
        </h1>

        <p className="mt-4 text-lg text-white/70 font-light max-w-md leading-relaxed">
          Your court has seen better days. Make it play like new.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-start gap-3">
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 px-7 py-4 rounded-lg bg-brand-blue text-white font-semibold text-base hover:bg-brand-blue/90 transition-all shadow-xl shadow-brand-blue/20 w-full sm:w-auto justify-center"
          >
            Get an Estimate
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="tel:+15128930466"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-lg border border-white/25 text-white/90 font-semibold text-base hover:bg-white/10 transition-all w-full sm:w-auto justify-center"
          >
            <Phone className="w-4 h-4" />
            Talk to Patrick
          </a>
        </div>

        {/* Stats */}
        <div className="mt-10 flex flex-wrap gap-6">
          {[
            { value: "2 Weeks", label: "We Can Start" },
            { value: "3 Days", label: "Start to Finish" },
          ].map((s) => (
            <div key={s.label} className="flex items-baseline gap-2">
              <span className="text-xl sm:text-2xl font-bold text-white">
                {s.value}
              </span>
              <span className="text-xs text-white/50 uppercase tracking-wider">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  THE PROBLEM                                                        */
/* ================================================================== */
function TheProblem() {
  const ref = useScrollReveal();
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div ref={ref} className="max-w-2xl mx-auto px-5 sm:px-8 text-center">
        <div className="reveal-item">
          <h2 className="text-2xl sm:text-4xl font-bold text-brand-text leading-tight">
            Your pool is pristine. Your lawn is perfect.{" "}
            <span className="text-brand-blue">Your court? Embarrassing.</span>
          </h2>
          <p className="mt-6 text-brand-text-muted text-base sm:text-lg leading-relaxed">
            The neighbor&apos;s court looks incredible. Yours has cracks and faded colors.
            You pay for pool service, landscaping, house cleaning — the court just got forgotten.
          </p>
          <p className="mt-4 text-brand-text font-semibold text-base sm:text-lg">
            It doesn&apos;t have to stay that way.
          </p>
        </div>
        <CTA />
      </div>
    </section>
  );
}

/* ================================================================== */
/*  THE FIX                                                            */
/* ================================================================== */
function TheFix() {
  const ref = useScrollReveal();
  return (
    <section className="py-16 sm:py-24 bg-brand-bg-alt">
      <div ref={ref} className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="reveal-item">
            <span className="inline-flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-brand-blue mb-3">
              <span className="w-6 h-px bg-brand-blue" />
              The Fix
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-brand-text leading-tight">
              Courts done right.{" "}
              <span className="text-brand-blue">Not just done fast.</span>
            </h2>
            <p className="mt-5 text-brand-text-muted text-base leading-relaxed">
              Most companies skip the prep work. No grinding, no drainage testing,
              no adhesion promoter. It looks fine for a year — then it peels, cracks,
              and holds water.
            </p>
            <p className="mt-4 text-brand-text-muted text-base leading-relaxed">
              We do the prep work right — grinding, drainage testing, adhesion
              promoter — so it lasts years, not months.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Proper grinding and surface prep",
                "ASBA drainage guidelines followed",
                "Professional-grade acrylic coatings",
                "Done in 3-5 days, start to finish",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-brand-green flex-shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-brand-text font-medium text-sm">{item}</span>
                </li>
              ))}
            </ul>
            <CTA className="justify-start" />
          </div>

          <div className="reveal-item" style={{ transitionDelay: "150ms" }}>
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={IMG.droneAfter}
                alt="Aerial view of professionally resurfaced court"
                width={800}
                height={600}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  WHY OUR COURTS LAST YEARS (3 cards from messaging reference)       */
/* ================================================================== */
function WhyOurCourtsLast() {
  const ref = useScrollReveal();
  const cards = [
    {
      image: IMG.courtGrind,
      title: "We Grind, Test & Prep Right",
      description:
        "Failing spots get ground down, or we grind over to start if needed. We use top adhesion promoter and products and follow ASBA recommendations for making courts not hold water.",
    },
    {
      image: IMG.patrick,
      title: "Patrick Walks the Court",
      description:
        "No sales reps. I walk your court, explain what's happening — why it cracked, why it's holding water — and exactly how we'll fix it. Clear pricing, honest timeline, no surprises.",
    },
    {
      image: IMG.courtFinished,
      title: "Done in 3-5 Days",
      description:
        "Most projects complete in less than a week. We coordinate around your schedule and handle everything from crack repair to final striping.",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div ref={ref} className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 reveal-item">
          <span className="inline-flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-brand-blue mb-3">
            <span className="w-6 h-px bg-brand-blue" />
            Why Pro Court
            <span className="w-6 h-px bg-brand-blue" />
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-brand-text leading-tight">
            Why Our Courts Last Years
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <div
              key={card.title}
              className="reveal-item rounded-2xl overflow-hidden bg-brand-bg-alt shadow-lg"
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <div className="relative h-48 sm:h-52">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5 sm:p-6">
                <h3 className="text-lg font-bold text-brand-text mb-2">
                  {card.title}
                </h3>
                <p className="text-sm text-brand-text-muted leading-relaxed">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        <CTA />
      </div>
    </section>
  );
}

/* ================================================================== */
/*  HOW IT WORKS (4 steps from messaging reference)                    */
/* ================================================================== */
function HowItWorks() {
  const ref = useScrollReveal();
  const steps = [
    {
      icon: PhoneCall,
      number: "1",
      title: "Call or Email",
      description: "Talk to Patrick directly.",
    },
    {
      icon: Eye,
      number: "2",
      title: "On-Site Visit",
      description: "Patrick walks the court, explains the fix.",
    },
    {
      icon: FileText,
      number: "3",
      title: "Clear Quote",
      description: "Detailed pricing within 48 hours.",
    },
    {
      icon: null,
      number: "4",
      title: "3-5 Days",
      description: "Court looks and plays like new.",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-brand-navy text-white relative overflow-hidden">
      <div className="absolute -right-12 top-1/2 -translate-y-1/2 text-[18rem] font-bold text-white/[0.03] leading-none select-none pointer-events-none hidden lg:block">
        4
      </div>
      <div ref={ref} className="max-w-7xl mx-auto px-5 sm:px-8 relative">
        <div className="text-center max-w-2xl mx-auto mb-12 reveal-item">
          <span className="inline-flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-brand-green mb-3">
            <span className="w-6 h-px bg-brand-green" />
            How It Works
            <span className="w-6 h-px bg-brand-green" />
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold leading-tight">
            We Handle Everything
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className="reveal-item text-center"
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <div className="relative inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-blue text-white mb-4">
                {step.icon ? (
                  <step.icon className="h-6 w-6" strokeWidth={1.5} />
                ) : (
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="10" cy="14" r="7" />
                    <path d="M14.5 9.5L21 3" />
                    <path d="M18 3h3v3" />
                    <path d="M7 11.5l6-6" />
                  </svg>
                )}
                <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-brand-green text-brand-navy text-xs font-bold flex items-center justify-center">
                  {step.number}
                </span>
              </div>
              <h3 className="text-base font-bold mb-1">{step.title}</h3>
              <p className="text-sm text-white/60">{step.description}</p>
            </div>
          ))}
        </div>
        <CTA dark />
      </div>
    </section>
  );
}

/* ================================================================== */
/*  FAQ (from messaging reference — verbatim)                          */
/* ================================================================== */
function LandingFAQ() {
  const ref = useScrollReveal();
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
    <section className="py-16 sm:py-24 bg-white">
      <div ref={ref} className="max-w-2xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-10 reveal-item">
          <span className="inline-flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-brand-blue mb-3">
            <span className="w-6 h-px bg-brand-blue" />
            FAQ
            <span className="w-6 h-px bg-brand-blue" />
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-brand-text leading-tight">
            Questions? Straight Answers.
          </h2>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="reveal-item border border-gray-200 rounded-xl p-5 sm:p-6"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <h3 className="text-base font-bold text-brand-text mb-2">
                &ldquo;{faq.q}&rdquo;
              </h3>
              <p className="text-sm text-brand-text-muted leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
        <CTA />
      </div>
    </section>
  );
}

/* ================================================================== */
/*  BEFORE / AFTER                                                     */
/* ================================================================== */
function LandingBeforeAfter() {
  const ref = useScrollReveal();
  const projects = [
    {
      before: { src: IMG.beforeCracked, alt: "Before: cracked and faded court surface" },
      after: { src: IMG.afterResurfaced, alt: "After: professionally resurfaced with vibrant colors" },
      label: "Residential Tennis Court",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-brand-bg-alt">
      <div ref={ref} className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 reveal-item">
          <span className="inline-flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-brand-blue mb-3">
            <span className="w-6 h-px bg-brand-blue" />
            Real Results
            <span className="w-6 h-px bg-brand-blue" />
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-brand-text leading-tight">
            See the Difference
          </h2>
        </div>

        <div className="space-y-10">
          {projects.map((project, i) => (
            <div
              key={i}
              className="reveal-item"
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <h3 className="text-sm font-semibold text-brand-blue uppercase tracking-wider mb-4 text-center">
                {project.label}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="relative overflow-hidden rounded-xl">
                  <div className="absolute top-3 left-3 z-10 bg-black/70 text-white text-[0.65rem] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                    Before
                  </div>
                  <Image
                    src={project.before.src}
                    alt={project.before.alt}
                    width={800}
                    height={600}
                    className="w-full h-full object-cover aspect-[4/3]"
                  />
                </div>
                <div className="relative overflow-hidden rounded-xl">
                  <div className="absolute top-3 left-3 z-10 bg-brand-blue text-white text-[0.65rem] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                    After
                  </div>
                  <Image
                    src={project.after.src}
                    alt={project.after.alt}
                    width={800}
                    height={600}
                    className="w-full h-full object-cover aspect-[4/3]"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <CTA />
      </div>
    </section>
  );
}

/* ================================================================== */
/*  CONTACT FORM (simplified: name + email + phone)                    */
/* ================================================================== */
function LandingContact() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const ref = useScrollReveal();

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
          email: fd.get("email"),
          phone: fd.get("phone"),
          message: "Landing page lead",
          attribution: getAttribution(),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }

      trackEvent("generate_lead", {
        form_name: "landing_contact",
        page_path: "/landing",
      });
      router.push("/post-submit");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section
      id="contact"
      className="py-16 sm:py-24 bg-brand-navy text-white relative overflow-hidden"
    >
      <div className="absolute -top-40 -right-40 w-[400px] h-[400px] bg-brand-blue/20 rounded-full blur-3xl pointer-events-none" />

      <div ref={ref} className="max-w-lg mx-auto px-5 sm:px-8 relative">
        <div className="text-center mb-8 reveal-item">
          <h2 className="text-2xl sm:text-4xl font-bold leading-tight">
            Get an Estimate
          </h2>
          <p className="mt-3 text-white/60 text-base">
            Tell us about your court. Patrick will follow up within 24 hours.
          </p>
        </div>

        <div className="reveal-item" style={{ transitionDelay: "150ms" }}>
            <form
              onSubmit={handleSubmit}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 space-y-4"
            >
              <div>
                <label
                  htmlFor="name"
                  className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-1.5"
                >
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full rounded-lg border border-white/15 bg-white/10 px-4 py-3.5 text-white placeholder:text-white/30 text-base focus:outline-none focus:border-brand-green/50 focus:ring-1 focus:ring-brand-green/30 transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-1.5"
                >
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full rounded-lg border border-white/15 bg-white/10 px-4 py-3.5 text-white placeholder:text-white/30 text-base focus:outline-none focus:border-brand-green/50 focus:ring-1 focus:ring-brand-green/30 transition-colors"
                  placeholder="you@email.com"
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-1.5"
                >
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full rounded-lg border border-white/15 bg-white/10 px-4 py-3.5 text-white placeholder:text-white/30 text-base focus:outline-none focus:border-brand-green/50 focus:ring-1 focus:ring-brand-green/30 transition-colors"
                  placeholder="(512) 555-0000"
                />
              </div>

              {error && <p className="text-red-400 text-sm">{error}</p>}

              <button
                type="submit"
                disabled={submitting}
                className="group w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-brand-blue text-white font-semibold text-base hover:bg-brand-blue/90 transition-all shadow-lg shadow-brand-blue/20 disabled:opacity-60"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Get an Estimate
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              <p className="text-center text-white/40 text-xs mt-2">
                Or call Patrick directly:{" "}
                <a href="tel:+15128930466" className="text-brand-green hover:underline">
                  (512) 893-0466
                </a>
              </p>
            </form>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  FOOTER (minimal)                                                   */
/* ================================================================== */
function LandingFooter() {
  return (
    <footer className="bg-brand-navy text-white/50 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Image
            src={IMG.logoWhite}
            alt="Pro Court Surfaces"
            width={120}
            height={30}
            className="h-6 w-auto"
          />
          <span className="text-xs">Austin, TX</span>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <a href="tel:+15128930466" className="hover:text-white transition-colors">
            (512) 893-0466
          </a>
          <span className="text-white/20">|</span>
          <a href="mailto:patrick@procourtsurfaces.com" className="hover:text-white transition-colors">
            patrick@procourtsurfaces.com
          </a>
        </div>
      </div>
      <div className="text-center text-xs text-white/30 pb-6">
        &copy; 2026 Pro Court Surfaces. All rights reserved.
      </div>
    </footer>
  );
}

/* ================================================================== */
/*  PAGE                                                                */
/* ================================================================== */
export default function LandingPage() {
  return (
    <>
      <LandingNavbar />
      <main>
        <LandingHero />
        <TheProblem />
        <LandingBeforeAfter />
        <TheFix />
        <WhyOurCourtsLast />
        <HowItWorks />
        <LandingFAQ />
        <LandingContact />
      </main>
      <LandingFooter />
    </>
  );
}
