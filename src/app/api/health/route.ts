import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = createServerClient();

  const { data: services, error: servicesError } = await supabase
    .from("services_catalog")
    .select("id, name")
    .limit(3);

  const { data: colors, error: colorsError } = await supabase
    .from("color_palette")
    .select("id, name")
    .limit(3);

  const { count: servicesCount } = await supabase
    .from("services_catalog")
    .select("*", { count: "exact", head: true });

  const { count: colorsCount } = await supabase
    .from("color_palette")
    .select("*", { count: "exact", head: true });

  if (servicesError || colorsError) {
    return NextResponse.json(
      {
        status: "error",
        servicesError: servicesError?.message,
        colorsError: colorsError?.message,
      },
      { status: 500 }
    );
  }

  return NextResponse.json({
    status: "connected",
    services_catalog: { total: servicesCount, sample: services },
    color_palette: { total: colorsCount, sample: colors },
  });
}
