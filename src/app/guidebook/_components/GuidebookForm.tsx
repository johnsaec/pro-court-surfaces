"use client";

import { useState } from "react";

export function GuidebookForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/guidebook-download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone") || undefined,
        }),
      });

      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-8 text-center">
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-brand-text mb-2">Check Your Inbox</h2>
        <p className="text-brand-text-muted text-sm leading-relaxed">
          The guide is on its way. If you don&apos;t see it in the next few minutes, check your spam folder.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-8">
      <h2 className="text-2xl font-bold text-brand-text mb-1">Get the Free Guide</h2>
      <p className="text-brand-text-muted text-sm mb-6">
        We&apos;ll email you the PDF. No spam, no drip campaigns — just the guide.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-brand-text mb-1">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            placeholder="Your full name"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-brand-text placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-brand-text mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="you@company.com"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-brand-text placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-brand-text mb-1">
            Phone <span className="text-gray-400 font-normal">(optional)</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="(512) 555-1234"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-brand-text placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent"
          />
        </div>

        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full py-3 px-6 rounded-lg bg-brand-blue text-white text-sm font-semibold hover:bg-brand-blue/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === "submitting" ? "Sending..." : "Get the Free Guide"}
        </button>
      </form>

      {status === "error" && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-700">
            Something went wrong. Please try again or email{" "}
            <a href="mailto:patrick@procourtsurfaces.com" className="underline font-medium">
              patrick@procourtsurfaces.com
            </a>
            .
          </p>
        </div>
      )}

      <p className="mt-4 text-xs text-gray-400 text-center">
        We respect your inbox. One email with the guide — that&apos;s it.
      </p>
    </div>
  );
}
