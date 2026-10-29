#!/usr/bin/env node
// quote-check.mjs — rules-based consistency check for a quote.
//
// Catches the deterministic stuff before a quote goes out: math, line items that
// contradict the fine print (included bird baths vs a "leveling of low spots"
// exclusion), cover-note dollar amounts that don't match the quote, banned words,
// brand spellings, and missing info. The `quote-check` skill layers an AI read of
// the PDF on top of this.
//
// Input (one of):
//   --quote <uuid | PCS-YYYY-NNNN>   check a saved quote (reads Supabase)
//   --brief                          check a brief on stdin BEFORE it's written
//                                    (uses quote-build's computeQuote, no writes)
// Flags:
//   --text                           human-readable report instead of JSON
//
// Output: { quote, errors[], warnings[], nits[] }. Each finding is
//   { rule, severity, where, message, proposed_fix }
// where proposed_fix is a brief change (override op / conditions_context /
// conditions_overrides) or plain guidance. Exit code 1 when there are errors.

import { loadEnv, makeClient, computeQuote, readBrief, fail } from "./quote-build.mjs";
import { BANNED_TERMS, BRAND_SPELLINGS, COVER_NOTE_SCOPE, TERM_VARIANTS } from "./check-config.mjs";
import { CLAUSES } from "./clauses.mjs";

