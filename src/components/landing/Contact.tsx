"use client";

import { useState, type FormEvent } from "react";
import { Phone, Mail, ArrowRight } from "lucide-react";
import { useScrollReveal } from "./useScrollReveal";

export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const ref = useScrollReveal();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log("Contact form submission:", data);
    setSubmitted(true);
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
              Ready to transform
              <br />
              your court?
            </h2>
            <p className="mt-5 text-white/60 text-lg max-w-md">
              Get a free, no-obligation estimate. We typically respond within 24
              hours.
            </p>

            <div className="mt-10 space-y-4">
              <a
                href="tel:+15125551234"
                className="group flex items-center gap-3 text-white/70 hover:text-white transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-brand-blue transition-colors">
                  <Phone className="h-4 w-4" />
                </div>
                <span className="font-medium">(512) 555-1234</span>
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
                  We&apos;ll be in touch within 24 hours.
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
                    Name
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
                      Email
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
                    rows={4}
                    className="w-full rounded-lg border border-white/15 bg-white/10 px-4 py-3 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-brand-green/50 focus:ring-1 focus:ring-brand-green/30 resize-none transition-colors"
                    placeholder="Court type, condition, what you're looking for..."
                  />
                </div>
                <button
                  type="submit"
                  className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg bg-brand-blue text-white font-semibold text-sm hover:bg-brand-blue/90 transition-all shadow-lg shadow-brand-blue/20"
                >
                  Get a Free Estimate
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
