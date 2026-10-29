#!/usr/bin/env node
// deposit-check.mjs — prove a quote can only ever produce ONE deposit invoice and
// ONE payment, against Stripe TEST mode and the local dev server.
//
//   node scripts/quotes/deposit-check.mjs --from <quote uuid|PCS-number> --base http://localhost:<port>
//   node scripts/quotes/deposit-check.mjs --from PCS-2026-0022 --base ... --prepare   # test copy only, for a manual click-through
//   node scripts/quotes/deposit-check.mjs --cleanup <test quote uuid>
//
// Builds a throwaway copy of the source quote under a TEST lead, then:
//   1. fires 5 simultaneous accepts (double-click / two tabs / retry)
//   2. checks: one acceptance, one selection, one customer, one Stripe invoice
//   3. pays the invoice with a test card, then tries to pay it again
//   4. replays the signed invoice.paid webhook twice
//   5. checks: quote deposit_paid, exactly one deposit_paid log entry
// and deletes the test records (Stripe test-mode objects stay in the test dashboard).
//
// Requires in .env.local: STRIPE_SECRET_KEY=sk_test_…, STRIPE_AUTO_INVOICE=true,
// STRIPE_WEBHOOK_SECRET (any whsec_… value; this script signs the replayed events).
// Refuses to run with a live key.

import Stripe from "stripe";
import { loadEnv, makeClient } from "./quote-build.mjs";

const args = process.argv.slice(2);
const arg = (n) => (args.includes(n) ? args[args.indexOf(n) + 1] : undefined);
const base = (arg("--base") ?? "").replace(/\/$/, "");

loadEnv();
if (!process.env.STRIPE_SECRET_KEY?.startsWith("sk_test_")) {
  console.error("deposit-check only runs against a Stripe TEST key (sk_test_…).");
  process.exit(2);
}
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const sb = makeClient();

const results = [];
const check = (name, ok, detail = "") => {
  results.push({ name, ok, detail });
  console.log(`  ${ok ? "✓" : "✗"} ${name}${detail ? `  (${detail})` : ""}`);
};

async function cleanup(quoteId) {
  const { data: q } = await sb.from("quotes").select("id, lead_id, customer_id").eq("id", quoteId).single();
  if (!q) return console.log(`  nothing to clean for ${quoteId}`);
  const { data: lead } = q.lead_id ? await sb.from("leads").select("id, first_name").eq("id", q.lead_id).single() : { data: null };
  if (lead && lead.first_name !== "TEST") {
    console.error(`  refusing to clean ${quoteId}: its lead is not a TEST lead`);
    process.exit(2);
  }
  await sb.from("quote_activity_log").delete().eq("quote_id", quoteId);
  await sb.from("quote_selections").delete().eq("quote_id", quoteId);
  const { data: pkgs } = await sb.from("quote_packages").select("id").eq("quote_id", quoteId);
  for (const p of pkgs ?? []) await sb.from("quote_line_items").delete().eq("package_id", p.id);
  await sb.from("quote_packages").delete().eq("quote_id", quoteId);
  await sb.from("quotes").delete().eq("id", quoteId);
  // Lead first: it references the customer created on accept.
  const testEmail = lead ? (await sb.from("leads").select("email").eq("id", lead.id).single()).data?.email : null;
  if (lead) await sb.from("leads").delete().eq("id", lead.id);
  if (q.customer_id) await sb.from("customers").delete().eq("id", q.customer_id);
  if (testEmail?.startsWith("patrick+deposit-test-")) await sb.from("customers").delete().eq("email", testEmail);
  console.log(`  cleaned up test quote ${quoteId}`);
}

if (arg("--cleanup")) {
  await cleanup(arg("--cleanup"));
  process.exit(0);
}

const fromRef = arg("--from");
if (!fromRef || !base) {
  console.error("usage: deposit-check.mjs --from <quote> --base <http://localhost:port> [--prepare]");
  process.exit(2);
}

// ── 1. Test copy of the source quote ─────────────────────────────────
const isUuid = /^[0-9a-f-]{36}$/i.test(fromRef);
const { data: src } = await sb
  .from("quotes")
  .select("id, quote_number, lead_id, deposit_percent")
  .eq(isUuid ? "id" : "quote_number", fromRef)
  .single();
if (!src?.lead_id) {
  console.error(`source quote ${fromRef} not found or has no lead`);
  process.exit(2);
}

