"use server";

import { revalidatePath } from "next/cache";
import { createServerClient } from "@/lib/supabase/server";

export type CompanyFormData = {
  name: string;
  company_type?: string;
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

export async function createCompany(
  data: CompanyFormData
): Promise<{ success: boolean; error?: string }> {
  const supabase = createServerClient();
  const { error } = await supabase.from("companies").insert({
    name: data.name,
    company_type: data.company_type || "other",
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
  revalidatePath("/admin/companies");
  return { success: true };
}

export async function updateCompany(
  id: string,
  data: CompanyFormData
): Promise<{ success: boolean; error?: string }> {
  const supabase = createServerClient();
  const { error } = await supabase
    .from("companies")
    .update({
      name: data.name,
      company_type: data.company_type || "other",
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
  revalidatePath("/admin/companies");
  revalidatePath(`/admin/companies/${id}`);
  return { success: true };
}

export async function deleteCompany(
  id: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = createServerClient();
  // Contacts/leads keep their history; company_id is set NULL by the FK.
  const { error } = await supabase.from("companies").delete().eq("id", id);

  if (error) return { success: false, error: error.message };
  revalidatePath("/admin/companies");
  return { success: true };
}
