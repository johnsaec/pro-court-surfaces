import { notFound } from "next/navigation";
import { PageHeader } from "@/components/admin/page-header";
import { getQuoteById } from "@/lib/admin/queries/quote-queries";
import { getCustomers } from "@/lib/admin/queries/customer-queries";
import { getProjectOptions } from "@/lib/admin/queries/project-queries";
import { getServices } from "@/lib/admin/queries/catalog-queries";
import { getColors } from "@/lib/admin/queries/color-queries";
import { getLeads } from "@/lib/admin/queries/lead-queries";
import { QuoteBuilder } from "../_components/quote-builder";
import { DownloadPdfButton } from "../_components/download-pdf-button";
import type { LeadOption } from "@/lib/admin/types/quote-types";

export const dynamic = "force-dynamic";

export default async function EditQuotePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [quote, customers, projects, services, colors, allLeads] = await Promise.all([
    getQuoteById(id),
    getCustomers(),
    getProjectOptions(),
    getServices(),
    getColors(),
    getLeads(),
  ]);

  if (!quote) notFound();

  const customerOptions = customers.map((c) => ({
    id: c.id,
    display_name: c.display_name,
  }));

  const leadOptions: LeadOption[] = allLeads
    .filter((l) => l.deal_stage !== "converted")
    .map((l) => ({
      id: l.id,
      display_name: l.display_name,
      email: l.email,
      phone: l.phone,
      project_type: l.project_type,
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
        title={`Edit ${quote.quote_number}`}
        description="Modify quote details, packages, and line items."
      >
        <DownloadPdfButton quoteId={id} />
      </PageHeader>
      <div className="mt-6">
        <QuoteBuilder
          quote={quote}
          customers={customerOptions}
          leads={leadOptions}
          projects={projects}
          services={services}
          colors={colors}
        />
      </div>
    </>
  );
}
