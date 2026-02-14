"use server";

import { revalidatePath } from "next/cache";
import { createServerClient } from "@/lib/supabase/server";

export type ProjectFormData = {
  customer_id: string;
  name: string;
  project_type?: string;
  sports?: string[];
  address_line1?: string;
  city?: string;
  state?: string;
  zip?: string;
  square_feet?: number | null;
  number_of_courts?: number | null;
  court_age_years?: number | null;
  cracks_present?: boolean;
  crack_length_ft?: number | null;
  bird_bath_count?: number | null;
  bird_bath_area_sqft?: number | null;
};

export async function createProject(
  data: ProjectFormData
): Promise<{ success: boolean; project_id?: string; error?: string }> {
  const supabase = createServerClient();
  const { data: row, error } = await supabase
    .from("projects")
    .insert({
      customer_id: data.customer_id,
      name: data.name,
      project_type: data.project_type || null,
      sports: data.sports?.length ? data.sports : [],
      address_line1: data.address_line1 || null,
      city: data.city || null,
      state: data.state || "TX",
      zip: data.zip || null,
      square_feet: data.square_feet ?? null,
      number_of_courts: data.number_of_courts ?? null,
      court_age_years: data.court_age_years ?? null,
      cracks_present: data.cracks_present ?? false,
      crack_length_ft: data.crack_length_ft ?? null,
      bird_bath_count: data.bird_bath_count ?? null,
      bird_bath_area_sqft: data.bird_bath_area_sqft ?? null,
    })
    .select("id")
    .single();

  if (error) return { success: false, error: error.message };
  revalidatePath("/admin/quotes");
  return { success: true, project_id: row.id };
}
