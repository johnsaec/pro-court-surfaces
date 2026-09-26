"use client";

import { Star } from "lucide-react";
import { useScrollReveal } from "./useScrollReveal";

// Real Google Business Profile reviews (copied verbatim, trimmed with "…").
// Update REVIEW_COUNT when new reviews come in.
const REVIEW_COUNT = 6;

const REVIEWS = [
  {
    quote:
      "Pro Court Surfaces did an outstanding job on my pickleball court. From the initial quote to the final walkthrough, they were responsive, easy to work with, and attentive to my questions and requests… The finished court looks fantastic.",
    name: "Tuan N.",
  },
  {
    quote:
      "He was extremely knowledgeable and transparent about the challenges we faced… Even with weather delays, Patrick stayed proactive and kept us informed every step of the way. The court looks fantastic and plays great.",
    name: "Russel M.",
  },
  {
    quote:
      "Patrick was very easy to work with and did a great job of communicating throughout the project. Their bid was more than fair for the amount of work involved and we're very happy with how it turned out.",
    name: "Mike H.",
  },
  {
    quote:
      "Super efficient and best quality I've seen after having several courts built at our properties. Recommend 100%.",
    name: "Lucas P.",
  },
];

export function GoogleReviews() {
  const ref = useScrollReveal();

  return (
    <section aria-labelledby="reviews-title" className="py-20 sm:py-28 bg-gray-50">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center reveal-item">
          <div className="flex items-center justify-center gap-1" aria-hidden="true">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <h2 id="reviews-title" className="mt-4 text-3xl sm:text-4xl font-bold text-brand-text leading-tight">
            5.0 on Google
          </h2>
          <p className="mt-3 text-brand-text-muted">
            {REVIEW_COUNT} reviews from homeowners and property owners across Central Texas
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-5">
          {REVIEWS.map((r, i) => (
            <figure
              key={r.name}
              className="reveal-item rounded-2xl bg-white border border-gray-200 p-6 sm:p-8"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="flex gap-0.5" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <blockquote className="mt-4 text-brand-text leading-relaxed">
                &ldquo;{r.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-4 text-sm font-semibold text-brand-text-muted">
                {r.name} · Google review
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
