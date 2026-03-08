"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { createServerClient } from "@/lib/supabase/server";
import { stripe } from "@/lib/stripe";
import { sendEmail } from "@/lib/email/send-email";
import { QuoteSentEmail } from "@/lib/email/templates/quote-sent";
import { BalanceDueEmail } from "@/lib/email/templates/balance-due";
import type { QuoteSavePayload } from "@/lib/admin/types/quote-types";
import { logAdminQuoteActivity } from "./activity-actions";

export async function saveQuote(
  payload: QuoteSavePayload
): Promise<{ success: boolean; quote_id?: string; error?: string }> {
  const supabase = createServerClient();
  const isUpdate = !!payload.id;

  try {
    let quoteId: string;

    if (isUpdate) {
      // Update existing quote row
      quoteId = payload.id!;
      const { error: updateError } = await supabase
        .from("quotes")
        .update({
          customer_id: payload.customer_id || null,
          lead_id: payload.lead_id || null,
          project_type: payload.project_type,
          square_feet: payload.square_feet,
          number_of_courts: payload.number_of_courts,
          city: payload.city,
          address_line1: payload.address_line1,
          state: payload.state,
          crack_length_ft: payload.crack_length_ft,
          bird_bath_count: payload.bird_bath_count,
          color_inside_id: payload.color_inside_id,
          color_outside_id: payload.color_outside_id,
          color_lines_id: payload.color_lines_id,
          color_nvz_id: payload.color_nvz_id,
          cover_note: payload.cover_note,
          terms_and_conditions: payload.terms_and_conditions,
          internal_notes: payload.internal_notes,
          discount_amount: payload.discount_amount,
          deposit_due_days: payload.deposit_due_days,
          payment_schedule: payload.payment_schedule,
          subtotal: payload.subtotal,
          total: payload.total,
        })
        .eq("id", quoteId);

      if (updateError) throw updateError;

      // Delete all existing packages (CASCADE deletes line items)
      const { error: deleteError } = await supabase
        .from("quote_packages")
        .delete()
        .eq("quote_id", quoteId);

      if (deleteError) throw deleteError;
    } else {
      // Insert new quote (quote_number and share_token auto-generated)
      const { data: quote, error: insertError } = await supabase
        .from("quotes")
        .insert({
          customer_id: payload.customer_id || null,
          lead_id: payload.lead_id || null,
          project_type: payload.project_type,
          square_feet: payload.square_feet,
          number_of_courts: payload.number_of_courts,
          city: payload.city,
          address_line1: payload.address_line1,
          state: payload.state,
          crack_length_ft: payload.crack_length_ft,
          bird_bath_count: payload.bird_bath_count,
          color_inside_id: payload.color_inside_id,
          color_outside_id: payload.color_outside_id,
          color_lines_id: payload.color_lines_id,
          color_nvz_id: payload.color_nvz_id,
          cover_note: payload.cover_note,
          terms_and_conditions: payload.terms_and_conditions,
          internal_notes: payload.internal_notes,
          discount_amount: payload.discount_amount,
          deposit_due_days: payload.deposit_due_days,
          payment_schedule: payload.payment_schedule,
          subtotal: payload.subtotal,
          total: payload.total,
        })
        .select("id")
        .single();

      if (insertError) throw insertError;
      quoteId = quote.id;
    }

    // Insert packages and line items
    for (const pkg of payload.packages) {
      const { data: pkgRow, error: pkgError } = await supabase
        .from("quote_packages")
        .insert({
          quote_id: quoteId,
          tier: pkg.tier,
          name: pkg.name,
          description: pkg.description || null,
          subtotal: pkg.line_items.reduce((sum, li) => sum + li.total_price, 0),
          is_recommended: pkg.is_recommended,
          sort_order: pkg.sort_order,
        })
        .select("id")
        .single();

      if (pkgError) throw pkgError;

      if (pkg.line_items.length > 0) {
        const lineItems = pkg.line_items.map((li) => ({
          package_id: pkgRow.id,
          service_id: li.service_id || null,
          name: li.name,
          description: li.description || null,
          line_item_type: li.line_item_type,
          unit_of_measure: li.unit_of_measure || null,
          quantity: li.quantity,
          unit_price: li.unit_price,
          total_price: li.total_price,
          is_optional: li.is_optional,
          is_included_by_default: li.is_included_by_default,
          sort_order: li.sort_order,
        }));

        const { error: liError } = await supabase
          .from("quote_line_items")
          .insert(lineItems);

        if (liError) throw liError;
      }
    }

    revalidatePath("/admin/quotes");
    return { success: true, quote_id: quoteId };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";

    // If creating a new quote failed mid-way, try to clean up
    if (!isUpdate && payload.id) {
      await supabase.from("quotes").delete().eq("id", payload.id);
    }

    return { success: false, error: message };
  }
}

