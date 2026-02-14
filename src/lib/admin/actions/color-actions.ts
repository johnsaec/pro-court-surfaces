"use server";

import { revalidatePath } from "next/cache";
import { createServerClient } from "@/lib/supabase/server";

export type ColorFormData = {
  name: string;
  hex_code: string;
  manufacturer: string;
  product_line?: string;
  color_code?: string;
  recommended_for?: string[];
  is_premium: boolean;
  premium_upcharge: number;
  sort_order: number;
  is_active: boolean;
};

export async function createColor(
  data: ColorFormData
): Promise<{ success: boolean; error?: string }> {
  const supabase = createServerClient();
  const { error } = await supabase.from("color_palette").insert({
    name: data.name,
    hex_code: data.hex_code,
    manufacturer: data.manufacturer,
    product_line: data.product_line || null,
    color_code: data.color_code || null,
    recommended_for: data.recommended_for?.length
      ? data.recommended_for
      : null,
    is_premium: data.is_premium,
    premium_upcharge: data.premium_upcharge,
    sort_order: data.sort_order,
    is_active: data.is_active,
  });

  if (error) return { success: false, error: error.message };
  revalidatePath("/admin/colors");
  return { success: true };
}

export async function updateColor(
  id: string,
  data: ColorFormData
): Promise<{ success: boolean; error?: string }> {
  const supabase = createServerClient();
  const { error } = await supabase
    .from("color_palette")
    .update({
      name: data.name,
      hex_code: data.hex_code,
      manufacturer: data.manufacturer,
      product_line: data.product_line || null,
      color_code: data.color_code || null,
      recommended_for: data.recommended_for?.length
        ? data.recommended_for
        : null,
      is_premium: data.is_premium,
      premium_upcharge: data.premium_upcharge,
      sort_order: data.sort_order,
      is_active: data.is_active,
    })
    .eq("id", id);

  if (error) return { success: false, error: error.message };
  revalidatePath("/admin/colors");
  return { success: true };
}

export async function deleteColor(
  id: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = createServerClient();
  const { error } = await supabase.from("color_palette").delete().eq("id", id);

  if (error) return { success: false, error: error.message };
  revalidatePath("/admin/colors");
  return { success: true };
}
