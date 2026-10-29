import React from "react";
import { NextResponse } from "next/server";
import { renderToStream } from "@react-pdf/renderer";
import { createServerClient } from "@/lib/supabase/server";
import { QuotePdfDocument } from "@/lib/pdf/quote-pdf-document";
import type { QuoteDetail } from "@/lib/admin/types/quote-types";

/** Render a quote's PDF as a streaming response. Shared by the admin route
 *  (/api/quotes/[id]/pdf) and the customer route (/q/[share_token]/pdf). */
export async function quotePdfResponse(quote: QuoteDetail) {
  // For accepted quotes, look up selected package
  let selectedPackageId: string | null = null;
  if (["accepted", "deposit_paid", "completed"].includes(quote.status)) {
    const supabase = createServerClient();
    const { data } = await supabase
      .from("quote_selections")
      .select("selected_package_id")
      .eq("quote_id", quote.id)
      .single();
    selectedPackageId = data?.selected_package_id ?? null;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const element = React.createElement(QuotePdfDocument, { quote, selectedPackageId }) as any;
  const stream = await renderToStream(element);

  return new NextResponse(stream as unknown as ReadableStream, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${quote.quote_number}.pdf"`,
    },
  });
}
