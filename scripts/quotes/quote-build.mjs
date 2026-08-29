#!/usr/bin/env node
// quote-build.mjs — build a quote from a "brief" using system templates.
//
// Replaces ad-hoc one-off quote scripts. Reads a single JSON "brief" object on
// stdin (decisions only — facts come from the lead), resolves system templates
// (scripts/quotes/systems.mjs) against live prices in `services_catalog`, and
// writes a quote + packages + line items.
//
// SOURCE OF TRUTH: the column sets written here mirror `saveQuote` in
// src/lib/admin/actions/quote-actions.ts. That server action cannot be imported
// (it is "use server"), so keep these in sync with it by hand.
//
// Two modes (both read the brief from stdin):
//   --mode preview   compute packages + totals and print. NO DB writes.
//   --mode build     write the quote (insert, or update in place if brief.id set).
//
// Facts are read from the `leads` row (square_feet, number_of_courts, sports, …);
// the brief never carries facts — only package/template/override/color decisions.
//
// Env from .env.local at repo root: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY.
// Output: a single JSON object on stdout.

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { SYSTEMS, listSystems } from "./systems.mjs";
import { assembleConditions } from "./clauses.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, "..", "..");
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

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
  console.error(`[quote-build] ${msg}`);
  process.exit(1);
}

const round2 = (n) => Math.round((n + Number.EPSILON) * 100) / 100;

// ── stdin ────────────────────────────────────────────────────────────
async function readBrief() {
  const chunks = [];
  for await (const chunk of process.stdin) chunks.push(chunk);
  const text = Buffer.concat(chunks).toString("utf8").trim();
  if (!text) fail("No JSON received on stdin.");
  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch (e) {
    fail(`stdin is not valid JSON: ${e.message}`);
  }
  if (Array.isArray(parsed) || typeof parsed !== "object" || parsed === null) {
    fail("stdin JSON must be a single brief object.");
  }
  return parsed;
}

// ── loaders ──────────────────────────────────────────────────────────
async function loadCatalog(supabase) {
  const { data, error } = await supabase.from("services_catalog").select("*");
  if (error) fail(`services_catalog query failed: ${error.message}`);
  if (!data?.length) fail("services_catalog is empty.");
  const byCode = new Map();
  for (const row of data) if (row.code) byCode.set(row.code, row);
  return byCode;
}

async function loadLead(supabase, leadId) {
  const { data, error } = await supabase
    .from("leads")
    .select(
      "id, display_name, project_type, sports, square_feet, number_of_courts, city, address_line1, state, crack_length_ft, bird_bath_count, deal_stage"
    )
    .eq("id", leadId)
    .maybeSingle();
  if (error) fail(`leads query failed: ${error.message}`);
  if (!data) fail(`lead ${leadId} not found.`);
  return data;
}

async function loadColors(supabase) {
  const { data, error } = await supabase.from("color_palette").select("id, name");
  if (error) fail(`color_palette query failed: ${error.message}`);
  const byName = new Map();
  for (const c of data || []) byName.set(c.name.toLowerCase(), c.id);
  return byName;
}

// ── quantity resolution ──────────────────────────────────────────────
const QTY_FACT = {
  sqft: "square_feet",
  courts: "number_of_courts",
  linear_ft: "crack_length_ft",
  birdbaths: "bird_bath_count",
};

// Returns { qty } or { missing: <factName> } or { skip: true } (optional w/ no qty).
function resolveQty(step, lead) {
  if (step.qtyRule === "fixed") {
    const q = Number(step.qty);
    if (!Number.isFinite(q) || q <= 0) return { missing: `fixed qty for "${step.code || step.name}"` };
    return { qty: q };
  }
  const factName = QTY_FACT[step.qtyRule];
  if (!factName) return { missing: `unknown qtyRule "${step.qtyRule}"` };
  const raw = lead[factName];
  const q = raw == null ? null : Number(raw);
  if (q == null || !Number.isFinite(q) || q <= 0) {
    // Optional steps with no/zero quantity are simply dropped; required ones are missing facts.
    return step.optional ? { skip: true } : { missing: factName };
  }
  return { qty: q };
}

