import { PageHeader } from "@/components/admin/page-header";
import { getCustomers } from "@/lib/admin/queries/customer-queries";
import { getCompanies } from "@/lib/admin/queries/company-queries";
import { getServices } from "@/lib/admin/queries/catalog-queries";
import { getColors } from "@/lib/admin/queries/color-queries";
import { getLeads } from "@/lib/admin/queries/lead-queries";
import { QuoteBuilder } from "../_components/quote-builder";
import type { CustomerOption, LeadOption } from "@/lib/admin/types/quote-types";

export const dynamic = "force-dynamic";

export default async function NewQuotePage() {
  const [customers, companies, services, colors, allLeads] = await Promise.all([
    getCustomers(),
    getCompanies(),
    getServices(),
    getColors(),
    getLeads(),
  ]);

  const companyNameById = new Map(companies.map((co) => [co.id, co.name]));

  const customerOptions: CustomerOption[] = customers.map((c) => ({
    id: c.id,
    display_name: c.display_name,
    company_name: c.company_id
      ? companyNameById.get(c.company_id) ?? null
      : null,
  }));

  const leadOptions: LeadOption[] = allLeads
    .filter((l) => l.deal_stage !== "converted")
    .map((l) => ({
      id: l.id,
      display_name: l.display_name,
      email: l.email,
      phone: l.phone,
      company_id: l.company_id ?? null,
      project_type: l.project_type,
      sports: l.sports ?? null,
      square_feet: l.square_feet,
      number_of_courts: l.number_of_courts,
      city: l.city,
      address_line1: l.address_line1 ?? null,
      state: l.state ?? null,
      zip: l.zip ?? null,
      court_age_years: l.court_age_years,
      cracks_present: l.cracks_present,
      crack_length_ft: l.crack_length_ft,
      bird_bath_count: l.bird_bath_count,
      bird_bath_area_sqft: l.bird_bath_area_sqft,
    }));

  return (
    <>
      <PageHeader
        title="New Quote"
        description="Build a new quote for a customer or lead."
      />
      <div className="mt-6">
        <QuoteBuilder
          customers={customerOptions}
          leads={leadOptions}
          services={services}
          colors={colors}
        />
      </div>
    </>
  );
}
