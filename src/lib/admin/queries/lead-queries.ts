import { createServerClient } from "@/lib/supabase/server";

export type Lead = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  display_name: string;
  email: string | null;
  phone: string | null;
  city: string | null;
  deal_stage: string;
  lead_source: string | null;
  lead_source_detail: string | null;
  project_type: string | null;
  sports: string[] | null;
  square_feet: number | null;
  number_of_courts: number | null;
  court_age_years: number | null;
  cracks_present: boolean;
  crack_length_ft: number | null;
  bird_bath_count: number | null;
  bird_bath_area_sqft: number | null;
  blistering_boiling: boolean;
  paint_chipping: boolean;
  broom_finish: boolean;
  vapor_barrier: boolean;
  concrete_pour_date: string | null;
  color_inside: string | null;
  color_outside: string | null;
  color_lines: string | null;
  wants_basketball_lines: boolean;
  wants_volleyball_lines: boolean;
  wants_net: boolean;
  wants_fence: boolean;
  wants_lights: boolean;
  interested_in_financing: boolean;
  form_type: string | null;
  second_step_complete: boolean;
  customer_id: string | null;
  converted_at: string | null;
  notion_page_id: string | null;
  address_line1: string | null;
  state: string | null;
  zip: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

export async function getLeads(): Promise<Lead[]> {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function getLeadById(id: string): Promise<Lead | null> {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return null;
  return data;
}
