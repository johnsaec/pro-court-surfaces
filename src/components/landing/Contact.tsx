"use client";

import { useState, type FormEvent } from "react";
import { Phone, Mail } from "lucide-react";

export function Contact() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log("Contact form submission:", data);
    setSubmitted(true);
  }

  return (
    <section id="contact" aria-label="Contact us" className="py-24 sm:py-32 bg-brand-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left — copy + contact info */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold">
              Ready to transform your court?
            </h2>
            <p className="mt-4 text-white/70 text-lg">
              Get a free, no-obligation estimate. We typically respond within 24 hours.
            </p>

            <div className="mt-10 space-y-4">
              <a
                href="tel:+15125551234"
                className="flex items-center gap-3 text-white/80 hover:text-white transition-colors"
              >
                <Phone className="h-5 w-5" />
                <span>(512) 555-1234</span>
              </a>
              <a
                href="mailto:patrick@procourtsurfaces.com"
                className="flex items-center gap-3 text-white/80 hover:text-white transition-colors"
              >
                <Mail className="h-5 w-5" />
                <span>patrick@procourtsurfaces.com</span>
              </a>
            </div>
          </div>

          {/* Right — form */}
          <div>
            {submitted ? (
              <div className="bg-white/10 rounded-2xl p-8 text-center">
                <p className="text-2xl font-semibold">Thank you!</p>
                <p className="mt-2 text-white/70">
                  We&apos;ll be in touch within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-1.5">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-brand-green/50"
                    placeholder="Your name"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-brand-green/50"
                      placeholder="you@email.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-white/80 mb-1.5">
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-brand-green/50"
                      placeholder="(512) 555-0000"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-white/80 mb-1.5">
                    Tell us about your project
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-brand-green/50 resize-none"
                    placeholder="Court type, condition, what you're looking for..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-brand-blue text-white font-semibold hover:bg-brand-blue/90 transition-colors"
                >
                  Get a Free Estimate
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
