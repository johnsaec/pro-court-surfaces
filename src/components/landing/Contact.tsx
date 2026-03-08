"use client";

import { useState, type FormEvent } from "react";
import { Phone, Mail, ArrowRight, Loader2 } from "lucide-react";
import { useScrollReveal } from "./useScrollReveal";
import { trackEvent } from "@/lib/analytics";

const PROJECT_TYPES = [
  { value: "new_court_full_build", label: "New Court (Full Build)" },
  { value: "new_court_surfacing_only", label: "New Court (Surfacing Only)" },
  { value: "repair_resurfacing", label: "Repair / Resurfacing" },
  { value: "conversion_tennis_to_pickleball", label: "Tennis to Pickleball Conversion" },
  { value: "color_coating_only", label: "Color Coating Only" },
  { value: "crack_repair_only", label: "Crack Repair Only" },
  { value: "other", label: "Other / Not Sure" },
];

const SPORT_OPTIONS = [
  { value: "pickleball", label: "Pickleball" },
  { value: "tennis", label: "Tennis" },
  { value: "basketball", label: "Basketball" },
  { value: "multi_sport", label: "Multi-Sport" },
];

export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [selectedSports, setSelectedSports] = useState<string[]>([]);
  const ref = useScrollReveal();

  function toggleSport(sport: string) {
    setSelectedSports((prev) =>
      prev.includes(sport) ? prev.filter((s) => s !== sport) : [...prev, sport]
    );
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          city: formData.get("city"),
          projectType: formData.get("projectType") || null,
          sports: selectedSports,
          message: formData.get("message"),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }

      setSubmitted(true);
      trackEvent("generate_lead", {
        form_name: "homepage_contact",
        page_path: "/",
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section
      id="contact"
      aria-label="Contact us"
      className="py-24 sm:py-36 bg-brand-navy text-white relative overflow-hidden"
    >
      {/* Decorative gradient orb */}
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-brand-blue/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-brand-green/10 rounded-full blur-3xl pointer-events-none" />

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left — copy + contact info */}
          <div className="reveal-item">
            <span className="inline-flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-brand-green mb-4">
              <span className="w-6 h-px bg-brand-green" />
              Get Started
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold leading-tight">
              How do I get a court resurfacing estimate?
            </h2>
            <p className="mt-5 text-white/60 text-lg max-w-md">
              Get a free, no-obligation estimate. We typically respond within 24
              hours.
            </p>

            <div className="mt-10 space-y-4">
              <a
                href="tel:+15128930466"
                className="group flex items-center gap-3 text-white/70 hover:text-white transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-brand-blue transition-colors">
                  <Phone className="h-4 w-4" />
                </div>
                <span className="font-medium">(512) 893-0466</span>
              </a>
              <a
                href="mailto:patrick@procourtsurfaces.com"
                className="group flex items-center gap-3 text-white/70 hover:text-white transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-brand-blue transition-colors">
                  <Mail className="h-4 w-4" />
                </div>
                <span className="font-medium">patrick@procourtsurfaces.com</span>
              </a>
            </div>
          </div>

          {/* Right — form */}
          <div className="reveal-item" style={{ transitionDelay: "200ms" }}>
            {submitted ? (
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-10 text-center border border-white/10">
                <div className="w-16 h-16 rounded-full bg-brand-green/20 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-2xl font-bold">Thank you!</p>
                <p className="mt-2 text-white/60">
                  We&apos;ll be in touch within 24 hours. Check your email for next steps.
                </p>
                <p className="mt-4 text-white/40 text-sm">
                  Need something urgent?{" "}
                  <a href="tel:+15128930466" className="text-brand-green hover:underline">
                    Call Patrick directly
                  </a>
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/10 space-y-5"
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
                    className="w-full rounded-lg border border-white/15 bg-white/10 px-4 py-3 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-brand-green/50 focus:ring-1 focus:ring-brand-green/30 transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
                      className="w-full rounded-lg border border-white/15 bg-white/10 px-4 py-3 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-brand-green/50 focus:ring-1 focus:ring-brand-green/30 transition-colors"
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
                      className="w-full rounded-lg border border-white/15 bg-white/10 px-4 py-3 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-brand-green/50 focus:ring-1 focus:ring-brand-green/30 transition-colors"
                      placeholder="(512) 555-0000"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="city"
                      className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-1.5"
                    >
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      className="w-full rounded-lg border border-white/15 bg-white/10 px-4 py-3 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-brand-green/50 focus:ring-1 focus:ring-brand-green/30 transition-colors"
                      placeholder="Austin, Dripping Springs..."
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="projectType"
                      className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-1.5"
                    >
                      Project Type
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      className="w-full rounded-lg border border-white/15 bg-white/10 px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-green/50 focus:ring-1 focus:ring-brand-green/30 transition-colors appearance-none"
                    >
                      <option value="" className="bg-brand-navy">Select...</option>
                      {PROJECT_TYPES.map((pt) => (
                        <option key={pt.value} value={pt.value} className="bg-brand-navy">
                          {pt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
                    Sport(s)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {SPORT_OPTIONS.map((sport) => (
                      <button
                        key={sport.value}
                        type="button"
                        onClick={() => toggleSport(sport.value)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                          selectedSports.includes(sport.value)
                            ? "bg-brand-blue border-brand-blue text-white"
                            : "bg-white/5 border-white/15 text-white/60 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        {sport.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-1.5"
                  >
                    Tell us about your project
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    className="w-full rounded-lg border border-white/15 bg-white/10 px-4 py-3 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-brand-green/50 focus:ring-1 focus:ring-brand-green/30 resize-none transition-colors"
                    placeholder="Anything else we should know..."
                  />
                </div>

                {error && (
                  <p className="text-red-400 text-sm">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg bg-brand-blue text-white font-semibold text-sm hover:bg-brand-blue/90 transition-all shadow-lg shadow-brand-blue/20 disabled:opacity-60"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Get a Free Estimate
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
