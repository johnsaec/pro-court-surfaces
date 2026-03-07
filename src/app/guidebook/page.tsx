import type { Metadata } from "next";
import { GuidebookForm } from "./_components/GuidebookForm";
import { CTABanner } from "@/components/landing/CTABanner";

export const metadata: Metadata = {
  title: "The GC's Guide to Pickleball Court Construction | Pro Court Surfaces",
  description:
    "Free guide for general contractors: pickleball court specs, budgeting, surface systems, and scope planning.",
  keywords:
    "pickleball court construction guide, general contractor pickleball, court construction budgeting, pickleball court specs",
  openGraph: {
    title: "The GC's Guide to Pickleball Court Construction",
    description:
      "Free guide for general contractors: pickleball court specs, budgeting, surface systems, and scope planning.",
    type: "website",
    url: "https://www.procourtsurfaces.com/guidebook",
  },
  twitter: {
    card: "summary_large_image",
    title: "The GC's Guide to Pickleball Court Construction",
    description:
      "Free guide for general contractors: pickleball court specs, budgeting, surface systems, and scope planning.",
  },
  alternates: { canonical: "https://www.procourtsurfaces.com/guidebook" },
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "The GC's Guide to Pickleball Court Construction",
  description:
    "Free guide for general contractors: pickleball court specs, budgeting, surface systems, and scope planning.",
  url: "https://www.procourtsurfaces.com/guidebook",
  publisher: { "@type": "Organization", name: "Pro Court Surfaces" },
};

const checklist = [
  "Court dimensions, setbacks, and layout standards",
  "Surface system comparison — what holds up and what doesn't",
  "Realistic budgeting ranges per court",
  "Scope breakdown — what's yours vs. what's the surfacing sub's",
  "Common bid mistakes that lead to change orders",
];

export default function GuidebookPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />

      {/* Hero */}
      <section className="bg-brand-bg-alt pt-28 pb-16 sm:pt-32 sm:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left — text */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-brand-blue mb-4">
                Free Guide for General Contractors
              </p>
              <h1 className="text-4xl sm:text-5xl font-bold text-brand-text leading-tight mb-6">
                The GC&apos;s Guide to Pickleball Court Construction
              </h1>
              <p className="text-lg text-brand-text-muted leading-relaxed mb-8">
                Everything your estimator needs to scope, budget, and bid
                pickleball court projects — from slab specs to surface system
                selection.
              </p>

              <h2 className="text-sm font-semibold text-brand-text uppercase tracking-wide mb-4">
                What&apos;s Inside
              </h2>
              <ul className="space-y-3">
                {checklist.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-brand-blue mt-0.5 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-brand-text-muted text-sm leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right — form */}
            <div className="lg:sticky lg:top-28">
              <GuidebookForm />
            </div>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
