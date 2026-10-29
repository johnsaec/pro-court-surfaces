import { NextRequest, NextResponse } from "next/server";
import { acceptQuote } from "@/lib/quotes/public-actions";

// Dev-only harness for scripts/quotes/deposit-check.mjs: fires N acceptQuote calls
// at once (double-click / two tabs / retry) so the script can assert exactly one
// acceptance and one deposit invoice. Never available in production builds.
export async function POST(req: NextRequest) {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const { payload, times = 5 } = await req.json();
  const results = await Promise.all(
    Array.from({ length: Math.min(Number(times) || 1, 10) }, () =>
      acceptQuote(payload).catch((err: unknown) => ({
        success: false as const,
        error: err instanceof Error ? err.message : String(err),
      }))
    )
  );
  return NextResponse.json({ results });
}
