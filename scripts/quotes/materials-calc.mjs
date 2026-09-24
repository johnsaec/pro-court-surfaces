#!/usr/bin/env node
// materials-calc.mjs — Acrytech acrylic resurface materials takeoff.
//
// Turns a quote-ready lead's facts (square_feet, crack_length_ft, number_of_courts)
// into a materials shopping list: acrylic resurfacer + color coat (concentrate
// drums + silica sand), line paint, and ATS Faultline crack kits.
//
// UNITS: materials are worked in SQUARE YARDS (Patrick's convention — acrylic
// coverage is quoted per sq yd). The lead stores square_feet; this script converts
// to sq yd (÷9) up front and all coverage RATES are per sq yd. (The customer QUOTE
// still prices per sqft — sq yd is a materials/ordering convention only.)
//
// SAME RULE AS THE QUOTE BUILDER: quantities come from the lead; RATES come from
// the Acrytech TDS. This script does NOT invent coverage — the RATES block below
// is the single place to plug in the real spec numbers. Values marked "VERIFY" are
// placeholders seeded to typical acrylic figures so the output has shape; confirm
// each against the Acrytech technical data sheet / drum label before ordering.
//
// Confirmed inputs (from Patrick):
//   - Acrylic Resurfacer: 1 coat
//   - ATS Faultline crack repair: $2.00 per linear ft (material cost)
//
// Usage (from repo root):
//   node scripts/quotes/materials-calc.mjs                 # both options for the JCC lead
//   node scripts/quotes/materials-calc.mjs --lead <uuid>   # both options for another lead (Option B = lead facts)
//   node scripts/quotes/materials-calc.mjs --sqft 22200 --crack 900 --courts 3   # ad-hoc
//
// Env from .env.local: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY.

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { createClient } from "@supabase/supabase-js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, "..", "..");

// Barshop JCC lead — default subject when no --lead / ad-hoc args are given.
const JCC_LEAD_ID = "8a8e03eb-7e77-4df2-b375-ae835d58a14b";

// ── RATES ────────────────────────────────────────────────────────────
// The ONLY place to edit spec numbers. "VERIFY" = placeholder, confirm vs TDS.
const RATES = {
  waste_pct: 10, // applied to concentrate + line paint (not to Faultline)

  resurfacer: {
    coats: 1, // CONFIRMED by Patrick
    coverage_sqyd_per_gal: 14, // VERIFY — sq yd per gal of concentrate, per coat
    sand_lb_per_gal: 3, // VERIFY — lbs silica sand per gal concentrate
    container_gal: 30, // VERIFY — Acrytech drum size
    container_label: "30-gal drum",
  },

  color: {
    coats: 2, // VERIFY — 2 color coats is standard; confirm
    coverage_sqyd_per_gal: 17, // VERIFY — sq yd per gal of concentrate, per coat
    sand_lb_per_gal: 3, // VERIFY
    container_gal: 30, // VERIFY
    container_label: "30-gal drum",
  },

  line_paint: {
    gal_per_court: 1.5, // VERIFY — textured white, all coats, per tennis court
    container_gal: 5,
    container_label: "5-gal pail",
  },

  sand: { bag_lb: 50 }, // VERIFY — silica sand bag weight

  faultline: {
    cost_per_linear_ft: 2, // CONFIRMED by Patrick ($ material cost / lf)
    // kit_linear_ft: null, // set if you want whole-kit rounding + kit counts
  },
};

// Which RATES fields are still placeholders (for the warning banner).
const VERIFY_NOTES = [
  "resurfacer.coverage_sqyd_per_gal",
  "resurfacer.sand_lb_per_gal",
  "resurfacer.container_gal",
  "color.coats",
  "color.coverage_sqyd_per_gal",
  "color.sand_lb_per_gal",
  "color.container_gal",
  "line_paint.gal_per_court",
  "sand.bag_lb",
];

const SQFT_PER_SQYD = 9;

// ── env ──────────────────────────────────────────────────────────────
function loadEnv() {
  const envPath = join(REPO_ROOT, ".env.local");
  let raw;
  try {
    raw = readFileSync(envPath, "utf8");
  } catch {
    fail(`Could not read ${envPath} — run from the repo root.`);
  }
  for (const line of raw.split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (!m) continue;
    let val = m[2].trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    if (!(m[1] in process.env)) process.env[m[1]] = val;
  }
}

function fail(msg) {
  console.error(`[materials-calc] ${msg}`);
  process.exit(1);
}

const arg = (flag) => {
  const i = process.argv.indexOf(flag);
  return i >= 0 ? process.argv[i + 1] : undefined;
};
const money = (n) => "$" + n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const round2 = (n) => Math.round((n + Number.EPSILON) * 100) / 100;

