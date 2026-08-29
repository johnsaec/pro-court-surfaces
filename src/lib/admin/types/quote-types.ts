import type { Service } from "@/lib/admin/queries/catalog-queries";
import type { Color } from "@/lib/admin/queries/color-queries";

// ── Payment schedule ────────────────────────────────────────────────

export type PaymentMilestone = {
  label: string;
  amount: number;
};

// Resolved conditions/exclusions/warranty clause snapshot (see scripts/quotes/clauses.mjs)
export type ConditionSection = {
  section: string;
  title: string;
  body: string;
};

// ── Option types for dropdowns ──────────────────────────────────────

export type CustomerOption = {
  id: string;
  display_name: string;
  company_name: string | null;
};

export type LeadOption = {
  id: string;
  display_name: string;
  email: string | null;
  phone: string | null;
  company_id: string | null;
  // Pre-fill project creation from lead intake data
  project_type: string | null;
  sports: string[] | null;
  square_feet: number | null;
  number_of_courts: number | null;
  city: string | null;
  address_line1: string | null;
  state: string | null;
  zip: string | null;
  court_age_years: number | null;
  cracks_present: boolean;
  crack_length_ft: number | null;
  bird_bath_count: number | null;
  bird_bath_area_sqft: number | null;
};

export type ProjectData = {
  square_feet: number | null;
  number_of_courts: number | null;
  crack_length_ft: number | null;
  bird_bath_count: number | null;
};

// ── Line Item State ─────────────────────────────────────────────────

export type LineItemState = {
  _key: string; // client-only key for React
  service_id: string | null;
  name: string;
  description: string;
  line_item_type: string;
  unit_of_measure: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  is_optional: boolean;
  is_included_by_default: boolean;
  sort_order: number;
};

// ── Package State ───────────────────────────────────────────────────

export type PackageState = {
  _key: string; // client-only key for React
  tier: string;
  name: string;
  description: string;
  is_recommended: boolean;
  sort_order: number;
  line_items: LineItemState[];
};

// ── Quote Builder State ─────────────────────────────────────────────

export type QuoteBuilderState = {
  customer_id: string;
  lead_id: string;
  // Project fields (inline on quote)
  project_type: string;
  sports: string[];
  square_feet: string;
  number_of_courts: string;
  city: string;
  address_line1: string;
  state: string;
  crack_length_ft: string;
  bird_bath_count: string;
  // Packages & colors
  packages: PackageState[];
  color_inside_id: string;
  color_outside_id: string;
  color_lines_id: string;
  color_nvz_id: string;
  cover_note: string;
  terms_and_conditions: string;
  internal_notes: string;
  discount_amount: number;
  deposit_due_days: number;
  deposit_percent: number;
  show_signature: boolean;
  payment_mode: "standard" | "custom";
  payment_schedule: PaymentMilestone[];
};

// ── Reducer Actions ─────────────────────────────────────────────────

export type ProjectFieldKey =
  | "project_type"
  | "square_feet"
  | "number_of_courts"
  | "city"
  | "address_line1"
  | "state"
  | "crack_length_ft"
  | "bird_bath_count";

export type QuoteBuilderAction =
  | { type: "SET_CUSTOMER"; customer_id: string }
  | { type: "SET_LEAD"; lead_id: string }
  | { type: "SET_PROJECT_FIELD"; field: ProjectFieldKey; value: string }
  | { type: "SET_SPORTS"; sports: string[] }
  | { type: "ADD_PACKAGE"; tier: string }
  | { type: "REMOVE_PACKAGE"; packageKey: string }
  | { type: "UPDATE_PACKAGE"; packageKey: string; field: string; value: string }
  | { type: "SET_RECOMMENDED"; packageKey: string }
  | { type: "ADD_LINE_ITEM"; packageKey: string; item: LineItemState }
  | {
      type: "UPDATE_LINE_ITEM";
      packageKey: string;
      itemKey: string;
      field: string;
      value: string | number | boolean;
    }
  | { type: "REMOVE_LINE_ITEM"; packageKey: string; itemKey: string }
  | { type: "SET_COLOR"; field: "color_inside_id" | "color_outside_id" | "color_lines_id" | "color_nvz_id"; value: string }
  | { type: "SET_FIELD"; field: "cover_note" | "terms_and_conditions" | "internal_notes" | "discount_amount" | "deposit_due_days" | "deposit_percent" | "show_signature" | "payment_mode"; value: string | number | boolean }
  | { type: "SET_PAYMENT_SCHEDULE"; schedule: PaymentMilestone[] }
  | { type: "LOAD_STATE"; state: QuoteBuilderState };