const round2 = (n) => Math.round((n + Number.EPSILON) * 100) / 100;
const money = (n) => `$${Number(n).toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// ── normalize ────────────────────────────────────────────────────────
// Both input paths become the same shape so every rule reads one structure:
//   { quote: {...quote row}, email, packages: [{ name, is_recommended, subtotal, line_items: [...] }] }

async function loadSavedQuote(supabase, ref) {
  const col = UUID_RE.test(ref) ? "id" : "quote_number";
  const { data, error } = await supabase
    .from("quotes")
    .select("*, quote_packages(*, quote_line_items(*)), lead:leads(email), customer:customers(email)")
    .eq(col, ref)
    .maybeSingle();
  if (error) fail(`quote query failed: ${error.message}`);
  if (!data) fail(`quote ${ref} not found.`);
  const packages = (data.quote_packages || [])
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((p) => ({
      name: p.name,
      is_recommended: p.is_recommended,
      subtotal: Number(p.subtotal),
      line_items: (p.quote_line_items || []).sort((a, b) => a.sort_order - b.sort_order).map(normLine),
    }));
  const conditions = (data.conditions || []).map((c) => ({ ...c, code: c.code || codeFor(c) }));
  return { quote: { ...data, conditions }, email: data.customer?.email || data.lead?.email || null, packages };
}

// Quotes built before clauses carried a `code` only stored {section, title, body}.
// Recover the code from the library: exact body match first, then section + title.
function codeFor(c) {
  const exact = CLAUSES.find((cl) => typeof cl.body === "string" && cl.body === c.body);
  if (exact) return exact.code;
  return CLAUSES.find((cl) => cl.section === c.section && cl.title === c.title)?.code || null;
}

async function loadBriefQuote(supabase, brief) {
  const { lead, packages, quoteRow } = await computeQuote(supabase, brief);
  const { data } = await supabase.from("leads").select("email").eq("id", lead.id).maybeSingle();
  return {
    quote: { ...quoteRow, quote_number: brief.id ? `(brief for ${brief.id})` : "(unsaved brief)" },
    email: data?.email || null,
    packages: packages.map((p) => ({ ...p, line_items: p.line_items.map(normLine) })),
  };
}

function normLine(li) {
  return {
    name: li.name,
    description: li.description || "",
    unit_of_measure: li.unit_of_measure,
    quantity: Number(li.quantity),
    unit_price: Number(li.unit_price),
    total_price: Number(li.total_price),
    is_optional: Boolean(li.is_optional),
  };
}

// ── helpers for rules ────────────────────────────────────────────────
const lineText = (li) => `${li.name} ${li.description}`;
const allLines = (q) => q.packages.flatMap((p) => p.line_items);
const includedLines = (q) => allLines(q).filter((li) => !li.is_optional);
const optionalLines = (q) => allLines(q).filter((li) => li.is_optional);
const hasLine = (lines, re) => lines.some((li) => re.test(lineText(li)));
const clauses = (q) => q.quote.conditions || [];
const clauseWith = (q, re) => clauses(q).find((c) => re.test(c.body));
const hasClause = (q, code) => clauses(q).some((c) => c.code === code);
// A full surface removal (not "spot-grind" or "grind high spots").
const FULL_GRIND = /diamond grind|full grind|grind (?:off|down|to (?:bare|sound) concrete)|remove existing|tile removal/i;
const recPackage = (q) => q.packages.find((p) => p.is_recommended) || q.packages[0];

function finding(rule, severity, where, message, proposed_fix) {
  return { rule, severity, where, message, proposed_fix: proposed_fix ?? null };
}

// ── rules ────────────────────────────────────────────────────────────
// Each rule returns zero or more findings. Add new ones to this list.
const RULES = [
  // 0. Legacy quotes saved before fact-keyed conditions have no fine print at all.
  (q) => (clauses(q).length === 0
    ? [finding("no-conditions", "warning", "conditions",
        "Quote has no conditions/exclusions/warranty sections (built before the clause library). Clause checks skipped.",
        "Rebuild from a brief with conditions_context to add them.")]
    : []),

  // 1. Math
  (q) =>
    allLines(q)
      .filter((li) => Math.abs(round2(li.quantity * li.unit_price) - li.total_price) > 0.01)
      .map((li) =>
        finding("math-line", "error", `line "${li.name}"`,
          `${li.quantity} × ${money(li.unit_price)} = ${money(round2(li.quantity * li.unit_price))}, but the line total is ${money(li.total_price)}.`,
          "Rebuild the quote. Line totals are computed by quote-build.")),
  (q) =>
    q.packages
      .map((p) => ({ p, sum: round2(p.line_items.filter((li) => !li.is_optional).reduce((s, li) => s + li.total_price, 0)) }))
      .filter(({ p, sum }) => Math.abs(sum - p.subtotal) > 0.01)
      .map(({ p, sum }) =>
        finding("math-package", "error", `package "${p.name}"`,
          `Included lines add up to ${money(sum)}, but the package subtotal is ${money(p.subtotal)}.`, "Rebuild the quote.")),
  (q) => {
    const rec = recPackage(q);
    if (!rec) return [finding("no-packages", "error", "quote", "Quote has no packages.")];
    const expect = Math.max(0, round2(rec.subtotal - (Number(q.quote.discount_amount) || 0)));
    return Math.abs(expect - Number(q.quote.total)) > 0.01
      ? [finding("math-total", "error", "quote total",
          `Recommended package ${money(rec.subtotal)} − discount ${money(q.quote.discount_amount || 0)} = ${money(expect)}, but the quote total is ${money(q.quote.total)}.`,
          "Rebuild the quote.")]
      : [];
  },
  (q) => {
    const pct = Number(q.quote.deposit_percent);
    return !(pct > 0 && pct <= 100)
      ? [finding("deposit-percent", "error", "deposit", `Deposit percent is ${q.quote.deposit_percent}; expected 1–100.`, `Set "deposit_percent" in the brief.`)]
      : [];
  },
  (q) => (q.packages.filter((p) => p.is_recommended).length > 1
    ? [finding("multi-recommended", "warning", "packages", "More than one package is marked recommended; the first one drives the total.", "Mark only one package recommended.")]
    : []),
  (q) => allLines(q).filter((li) => li.total_price === 0 && !/included/i.test(li.name)).map((li) =>
    finding("zero-line", "nit", `line "${li.name}"`, "Line is $0 but isn't labeled as included.", `Rename it to "... (included)" or remove it.`)),

  // 2. Line items vs fine print
  (q) => {
    if (!hasLine(includedLines(q), /bird.?bath|low spot/i)) return [];
    const c = clauses(q).find((cl) => /leveling of low spots(?! beyond)/i.test(cl.body));
    return c
      ? [finding("birdbath-vs-exclusion", "error", `clause "${c.title}"`,
          "Bird-bath repair is an included line, but the fine print excludes \"leveling of low spots\".",
          { conditions_context: { birdbaths_included: true } })]
      : [];
  },
  (q) => {
    const c = clauseWith(q, /linear-foot quantity shown/i);
    if (!c) return [];
    const lfCrack = includedLines(q).some((li) => li.unit_of_measure === "per_linear_ft" && /crack|faultline/i.test(lineText(li)));
    return lfCrack
      ? []
      : [finding("crack-lf-mismatch", "error", `clause "${c.title}"`,
          "The crack clause refers to \"the linear-foot quantity shown\" (ATS Faultline), but there's no per-linear-foot crack line on the quote.",
          { conditions_context: { crack_repair_mode: "included" } })];
  },
  (q) => {
    const crackClause = clauses(q).find((c) => /^crack-repair/.test(c.code || "") || /^Crack Repair Scope$/.test(c.title));
    return crackClause && !hasLine(includedLines(q), /crack|faultline/i)
      ? [finding("crack-clause-no-line", "warning", `clause "${crackClause.title}"`,
          "There's a crack-repair clause, but no included crack-repair line.",
          { conditions_context: { crack_repair: false } })]
      : [];
  },
  (q) => {
    if (!clauses(q).length) return [];
    const out = [];
    const solventLine = hasLine(includedLines(q), /solvent/i);
    const solventClause = clauses(q).some((c) => /solvent primer/i.test(c.body));
    if (solventLine && !solventClause)
      out.push(finding("solvent-no-clauses", "error", "conditions",
        "A solvent primer line is on the quote, but the adhesion-test and surface-temperature clauses are missing.",
        { conditions_context: { primer: "solvent" } }));
    if (solventClause && !hasLine(includedLines(q), /primer|adhesion|vapor/i))
      out.push(finding("solvent-clause-no-line", "warning", "conditions",
        "The fine print covers solvent primer, but there's no primer line on the quote.",
        { conditions_context: { primer: "latex" } }));
    return out;
  },
  (q) => {
    if (!clauses(q).length) return [];
    const out = [];
    const bbLine = hasLine(allLines(q), /basketball/i);
    if (bbLine && !hasClause(q, "basketball-use"))
      out.push(finding("basketball-no-clause", "warning", "conditions",
        "Basketball lines are on the quote (included or optional), but the Basketball Use clause (wear, no goals) isn't.",
        { conditions_context: { basketball: true } }));
    const sports = q.quote.sports || [];
    if (hasClause(q, "basketball-use") && !bbLine && !sports.includes("basketball"))
      out.push(finding("basketball-clause-no-scope", "warning", "conditions",
        "There's a Basketball Use clause, but no basketball lines or basketball in the sports.",
        { conditions_context: { basketball: false } }));
    return out;
  },
  (q) =>
    hasLine(includedLines(q), FULL_GRIND) && hasClause(q, "full-grind-alternate")
      ? [finding("grind-vs-alternate", "error", `clause "Full Grind Alternate"`,
          "The quote already includes a grind, but the fine print offers a full grind as an alternate.",
          { conditions_context: { grind_alternate: false } })]
      : [],
  (q) =>
    hasLine(includedLines(q), FULL_GRIND) && hasClause(q, "existing-coating-disclaimer")
      ? [finding("grind-vs-coating", "warning", `clause "Existing Coating"`,
          "The quote grinds off the existing surface, but the fine print says we're resurfacing over an existing coating.",
          { conditions_context: { coated: false } })]
      : [],
  (q) => {
    const out = [];
    const bullet = (re) => clauses(q).find((cl) => cl.body.split("\n").some((b) => b.startsWith("•") && re.test(b) && !/unless/i.test(b)));
    if (hasLine(includedLines(q), /haul|disposal/i)) {
      const c = bullet(/haul|debris removal|disposal/i);
      if (c) out.push(finding("haul-vs-exclusion", "error", `clause "${c.title}"`,
        "Haul-off/disposal is an included line, but an exclusion bullet excludes it.",
        { conditions_context: { has_haul_off: "included" } }));
    } else if (hasLine(optionalLines(q), /haul|disposal/i)
      && !clauses(q).some((cl) => /haul-off add-on/i.test(cl.body))) {
      out.push(finding("haul-optional-unclear", "warning", "exclusions",
        "Haul-off is an optional add-on, but the fine print doesn't say who disposes of the debris if it isn't selected.",
        { conditions_context: { has_haul_off: "optional" } }));
    }
    return out;
  },
  (q) => {
    // One spelling per term across everything the customer reads.
    const text = [q.quote.cover_note || "", ...allLines(q).map(lineText), ...clauses(q).map((c) => c.body)].join("\n");
    return TERM_VARIANTS.flatMap((t) => {
      const used = t.forms.filter((f) => f.test(text)).map((f) => text.match(f)[0]);
      return used.length > 1
        ? [finding("term-variants", "nit", t.label, `Spelled ${used.map((u) => `"${u}"`).join(", ")}. Pick one: "${t.preferred}".`)]
        : [];
    });
  },
  (q) => {
    const seen = new Map();
    const out = [];
    for (const c of clauses(q)) {
      const k = `${c.section}|${c.title}`;
      if (seen.has(k) && c.title !== c.section)
        out.push(finding("duplicate-clause", "error", `clause "${c.title}"`,
          `Two clauses titled "${c.title}" in ${c.section}.`,
          { conditions_overrides: [{ remove: c.code }] }));
      seen.set(k, true);
    }
    return out;
  },

  // 3. Cover note vs quote
  (q) => {
    const note = q.quote.cover_note || "";
    if (!note) return [];
    const total = Number(q.quote.total);
    const opts = optionalLines(q).map((li) => li.total_price);
    const pct = Number(q.quote.deposit_percent) || 30;
    const allowed = new Set([
      total, Number(q.quote.subtotal),
      ...allLines(q).map((li) => li.total_price),
      ...allLines(q).map((li) => li.unit_price),
      ...q.packages.map((p) => p.subtotal),
      ...opts.map((o) => total + o),
      total + opts.reduce((s, o) => s + o, 0),
      round2((total * pct) / 100), round2(total - (total * pct) / 100),
    ].map(round2));
    const out = [];
    for (const m of note.matchAll(/\$\s?([\d,]+(?:\.\d+)?)\s*([kK])?/g)) {
      const n = round2(Number(m[1].replace(/,/g, "")) * (m[2] ? 1000 : 1));
      if (!allowed.has(n))
        out.push(finding("note-amount", "error", "cover note",
          `Cover note says ${m[0].trim()}, which doesn't match the total, any line, or any total-with-options.`,
          "Fix the amount in the cover note (brief.cover_note)."));
    }
    return out;
  },
  (q) => {
    const note = q.quote.cover_note || "";
    // Ignore sentences that exclude the item ("excludes birdbath leveling", "no fencing").
    const NEG = /\bexclud|\bnot\b|\bno\b|\bwithout\b|\bpending\b|\bby others\b/i;
    const sentences = note.split(/(?<=[.!?])\s+/).filter((t) => !NEG.test(t));
    return COVER_NOTE_SCOPE.filter((s) => sentences.some((t) => s.note.test(t)) && !hasLine(allLines(q), s.line)).map((s) =>
      finding("note-scope", "warning", "cover note",
        `Cover note mentions ${s.label}, but there's no matching line item.`,
        `Add a ${s.label} line or drop it from the cover note.`));
  },

  // 4. Language
  (q) => {
    const out = [];
    const fields = [
      ["cover note", q.quote.cover_note || ""],
      ...q.packages.map((p) => [`package "${p.name}"`, p.name]),
      ...allLines(q).map((li) => [`line "${li.name}"`, lineText(li)]),
    ];
    for (const [where, text] of fields)
      for (const b of BANNED_TERMS)
        if (b.pattern.test(text)) out.push(finding("banned-term", "error", where, `Uses "${text.match(b.pattern)[0]}". ${b.why}`));
    return out;
  },
  (q) => {
    const out = [];
    const fields = [
      ["cover note", q.quote.cover_note || ""],
      ...allLines(q).map((li) => [`line "${li.name}"`, lineText(li)]),
      ...clauses(q).map((c) => [`clause "${c.title}"`, c.body]),
    ];
    for (const [where, text] of fields)
      for (const b of BRAND_SPELLINGS) {
        const m = text.match(b.wrong);
        if (m) out.push(finding("brand-spelling", "warning", where, `"${m[0]}" should be "${b.right}".`));
      }
    return out;
  },
  (q) => optionalLines(q).filter((li) => /\(optional/i.test(li.name)).map((li) =>
    finding("optional-in-name", "nit", `line "${li.name}"`,
      "Name says \"optional\", but the PDF already lists it under Optional Add-ons.",
      { op: "rename", name: li.name.replace(/\s*\(optional[^)]*\)/i, "").trim() })),
  (q) => {
    const out = [];
    const fields = [["cover note", q.quote.cover_note || ""], ...allLines(q).map((li) => [`line "${li.name}"`, li.name])];
    for (const [where, text] of fields)
      if (/ {2,}| ,|\s\.\s|\.\./.test(text)) out.push(finding("spacing", "nit", where, "Double space or stray punctuation."));
    return out;
  },

  // 5. Missing info
  (q) => (!q.quote.address_line1 ? [finding("no-address", "warning", "project", `No job-site street address (city: ${q.quote.city || "—"}).`, "Add address_line1 to the lead, then rebuild.")] : []),
  (q) =>
    !q.quote.color_inside_id && !q.quote.color_outside_id && !q.quote.color_lines_id
      ? [finding("no-colors", "warning", "colors", "No court colors chosen.", "Fine if the client is picking. Otherwise set brief.colors.")]
      : [],
  (q) => (!q.email ? [finding("no-email", "warning", "contact", "No customer/lead email to send to.")] : []),
  (q) => (!q.quote.cover_note ? [finding("no-cover-note", "nit", "cover note", "No cover note.")] : []),
];