// ── line item construction ───────────────────────────────────────────
function buildLineItem(step, catalog, lead, sortOrder, errors, missing) {
  // Custom (non-catalog) line from an addCustom override.
  if (step.custom) {
    const qty = Number(step.quantity) || 0;
    const unit = Number(step.unit_price) || 0;
    return {
      service_id: null,
      name: step.name,
      description: step.description || null,
      line_item_type: step.line_item_type || "other",
      unit_of_measure: step.unit_of_measure || "flat_rate",
      quantity: qty,
      unit_price: unit,
      total_price: round2(qty * unit),
      is_optional: step.optional ?? false,
      is_included_by_default: !(step.optional ?? false),
      sort_order: sortOrder,
    };
  }

  const service = catalog.get(step.code);
  if (!service) {
    errors.push(`unknown catalog code "${step.code}" (not in services_catalog)`);
    return null;
  }

  const q = resolveQty(step, lead);
  if (q.skip) return null;
  if (q.missing) {
    missing.push({ code: step.code, needs: q.missing });
    return null;
  }

  const optional = step.optional ?? service.is_add_on;
  const unitPrice = step.priceOverride != null ? Number(step.priceOverride) : Number(service.base_price);
  return {
    service_id: service.id,
    name: step.nameOverride || service.name,
    description: service.description || null,
    line_item_type: step.lineType || service.line_item_type,
    unit_of_measure: service.unit_of_measure,
    quantity: q.qty,
    unit_price: unitPrice,
    total_price: round2(q.qty * unitPrice),
    is_optional: optional,
    is_included_by_default: !optional,
    sort_order: sortOrder,
  };
}

// ── overrides ────────────────────────────────────────────────────────
// Returns a new step list with ops applied. Records failures in `errors`.
function applyOverrides(templateSteps, overrides, catalog, errors) {
  let steps = templateSteps.map((s) => ({ ...s }));
  const findIdx = (code) => steps.findIndex((s) => s.code === code);

  for (const op of overrides || []) {
    switch (op.op) {
      case "remove": {
        const i = findIdx(op.code);
        if (i < 0) { errors.push(`override remove: step "${op.code}" not in template`); break; }
        steps.splice(i, 1);
        break;
      }
      case "reprice": {
        const i = findIdx(op.code);
        if (i < 0) { errors.push(`override reprice: step "${op.code}" not in template`); break; }
        steps[i].priceOverride = Number(op.unit_price);
        break;
      }
      case "setQty": {
        const i = findIdx(op.code);
        if (i < 0) { errors.push(`override setQty: step "${op.code}" not in template`); break; }
        steps[i].qtyRule = "fixed";
        steps[i].qty = Number(op.qty);
        break;
      }
      case "setOptional": {
        const i = findIdx(op.code);
        if (i < 0) { errors.push(`override setOptional: step "${op.code}" not in template`); break; }
        steps[i].optional = Boolean(op.optional);
        break;
      }
      case "add": {
        if (!catalog.get(op.code)) { errors.push(`override add: unknown catalog code "${op.code}"`); break; }
        steps.push({ code: op.code, qtyRule: op.qtyRule, qty: op.qty, optional: op.optional ?? false });
        break;
      }
      case "addCustom": {
        steps.push({
          custom: true,
          name: op.name,
          description: op.description,
          line_item_type: op.line_item_type,
          unit_of_measure: op.unit_of_measure,
          quantity: op.quantity,
          unit_price: op.unit_price,
          optional: op.optional ?? false,
        });
        break;
      }
      default:
        errors.push(`unknown override op "${op.op}"`);
    }
  }
  return steps;
}