// ── Save Payload ────────────────────────────────────────────────────

export type QuoteSavePayload = {
  id?: string; // present on update
  customer_id: string | null;
  lead_id: string | null;
  project_type: string | null;
  sports: string[] | null;
  square_feet: number | null;
  number_of_courts: number | null;
  city: string | null;
  address_line1: string | null;
  state: string | null;
  crack_length_ft: number | null;
  bird_bath_count: number | null;
  packages: {
    tier: string;
    name: string;
    description: string;
    is_recommended: boolean;
    sort_order: number;
    line_items: {
      service_id: string | null;
      name: string;
      description: string;
      line_item_type: string;
      unit_of_measure: string;
      quantity: number;
      unit_price: number;
      total_price: number;
      is_optional: boolean;
      is_included_by_default: boolean;
      sort_order: number;
    }[];
  }[];
  color_inside_id: string | null;
  color_outside_id: string | null;
  color_lines_id: string | null;
  color_nvz_id: string | null;
  cover_note: string | null;
  terms_and_conditions: string | null;
  internal_notes: string | null;
  discount_amount: number;
  deposit_due_days: number;
  deposit_percent: number;
  show_signature: boolean;
  payment_schedule: PaymentMilestone[] | null;
  subtotal: number;
  total: number;
};

// ── Reference data passed to QuoteBuilder ───────────────────────────

export type QuoteReferenceData = {
  customers: CustomerOption[];
  services: Service[];
  colors: Color[];
};

// ── Quote list row (for quotes table) ───────────────────────────────

export type QuoteListRow = {
  id: string;
  quote_number: string;
  status: string;
  version: number;
  subtotal: number | null;
  total: number | null;
  project_type: string | null;
  city: string | null;
  created_at: string;
  updated_at: string;
  customer: { display_name: string } | null;
  lead: { display_name: string; email: string | null; phone: string | null } | null;
};

// ── Full quote with nested packages/items (for edit & preview) ──────

export type QuoteLineItemRow = {
  id: string;
  service_id: string | null;
  name: string;
  description: string | null;
  line_item_type: string;
  unit_of_measure: string | null;
  quantity: number;
  unit_price: number;
  total_price: number;
  is_optional: boolean;
  is_included_by_default: boolean;
  sort_order: number;
};

export type QuotePackageRow = {
  id: string;
  tier: string;
  name: string;
  description: string | null;
  subtotal: number;
  is_recommended: boolean;
  sort_order: number;
  quote_line_items: QuoteLineItemRow[];
};

export type QuoteDetail = {
  id: string;
  quote_number: string;
  share_token: string;
  version: number;
  status: string;
  customer_id: string | null;
  lead_id: string | null;
  project_type: string | null;
  square_feet: number | null;
  number_of_courts: number | null;
  city: string | null;
  address_line1: string | null;
  state: string | null;
  zip: string | null;
  sports: string[] | null;
  cover_note: string | null;
  terms_and_conditions: string | null;
  internal_notes: string | null;
  color_inside_id: string | null;
  color_outside_id: string | null;
  color_lines_id: string | null;
  color_nvz_id: string | null;
  subtotal: number | null;
  discount_amount: number | null;
  total: number | null;
  deposit_due_days: number | null;
  deposit_percent: number | null;
  show_signature: boolean | null;
  conditions: ConditionSection[] | null;
  payment_schedule: PaymentMilestone[] | null;
  accepted_by_name: string | null;
  accepted_by_email: string | null;
  stripe_invoice_id: string | null;
  stripe_balance_invoice_id: string | null;
  sent_at: string | null;
  viewed_at: string | null;
  accepted_at: string | null;
  declined_at: string | null;
  expires_at: string | null;
  created_at: string;
  updated_at: string;
  customer: { display_name: string; email: string | null; phone: string | null } | null;
  lead: { display_name: string; email: string | null; phone: string | null } | null;
  color_inside: { name: string; hex_code: string } | null;
  color_outside: { name: string; hex_code: string } | null;
  color_lines: { name: string; hex_code: string } | null;
  color_nvz: { name: string; hex_code: string } | null;
  quote_packages: QuotePackageRow[];
};
