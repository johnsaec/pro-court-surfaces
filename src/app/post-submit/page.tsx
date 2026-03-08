import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Thank You | Pro Court Surfaces",
  robots: { index: false, follow: false },
};

export default function SubmitSuccessPage() {
  return (
    <div className="min-h-screen bg-brand-navy flex items-center justify-center px-5">
      <div className="max-w-md w-full text-center">
        <div className="w-16 h-16 rounded-full bg-brand-green/20 flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-8 h-8 text-brand-green"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-white mb-3">Got it!</h1>
        <p className="text-white/60 text-lg mb-2">
          Patrick will reach out within 24 hours.
        </p>
        <p className="text-white/40 text-sm mb-8">
          Check your email for a quick follow-up with next steps.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="tel:+15128930466"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-brand-green text-brand-navy font-semibold text-sm hover:brightness-110 transition-all"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Call Patrick Now
          </a>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-white/20 text-white/70 font-medium text-sm hover:bg-white/10 transition-all"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
