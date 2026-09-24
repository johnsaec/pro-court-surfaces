"use client";

import Image from "next/image";
import { ArrowRight, Check, Phone } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BeforeAfter } from "@/components/landing/BeforeAfter";
import { Contact, selectService } from "@/components/landing/Contact";
import { Process } from "@/components/landing/Process";
import { ServiceArea } from "@/components/landing/ServiceArea";
import { useScrollReveal } from "@/components/landing/useScrollReveal";
import { trackEvent } from "@/lib/analytics";
import {
  COURT_SERVICES,
  COURT_SERVICES_FAQS,
  type CourtService,
} from "./services-data";

function quoteClick(service: CourtService | null, location: string) {
  if (service) {
    selectService({
      projectType: service.projectType,
      message: service.formMessage,
    });
  }
  trackEvent("cta_click", {
    cta_text: "Get a Free Quote",
    cta_location: location,
    page_path: "/court-services",
  });
}

function Hero() {
  return (
    <section className="relative min-h-[85svh] w-full overflow-hidden flex">
      <Image
        src="https://res.cloudinary.com/dwyd4f7lz/image/upload/f_auto,q_auto,w_1600/v1769365125/DJI_0054_rgzy6p.jpg"
        alt="Aerial view of freshly resurfaced courts by Pro Court Surfaces"
        fill
        priority
        sizes="100vw"
        className="object-cover object-bottom"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/20" />

      <div className="relative z-10 flex flex-col justify-end w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-32 pb-12 sm:pb-20">
        <span className="inline-flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-brand-green">
          <span className="w-8 h-px bg-brand-green" />
          Austin &amp; Central Texas
        </span>
        <h1 className="mt-5 text-[clamp(2.25rem,6vw,4.75rem)] font-bold text-white leading-[1.05] tracking-tight max-w-4xl">
          Court resurfacing, conversions, cleaning &amp;{" "}
          <span className="text-brand-green">new courts.</span>
        </h1>
        <p className="mt-5 text-lg sm:text-xl text-white/75 font-light max-w-2xl leading-relaxed">
          Pickleball, tennis, and multi-sport courts for homeowners, HOAs, and
          clubs. Patrick walks your court with you and sends a detailed written
          quote within 48 hours — free.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-start gap-4">
          <a
            href="#contact"
            onClick={() => quoteClick(null, "hero")}
            className="group inline-flex items-center gap-2 px-7 py-4 rounded-lg bg-brand-blue text-white font-semibold text-sm hover:bg-brand-blue/90 transition-all shadow-xl shadow-brand-blue/20"
          >
            Get a Free Quote
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="tel:+15128930466"
            onClick={() =>
              trackEvent("phone_click", {
                cta_location: "hero",
                page_path: "/court-services",
              })
            }
            className="inline-flex items-center gap-2 px-7 py-4 rounded-lg border border-white/25 text-white/90 font-semibold text-sm hover:bg-white/10 hover:border-white/40 transition-all"
          >
            <Phone className="w-4 h-4" />
            (512) 893-0466
          </a>
        </div>

        <nav
          aria-label="Services on this page"
          className="mt-10 flex flex-wrap gap-2"
        >
          {COURT_SERVICES.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="px-4 py-2 rounded-full bg-white/10 border border-white/15 text-white/80 text-sm hover:bg-white/20 hover:text-white transition-colors"
            >
              {s.eyebrow}
            </a>
          ))}
        </nav>
      </div>
    </section>
  );
}

function ServiceBlock({ service, index }: { service: CourtService; index: number }) {
  const ref = useScrollReveal();
  const flip = index % 2 === 1;

  return (
    <section
      id={service.id}
      aria-labelledby={`${service.id}-title`}
      className={`scroll-mt-24 py-20 sm:py-28 ${flip ? "bg-gray-50" : "bg-white"}`}
    >
      <div
        ref={ref}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"
      >
        <div className={`reveal-item ${flip ? "lg:order-2" : ""}`}>
          <span className="inline-flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-brand-blue mb-4">
            <span className="w-6 h-px bg-brand-blue" />
            {service.eyebrow}
          </span>
          <h2
            id={`${service.id}-title`}
            className="text-3xl sm:text-4xl font-bold text-brand-text leading-tight"
          >
            {service.title}
          </h2>
          <p className="mt-5 text-brand-text-muted text-lg leading-relaxed">
            {service.answer}
          </p>

          <ul className="mt-6 space-y-2.5">
            {service.includes.map((item) => (
              <li key={item} className="flex items-start gap-3 text-brand-text">
                <Check className="w-5 h-5 mt-0.5 flex-shrink-0 text-brand-green" strokeWidth={2.5} />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <p className="mt-6 text-sm text-brand-text-muted">
            <span className="font-semibold text-brand-text">Good fit if: </span>
            {service.goodFit}
          </p>

          <a
            href="#contact"
            onClick={() => quoteClick(service, service.id)}
            className="group mt-8 inline-flex items-center gap-2 px-7 py-3.5 rounded-lg bg-brand-blue text-white font-semibold text-sm hover:bg-brand-blue/90 transition-all shadow-lg shadow-brand-blue/20"
          >
            Get a Free {service.eyebrow === "New courts" ? "New Court" : service.eyebrow} Quote
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        <div
          className={`reveal-item relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl ${flip ? "lg:order-1" : ""}`}
          style={{ transitionDelay: "150ms" }}
        >
          <Image
            src={service.image.src}
            alt={service.image.alt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}

function ServicesFAQ() {
  const ref = useScrollReveal();

  return (
    <section id="faq" aria-label="Frequently asked questions" className="py-24 sm:py-32 bg-white">
      <div ref={ref} className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-brand-blue mb-4">
            <span className="w-6 h-px bg-brand-blue" />
            FAQ
            <span className="w-6 h-px bg-brand-blue" />
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-text leading-tight">
            Common questions about court services
          </h2>
        </div>
        <Accordion type="single" collapsible className="reveal-item">
          {COURT_SERVICES_FAQS.map((faq, i) => (
            <AccordionItem key={faq.question} value={`faq-${i}`}>
              <AccordionTrigger className="text-left text-brand-text hover:text-brand-blue transition-colors">
                <h3 className="font-semibold pr-4">{faq.question}</h3>
              </AccordionTrigger>
              <AccordionContent className="text-brand-text-muted leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

export default function CourtServicesSections() {
  return (
    <>
      <Hero />
      {COURT_SERVICES.map((service, i) => (
        <ServiceBlock key={service.id} service={service} index={i} />
      ))}
      <BeforeAfter />
      <Process />
      <ServiceArea />
      <ServicesFAQ />
      <Contact
        formName="court_services_contact"
        heading="Get a free on-site quote"
        submitLabel="Get a Free Quote"
      />
    </>
  );
}
