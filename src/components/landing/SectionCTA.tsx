"use client";

import { Phone } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export function SectionCTA({ dark = false }: { dark?: boolean }) {
  return (
    <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
      <a
        href="#contact"
        onClick={() => trackEvent("cta_click", { cta_text: "Get a Free Estimate", cta_location: "section", page_path: window.location.pathname })}
        className={`inline-flex items-center gap-2 px-7 py-3.5 rounded-lg font-semibold text-sm transition-all shadow-lg ${
          dark
            ? "bg-brand-green text-brand-navy hover:bg-brand-green/90 shadow-brand-green/20"
            : "bg-brand-blue text-white hover:bg-brand-blue/90 shadow-brand-blue/20"
        }`}
      >
        Get a Free Estimate
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </a>
      <a
        href="tel:+15128930466"
        className={`inline-flex items-center gap-2 text-sm font-medium transition-colors ${
          dark
            ? "text-white/70 hover:text-white"
            : "text-brand-text-muted hover:text-brand-blue"
        }`}
      >
        <Phone className="w-4 h-4" />
        (512) 893-0466
      </a>
    </div>
  );
}
