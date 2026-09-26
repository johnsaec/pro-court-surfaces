"use client";

import Image from "next/image";
import Link from "next/link";
import { AlertTriangle, ArrowRight, Check, Phone } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BeforeAfter } from "@/components/landing/BeforeAfter";
import { Contact, selectService } from "@/components/landing/Contact";
import { GoogleReviews } from "@/components/landing/GoogleReviews";
import { ServiceArea } from "@/components/landing/ServiceArea";
import { useScrollReveal } from "@/components/landing/useScrollReveal";
import { trackEvent } from "@/lib/analytics";
import {
  RESURFACING_FAQS,
  RESURFACING_PROJECT_TYPE,
  RESURFACING_STEPS,
  WARNING_SIGNS,
} from "./resurfacing-data";

const PAGE_PATH = "/court-resurfacing";

function quoteClick(location: string, message?: string) {
  selectService({ projectType: RESURFACING_PROJECT_TYPE, message });
  trackEvent("cta_click", {
    cta_text: "Get a Free Resurfacing Quote",
    cta_location: location,
    page_path: PAGE_PATH,
  });
}

function QuoteButton({ location, message }: { location: string; message?: string }) {
  return (
    <a
      href="#contact"
      onClick={() => quoteClick(location, message)}
      className="group inline-flex items-center gap-2 px-7 py-4 rounded-lg bg-brand-blue text-white font-semibold text-sm hover:bg-brand-blue/90 transition-all shadow-xl shadow-brand-blue/20"
    >
      Get a Free Resurfacing Quote
      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
    </a>
  );
}

function Hero() {
  return (
    <section className="relative min-h-[85svh] w-full overflow-hidden flex">
      <Image
        src="https://res.cloudinary.com/dwyd4f7lz/image/upload/f_auto,q_auto,w_1600/v1759800811/DJI_20250917112633_0423_D_kiqa0u.jpg"
        alt="Aerial view of a freshly resurfaced tennis court in blue and green"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/20" />

      <div className="relative z-10 flex flex-col justify-end w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-32 pb-12 sm:pb-20">
        <span className="inline-flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-brand-green">
          <span className="w-8 h-px bg-brand-green" />
          Austin &amp; Central Texas
        </span>
        <h1 className="mt-5 text-[clamp(2.25rem,6vw,4.75rem)] font-bold text-white leading-[1.05] tracking-tight max-w-4xl">
          Tennis &amp; pickleball court{" "}
          <span className="text-brand-green">resurfacing.</span>
        </h1>
        <p className="mt-5 text-lg sm:text-xl text-white/75 font-light max-w-2xl leading-relaxed">
          Cracked, faded, or slick court? We repair the cracks, recoat with
          acrylic built for Texas heat, and restripe the lines. Patrick walks
          your court with you and sends a detailed written quote within 48
          hours, free.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-start gap-4">
          <QuoteButton location="hero" />
          <a
            href="tel:+15128930466"
            onClick={() =>
              trackEvent("phone_click", {
                cta_location: "hero",
                page_path: PAGE_PATH,
              })
            }
            className="inline-flex items-center gap-2 px-7 py-4 rounded-lg border border-white/25 text-white/90 font-semibold text-sm hover:bg-white/10 hover:border-white/40 transition-all"
          >
            <Phone className="w-4 h-4" />
            (512) 893-0466
          </a>
        </div>

        <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/80">
          {["5.0 on Google", "Free on-site quote", "Written quote in 48 hours", "Most jobs done in 3–5 days", "Written warranty"].map(
            (item) => (
              <li key={item} className="flex items-center gap-2">
                <Check className="w-4 h-4 text-brand-green" strokeWidth={2.5} />
                {item}
              </li>
            )
          )}
        </ul>
      </div>
    </section>
  );
}

function WarningSigns() {
  const ref = useScrollReveal();

  return (
    <section aria-labelledby="signs-title" className="py-20 sm:py-28 bg-white">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl reveal-item">
          <span className="inline-flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-brand-blue mb-4">
            <span className="w-6 h-px bg-brand-blue" />
            Signs it&apos;s time
          </span>
          <h2 id="signs-title" className="text-3xl sm:text-4xl font-bold text-brand-text leading-tight">
            Does my court need resurfacing?
          </h2>
          <p className="mt-5 text-brand-text-muted text-lg leading-relaxed">
            Most outdoor courts in Central Texas need resurfacing every 4 to 8
            years. If you see any of these, it&apos;s time for a look.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {WARNING_SIGNS.map((sign, i) => (
            <div
              key={sign.title}
              className="reveal-item rounded-2xl border border-gray-200 p-6 bg-gray-50"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <AlertTriangle className="w-5 h-5 text-brand-blue" />
              <h3 className="mt-3 font-semibold text-brand-text">{sign.title}</h3>
              <p className="mt-2 text-brand-text-muted leading-relaxed">{sign.body}</p>
            </div>
          ))}
        </div>

        <p className="mt-8 text-brand-text-muted reveal-item">
          Surface in good shape but dirty or slippery? You may only need{" "}
          <Link href="/court-services#cleaning" className="text-brand-blue hover:underline">
            court cleaning
          </Link>
          . We&apos;ll tell you honestly which one you need.
        </p>
      </div>
    </section>
  );
}