const { data: srcLead } = await sb.from("leads").select("*").eq("id", src.lead_id).single();
const stamp = Date.now();
const testEmail = `patrick+deposit-test-${stamp}@procourtsurfaces.com`;
const leadCopy = { ...srcLead, first_name: "TEST", last_name: `Deposit Check ${stamp}`, display_name: `TEST Deposit Check ${stamp}`, email: testEmail, phone: null };
for (const k of ["id", "created_at", "updated_at", "notion_page_id", "customer_id", "converted_at"]) delete leadCopy[k];
const { data: lead, error: leadErr } = await sb.from("leads").insert(leadCopy).select("id").single();
if (leadErr) {
  console.error(`could not create test lead: ${leadErr.message}`);
  process.exit(2);
}

// Copy the source quote, its packages, and line items onto the test lead.
const { data: srcPkgs } = await sb
  .from("quote_packages")
  .select("*, quote_line_items(*)")
  .eq("quote_id", src.id)
  .order("sort_order");
const { data: srcFull } = await sb.from("quotes").select("*").eq("id", src.id).single();
const quoteCopy = { ...srcFull, lead_id: lead.id, customer_id: null, status: "sent", stripe_invoice_id: null, stripe_balance_invoice_id: null, accepted_at: null, accepted_by_name: null, accepted_by_email: null, viewed_at: null, sent_at: null };
for (const k of ["id", "created_at", "updated_at", "quote_number", "share_token"]) delete quoteCopy[k];
quoteCopy.quote_number = `TEST-${stamp}`;
quoteCopy.share_token = `t${stamp.toString(36)}`.slice(0, 8);
const { data: quote, error: qErr } = await sb.from("quotes").insert(quoteCopy).select("id, share_token, quote_number").single();
if (qErr) {
  console.error(`could not create test quote: ${qErr.message}`);
  await sb.from("leads").delete().eq("id", lead.id);
  process.exit(2);
}
const pkgIds = [];
for (const srcP of srcPkgs) {
  const pkgRow = { ...srcP, quote_id: quote.id };
  delete pkgRow.id; delete pkgRow.quote_line_items; delete pkgRow.created_at; delete pkgRow.updated_at;
  const { data: np } = await sb.from("quote_packages").insert(pkgRow).select("id").single();
  pkgIds.push(np.id);
  const lines = srcP.quote_line_items.map((li) => {
    const row = { ...li, package_id: np.id };
    delete row.id; delete row.created_at; delete row.updated_at;
    return row;
  });
  await sb.from("quote_line_items").insert(lines);
}
console.log(`\nTest copy of ${src.quote_number}: ${quote.quote_number}  (${base}/q/${quote.share_token})`);

if (args.includes("--prepare")) {
  console.log(`\nReady for a manual click-through. Test card 4242 4242 4242 4242, any future date/CVC.`);
  console.log(`When done: node scripts/quotes/deposit-check.mjs --cleanup ${quote.id}`);
  process.exit(0);
}

