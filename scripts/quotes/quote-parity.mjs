#!/usr/bin/env node
// quote-parity.mjs — confirm a quote's PDF and its customer link say the same thing.
//
// Builds the list of facts from the database (line items, totals, deposit split,
// cover note, every clause), then checks each fact appears in BOTH the rendered PDF
// text and the rendered /q/<share_token> page. Also diffs every dollar figure.
//
//   node scripts/quotes/quote-parity.mjs --quote <uuid|PCS-number> [--base <url>] [--json]
//
// --base defaults to https://www.procourtsurfaces.com (what the customer sees). Use
// http://localhost:<port> to check unpushed changes. Fetches send `x-pcs-internal: 1`
// so the check never logs as the customer viewing the quote.
// Exit code 1 = at least one mismatch.

import { extractText, getDocumentProxy } from "unpdf";
import { convert } from "html-to-text";
import { loadEnv, makeClient } from "./quote-build.mjs";

const args = process.argv.slice(2);
const arg = (name) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : undefined;
};
const quoteRef = arg("--quote");
const base = (arg("--base") ?? "https://www.procourtsurfaces.com").replace(/\/$/, "");
const asJson = args.includes("--json");
if (!quoteRef) {
  console.error("usage: quote-parity.mjs --quote <uuid|PCS-number> [--base <url>] [--json]");
  process.exit(2);
}