// ── main ─────────────────────────────────────────────────────────────
function report(q, findings) {
  const by = (s) => findings.filter((f) => f.severity === s);
  return { quote: q.quote.quote_number, total: Number(q.quote.total), errors: by("error"), warnings: by("warning"), nits: by("nit") };
}

function toText(r) {
  const lines = [`Quote ${r.quote} — total ${money(r.total)}`, `${r.errors.length} error(s), ${r.warnings.length} warning(s), ${r.nits.length} nit(s)`];
  for (const [label, list] of [["ERROR", r.errors], ["WARN ", r.warnings], ["NIT  ", r.nits]])
    for (const f of list) {
      lines.push(`${label} [${f.rule}] ${f.where}: ${f.message}`);
      if (f.proposed_fix) lines.push(`      fix: ${typeof f.proposed_fix === "string" ? f.proposed_fix : JSON.stringify(f.proposed_fix)}`);
    }
  return lines.join("\n");
}

async function main() {
  loadEnv();
  const supabase = makeClient();
  const argv = process.argv;
  let q;
  if (argv.includes("--quote")) q = await loadSavedQuote(supabase, argv[argv.indexOf("--quote") + 1]);
  else if (argv.includes("--brief")) q = await loadBriefQuote(supabase, await readBrief());
  else fail("Pass --quote <id|PCS-number> or --brief (brief JSON on stdin).");

  const findings = RULES.flatMap((rule) => rule(q));
  const r = report(q, findings);
  process.stdout.write((argv.includes("--text") ? toText(r) : JSON.stringify(r, null, 2)) + "\n");
  process.exitCode = r.errors.length ? 1 : 0;
}

main().catch((e) => fail(e.stack || e.message));
