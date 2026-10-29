"use server";

import { createServerClient } from "@/lib/supabase/server";
import { headers } from "next/headers";
import { sendEmail } from "@/lib/email/send-email";
import { QuoteAcceptedEmail } from "@/lib/email/templates/quote-accepted";
import { getColors } from "@/lib/admin/queries/color-queries";
import { computePackageTotal } from "./quote-calculator";
import { paymentSplit } from "./quote-format";
import { ensureDepositInvoice } from "./deposit-invoice";
import type { LineItemToggle, ColorSelections } from "./quote-calculator";
import type { QuotePackageRow } from "@/lib/admin/types/quote-types";

type AcceptPayload = {
  quote_id: string;
  package_id: string;
  customer_name: string;
  customer_email: string;
  toggled_line_items: LineItemToggle[];
  color_selections: ColorSelections;
};

type AcceptResult =
  | { success: true; alreadyAccepted?: boolean }
  | { success: false; error: string };

// Statuses a customer may accept from. Anything else (already accepted, paid,
// declined, expired…) is refused, which is what makes Accept a one-time action.
const ACCEPTABLE = ["draft", "sent", "viewed", "revised"];

export async function acceptQuote(payload: AcceptPayload): Promise<AcceptResult> {
  const supabase = createServerClient();

  // 1. Load the quote + the chosen package from the database. Prices come from
  //    here, never from the browser.
  const { data: quote, error: fetchError } = await supabase
    .from("quotes")
    .select(
      `*, customer:customers(*), lead:leads(*),
       quote_packages(id, tier, name, description, subtotal, is_recommended, sort_order,
         quote_line_items(id, service_id, name, description, line_item_type, unit_of_measure,
           quantity, unit_price, total_price, is_optional, is_included_by_default, sort_order))`
    )
    .eq("id", payload.quote_id)
    .single();

  if (fetchError || !quote) {
    console.error("[acceptQuote] Quote fetch failed:", fetchError?.message);
    return { success: false, error: "Quote not found" };
  }

  const pkg = (quote.quote_packages as QuotePackageRow[]).find((p) => p.id === payload.package_id);
  if (!pkg) return { success: false, error: "Selected package not found on this quote" };

  // 2. Server-side total: required lines + the optional lines the customer switched
  //    on + premium color upcharges, minus the quote discount.
  const colors = await getColors();
  const toggles = new Map(
    payload.toggled_line_items
      .filter((t) => pkg.quote_line_items.some((li) => li.id === t.line_item_id && li.is_optional))
      .map((t) => [t.line_item_id, t.is_enabled] as const)
  );
  const gross = computePackageTotal(pkg, toggles, payload.color_selections, colors);
  const total = Math.max(0, Math.round((gross - (quote.discount_amount ?? 0)) * 100) / 100);

  // 3. Claim the acceptance atomically. Only one request can move the quote out of
  //    an acceptable status, so a double-click, a second tab, or a retry can't create
  //    a second selection, customer, or invoice.
  const acceptedAt = new Date().toISOString();
  const { data: claimed, error: claimError } = await supabase
    .from("quotes")
    .update({
      status: "accepted",
      accepted_at: acceptedAt,
      accepted_by_name: payload.customer_name,
      accepted_by_email: payload.customer_email,
    })
    .eq("id", payload.quote_id)
    .in("status", ACCEPTABLE)
    .select("id");

  if (claimError) {
    console.error("[acceptQuote] Claim failed:", claimError.message);
    return { success: false, error: "Could not accept the quote. Please try again." };
  }
  if (!claimed || claimed.length === 0) {
    // Lost the race (or came back later): answer from the status as it is now, not
    // as it was when this request first loaded the quote.
    const { data: current } = await supabase
      .from("quotes")
      .select("status")
      .eq("id", payload.quote_id)
      .single();
    if (["accepted", "deposit_paid", "completed"].includes(current?.status ?? "")) {
      return { success: true, alreadyAccepted: true };
    }
    return { success: false, error: "This quote can no longer be accepted. Please contact us." };
  }

  // 4. If lead-based (no customer_id): create customer from lead data
  let customerId: string | null = quote.customer_id;
  let customerEmail = payload.customer_email;

  if (!customerId && quote.lead) {
    const lead = quote.lead;

    const { data: newCustomer, error: custError } = await supabase
      .from("customers")
      .insert({
        first_name: lead.first_name,
        last_name: lead.last_name,
        display_name: lead.display_name,
        email: lead.email,
        phone: lead.phone,
        city: lead.city,
        address_line1: lead.address_line1 ?? null,
        state: lead.state ?? "TX",
        zip: lead.zip ?? null,
        company_id: lead.company_id ?? null,
      })
      .select("id")
      .single();

    if (custError || !newCustomer) {
      // The acceptance is recorded; Patrick can link the customer by hand.
      console.error("[acceptQuote] Customer creation failed:", custError?.message);
    } else {
      customerId = newCustomer.id;

      // Update lead: mark as converted
      await supabase
        .from("leads")
        .update({
          deal_stage: "converted",
          customer_id: customerId,
          converted_at: acceptedAt,
        })
        .eq("id", lead.id);

      // Update quote with new customer_id
      await supabase.from("quotes").update({ customer_id: customerId }).eq("id", payload.quote_id);
    }

    customerEmail = lead.email ?? payload.customer_email;
  }

  // 5. Snapshot what the customer chose
  const colorName = (id: string | null) => (id ? colors.find((c) => c.id === id)?.name ?? null : null);
  const { error: selectionError } = await supabase.from("quote_selections").insert({
    quote_id: payload.quote_id,
    selected_package_id: payload.package_id,
    accepted_by_name: payload.customer_name,
    accepted_by_email: payload.customer_email,
    toggled_line_items: payload.toggled_line_items,
    color_inside: colorName(payload.color_selections.inside_id),
    color_outside: colorName(payload.color_selections.outside_id),
    color_lines: colorName(payload.color_selections.lines_id),
    color_nvz: colorName(payload.color_selections.nvz_id),
    final_total: total,
  });
  if (selectionError) {
    console.error("[acceptQuote] Selection insert failed:", selectionError.message);
  }

  // 6. Deposit invoice: first custom milestone, or deposit_percent of the server total.
  // Auto-invoicing is OFF until Stripe live keys are in place — acceptance just
  // records the quote + notifies Patrick, who invoices manually. Flip
  // STRIPE_AUTO_INVOICE=true (with live keys) to create deposit invoices.
  const autoInvoice = process.env.STRIPE_AUTO_INVOICE === "true";
  const schedule = Array.isArray(quote.payment_schedule) ? quote.payment_schedule : [];
  const firstMilestone = schedule.length > 0 ? (schedule[0] as { label: string; amount: number }) : null;
  const depositPct = Number(quote.deposit_percent ?? 30);
  const depositAmount = firstMilestone ? firstMilestone.amount : paymentSplit(total, depositPct).depositAmount;
  let stripeInvoiceId: string | null = quote.stripe_invoice_id ?? null;

  if (autoInvoice) {
    try {
      stripeInvoiceId = await ensureDepositInvoice({
        quoteId: payload.quote_id,
        quoteNumber: quote.quote_number,
        existingInvoiceId: quote.stripe_invoice_id ?? null,
        customerId,
        existingStripeCustomerId: quote.customer?.stripe_customer_id ?? null,
        customerName: payload.customer_name,
        customerEmail,
        amount: depositAmount,
        description: firstMilestone
          ? `${firstMilestone.label} — Quote ${quote.quote_number}`
          : `${depositPct}% Deposit — Quote ${quote.quote_number}`,
        dueDays: quote.deposit_due_days ?? 7,
      });
    } catch (err) {
      // Log but don't block acceptance — invoice can be created manually
      console.error("[acceptQuote] Stripe error:", err instanceof Error ? err.message : err);
    }
  }

  // Log acceptance activity (fire-and-forget)
  logQuoteActivity(payload.quote_id, "accepted", {
    package_id: payload.package_id,
    customer_name: payload.customer_name,
    customer_email: payload.customer_email,
    total,
    deposit_amount: depositAmount,
    stripe_invoice_id: stripeInvoiceId,
  });

  // Send admin notification email (fire-and-forget)
  try {
    await sendEmail({
      to: "patrick@procourtsurfaces.com",
      subject: `Quote ${quote.quote_number} Accepted by ${payload.customer_name}`,
      react: QuoteAcceptedEmail({
        quoteNumber: quote.quote_number,
        customerName: payload.customer_name,
        customerEmail: payload.customer_email,
        packageTier: pkg.name,
        totalPrice: total,
        depositPercent: depositPct,
        autoInvoiced: autoInvoice && !!stripeInvoiceId,
      }),
    });
  } catch (err) {
    console.error("[acceptQuote] Admin email error:", err instanceof Error ? err.message : err);
  }

  return { success: true };
}

export async function logQuoteActivity(
  quote_id: string,
  event_type: string,
  event_data?: Record<string, unknown>
) {
  try {
    const headersList = await headers();
    const ip =
      headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null;
    const userAgent = headersList.get("user-agent") ?? null;

    const supabase = createServerClient();
    await supabase.from("quote_activity_log").insert({
      quote_id,
      event_type,
      event_data: event_data ?? {},
      ip_address: ip,
      user_agent: userAgent,
    });
  } catch {
    // Fire-and-forget — don't let logging failures break the flow
  }
}
