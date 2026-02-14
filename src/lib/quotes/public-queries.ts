import { createServerClient } from "@/lib/supabase/server";
import type { QuoteDetail } from "@/lib/admin/types/quote-types";

export async function getQuoteByShareToken(
  token: string
): Promise<QuoteDetail | null> {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("quotes")
    .select(
      `*,
       customer:customers(display_name, email, phone),
       lead:leads(display_name, email, phone),
       project:projects!quotes_project_id_fkey(name, address_line1, city, state, zip, square_feet, number_of_courts, project_type, sports),
       color_inside:color_palette!quotes_color_inside_id_fkey(name, hex_code),
       color_outside:color_palette!quotes_color_outside_id_fkey(name, hex_code),
       color_lines:color_palette!quotes_color_lines_id_fkey(name, hex_code),
       quote_packages(
         id, tier, name, description, subtotal, is_recommended, sort_order,
         quote_line_items(
           id, service_id, name, description, line_item_type,
           unit_of_measure, quantity, unit_price, total_price,
           is_optional, is_included_by_default, sort_order
         )
       )`
    )
    .eq("share_token", token)
    .single();

  if (error) return null;

  // Sort packages by sort_order and line items within each package
  if (data?.quote_packages) {
    data.quote_packages.sort(
      (a: { sort_order: number }, b: { sort_order: number }) =>
        a.sort_order - b.sort_order
    );
    for (const pkg of data.quote_packages) {
      if (pkg.quote_line_items) {
        pkg.quote_line_items.sort(
          (a: { sort_order: number }, b: { sort_order: number }) =>
            a.sort_order - b.sort_order
        );
      }
    }
  }

  return data as unknown as QuoteDetail;
}
