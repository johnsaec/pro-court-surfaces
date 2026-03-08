"use client";

import Link from "next/link";
import { trackEvent } from "@/lib/analytics";

export function CTABanner() {
  return (
    <section className="py-16 sm:py-24 bg-brand-navy text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-2xl sm:text-4xl font-bold">
          Ready to get your court project started?
        </h2>
        <p className="mt-4 text-white/60 text-lg max-w-2xl mx-auto">
          Get a free, no-obligation estimate. We typically respond within 24 hours.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/#contact"
            onClick={() => trackEvent("cta_click", { cta_text: "Get a Free Estimate", cta_location: "cta_banner", page_path: typeof window !== "undefined" ? window.location.pathname : "" })}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-brand-blue text-white font-semibold text-sm hover:bg-brand-blue/90 transition-all shadow-lg shadow-brand-blue/20"
          >
            Get a Free Estimate
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <a
            href="tel:+15128930466"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg border border-white/25 text-white/90 font-semibold text-sm hover:bg-white/10 transition-all"
          >
            Call (512) 893-0466
          </a>
        </div>
      </div>
    </section>
  );
}