// ── package build ────────────────────────────────────────────────────
function buildPackage(pkgBrief, catalog, lead, errors, missing) {
  const template = SYSTEMS[pkgBrief.template];
  if (!template) {
    errors.push(`unknown template "${pkgBrief.template}" (valid: ${listSystems().map((s) => s.key).join(", ")})`);
    return null;
  }
  const steps = applyOverrides(template.steps, pkgBrief.overrides, catalog, errors);
  const lineItems = [];
  let idx = 0;
  for (const step of steps) {
    const li = buildLineItem(step, catalog, lead, idx, errors, missing);
    if (li) { lineItems.push(li); idx += 1; }
  }
  const subtotal = round2(lineItems.reduce((s, li) => s + li.total_price, 0));
  return {
    tier: pkgBrief.tier,
    name: pkgBrief.name || template.title,
    description: pkgBrief.description || null,
    is_recommended: Boolean(pkgBrief.recommended),
    sort_order: 0, // set by caller
    line_items: lineItems,
    subtotal,
  };
}

// ── colors ───────────────────────────────────────────────────────────
function resolveColors(briefColors, colorMap, warnings) {
  const out = { color_inside_id: null, color_outside_id: null, color_lines_id: null, color_nvz_id: null };
  const map = { inside: "color_inside_id", outside: "color_outside_id", lines: "color_lines_id", nvz: "color_nvz_id" };
  for (const [key, col] of Object.entries(map)) {
    const val = briefColors?.[key];
    if (!val) continue;
    if (UUID_RE.test(val)) { out[col] = val; continue; }
    const id = colorMap.get(String(val).toLowerCase());
    if (id) out[col] = id;
    else warnings.push(`color "${val}" (${key}) did not match color_palette — left blank`);
  }
  return out;
}

// ── quote row ────────────────────────────────────────────────────────
function assembleQuoteRow(brief, lead, colors, subtotal, total) {
  return {
    customer_id: brief.customer_id || null,
    lead_id: brief.lead_id || null,
    // facts copied from the lead (single source of truth)
    project_type: lead.project_type,
    sports: lead.sports,
    square_feet: lead.square_feet,
    number_of_courts: lead.number_of_courts,
    city: lead.city,
    address_line1: lead.address_line1,
    state: lead.state,
    crack_length_ft: lead.crack_length_ft,
    bird_bath_count: lead.bird_bath_count,
    // colors
    ...colors,
    // decisions from the brief
    cover_note: brief.cover_note ?? null,
    terms_and_conditions: brief.terms_and_conditions ?? null,
    internal_notes: brief.internal_notes ?? null,
    discount_amount: Number(brief.discount_amount) || 0,
    deposit_due_days: Number(brief.deposit_due_days) || 7,
    deposit_percent: brief.deposit_percent != null ? Number(brief.deposit_percent) : 30,
    show_signature: Boolean(brief.show_signature),
    conditions: assembleConditions(brief.conditions_context || {}),
    expires_at: new Date(Date.now() + 30 * 86400000).toISOString(),
    payment_schedule: brief.payment_schedule ?? null,
    subtotal,
    total,
  };
}

// ── write ────────────────────────────────────────────────────────────
async function writeBuild(supabase, brief, quoteRow, packages) {
  let quoteId = brief.id || null;

  if (quoteId) {
    const { error: upErr } = await supabase.from("quotes").update(quoteRow).eq("id", quoteId);
    if (upErr) fail(`quotes update failed: ${upErr.message}`);
    const { error: delErr } = await supabase.from("quote_packages").delete().eq("quote_id", quoteId);
    if (delErr) fail(`quote_packages delete failed: ${delErr.message}`);
  } else {
    const { data, error } = await supabase.from("quotes").insert(quoteRow).select("id").single();
    if (error) fail(`quotes insert failed: ${error.message}`);
    quoteId = data.id;
  }

  for (const pkg of packages) {
    const { data: pkgRow, error: pErr } = await supabase
      .from("quote_packages")
      .insert({
        quote_id: quoteId,
        tier: pkg.tier,
        name: pkg.name,
        description: pkg.description,
        subtotal: round2(pkg.line_items.reduce((s, li) => s + li.total_price, 0)),
        is_recommended: pkg.is_recommended,
        sort_order: pkg.sort_order,
      })
      .select("id")
      .single();
    if (pErr) fail(`quote_packages insert failed: ${pErr.message}`);

    if (pkg.line_items.length > 0) {
      const rows = pkg.line_items.map((li) => ({ package_id: pkgRow.id, ...li }));
      const { error: liErr } = await supabase.from("quote_line_items").insert(rows);
      if (liErr) fail(`quote_line_items insert failed: ${liErr.message}`);
    }
  }

  const { data: finalRow } = await supabase
    .from("quotes")
    .select("id, quote_number, share_token, status")
    .eq("id", quoteId)
    .single();
  return finalRow;
}

