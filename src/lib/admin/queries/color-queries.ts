import { createServerClient } from "@/lib/supabase/server";

export type Color = {
  id: string;
  name: string;
  hex_code: string;
  manufacturer: string;
  product_line: string | null;
  color_code: string | null;
  recommended_for: string[] | null;
  is_premium: boolean;
  premium_upcharge: number;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export async function getColors(): Promise<Color[]> {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("color_palette")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function getColorById(id: string): Promise<Color | null> {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("color_palette")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return null;
  return data;
}