export async function sendQuote(
  quoteId: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = createServerClient();

  const { data: quote, error: fetchError } = await supabase
    .from("quotes")
    .select("*, customer:customers(*), lead:leads(*)")
    .eq("id", quoteId)
    .single();

  if (fetchError || !quote) {
    return { success: false, error: "Quote not found" };
  }

  const recipientName =
    quote.customer?.display_name ??
    quote.lead?.display_name ??
    "Customer";
  const recipientEmail =
    quote.customer?.email ?? quote.lead?.email;

  if (!recipientEmail) {
    return { success: false, error: "No email address found for recipient" };
  }

  // Update status to sent
  const { error: updateError } = await supabase
    .from("quotes")
    .update({ status: "sent", sent_at: new Date().toISOString() })
    .eq("id", quoteId);

  if (updateError) {
    return { success: false, error: updateError.message };
  }

  // Build quote URL
  let origin = "http://localhost:3000";
  try {
    const headersList = await headers();
    origin = headersList.get("origin") ?? origin;
  } catch {
    // fallback to localhost
  }
  const quoteUrl = `${origin}/q/${quote.share_token}`;

  // Log activity
  await logAdminQuoteActivity(quoteId, "sent");

  // Send email (fire-and-forget)
  try {
    await sendEmail({
      to: recipientEmail,
      subject: `Your Quote ${quote.quote_number} from Pro Court Surfaces`,
      react: QuoteSentEmail({
        customerName: recipientName,
        quoteNumber: quote.quote_number,
        quoteUrl,
        coverNote: quote.cover_note,
      }),
    });
  } catch (err) {
    console.error("[sendQuote] Email error:", err instanceof Error ? err.message : err);
  }

  revalidatePath("/admin/quotes");
  return { success: true };
}

export async function deleteQuote(
  id: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = createServerClient();
  const { error } = await supabase.from("quotes").delete().eq("id", id);

  if (error) return { success: false, error: error.message };
  revalidatePath("/admin/quotes");
  return { success: true };
}

export async function collectBalance(
  quoteId: string
): Promise<{ success: boolean; invoiceUrl?: string; error?: string }> {
  const supabase = createServerClient();

  // 1. Fetch quote with customer/lead joins
  const { data: quote, error: fetchError } = await supabase
    .from("quotes")
    .select("*, customer:customers(*), lead:leads(*)")
    .eq("id", quoteId)
    .single();

  if (fetchError || !quote) {
    return { success: false, error: "Quote not found" };
  }

  // 2. Verify status and no existing balance invoice
  if (quote.status !== "deposit_paid") {
    return { success: false, error: "Quote must be in deposit_paid status" };
  }

  if (quote.stripe_balance_invoice_id) {
    return { success: false, error: "Balance invoice already created" };
  }

  const total = quote.total ?? 0;
  if (total <= 0) {
    return { success: false, error: "Quote has no total amount" };
  }

  // 3. Resolve Stripe customer
  const customerEmail = quote.customer?.email ?? quote.lead?.email;
  const customerName =
    quote.customer?.display_name ?? quote.lead?.display_name ?? "Customer";

  if (!customerEmail) {
    return { success: false, error: "No email address found for customer" };
  }

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
        name: customerName,
        email: customerEmail,
      });
      stripeCustomerId = stripeCustomer.id;
    }
  }

  // 4. Create Stripe invoice for remaining balance
  const hasCustomSchedule =
    quote.payment_schedule &&
    Array.isArray(quote.payment_schedule) &&
    quote.payment_schedule.length > 1;

  // Sum remaining milestones (all except first), or default 50%
  const balanceAmount = hasCustomSchedule
    ? Math.round(
        (quote.payment_schedule as { label: string; amount: number }[])
          .slice(1)
          .reduce((sum: number, m: { amount: number }) => sum + m.amount, 0) * 100
      )
    : Math.round(total * 50); // cents (50% of total in dollars)

  const balanceDescription = hasCustomSchedule
    ? `Remaining Balance — Quote ${quote.quote_number}`
    : `Remaining Balance — Quote ${quote.quote_number}`;

  try {
    const invoice = await stripe.invoices.create({
      customer: stripeCustomerId,
      collection_method: "send_invoice",
      days_until_due: quote.deposit_due_days ?? 7,
      metadata: { quote_id: quoteId, type: "balance" },
    });

    await stripe.invoiceItems.create({
      customer: stripeCustomerId,
      invoice: invoice.id,
      amount: balanceAmount,
      currency: "usd",
      description: balanceDescription,
    });

    const finalizedInvoice = await stripe.invoices.finalizeInvoice(invoice.id);

    // 5. Store balance invoice ID on quote
    await supabase
      .from("quotes")
      .update({ stripe_balance_invoice_id: finalizedInvoice.id })
      .eq("id", quoteId);

    // 6. Send balance-due email
    const invoiceUrl = finalizedInvoice.hosted_invoice_url ?? "";

    try {
      await sendEmail({
        to: customerEmail,
        subject: `Remaining Balance Due — Quote ${quote.quote_number}`,
        react: BalanceDueEmail({
          customerName,
          quoteNumber: quote.quote_number,
          balanceAmount: balanceAmount / 100, // convert cents to dollars
          invoiceUrl,
        }),
      });
    } catch (err) {
      console.error(
        "[collectBalance] Email error:",
        err instanceof Error ? err.message : err
      );
    }

    // Log activity
    await logAdminQuoteActivity(quoteId, "balance_collected", {
      invoice_id: finalizedInvoice.id,
      amount: balanceAmount / 100,
    });

    revalidatePath(`/admin/quotes/${quoteId}/preview`);
    revalidatePath("/admin/quotes");

    return { success: true, invoiceUrl };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Stripe error";
    console.error("[collectBalance] Stripe error:", message);
    return { success: false, error: message };
  }
}