let failed = false;
try {
  // ── 2. Five simultaneous accepts ─────────────────────────────────────
  console.log("\nAccept burst (5 at once):");
  const { data: lines } = await sb.from("quote_line_items").select("id, is_optional").eq("package_id", pkgIds[0]);
  const payload = {
    quote_id: quote.id,
    package_id: pkgIds[0],
    customer_name: "TEST Deposit Check",
    customer_email: testEmail,
    toggled_line_items: lines.filter((l) => l.is_optional).map((l) => ({ line_item_id: l.id, is_enabled: false })),
    color_selections: { inside_id: null, outside_id: null, lines_id: null, nvz_id: null },
  };
  const burst = await fetch(`${base}/api/dev/accept-burst`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ payload, times: 5 }),
  }).then((r) => r.json());
  const fresh = burst.results.filter((r) => r.success && !r.alreadyAccepted).length;
  const dupes = burst.results.filter((r) => r.success && r.alreadyAccepted).length;
  check("exactly one accept went through", fresh === 1, `${fresh} new`);
  check("the other 4 were sent to the payment screen", dupes === 4, `${dupes} told "already accepted", ${5 - fresh - dupes} errors`);

  const { data: q1 } = await sb.from("quotes").select("status, stripe_invoice_id, customer_id").eq("id", quote.id).single();
  const { count: selCount } = await sb.from("quote_selections").select("id", { count: "exact", head: true }).eq("quote_id", quote.id);
  const { count: custCount } = await sb.from("customers").select("id", { count: "exact", head: true }).eq("email", testEmail);
  check("quote is accepted", q1.status === "accepted", q1.status);
  check("one selection saved", selCount === 1, `${selCount}`);
  check("one customer created", custCount === 1, `${custCount}`);

  const stripeCustomers = await stripe.customers.list({ email: testEmail, limit: 10 });
  check("one Stripe customer", stripeCustomers.data.length === 1, `${stripeCustomers.data.length}`);
  const invoices = stripeCustomers.data[0]
    ? await stripe.invoices.list({ customer: stripeCustomers.data[0].id, limit: 10 })
    : { data: [] };
  check("one Stripe invoice", invoices.data.length === 1, `${invoices.data.length}`);
  check("invoice saved on the quote", !!q1.stripe_invoice_id && q1.stripe_invoice_id === invoices.data[0]?.id);

  const inv = invoices.data[0];
  const { data: sel } = await sb.from("quote_selections").select("final_total").eq("quote_id", quote.id).single();
  const expectedCents = Math.round(Math.round((sel.final_total * Number(src.deposit_percent ?? 30)) / 100 * 100));
  check("invoice amount = deposit of server total", inv?.amount_due === expectedCents, `${(inv?.amount_due ?? 0) / 100} vs ${expectedCents / 100}`);
  check("invoice offers ACH + card", ["us_bank_account", "card"].every((t) => inv?.payment_settings?.payment_method_types?.includes(t)), inv?.payment_settings?.payment_method_types?.join(", "));

  // A second accept after the fact (customer comes back later)
  const late = await fetch(`${base}/api/dev/accept-burst`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ payload, times: 1 }),
  }).then((r) => r.json());
  check("late re-accept is refused politely", late.results[0]?.success && late.results[0]?.alreadyAccepted);
  const invoices2 = await stripe.invoices.list({ customer: stripeCustomers.data[0].id, limit: 10 });
  check("still one Stripe invoice", invoices2.data.length === 1, `${invoices2.data.length}`);

  // ── 3. Pay, then try to pay again ────────────────────────────────────
  console.log("\nPayment:");
  // Stripe test card, attached to the customer the way the payment form would.
  const pm = await stripe.paymentMethods.attach("pm_card_visa", { customer: stripeCustomers.data[0].id });
  const paid = await stripe.invoices.pay(inv.id, { payment_method: pm.id });
  check("test card payment succeeds", paid.status === "paid", paid.status);
  let secondPayError = null;
  try {
    await stripe.invoices.pay(inv.id, { payment_method: pm.id });
  } catch (err) {
    secondPayError = err.message;
  }
  check("second payment on the same invoice is refused", !!secondPayError, secondPayError ?? "it was accepted!");

  // ── 4. Replay the signed webhook twice ───────────────────────────────
  console.log("\nWebhook (invoice.paid delivered twice):");
  const event = { id: `evt_test_${stamp}`, object: "event", type: "invoice.paid", data: { object: paid } };
  const body = JSON.stringify(event);
  const send = () =>
    fetch(`${base}/api/stripe/webhook`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "stripe-signature": stripe.webhooks.generateTestHeaderString({ payload: body, secret: process.env.STRIPE_WEBHOOK_SECRET }),
      },
      body,
    }).then((r) => r.json());
  const first = await send();
  const second = await send();
  check("first delivery processed", first.received && !first.duplicate);
  check("second delivery ignored as duplicate", second.received && second.duplicate === true);
  const { data: q2 } = await sb.from("quotes").select("status").eq("id", quote.id).single();
  const { count: paidLogs } = await sb.from("quote_activity_log").select("id", { count: "exact", head: true }).eq("quote_id", quote.id).eq("event_type", "deposit_paid");
  check("quote is deposit_paid", q2.status === "deposit_paid", q2.status);
  check("one deposit_paid log entry", paidLogs === 1, `${paidLogs}`);

  // Payments recorded at Stripe for this customer: exactly one charge.
  const charges = await stripe.charges.list({ customer: stripeCustomers.data[0].id, limit: 10 });
  check("exactly one charge at Stripe", charges.data.length === 1, `${charges.data.length}`);
} catch (err) {
  failed = true;
  console.error(`\n  ✗ script error: ${err.message}`);
} finally {
  console.log("");
  if (!args.includes("--keep")) await cleanup(quote.id);
}

const bad = results.filter((r) => !r.ok);
console.log(bad.length || failed ? `\n✗ ${bad.length} check(s) failed${failed ? " + script error" : ""}` : `\n✓ All ${results.length} checks passed: one acceptance, one invoice, one payment`);
process.exit(bad.length || failed ? 1 : 0);
