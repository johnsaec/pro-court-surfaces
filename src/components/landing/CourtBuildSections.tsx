"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Phone } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Contact, selectService } from "./Contact";
import { GoogleReviews } from "./GoogleReviews";
import { ServiceArea } from "./ServiceArea";
import { useScrollReveal } from "./useScrollReveal";
import { trackEvent } from "@/lib/analytics";
import { projects } from "@/lib/projects";

// Shared layout for new-court landing pages (/pickleball-court-construction,
// /tennis-court-construction). Each route passes its own copy. No prices by
// policy: every CTA drives to a free on-site quote.

export type CourtBuildContent = {
  pagePath: string;
  formName: string;
  defaultProjectType: string;
  hero: {
    titleLead: string;
    titleAccent: string;
    body: string;
    image: { src: string; alt: string };
  };
  options: { title: string; body: string; projectType: string; message: string }[];
  stepsTitle: string;
  steps: { title: string; body: string }[];
  stepsImage: { src: string; alt: string };
  featuredProjectSlugs: string[];
  faqTitle: string;
  faqs: { question: string; answer: string }[];
  relatedLinks: { href: string; label: string }[];
  contactHeading: string;
};

type Ctx = { pagePath: string; defaultProjectType: string };

function quoteClick(ctx: Ctx, location: string, projectType?: string, message?: string) {
  selectService({ projectType: projectType ?? ctx.defaultProjectType, message });
  trackEvent("cta_click", {
    cta_text: "Get a Free Court Quote",
    cta_location: location,
    page_path: ctx.pagePath,
  });
}

function QuoteButton({
  ctx,
  location,
  label = "Get a Free Court Quote",
  projectType,
  message,
}: {
  ctx: Ctx;
  location: string;
  label?: string;
  projectType?: string;
  message?: string;
}) {
  return (
    <a
      href="#contact"
      onClick={() => quoteClick(ctx, location, projectType, message)}
      className="group inline-flex items-center gap-2 px-7 py-4 rounded-lg bg-brand-blue text-white font-semibold text-sm hover:bg-brand-blue/90 transition-all shadow-xl shadow-brand-blue/20"
    >
      {label}
      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
    </a>
  );
}

