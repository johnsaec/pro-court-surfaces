import { createServerClient } from "@/lib/supabase/server";
import type { ProjectOption } from "@/lib/admin/types/quote-types";

export type Project = {
  id: string;
  customer_id: string;
  lead_id: string | null;
  name: string;
  project_type: string | null;
  sports: string[] | null;
  address_line1: string | null;
  address_line2: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
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
  status: string;
  accepted_quote_id: string | null;
  total_price: number | null;
  material_cost: number | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

export async function getProjects(): Promise<Project[]> {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function getProjectById(id: string): Promise<Project | null> {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return null;
  return data;
}

export async function getProjectOptions(): Promise<ProjectOption[]> {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("projects")
    .select("id, name, customer_id, square_feet, number_of_courts, crack_length_ft, bird_bath_count")
    .order("name", { ascending: true });

  if (error) throw new Error(error.message);
  return data ?? [];
}
