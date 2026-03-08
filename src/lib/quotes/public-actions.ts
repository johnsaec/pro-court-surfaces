"use server";

import { createServerClient } from "@/lib/supabase/server";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { sendEmail } from "@/lib/email/send-email";
import { QuoteAcceptedEmail } from "@/lib/email/templates/quote-accepted";
import type { LineItemToggle, ColorSelections } from "./quote-calculator";

type AcceptPayload = {
  quote_id: string;
  package_id: string;
  customer_name: string;
  customer_email: string;
  toggled_line_items: LineItemToggle[];
  color_selections: ColorSelections;
  total_price: number;
};

export async function acceptQuote(payload: AcceptPayload) {
  console.log("[acceptQuote] Starting with payload:", JSON.stringify(payload, null, 2));
  const supabase = createServerClient();

  // 1. Fetch quote with customer, lead, project joins
  const { data: quote, error: fetchError } = await supabase
    .from("quotes")
    .select(
      `*, customer:customers(*), lead:leads(*),
       color_inside:color_palette!quotes_color_inside_id_fkey(name),
       color_outside:color_palette!quotes_color_outside_id_fkey(name),
       color_lines:color_palette!quotes_color_lines_id_fkey(name),
       color_nvz:color_palette!quotes_color_nvz_id_fkey(name)`
    )
    .eq("id", payload.quote_id)
    .single();

  if (fetchError || !quote) {
    console.error("[acceptQuote] Quote fetch failed:", fetchError?.message);
    return { success: false, error: "Quote not found" };
  }
  console.log("[acceptQuote] Quote fetched, status:", quote.status, "customer_id:", quote.customer_id, "lead_id:", quote.lead_id);

  let customerId: string | null = quote.customer_id;
  let customerEmail = payload.customer_email;

  // 2. If lead-based (no customer_id): create customer from lead data
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
      })
      .select("id")
      .single();

    if (custError || !newCustomer) {
      console.error("[acceptQuote] Customer creation failed:", custError?.message);
      return { success: false, error: "Failed to create customer from lead: " + custError?.message };
    }

    customerId = newCustomer.id;

    // Update lead: mark as converted
    await supabase
      .from("leads")
      .update({
        deal_stage: "converted",
        customer_id: customerId,
        converted_at: new Date().toISOString(),
      })
      .eq("id", lead.id);

    // Update quote with new customer_id
    await supabase
      .from("quotes")
      .update({ customer_id: customerId })
      .eq("id", payload.quote_id);

    customerEmail = lead.email ?? payload.customer_email;
  }

  // 3. Find/create Stripe Customer + Invoice
  let stripeInvoiceId: string | null = null;

  try {
    let stripeCustomerId: string | undefined;
    if (quote.customer?.stripe_customer_id) {
      stripeCustomerId = quote.customer.stripe_customer_id;
    } else {
      const existing = await stripe.customers.list({
        email: customerEmail,
        limit: 1,
      });

      if (existing.data.length > 0) {
        stripeCustomerId = existing.data[0].id;
      } else {
        const stripeCustomer = await stripe.customers.create({
          name: payload.customer_name,
          email: customerEmail,
        });
        stripeCustomerId = stripeCustomer.id;
      }

      // Store stripe_customer_id on customer record
      if (customerId) {
        await supabase
          .from("customers")
          .update({ stripe_customer_id: stripeCustomerId })
          .eq("id", customerId);
      }
    }

    // 4. Create Stripe Invoice: first milestone (custom) or 50% deposit (standard)
    const hasCustomSchedule =
      quote.payment_schedule &&
      Array.isArray(quote.payment_schedule) &&
      quote.payment_schedule.length > 0;

    const firstMilestone = hasCustomSchedule
      ? (quote.payment_schedule as { label: string; amount: number }[])[0]
      : null;

    const depositAmount = firstMilestone
      ? Math.round(firstMilestone.amount * 100) // custom milestone amount in cents
      : Math.round(payload.total_price * 50); // 50% of total in cents

    const depositDescription = firstMilestone
      ? `${firstMilestone.label} — Quote ${quote.quote_number}`
      : `50% Deposit — Quote ${quote.quote_number}`;

    const invoice = await stripe.invoices.create({
      customer: stripeCustomerId,
      collection_method: "send_invoice",
      days_until_due: quote.deposit_due_days ?? 7,
      metadata: { quote_id: payload.quote_id },
    });

    await stripe.invoiceItems.create({
      customer: stripeCustomerId,
      invoice: invoice.id,
      amount: depositAmount,
      currency: "usd",
      description: depositDescription,
    });

    const finalizedInvoice = await stripe.invoices.finalizeInvoice(invoice.id);
    stripeInvoiceId = finalizedInvoice.id;

    // 5. Store stripe_invoice_id on quote
    await supabase
      .from("quotes")
      .update({ stripe_invoice_id: stripeInvoiceId })
      .eq("id", payload.quote_id);
  } catch (err) {
    // Log but don't block acceptance — invoice can be created manually
    console.error("[acceptQuote] Stripe error:", err instanceof Error ? err.message : err);
  }

  // 6. Resolve color names from IDs for the selection snapshot
  const colorInsideName = quote.color_inside?.name ??
    (payload.color_selections.inside_id ? "Custom" : null);
  const colorOutsideName = quote.color_outside?.name ??
    (payload.color_selections.outside_id ? "Custom" : null);
  const colorLinesName = quote.color_lines?.name ??
    (payload.color_selections.lines_id ? "Custom" : null);
  const colorNvzName = (quote as Record<string, unknown>).color_nvz
    ? ((quote as Record<string, unknown>).color_nvz as { name: string }).name
    : (payload.color_selections.nvz_id ? "Custom" : null);

  // If customer changed color selections, resolve the new ones
  let finalInsideName = colorInsideName;
  let finalOutsideName = colorOutsideName;
  let finalLinesName = colorLinesName;
  let finalNvzName = colorNvzName;

  if (payload.color_selections.inside_id && payload.color_selections.inside_id !== quote.color_inside_id) {
    const { data: c } = await supabase.from("color_palette").select("name").eq("id", payload.color_selections.inside_id).single();
    if (c) finalInsideName = c.name;
  }
  if (payload.color_selections.outside_id && payload.color_selections.outside_id !== quote.color_outside_id) {
    const { data: c } = await supabase.from("color_palette").select("name").eq("id", payload.color_selections.outside_id).single();
    if (c) finalOutsideName = c.name;
  }
  if (payload.color_selections.lines_id && payload.color_selections.lines_id !== quote.color_lines_id) {
    const { data: c } = await supabase.from("color_palette").select("name").eq("id", payload.color_selections.lines_id).single();
    if (c) finalLinesName = c.name;
  }
  if (payload.color_selections.nvz_id && payload.color_selections.nvz_id !== (quote as Record<string, unknown>).color_nvz_id) {
    const { data: c } = await supabase.from("color_palette").select("name").eq("id", payload.color_selections.nvz_id).single();
    if (c) finalNvzName = c.name;
  }

  // Insert quote_selections with correct column names
  const { error: selectionError } = await supabase
    .from("quote_selections")
    .insert({
      quote_id: payload.quote_id,
      selected_package_id: payload.package_id,
      accepted_by_name: payload.customer_name,
      accepted_by_email: payload.customer_email,
      toggled_line_items: payload.toggled_line_items,
      color_inside: finalInsideName,
      color_outside: finalOutsideName,
      color_lines: finalLinesName,
      color_nvz: finalNvzName,
      final_total: payload.total_price,
    });

  if (selectionError) {
    console.error("[acceptQuote] Selection insert failed:", selectionError.message);
    return { success: false, error: "Selection save failed: " + selectionError.message };
  }

  // 7. Update quote status to accepted
  const { error: updateError } = await supabase
    .from("quotes")
    .update({
      status: "accepted",
      accepted_at: new Date().toISOString(),
      accepted_by_name: payload.customer_name,
      accepted_by_email: payload.customer_email,
    })
    .eq("id", payload.quote_id);

  if (updateError) {
    console.error("[acceptQuote] Quote status update failed:", updateError.message);
    return { success: false, error: "Status update failed: " + updateError.message };
  }

  // Log acceptance activity (fire-and-forget)
  logQuoteActivity(payload.quote_id, "accepted", {
    package_id: payload.package_id,
    customer_name: payload.customer_name,
    customer_email: payload.customer_email,
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
        packageTier: payload.package_id,
        totalPrice: payload.total_price,
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