function Hero({ c, ctx }: { c: CourtBuildContent; ctx: Ctx }) {
  return (
    <section className="relative min-h-[85svh] w-full overflow-hidden flex">
      <Image
        src={c.hero.image.src}
        alt={c.hero.image.alt}
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
          {c.hero.titleLead} <span className="text-brand-green">{c.hero.titleAccent}</span>
        </h1>
        <p className="mt-5 text-lg sm:text-xl text-white/75 font-light max-w-2xl leading-relaxed">
          {c.hero.body}
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-start gap-4">
          <QuoteButton ctx={ctx} location="hero" />
          <a
            href="tel:+15128930466"
            onClick={() =>
              trackEvent("phone_click", {
                cta_location: "hero",
                page_path: ctx.pagePath,
              })
            }
            className="inline-flex items-center gap-2 px-7 py-4 rounded-lg border border-white/25 text-white/90 font-semibold text-sm hover:bg-white/10 hover:border-white/40 transition-all"
          >
            <Phone className="w-4 h-4" />
            (512) 893-0466
          </a>
        </div>

        <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/80">
          {["5.0 on Google", "Free on-site quote", "Written quote in 48 hours", "Written warranty"].map(
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

function BuildOptions({ c, ctx }: { c: CourtBuildContent; ctx: Ctx }) {
  const ref = useScrollReveal();

  return (
    <section aria-labelledby="options-title" className="py-20 sm:py-28 bg-white">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl reveal-item">
          <span className="inline-flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-brand-blue mb-4">
            <span className="w-6 h-px bg-brand-blue" />
            Two ways to build
          </span>
          <h2 id="options-title" className="text-3xl sm:text-4xl font-bold text-brand-text leading-tight">
            Full build or surfacing on your new slab?
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-5">
          {c.options.map((opt, i) => (
            <div
              key={opt.title}
              className="reveal-item rounded-2xl border border-gray-200 bg-gray-50 p-6 sm:p-8 flex flex-col"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <h3 className="text-xl font-bold text-brand-text">{opt.title}</h3>
              <p className="mt-3 text-brand-text-muted leading-relaxed flex-1">{opt.body}</p>
              <div className="mt-6">
                <QuoteButton
                  ctx={ctx}
                  location={`option_${opt.projectType}`}
                  label="Get a Free Quote"
                  projectType={opt.projectType}
                  message={opt.message}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Steps({ c, ctx }: { c: CourtBuildContent; ctx: Ctx }) {
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
            How it works
          </span>
          <h2 id="steps-title" className="text-3xl sm:text-4xl font-bold text-brand-text leading-tight">
            {c.stepsTitle}
          </h2>
          <ol className="mt-8 space-y-6">
            {c.steps.map((step, i) => (
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
            <QuoteButton ctx={ctx} location="steps" />
          </div>
        </div>

        <div
          className="reveal-item relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl"
          style={{ transitionDelay: "150ms" }}
        >
          <Image
            src={c.stepsImage.src}
            alt={c.stepsImage.alt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}

function RecentBuilds({ slugs }: { slugs: string[] }) {
  const ref = useScrollReveal();
  const featuredProjects = slugs.flatMap((slug) => {
    const p = projects.find((proj) => proj.slug === slug);
    return p ? [p] : [];
  });
  if (featuredProjects.length === 0) return null;

  return (
    <section aria-labelledby="builds-title" className="py-20 sm:py-28 bg-white">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 reveal-item">
          <div>
            <span className="inline-flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-brand-blue mb-4">
              <span className="w-6 h-px bg-brand-blue" />
              Recent courts
            </span>
            <h2 id="builds-title" className="text-3xl sm:text-4xl font-bold text-brand-text leading-tight">
              Courts we&apos;ve built
            </h2>
          </div>
          <Link href="/projects" className="text-brand-blue font-semibold hover:underline">
            See all projects →
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredProjects.map((p, i) => (
            <Link
              key={p.slug}
              href={`/projects/${p.slug}`}
              className="reveal-item group rounded-2xl overflow-hidden border border-gray-200 bg-white hover:shadow-lg transition-shadow"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={p.hero.src}
                  alt={p.hero.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-brand-blue">{p.location}</p>
                <h3 className="mt-1 font-semibold text-brand-text">{p.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function BuildFAQ({ c }: { c: CourtBuildContent }) {
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
            {c.faqTitle}
          </h2>
        </div>
        <Accordion type="single" collapsible className="reveal-item">
          {c.faqs.map((faq, i) => (
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
        {c.relatedLinks.length > 0 && (
          <p className="mt-10 text-center text-brand-text-muted">
            Planning your court? See{" "}
            {c.relatedLinks.map((l, i) => (
              <span key={l.href}>
                {i > 0 && (i === c.relatedLinks.length - 1 ? " and " : ", ")}
                <Link href={l.href} className="text-brand-blue hover:underline">
                  {l.label}
                </Link>
              </span>
            ))}
            .
          </p>
        )}
      </div>
    </section>
  );
}

export function CourtBuildSections({ content: c }: { content: CourtBuildContent }) {
  const ctx: Ctx = { pagePath: c.pagePath, defaultProjectType: c.defaultProjectType };
  return (
    <>
      <Hero c={c} ctx={ctx} />
      <BuildOptions c={c} ctx={ctx} />
      <Steps c={c} ctx={ctx} />
      <RecentBuilds slugs={c.featuredProjectSlugs} />
      <GoogleReviews />
      <ServiceArea />
      <BuildFAQ c={c} />
      <Contact formName={c.formName} heading={c.contactHeading} submitLabel="Get a Free Quote" />
    </>
  );
}
