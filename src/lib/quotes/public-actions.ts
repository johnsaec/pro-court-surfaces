"use server";

import { createServerClient } from "@/lib/supabase/server";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
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
  const supabase = createServerClient();

  // 1. Fetch quote with customer, lead, project joins
  const { data: quote, error: fetchError } = await supabase
    .from("quotes")
    .select(
      `*, customer:customers(*), lead:leads(*), project:projects(*),
       color_inside:color_palette!quotes_color_inside_id_fkey(name),
       color_outside:color_palette!quotes_color_outside_id_fkey(name),
       color_lines:color_palette!quotes_color_lines_id_fkey(name)`
    )
    .eq("id", payload.quote_id)
    .single();

  if (fetchError || !quote) {
    return { success: false, error: "Quote not found" };
  }

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
      return { success: false, error: "Failed to create customer from lead" };
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

    // Update quote and project with new customer_id
    await supabase
      .from("quotes")
      .update({ customer_id: customerId })
      .eq("id", payload.quote_id);

    if (quote.project_id) {
      await supabase
        .from("projects")
        .update({ customer_id: customerId })
        .eq("id", quote.project_id);
    }

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

    // 4. Create Stripe Invoice: 50% deposit
    const depositAmount = Math.round(payload.total_price * 50); // cents (50% of total, total is in dollars)

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
      description: `50% Deposit — Quote ${quote.quote_number}`,
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

  // If customer changed color selections, resolve the new ones
  let finalInsideName = colorInsideName;
  let finalOutsideName = colorOutsideName;
  let finalLinesName = colorLinesName;

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
      final_total: payload.total_price,
    });

  if (selectionError) {
    return { success: false, error: selectionError.message };
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
    return { success: false, error: updateError.message };
  }

  // Log acceptance activity (fire-and-forget)
  logQuoteActivity(payload.quote_id, "accepted", {
    package_id: payload.package_id,
    customer_name: payload.customer_name,
    customer_email: payload.customer_email,
    stripe_invoice_id: stripeInvoiceId,
  });

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
