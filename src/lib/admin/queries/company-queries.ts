import { createServerClient } from "@/lib/supabase/server";

export type Company = {
  id: string;
  name: string;
  company_type: string | null;
  email: string | null;
  phone: string | null;
  address_line1: string | null;
  address_line2: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  stripe_customer_id: string | null;
  notes: string | null;
  tags: string[] | null;
  created_at: string;
  updated_at: string;
};

// Contact (customer) belonging to a company, with a light quote rollup.
export type CompanyContact = {
  id: string;
  display_name: string;
  email: string | null;
  phone: string | null;
  quotes: {
    id: string;
    quote_number: string;
    status: string;
    total: number | null;
    created_at: string;
  }[];
};

export type CompanyWithContacts = Company & {
  contacts: CompanyContact[];
  // Rollups across all contacts' quotes
  quote_count: number;
  won_count: number; // accepted / deposit_paid / completed
  lifetime_value: number; // sum of quotes.total for won statuses
};

const WON_STATUSES = ["accepted", "deposit_paid", "completed"];

export async function getCompanies(): Promise<Company[]> {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("companies")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function getCompanyById(id: string): Promise<Company | null> {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("companies")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return null;
  return data;
}

// Company detail: its contacts + each contact's quotes, plus job-history rollups.
export async function getCompanyWithContacts(
  id: string
): Promise<CompanyWithContacts | null> {
  const supabase = createServerClient();

  const { data: company, error } = await supabase
    .from("companies")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !company) return null;

  const { data: contacts } = await supabase
    .from("customers")
    .select(
      `id, display_name, email, phone,
       quotes(id, quote_number, status, total, created_at)`
    )
    .eq("company_id", id)
    .order("created_at", { ascending: false });

  const contactList = (contacts ?? []) as unknown as CompanyContact[];

  let quote_count = 0;
  let won_count = 0;
  let lifetime_value = 0;

  for (const contact of contactList) {
    for (const q of contact.quotes ?? []) {
      quote_count += 1;
      if (WON_STATUSES.includes(q.status)) {
        won_count += 1;
        lifetime_value += q.total ?? 0;
      }
    }
  }

  return {
    ...(company as Company),
    contacts: contactList,
    quote_count,
    won_count,
    lifetime_value,
  };
}
