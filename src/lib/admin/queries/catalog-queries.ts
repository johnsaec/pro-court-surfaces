import { createServerClient } from "@/lib/supabase/server";

export type Service = {
  id: string;
  name: string;
  description: string | null;
  category: string;
  unit_of_measure: string;
  base_price: number;
  line_item_type: string;
  is_add_on: boolean;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export async function getServices(): Promise<Service[]> {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("services_catalog")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function getServiceById(id: string): Promise<Service | null> {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("services_catalog")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return null;
  return data;
}
