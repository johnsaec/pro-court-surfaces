import { PageHeader } from "@/components/admin/page-header";
import { getCustomers } from "@/lib/admin/queries/customer-queries";
import { getProjectOptions } from "@/lib/admin/queries/project-queries";
import { getServices } from "@/lib/admin/queries/catalog-queries";
import { getColors } from "@/lib/admin/queries/color-queries";
import { QuoteBuilder } from "../_components/quote-builder";

export default async function NewQuotePage() {
  const [customers, projects, services, colors] = await Promise.all([
    getCustomers(),
    getProjectOptions(),
    getServices(),
    getColors(),
  ]);

  const customerOptions = customers.map((c) => ({
    id: c.id,
    display_name: c.display_name,
  }));

  return (
    <>
      <PageHeader
        title="New Quote"
        description="Build a new quote for a customer."
      />
      <div className="mt-6">
        <QuoteBuilder
          customers={customerOptions}
          projects={projects}
          services={services}
          colors={colors}
        />
      </div>
    </>
  );
}
