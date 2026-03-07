"use client";

import { useState, type FormEvent } from "react";
import { Loader2 } from "lucide-react";

interface AssessmentFormProps {
  leadId: string;
}

const COLOR_OPTIONS = [
  "Dark Green",
  "Light Green",
  "Blue",
  "Light Blue",
  "Red",
  "Burgundy",
  "Gray",
  "Sand",
  "Purple",
  "Other",
];

export function AssessmentForm({ leadId }: AssessmentFormProps) {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const fd = new FormData(e.currentTarget);

    // Collect checkbox values
    const sports: string[] = [];
    ["pickleball", "tennis", "basketball", "volleyball", "multi_sport"].forEach(
      (s) => {
        if (fd.get(`sport_${s}`)) sports.push(s);
      }
    );

    const body = {
      leadId,
      squareFeet: fd.get("squareFeet") || null,
      numberOfCourts: fd.get("numberOfCourts") || null,
      courtAgeYears: fd.get("courtAgeYears") || null,
      sports,
      // Condition
      cracksPresent: fd.get("cracksPresent") === "yes",
      crackLengthFt: fd.get("crackLengthFt") || null,
      birdBathCount: fd.get("birdBathCount") || null,
      blisteringBoiling: fd.get("blisteringBoiling") === "yes",
      paintChipping: fd.get("paintChipping") === "yes",
      // Concrete
      broomFinish: fd.get("broomFinish") === "yes",
      vaporBarrier: fd.get("vaporBarrier") || null,
      concretePourDate: fd.get("concretePourDate") || null,
      // Colors
      colorInside: fd.get("colorInside") || null,
      colorOutside: fd.get("colorOutside") || null,
      colorLines: fd.get("colorLines") || null,
      // Add-ons
      wantsBasketballLines: !!fd.get("wantsBasketballLines"),
      wantsVolleyballLines: !!fd.get("wantsVolleyballLines"),
      wantsNet: !!fd.get("wantsNet"),
      wantsFence: !!fd.get("wantsFence"),
      wantsLights: !!fd.get("wantsLights"),
      interestedInFinancing: !!fd.get("interestedInFinancing"),
      // Notes
      notes: fd.get("notes") || null,
    };

    try {
      const res = await fetch("/api/leads/assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }

      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border p-8 sm:p-12 text-center">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900">All set!</h2>
        <p className="mt-2 text-gray-500">
          Thanks for the details. Patrick will follow up with a tailored estimate.
        </p>
        <p className="mt-4 text-sm text-gray-400">
          Questions?{" "}
          <a href="tel:+15128930466" className="text-brand-blue hover:underline">
            Call (512) 893-0466
          </a>
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-brand-blue/50 focus:ring-1 focus:ring-brand-blue/30 transition-colors";

  const labelClass =
    "block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5";

  const sectionClass = "bg-white rounded-xl shadow-sm border p-6 sm:p-8 space-y-5";

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Court Details */}
      <div className={sectionClass}>
        <h2 className="text-lg font-semibold text-gray-900">Court Details</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div>
            <label htmlFor="squareFeet" className={labelClass}>
              Approx. Square Feet
            </label>
            <input
              type="number"
              id="squareFeet"
              name="squareFeet"
              className={inputClass}
              placeholder="e.g. 7200"
            />
          </div>
          <div>
            <label htmlFor="numberOfCourts" className={labelClass}>
              Number of Courts
            </label>
            <input
              type="number"
              id="numberOfCourts"
              name="numberOfCourts"
              className={inputClass}
              placeholder="e.g. 2"
            />
          </div>
          <div>
            <label htmlFor="courtAgeYears" className={labelClass}>
              Court Age (years)
            </label>
            <input
              type="number"
              id="courtAgeYears"
              name="courtAgeYears"
              className={inputClass}
              placeholder="e.g. 10"
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>Sport(s)</label>
          <div className="flex flex-wrap gap-3">
            {[
              { id: "pickleball", label: "Pickleball" },
              { id: "tennis", label: "Tennis" },
              { id: "basketball", label: "Basketball" },
              { id: "volleyball", label: "Volleyball" },
              { id: "multi_sport", label: "Multi-Sport" },
            ].map((sport) => (
              <label
                key={sport.id}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  name={`sport_${sport.id}`}
                  value="1"
                  className="w-4 h-4 rounded border-gray-300 text-brand-blue focus:ring-brand-blue/30"
                />
                <span className="text-sm text-gray-700">{sport.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Surface Condition */}
      <div className={sectionClass}>
        <h2 className="text-lg font-semibold text-gray-900">
          Surface Condition
        </h2>
        <p className="text-sm text-gray-400 -mt-2">
          Don&apos;t worry if you&apos;re not sure — we&apos;ll assess
          everything on-site.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>Visible Cracks?</label>
            <div className="flex gap-4">
              {["yes", "no", "not sure"].map((opt) => (
                <label key={opt} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="cracksPresent"
                    value={opt}
                    className="w-4 h-4 text-brand-blue focus:ring-brand-blue/30"
                  />
                  <span className="text-sm text-gray-700 capitalize">{opt}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <label htmlFor="crackLengthFt" className={labelClass}>
              Approx. Total Crack Length (ft)
            </label>
            <input
              type="number"
              id="crackLengthFt"
              name="crackLengthFt"
              className={inputClass}
              placeholder="e.g. 50"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div>
            <label htmlFor="birdBathCount" className={labelClass}>
              Standing Water Spots (bird baths)
            </label>
            <input
              type="number"
              id="birdBathCount"
              name="birdBathCount"
              className={inputClass}
              placeholder="e.g. 3"
            />
          </div>
          <div>
            <label className={labelClass}>Blistering / Bubbling?</label>
            <div className="flex gap-4 pt-2">
              {["yes", "no"].map((opt) => (
                <label key={opt} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="blisteringBoiling"
                    value={opt}
                    className="w-4 h-4 text-brand-blue focus:ring-brand-blue/30"
                  />
                  <span className="text-sm text-gray-700 capitalize">{opt}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className={labelClass}>Paint Chipping / Peeling?</label>
            <div className="flex gap-4 pt-2">
              {["yes", "no"].map((opt) => (
                <label key={opt} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="paintChipping"
                    value={opt}
                    className="w-4 h-4 text-brand-blue focus:ring-brand-blue/30"
                  />
                  <span className="text-sm text-gray-700 capitalize">{opt}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Concrete (for new courts) */}
      <div className={sectionClass}>
        <h2 className="text-lg font-semibold text-gray-900">
          Concrete Details
        </h2>
        <p className="text-sm text-gray-400 -mt-2">
          Only for new court surfacing on fresh concrete — skip if resurfacing.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div>
            <label className={labelClass}>Broom Finish?</label>
            <div className="flex gap-4 pt-2">
              {["yes", "no", "not sure"].map((opt) => (
                <label key={opt} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="broomFinish"
                    value={opt}
                    className="w-4 h-4 text-brand-blue focus:ring-brand-blue/30"
                  />
                  <span className="text-sm text-gray-700 capitalize">{opt}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className={labelClass}>Vapor Barrier?</label>
            <div className="flex gap-4 pt-2">
              {["yes", "no", "not sure"].map((opt) => (
                <label key={opt} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="vaporBarrier"
                    value={opt}
                    className="w-4 h-4 text-brand-blue focus:ring-brand-blue/30"
                  />
                  <span className="text-sm text-gray-700 capitalize">{opt}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <label htmlFor="concretePourDate" className={labelClass}>
              Pour Date (approx)
            </label>
            <input
              type="text"
              id="concretePourDate"
              name="concretePourDate"
              className={inputClass}
              placeholder="e.g. January 2026"
            />
          </div>
        </div>
      </div>

      {/* Color Preferences */}
      <div className={sectionClass}>
        <h2 className="text-lg font-semibold text-gray-900">
          Color Preferences
        </h2>
        <p className="text-sm text-gray-400 -mt-2">
          Pick your preferred colors — we can always finalize later.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div>
            <label htmlFor="colorInside" className={labelClass}>
              Inside Court Color
            </label>
            <select
              id="colorInside"
              name="colorInside"
              className={inputClass}
            >
              <option value="">Select...</option>
              {COLOR_OPTIONS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="colorOutside" className={labelClass}>
              Outside Court Color
            </label>
            <select
              id="colorOutside"
              name="colorOutside"
              className={inputClass}
            >
              <option value="">Select...</option>
              {COLOR_OPTIONS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="colorLines" className={labelClass}>
              Line Color
            </label>
            <select
              id="colorLines"
              name="colorLines"
              className={inputClass}
            >
              <option value="">Select...</option>
              {["White", ...COLOR_OPTIONS].map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Add-ons */}
      <div className={sectionClass}>
        <h2 className="text-lg font-semibold text-gray-900">
          Interested In Any Add-ons?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { name: "wantsBasketballLines", label: "Basketball lines" },
            { name: "wantsVolleyballLines", label: "Volleyball lines" },
            { name: "wantsNet", label: "Net / post system" },
            { name: "wantsFence", label: "Fencing" },
            { name: "wantsLights", label: "Court lighting" },
            { name: "interestedInFinancing", label: "Financing options" },
          ].map((addon) => (
            <label
              key={addon.name}
              className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <input
                type="checkbox"
                name={addon.name}
                value="1"
                className="w-4 h-4 rounded border-gray-300 text-brand-blue focus:ring-brand-blue/30"
              />
              <span className="text-sm text-gray-700">{addon.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Notes */}
      <div className={sectionClass}>
        <h2 className="text-lg font-semibold text-gray-900">
          Anything Else?
        </h2>
        <textarea
          id="notes"
          name="notes"
          rows={3}
          className={inputClass}
          placeholder="Photos help too — feel free to email them to patrick@procourtsurfaces.com"
        />
      </div>

      {error && (
        <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg p-3">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-brand-blue text-white font-semibold text-sm hover:bg-brand-blue/90 transition-all shadow-lg shadow-brand-blue/20 disabled:opacity-60"
      >
        {submitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Submitting...
          </>
        ) : (
          "Submit Assessment"
        )}
      </button>
    </form>
  );
}
