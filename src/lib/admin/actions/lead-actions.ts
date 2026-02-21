"use server";

import { revalidatePath } from "next/cache";
import { createServerClient } from "@/lib/supabase/server";

export type LeadCreateData = {
  display_name: string;
  email?: string;
  phone?: string;
  deal_stage: string;
  lead_source?: string;
};

export type LeadFormData = {
  // Identity
  display_name: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  city?: string;

  // Deal tracking
  deal_stage: string;
  lead_source?: string;
  lead_source_detail?: string;

  // Court details
  project_type?: string;
  sports?: string[];
  square_feet?: number | null;
  number_of_courts?: number | null;
  court_age_years?: number | null;

  // Condition assessment
  cracks_present?: boolean;
  crack_length_ft?: number | null;
  bird_bath_count?: number | null;
  bird_bath_area_sqft?: number | null;
  blistering_boiling?: boolean;
  paint_chipping?: boolean;

  // Concrete details
  broom_finish?: boolean;
  vapor_barrier?: boolean;
  concrete_pour_date?: string;

  // Color preferences
  color_inside?: string;
  color_outside?: string;
  color_nvz?: string;
  color_lines?: string;

  // Add-on interest
  wants_basketball_lines?: boolean;
  wants_volleyball_lines?: boolean;
  wants_net?: boolean;
  wants_fence?: boolean;
  wants_lights?: boolean;
  interested_in_financing?: boolean;

  // Notes
  notes?: string;
};

export async function createLead(
  data: LeadCreateData
): Promise<{ success: boolean; error?: string }> {
  const supabase = createServerClient();
  const { error } = await supabase.from("leads").insert({
    display_name: data.display_name,
    email: data.email || null,
    phone: data.phone || null,
    deal_stage: data.deal_stage,
    lead_source: data.lead_source || null,
  });

  if (error) return { success: false, error: error.message };
  revalidatePath("/admin/leads");
  return { success: true };
}

export async function updateLead(
  id: string,
  data: LeadFormData
): Promise<{ success: boolean; error?: string }> {
  const supabase = createServerClient();

  const parseNum = (v: number | null | undefined) =>
    v != null && !isNaN(v) ? v : null;

  const { error } = await supabase
    .from("leads")
    .update({
      display_name: data.display_name,
      first_name: data.first_name || null,
      last_name: data.last_name || null,
      email: data.email || null,
      phone: data.phone || null,
      city: data.city || null,
      deal_stage: data.deal_stage,
      lead_source: data.lead_source || null,
      lead_source_detail: data.lead_source_detail || null,
      project_type: data.project_type || null,
      sports: data.sports?.length ? data.sports : [],
      square_feet: parseNum(data.square_feet),
      number_of_courts: parseNum(data.number_of_courts),
      court_age_years: parseNum(data.court_age_years),
      cracks_present: data.cracks_present ?? false,
      crack_length_ft: parseNum(data.crack_length_ft),
      bird_bath_count: parseNum(data.bird_bath_count),
      bird_bath_area_sqft: parseNum(data.bird_bath_area_sqft),
      blistering_boiling: data.blistering_boiling ?? false,
      paint_chipping: data.paint_chipping ?? false,
      broom_finish: data.broom_finish ?? false,
      vapor_barrier: data.vapor_barrier ?? false,
      concrete_pour_date: data.concrete_pour_date || null,
      color_inside: data.color_inside || null,
      color_outside: data.color_outside || null,
      color_nvz: data.color_nvz || null,
      color_lines: data.color_lines || null,
      wants_basketball_lines: data.wants_basketball_lines ?? false,
      wants_volleyball_lines: data.wants_volleyball_lines ?? false,
      wants_net: data.wants_net ?? false,
      wants_fence: data.wants_fence ?? false,
      wants_lights: data.wants_lights ?? false,
      interested_in_financing: data.interested_in_financing ?? false,
      notes: data.notes || null,
    })
    .eq("id", id);

  if (error) return { success: false, error: error.message };
  revalidatePath("/admin/leads");
  revalidatePath(`/admin/leads/${id}`);
  return { success: true };
}

export async function updateLeadStage(
  id: string,
  deal_stage: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = createServerClient();
  const { error } = await supabase
    .from("leads")
    .update({ deal_stage })
    .eq("id", id);

  if (error) return { success: false, error: error.message };
  revalidatePath("/admin/leads");
  return { success: true };
}

export async function deleteLead(
  id: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = createServerClient();
  const { error } = await supabase.from("leads").delete().eq("id", id);

  if (error) return { success: false, error: error.message };
  revalidatePath("/admin/leads");
  return { success: true };
}
