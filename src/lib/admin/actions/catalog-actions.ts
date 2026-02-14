"use server";

import { revalidatePath } from "next/cache";
import { createServerClient } from "@/lib/supabase/server";

export type ServiceFormData = {
  name: string;
  description?: string;
  category: string;
  unit_of_measure: string;
  base_price: number;
  line_item_type: string;
  is_add_on: boolean;
  sort_order: number;
  is_active: boolean;
};

export async function createService(
  data: ServiceFormData
): Promise<{ success: boolean; error?: string }> {
  const supabase = createServerClient();
  const { error } = await supabase.from("services_catalog").insert({
    name: data.name,
    description: data.description || null,
    category: data.category,
    unit_of_measure: data.unit_of_measure,
    base_price: data.base_price,
    line_item_type: data.line_item_type,
    is_add_on: data.is_add_on,
    sort_order: data.sort_order,
    is_active: data.is_active,
  });

  if (error) return { success: false, error: error.message };
  revalidatePath("/admin/catalog");
  return { success: true };
}

export async function updateService(
  id: string,
  data: ServiceFormData
): Promise<{ success: boolean; error?: string }> {
  const supabase = createServerClient();
  const { error } = await supabase
    .from("services_catalog")
    .update({
      name: data.name,
      description: data.description || null,
      category: data.category,
      unit_of_measure: data.unit_of_measure,
      base_price: data.base_price,
      line_item_type: data.line_item_type,
      is_add_on: data.is_add_on,
      sort_order: data.sort_order,
      is_active: data.is_active,
    })
    .eq("id", id);

  if (error) return { success: false, error: error.message };
  revalidatePath("/admin/catalog");
  return { success: true };
}

export async function deleteService(
  id: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = createServerClient();
  const { error } = await supabase
    .from("services_catalog")
    .delete()
    .eq("id", id);

  if (error) return { success: false, error: error.message };
  revalidatePath("/admin/catalog");
  return { success: true };
}
