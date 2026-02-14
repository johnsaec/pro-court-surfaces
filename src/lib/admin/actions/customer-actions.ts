"use server";

import { revalidatePath } from "next/cache";
import { createServerClient } from "@/lib/supabase/server";

export type CustomerFormData = {
  display_name: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  address_line1?: string;
  address_line2?: string;
  city?: string;
  state?: string;
  zip?: string;
  notes?: string;
  tags?: string[];
};

export async function createCustomer(
  data: CustomerFormData
): Promise<{ success: boolean; error?: string }> {
  const supabase = createServerClient();
  const { error } = await supabase.from("customers").insert({
    display_name: data.display_name,
    first_name: data.first_name || null,
    last_name: data.last_name || null,
    email: data.email || null,
    phone: data.phone || null,
    address_line1: data.address_line1 || null,
    address_line2: data.address_line2 || null,
    city: data.city || null,
    state: data.state || "TX",
    zip: data.zip || null,
    notes: data.notes || null,
    tags: data.tags?.length ? data.tags : null,
  });

  if (error) return { success: false, error: error.message };
  revalidatePath("/admin/customers");
  return { success: true };
}

export async function updateCustomer(
  id: string,
  data: CustomerFormData
): Promise<{ success: boolean; error?: string }> {
  const supabase = createServerClient();
  const { error } = await supabase
    .from("customers")
    .update({
      display_name: data.display_name,
      first_name: data.first_name || null,
      last_name: data.last_name || null,
      email: data.email || null,
      phone: data.phone || null,
      address_line1: data.address_line1 || null,
      address_line2: data.address_line2 || null,
      city: data.city || null,
      state: data.state || "TX",
      zip: data.zip || null,
      notes: data.notes || null,
      tags: data.tags?.length ? data.tags : null,
    })
    .eq("id", id);

  if (error) return { success: false, error: error.message };
  revalidatePath("/admin/customers");
  return { success: true };
}

export async function deleteCustomer(
  id: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = createServerClient();
  const { error } = await supabase.from("customers").delete().eq("id", id);

  if (error) return { success: false, error: error.message };
  revalidatePath("/admin/customers");
  return { success: true };
}