// ── Formatting: must match src/lib/quotes/quote-format.ts ─────────────
const money = (n) =>
  `$${(n ?? 0).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const qty = (n) => Number(n ?? 0).toLocaleString("en-US");
const date = (d) =>
  d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "America/Chicago" });
const cents = (n) => Math.round((n + Number.EPSILON) * 100) / 100;
const PROJECT_TYPE_LABELS = {
  new_court_full_build: "New Court (Full Build)",
  new_court_surfacing_only: "New Court (Surfacing Only)",
  repair_resurfacing: "Repair / Resurfacing",
  conversion_tennis_to_pickleball: "Tennis to Pickleball Conversion",
  color_coating_only: "Color Coating Only",
  crack_repair_only: "Crack Repair Only",
  other: "Other",
};

// Whitespace, line wraps, and typographic quotes differ between PDF and HTML text.
// Hyphens are dropped too: the PDF auto-hyphenates long words at line ends
// ("fully-ad- hered").
const norm = (s) =>
  String(s ?? "")
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/ /g, " ")
    .replace(/[\s-]+/g, "")
    .toLowerCase();

// ── Load quote ───────────────────────────────────────────────────────
loadEnv();
const supabase = makeClient();
const isUuid = /^[0-9a-f-]{36}$/i.test(quoteRef);
const { data: quote, error } = await supabase
  .from("quotes")
  .select(
    `*, customer:customers(display_name, email, phone, company:companies(name)),
     lead:leads(display_name, email, phone, company:companies(name)),
     color_inside:color_palette!quotes_color_inside_id_fkey(name),
     color_outside:color_palette!quotes_color_outside_id_fkey(name),
     color_lines:color_palette!quotes_color_lines_id_fkey(name),
     color_nvz:color_palette!quotes_color_nvz_id_fkey(name),
     quote_packages(id, name, subtotal, sort_order,
       quote_line_items(name, description, quantity, unit_price, total_price, is_optional, sort_order))`
  )
  .eq(isUuid ? "id" : "quote_number", quoteRef)
  .single();
if (error || !quote) {
  console.error(`quote not found: ${quoteRef}${error ? ` (${error.message})` : ""}`);
  process.exit(2);
}

// ── Facts both documents must show ───────────────────────────────────
const facts = [];
const fact = (group, label, text) => {
  if (text != null && String(text).trim() !== "") facts.push({ group, label, text: String(text) });
};

const created = new Date(quote.created_at);
const expires = quote.expires_at ? new Date(quote.expires_at) : new Date(created.getTime() + 30 * 86400000);
fact("header", "quote number", quote.quote_number);
fact("header", "date", date(created));
fact("header", "valid through", `Valid through ${date(expires)}`);
fact("header", "version", `Version ${quote.version}`);

const contact = quote.customer ?? quote.lead;
fact("contact", "organization", contact?.company?.name);
fact("contact", "name", contact?.display_name);
fact("contact", "email", contact?.email);
fact("contact", "phone", contact?.phone);

fact("project", "type", PROJECT_TYPE_LABELS[quote.project_type] ?? quote.project_type);
fact("project", "square feet", quote.square_feet ? quote.square_feet.toLocaleString() : null);
if (quote.address_line1) {
  fact("project", "address", [quote.address_line1, quote.city, quote.state, quote.zip].filter(Boolean).join(", "));
}
fact("note", "cover note", quote.cover_note);

const packages = [...(quote.quote_packages ?? [])].sort((a, b) => a.sort_order - b.sort_order);
for (const pkg of packages) {
  fact("package", `${pkg.name} — name`, pkg.name);
  fact("package", `${pkg.name} — subtotal`, money(pkg.subtotal));
  const lines = [...pkg.quote_line_items].sort((a, b) => a.sort_order - b.sort_order);
  for (const li of lines) {
    const tag = li.is_optional ? "add-on" : "line";
    fact(tag, `${li.name}`, li.name);
    fact(tag, `${li.name} — description`, li.description);
    const onRequest = li.is_optional && li.total_price === 0;
    fact(tag, `${li.name} — total`, onRequest ? "On request" : money(li.total_price));
    if (!onRequest) fact(tag, `${li.name} — unit price`, money(li.unit_price));
  }
}

const total = quote.total ?? 0;
const hasCustomSchedule = Array.isArray(quote.payment_schedule) && quote.payment_schedule.length > 1;
// Multi-option PDFs suppress the summary (each package's subtotal stands alone),
// while the web page sums whichever option is selected, so only single-option
// quotes have a summary to compare.
if (packages.length <= 1) fact("summary", "total", money(total));
if (packages.length <= 1 && !hasCustomSchedule && total > 0) {
  const pct = Number(quote.deposit_percent ?? 30);
  const dep = cents((total * pct) / 100);
  fact("summary", "deposit line", `Deposit (${pct}%): ${money(dep)} due at signing`);
  fact("summary", "balance line", `Balance (${100 - pct}%): ${money(cents(total - dep))} at completion`);
  fact("terms", "deposit term", "Deposit — due at contract execution");
  fact("terms", "balance term", "Balance — due at substantial completion");
}

for (const zone of ["outside", "inside", "nvz", "lines"]) {
  fact("colors", zone, quote[`color_${zone}`]?.name);
}

const sections = new Set();
for (const c of quote.conditions ?? []) {
  if (!sections.has(c.section)) fact("clauses", `${c.section} heading`, c.section);
  sections.add(c.section);
  if (c.title !== c.section) fact("clauses", `${c.title} — title`, c.title);
  c.body.split("\n").forEach((line, i) => fact("clauses", `${c.title} — body${i ? ` ¶${i + 1}` : ""}`, line));
}
fact("terms", "additional terms", quote.terms_and_conditions);

// ── Fetch both renderings ────────────────────────────────────────────
const H = { "x-pcs-internal": "1" };

async function pdfText() {
  // Customer PDF route; fall back to the admin route on deployments that predate it.
  for (const path of [`/q/${quote.share_token}/pdf`, `/api/quotes/${quote.id}/pdf`]) {
    const res = await fetch(base + path, { headers: H });
    if (res.ok && (res.headers.get("content-type") ?? "").includes("pdf")) {
      const doc = await getDocumentProxy(new Uint8Array(await res.arrayBuffer()));
      const { text } = await extractText(doc, { mergePages: true });
      return { text, source: base + path };
    }
  }
  throw new Error(`no PDF from ${base}`);
}

async function webText() {
  const url = `${base}/q/${quote.share_token}`;
  const res = await fetch(url, { headers: H });
  if (!res.ok) throw new Error(`${url} → HTTP ${res.status}`);
  const finalUrl = res.url;
  // Drop <script> payloads: the RSC data repeats every field, which would hide
  // anything the page fetches but never actually renders.
  const html = (await res.text()).replace(/<script\b[\s\S]*?<\/script>/gi, "");
  const text = convert(html, { wordwrap: false, selectors: [{ selector: "a", options: { ignoreHref: true } }] });
  return { text, source: finalUrl, redirected: finalUrl !== url };
}

const [pdf, web] = await Promise.all([pdfText(), webText()]);

// Accepted quotes redirect to the confirmation page; there's no quote to compare.
if (web.redirected) {
  const skipped = { quote: quote.quote_number, status: quote.status, web: web.source, match: null, skipped: "accepted — link shows the confirmation page" };
  console.log(asJson ? JSON.stringify(skipped, null, 2) : `${quote.quote_number} (${quote.status}): parity n/a — link redirects to ${web.source}`);
  process.exit(0);
}
const pdfN = norm(pdf.text);
const webN = norm(web.text);

const rows = facts.map((f) => {
  const n = norm(f.text);
  return { ...f, inPdf: pdfN.includes(n), inWeb: webN.includes(n) };
});
const mismatches = rows.filter((r) => !r.inPdf || !r.inWeb);

// Every dollar figure on one side should appear on the other.
const amounts = (t) => new Set((t.match(/\$\s?[\d,]+\.\d{2}/g) ?? []).map((a) => a.replace(/\s/g, "")));
const pdfAmt = amounts(pdf.text);
const webAmt = amounts(web.text);
const onlyPdf = [...pdfAmt].filter((a) => !webAmt.has(a));
// On multi-option quotes the web summary shows the selected option's total and
// deposit/balance, which the PDF intentionally omits. Those amounts are expected.
const webOnlyOk = new Set();
if (packages.length > 1) {
  const pct = Number(quote.deposit_percent ?? 30);
  for (const pkg of packages) {
    const t = pkg.subtotal - (quote.discount_amount ?? 0);
    const dep = cents((t * pct) / 100);
    for (const n of [t, dep, cents(t - dep)]) webOnlyOk.add(money(n));
  }
}
const onlyWeb = [...webAmt].filter((a) => !pdfAmt.has(a) && !webOnlyOk.has(a));

const result = {
  quote: quote.quote_number,
  status: quote.status,
  pdf: pdf.source,
  web: web.source,
  web_redirected: web.redirected,
  facts_checked: rows.length,
  mismatches: mismatches.map(({ group, label, text, inPdf, inWeb }) => ({ group, label, text, inPdf, inWeb })),
  amounts_only_in_pdf: onlyPdf,
  amounts_only_in_web: onlyWeb,
  match: mismatches.length === 0 && onlyPdf.length === 0 && onlyWeb.length === 0,
};

if (asJson) {
  console.log(JSON.stringify(result, null, 2));
} else {
  console.log(`${result.quote} (${result.status})`);
  console.log(`  PDF: ${result.pdf}`);
  console.log(`  Web: ${result.web}${result.web_redirected ? "  ← redirected (accepted quote: confirmation page, not the quote)" : ""}`);
  console.log(`  ${rows.length} facts checked\n`);
  if (mismatches.length) {
    console.log("  MISSING                          PDF  Web  Text");
    for (const m of mismatches) {
      const t = m.text.length > 70 ? m.text.slice(0, 67) + "..." : m.text;
      console.log(`  ${(m.group + ": " + m.label).slice(0, 32).padEnd(32)} ${m.inPdf ? " ✓ " : " ✗ "}  ${m.inWeb ? " ✓ " : " ✗ "}  ${t}`);
    }
    console.log("");
  }
  if (onlyPdf.length) console.log(`  $ only in PDF: ${onlyPdf.join(", ")}`);
  if (onlyWeb.length) console.log(`  $ only on web: ${onlyWeb.join(", ")}`);
  console.log(result.match ? "  ✓ PDF and link match" : `  ✗ Not matching: ${mismatches.length} fact(s), ${onlyPdf.length + onlyWeb.length} dollar figure(s)`);
}
process.exit(result.match ? 0 : 1);
