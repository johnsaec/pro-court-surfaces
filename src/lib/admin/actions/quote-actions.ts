"use server";

import { revalidatePath } from "next/cache";
import { createServerClient } from "@/lib/supabase/server";
import type { QuoteSavePayload } from "@/lib/admin/types/quote-types";

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
          project_id: payload.project_id,
          color_inside_id: payload.color_inside_id,
          color_outside_id: payload.color_outside_id,
          color_lines_id: payload.color_lines_id,
          cover_note: payload.cover_note,
          terms_and_conditions: payload.terms_and_conditions,
          internal_notes: payload.internal_notes,
          discount_amount: payload.discount_amount,
          deposit_due_days: payload.deposit_due_days,
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
          project_id: payload.project_id,
          color_inside_id: payload.color_inside_id,
          color_outside_id: payload.color_outside_id,
          color_lines_id: payload.color_lines_id,
          cover_note: payload.cover_note,
          terms_and_conditions: payload.terms_and_conditions,
          internal_notes: payload.internal_notes,
          discount_amount: payload.discount_amount,
          deposit_due_days: payload.deposit_due_days,
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

export async function deleteQuote(
  id: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = createServerClient();
  const { error } = await supabase.from("quotes").delete().eq("id", id);

  if (error) return { success: false, error: error.message };
  revalidatePath("/admin/quotes");
  return { success: true };
}
