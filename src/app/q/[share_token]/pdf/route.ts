import { NextRequest, NextResponse } from "next/server";
import { getQuoteById } from "@/lib/admin/queries/quote-queries";
import { createServerClient } from "@/lib/supabase/server";
import { quotePdfResponse } from "@/lib/pdf/render-quote-pdf";

// Customer-facing PDF download, keyed by the same share token as the quote page.
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ share_token: string }> }
) {
  const { share_token } = await params;
  const supabase = createServerClient();
  const { data } = await supabase
    .from("quotes")
    .select("id")
    .eq("share_token", share_token)
    .single();

  const quote = data ? await getQuoteById(data.id) : null;
  if (!quote) {
    return NextResponse.json({ error: "Quote not found" }, { status: 404 });
  }

  return quotePdfResponse(quote);
}