function Steps() {
  const ref = useScrollReveal();

  return (
    <section aria-labelledby="steps-title" className="py-20 sm:py-28 bg-gray-50">
      <div
        ref={ref}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"
      >
        <div className="reveal-item">
          <span className="inline-flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-brand-blue mb-4">
            <span className="w-6 h-px bg-brand-blue" />
            What&apos;s included
          </span>
          <h2 id="steps-title" className="text-3xl sm:text-4xl font-bold text-brand-text leading-tight">
            What does court resurfacing include?
          </h2>
          <ol className="mt-8 space-y-6">
            {RESURFACING_STEPS.map((step, i) => (
              <li key={step.title} className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-blue text-white text-sm font-semibold flex items-center justify-center">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-semibold text-brand-text">{step.title}</h3>
                  <p className="mt-1 text-brand-text-muted leading-relaxed">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-10">
            <QuoteButton location="steps" />
          </div>
        </div>

        <div
          className="reveal-item relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl"
          style={{ transitionDelay: "150ms" }}
        >
          <Image
            src="https://res.cloudinary.com/dwyd4f7lz/image/upload/f_auto,q_auto,w_1000/v1759801129/IMG_0037_xclgpd.jpg"
            alt="Court surface being prepared for new acrylic coats"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}

function AddPickleball() {
  const ref = useScrollReveal();

  return (
    <section aria-labelledby="pickleball-title" className="py-20 sm:py-28 bg-white">
      <div
        ref={ref}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"
      >
        <div className="reveal-item lg:order-2">
          <span className="inline-flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-brand-blue mb-4">
            <span className="w-6 h-px bg-brand-blue" />
            Add pickleball
          </span>
          <h2 id="pickleball-title" className="text-3xl sm:text-4xl font-bold text-brand-text leading-tight">
            Resurfacing is the best time to add pickleball
          </h2>
          <p className="mt-5 text-brand-text-muted text-lg leading-relaxed">
            New lines go down on fresh color, so resurfacing is the cheapest
            moment to add pickleball. Keep tennis and add pickleball lines in a
            contrasting color, or convert the court to up to four dedicated
            pickleball courts with contrasting kitchen zones.
          </p>
          <div className="mt-8">
            <QuoteButton
              location="add_pickleball"
              message="Interested in: resurfacing + adding pickleball lines"
            />
          </div>
        </div>

        <div
          className="reveal-item relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl lg:order-1"
          style={{ transitionDelay: "150ms" }}
        >
          <Image
            src="https://res.cloudinary.com/dwyd4f7lz/image/upload/f_auto,q_auto,w_1000/v1762354561/3_color_straight_h4nhiw.heic"
            alt="Three-color court with crisp pickleball lines"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}

function ResurfacingFAQ() {
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
            Court resurfacing questions
          </h2>
        </div>
        <Accordion type="single" collapsible className="reveal-item">
          {RESURFACING_FAQS.map((faq, i) => (
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
        <p className="mt-10 text-center text-brand-text-muted">
          Want the details? Read our{" "}
          <Link href="/blog/court-resurfacing" className="text-brand-blue hover:underline">
            court resurfacing guide
          </Link>{" "}
          and{" "}
          <Link href="/blog/court-repair" className="text-brand-blue hover:underline">
            crack repair guide
          </Link>
          .
        </p>
      </div>
    </section>
  );
}

export default function ResurfacingSections() {
  return (
    <>
      <Hero />
      <WarningSigns />
      <Steps />
      <BeforeAfter />
      <AddPickleball />
      <GoogleReviews />
      <ServiceArea />
      <ResurfacingFAQ />
      <Contact
        formName="court_resurfacing_contact"
        heading="Get a free resurfacing quote"
        submitLabel="Get a Free Quote"
      />
    </>
  );
}
