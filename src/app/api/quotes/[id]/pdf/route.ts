import { NextRequest, NextResponse } from "next/server";
import { getQuoteById } from "@/lib/admin/queries/quote-queries";
import { quotePdfResponse } from "@/lib/pdf/render-quote-pdf";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const quote = await getQuoteById(id);

  if (!quote) {
    return NextResponse.json({ error: "Quote not found" }, { status: 404 });
  }

  return quotePdfResponse(quote);
}
