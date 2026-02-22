"use client";

import { useState, useMemo } from "react";

const CALLBACK_COST = 5000;
const CHEAP_CALLBACK_RATE = 0.4;
const PRO_CALLBACK_RATE = 0.05;
const DELAY_COST_PER_DAY = 1500;
const CHEAP_DELAY_DAYS = 3;
const CHEAP_DELAY_RATE = 0.3;
const PRO_DELAY_DAYS = 0.5;
const PRO_DELAY_RATE = 0.05;
const CHEAP_CO_RATE = 0.25;
const PRO_CO_RATE = 0.05;
const CO_AVG_COST = 2000;
const RESURFACE_COST = 5000;

function fmt(n: number) {
  return "$" + Math.round(n).toLocaleString("en-US");
}

export default function ROICalculator() {
  const [courts, setCourts] = useState(2);
  const [courtType, setCourtType] = useState("pickleball");
  const [cheapBid, setCheapBid] = useState(6000);
  const [proBid, setProBid] = useState(10000);
  const [projects, setProjects] = useState(3);

  const calc = useMemo(() => {
    const totalProjects = projects * 10;

    const cheapInstall10 = cheapBid * courts * totalProjects;
    const proInstall10 = proBid * courts * totalProjects;
    const cheapCallback10 = courts * CALLBACK_COST * CHEAP_CALLBACK_RATE * totalProjects;
    const proCallback10 = courts * CALLBACK_COST * PRO_CALLBACK_RATE * totalProjects;
    const cheapDelay10 = CHEAP_DELAY_DAYS * DELAY_COST_PER_DAY * CHEAP_DELAY_RATE * totalProjects;
    const proDelay10 = PRO_DELAY_DAYS * DELAY_COST_PER_DAY * PRO_DELAY_RATE * totalProjects;
    const cheapCO10 = courts * CO_AVG_COST * CHEAP_CO_RATE * totalProjects;
    const proCO10 = courts * CO_AVG_COST * PRO_CO_RATE * totalProjects;
    const cheapResurface10 = courts * RESURFACE_COST * totalProjects;
    const proResurface10 = 0;

    const cheapTotal = cheapInstall10 + cheapCallback10 + cheapDelay10 + cheapCO10 + cheapResurface10;
    const proTotal = proInstall10 + proCallback10 + proDelay10 + proCO10 + proResurface10;
    const savings = cheapTotal - proTotal;

    return {
      cheapInstall10, proInstall10,
      cheapCallback10, proCallback10,
      cheapDelay10, proDelay10,
      cheapCO10, proCO10,
      cheapResurface10, proResurface10,
      cheapTotal, proTotal, savings,
    };
  }, [courts, cheapBid, proBid, projects]);

  const maxVal = Math.max(calc.cheapTotal, calc.proTotal);
  const cheapBarWidth = maxVal > 0 ? (calc.cheapTotal / maxVal) * 100 : 0;
  const proBarWidth = maxVal > 0 ? (calc.proTotal / maxVal) * 100 : 0;

  const rows = [
    { label: "Install Cost", cheap: calc.cheapInstall10, pro: calc.proInstall10 },
    { label: "Callbacks & Rework", cheap: calc.cheapCallback10, pro: calc.proCallback10 },
    { label: "Schedule Delays", cheap: calc.cheapDelay10, pro: calc.proDelay10 },
    { label: "Change Orders", cheap: calc.cheapCO10, pro: calc.proCO10 },
    { label: "Resurfacing (10yr)", cheap: calc.cheapResurface10, pro: calc.proResurface10 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-8 items-start">
      {/* Inputs */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 lg:sticky lg:top-24">
        <h3 className="text-xl font-bold text-brand-text mb-6">Your Project Details</h3>

        {/* Courts slider */}
        <div className="mb-5">
          <label className="block text-xs font-semibold text-brand-text-muted uppercase tracking-wider mb-1">
            Number of Courts
          </label>
          <input
            type="range"
            min={1}
            max={8}
            value={courts}
            onChange={(e) => setCourts(Number(e.target.value))}
            className="w-full accent-brand-blue"
          />
          <p className="text-sm text-brand-text-muted mt-1">
            <span className="text-brand-blue font-semibold">{courts}</span> courts
          </p>
        </div>

        {/* Court type */}
        <div className="mb-5">
          <label className="block text-xs font-semibold text-brand-text-muted uppercase tracking-wider mb-1">
            Court Type
          </label>
          <select
            value={courtType}
            onChange={(e) => setCourtType(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-brand-text bg-white focus:outline-none focus:border-brand-blue"
          >
            <option value="pickleball">Pickleball</option>
            <option value="tennis">Tennis</option>
            <option value="multi">Multi-Sport</option>
          </select>
        </div>

        {/* Cheap bid */}
        <div className="mb-5">
          <label className="block text-xs font-semibold text-brand-text-muted uppercase tracking-wider mb-1">
            Cheapest Sub Bid (per court)
          </label>
          <input
            type="number"
            value={cheapBid}
            min={1000}
            max={50000}
            step={500}
            onChange={(e) => setCheapBid(Number(e.target.value) || 6000)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-brand-text bg-white focus:outline-none focus:border-brand-blue"
          />
          <p className="text-xs text-brand-text-muted mt-1">The low-ball number you got</p>
        </div>

        {/* Pro bid */}
        <div className="mb-5">
          <label className="block text-xs font-semibold text-brand-text-muted uppercase tracking-wider mb-1">
            Pro Court Bid (per court)
          </label>
          <input
            type="number"
            value={proBid}
            min={1000}
            max={50000}
            step={500}
            onChange={(e) => setProBid(Number(e.target.value) || 10000)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-brand-text bg-white focus:outline-none focus:border-brand-blue"
          />
          <p className="text-xs text-brand-text-muted mt-1">Our bid with ATS Acrytech</p>
        </div>

        {/* Projects slider */}
        <div>
          <label className="block text-xs font-semibold text-brand-text-muted uppercase tracking-wider mb-1">
            Court Projects per Year
          </label>
          <input
            type="range"
            min={1}
            max={12}
            value={projects}
            onChange={(e) => setProjects(Number(e.target.value))}
            className="w-full accent-brand-blue"
          />
          <p className="text-sm text-brand-text-muted mt-1">
            <span className="text-brand-blue font-semibold">{projects}</span> projects / year
          </p>
        </div>
      </div>

      {/* Results */}
      <div className="flex flex-col gap-6">
        {/* Hero savings */}
        <div className="bg-white border border-gray-200 rounded-xl p-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-green-50 to-transparent" />
          <div className="relative">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-text-muted mb-2">
              10-Year Savings with Pro Court
            </p>
            <p className="text-5xl font-bold text-green-600 tabular-nums">
              {fmt(calc.savings)}
            </p>
            <p className="text-sm text-brand-text-muted mt-2">
              across all projects over 10 years
            </p>
          </div>
        </div>

        {/* Breakdown table */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="grid grid-cols-[1.4fr_1fr_1fr] bg-brand-bg-alt text-xs font-bold uppercase tracking-wider text-brand-text-muted">
            <span className="px-4 py-3">Cost Category</span>
            <span className="px-4 py-3 text-right">Cheap Sub</span>
            <span className="px-4 py-3 text-right">Pro Court</span>
          </div>
          {rows.map((row) => (
            <div key={row.label} className="grid grid-cols-[1.4fr_1fr_1fr] border-b border-gray-100 text-sm hover:bg-gray-50 transition-colors">
              <span className="px-4 py-3 text-brand-text-muted">{row.label}</span>
              <span className="px-4 py-3 text-right font-semibold text-red-600 tabular-nums">{fmt(row.cheap)}</span>
              <span className="px-4 py-3 text-right font-semibold text-brand-blue tabular-nums">{fmt(row.pro)}</span>
            </div>
          ))}
          {/* Total row */}
          <div className="grid grid-cols-[1.4fr_1fr_1fr] bg-brand-bg-alt text-sm font-bold">
            <span className="px-4 py-3 text-brand-text">10-Year Total</span>
            <span className="px-4 py-3 text-right text-red-600 tabular-nums">{fmt(calc.cheapTotal)}</span>
            <span className="px-4 py-3 text-right text-brand-blue tabular-nums">{fmt(calc.proTotal)}</span>
          </div>
        </div>

        {/* Bar chart */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-brand-text-muted mb-4">
            10-Year Total Cost Comparison
          </h4>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold w-20 flex-shrink-0 text-brand-text-muted">Cheap Sub</span>
              <div className="flex-1 h-9 bg-gray-100 rounded-lg overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-red-500 to-red-700 rounded-lg flex items-center justify-end px-3 text-xs font-bold text-white tabular-nums transition-all duration-500"
                  style={{ width: `${cheapBarWidth}%`, minWidth: "90px" }}
                >
                  {fmt(calc.cheapTotal)}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold w-20 flex-shrink-0 text-brand-text-muted">Pro Court</span>
              <div className="flex-1 h-9 bg-gray-100 rounded-lg overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-brand-blue to-brand-navy rounded-lg flex items-center justify-end px-3 text-xs font-bold text-white tabular-nums transition-all duration-500"
                  style={{ width: `${proBarWidth}%`, minWidth: "90px" }}
                >
                  {fmt(calc.proTotal)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-lg italic text-brand-text-muted mb-4">The numbers speak for themselves.</p>
          <a
            href="#quote"
            className="inline-flex items-center px-8 py-3 rounded-lg bg-brand-blue text-white font-semibold hover:bg-brand-blue/90 transition-colors"
          >
            Request a Real Bid
          </a>
        </div>
      </div>
    </div>
  );
}