// ── main ─────────────────────────────────────────────────────────────
async function main() {
  loadEnv();
  const mode = (process.argv.includes("--mode")
    ? process.argv[process.argv.indexOf("--mode") + 1]
    : "preview"
  ).toLowerCase();
  if (mode !== "preview" && mode !== "build") fail(`Unknown --mode "${mode}" (use preview | build)`);

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) fail("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  const supabase = createClient(url, serviceKey, { auth: { persistSession: false } });

  const brief = await readBrief();
  if (!brief.lead_id) fail("brief.lead_id is required as the fact source (MVP builds facts from the lead).");
  if (!Array.isArray(brief.packages) || brief.packages.length === 0) fail("brief.packages must be a non-empty array.");

  const [catalog, colorMap] = await Promise.all([loadCatalog(supabase), loadColors(supabase)]);
  const lead = await loadLead(supabase, brief.lead_id);

  const errors = [];
  const missing = [];
  const warnings = [];
  const packages = brief.packages.map((p, i) => {
    const pkg = buildPackage(p, catalog, lead, errors, missing);
    if (pkg) pkg.sort_order = i;
    return pkg;
  });

  // Aggregate hard failures — never write a partial quote.
  if (errors.length) fail(`brief errors:\n  - ${errors.join("\n  - ")}`);
  if (missing.length) {
    const grouped = {};
    for (const m of missing) (grouped[m.needs] ||= []).push(m.code);
    const lines = Object.entries(grouped).map(([need, codes]) => `${need} (needed by ${codes.join(", ")})`);
    fail(`lead ${lead.id} (${lead.display_name}) is missing facts:\n  - ${lines.join("\n  - ")}\nRun the pre-quote skill to fill these.`);
  }
  if (packages.some((p) => !p)) fail("one or more packages failed to build.");
  if (packages.some((p) => p.line_items.length === 0)) {
    fail("a package resolved to zero line items — check template/overrides.");
  }

  // Totals: recommended package subtotal (fallback: first), minus discount.
  const rec = packages.find((p) => p.is_recommended) || packages[0];
  const subtotal = rec.subtotal;
  const discount = Number(brief.discount_amount) || 0;
  const total = Math.max(0, round2(subtotal - discount));

  const colors = resolveColors(brief.colors, colorMap, warnings);

  const summary = {
    lead: { id: lead.id, name: lead.display_name, square_feet: lead.square_feet, number_of_courts: lead.number_of_courts },
    packages: packages.map((p) => ({
      tier: p.tier,
      name: p.name,
      is_recommended: p.is_recommended,
      subtotal: p.subtotal,
      line_items: p.line_items.map((li) => ({ name: li.name, qty: li.quantity, unit_price: li.unit_price, total: li.total_price, optional: li.is_optional })),
    })),
    subtotal,
    discount,
    total,
    deposit_percent: brief.deposit_percent != null ? Number(brief.deposit_percent) : 30,
    conditions: assembleConditions(brief.conditions_context || {}).map((c) => `${c.section} — ${c.title}`),
    warnings,
  };

  if (mode === "preview") {
    process.stdout.write(JSON.stringify({ mode, ...summary }, null, 2) + "\n");
    return;
  }

  const quoteRow = assembleQuoteRow(brief, lead, colors, subtotal, total);
  const quote = await writeBuild(supabase, brief, quoteRow, packages);
  process.stdout.write(
    JSON.stringify({ mode, quote, ...summary, admin_url: `/admin/quotes/${quote.id}`, public_url: `/q/${quote.share_token}` }, null, 2) + "\n"
  );
}

main().catch((e) => fail(e.stack || e.message));