// ── per-product math ─────────────────────────────────────────────────
function coatProduct(areaSqyd, r, waste) {
  const mixedFactor = 1 + waste / 100;
  const concentrate = (areaSqyd * r.coats) / r.coverage_sqyd_per_gal * mixedFactor;
  const containers = Math.ceil(concentrate / r.container_gal);
  const sandLb = concentrate * r.sand_lb_per_gal;
  return {
    coats: r.coats,
    concentrate_gal: round2(concentrate),
    containers,
    container_label: r.container_label,
    sand_lb: round2(sandLb),
  };
}

function takeoff({ sqft, crack, courts }) {
  const sqyd = sqft / SQFT_PER_SQYD;
  const resurfacer = coatProduct(sqyd, RATES.resurfacer, RATES.waste_pct);
  const color = coatProduct(sqyd, RATES.color, RATES.waste_pct);

  const linePaintGal = courts * RATES.line_paint.gal_per_court * (1 + RATES.waste_pct / 100);
  const linePails = Math.ceil(linePaintGal / RATES.line_paint.container_gal);

  const totalSandLb = resurfacer.sand_lb + color.sand_lb;
  const sandBags = Math.ceil(totalSandLb / RATES.sand.bag_lb);

  const faultlineCost = round2(crack * RATES.faultline.cost_per_linear_ft);

  return { resurfacer, color, linePaintGal: round2(linePaintGal), linePails, totalSandLb: round2(totalSandLb), sandBags, faultlineCost, sqyd: round2(sqyd) };
}

function printOption(label, facts) {
  const t = takeoff(facts);
  console.log(`\n=== ${label} — ${t.sqyd.toLocaleString()} sq yd (${facts.sqft.toLocaleString()} sqft) · ${facts.crack.toLocaleString()} lf crack · ${facts.courts} courts ===`);
  console.log(`  Acrylic Resurfacer (${t.resurfacer.coats} coat):  ${t.resurfacer.concentrate_gal} gal concentrate  →  ${t.resurfacer.containers} × ${t.resurfacer.container_label}`);
  console.log(`  Color Coat (${t.color.coats} coats):            ${t.color.concentrate_gal} gal concentrate  →  ${t.color.containers} × ${t.color.container_label}`);
  console.log(`  Silica sand:                       ${t.totalSandLb} lb  →  ${t.sandBags} × ${RATES.sand.bag_lb}-lb bag`);
  console.log(`  Line paint (textured white):       ${t.linePaintGal} gal  →  ${t.linePails} × ${RATES.line_paint.container_label}`);
  console.log(`  ATS Faultline crack kits:          ${facts.crack.toLocaleString()} lf × ${money(RATES.faultline.cost_per_linear_ft)}/lf  =  ${money(t.faultlineCost)}`);
}

// ── main ─────────────────────────────────────────────────────────────
async function main() {
  loadEnv();

  const adHocSqft = arg("--sqft");
  let optionB;
  let optionA = null;

  if (adHocSqft) {
    optionB = { sqft: Number(adHocSqft), crack: Number(arg("--crack") || 0), courts: Number(arg("--courts") || 0) };
  } else {
    const leadId = arg("--lead") || JCC_LEAD_ID;
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) fail("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
    const sb = createClient(url, key, { auth: { persistSession: false } });
    const { data, error } = await sb
      .from("leads")
      .select("display_name, square_feet, number_of_courts, crack_length_ft")
      .eq("id", leadId)
      .maybeSingle();
    if (error) fail(`leads query failed: ${error.message}`);
    if (!data) fail(`lead ${leadId} not found.`);
    if (!data.square_feet) fail(`lead ${leadId} has no square_feet — run pre-quote first.`);

    console.log(`Lead: ${data.display_name}`);
    optionB = { sqft: data.square_feet, crack: data.crack_length_ft || 0, courts: data.number_of_courts || 0 };

    // Barshop JCC also has a smaller Option A (courts 3,4,5 + pad). Show it too.
    if (leadId === JCC_LEAD_ID) optionA = { sqft: 22200, crack: 900, courts: 3 };
  }

  console.log("\n⚠  VERIFY the RATES marked 'VERIFY' against the Acrytech TDS before ordering:");
  console.log("   " + VERIFY_NOTES.join(", "));
  console.log(`   (Confirmed: resurfacer = 1 coat; Faultline = ${money(RATES.faultline.cost_per_linear_ft)}/lf. Waste factor = ${RATES.waste_pct}%.)`);

  if (optionA) printOption("Option A (courts 3,4,5 + pad)", optionA);
  printOption(optionA ? "Option B (all 5 courts + pad)" : "Materials takeoff", optionB);

  console.log("\nNote: concentrate + line paint include the waste factor and are rounded UP to whole containers.");
  console.log("Faultline is a straight $/lf material cost (set faultline.kit_linear_ft in RATES if you want whole-kit counts).\n");
}

main().catch((e) => fail(e.stack || e.message));
