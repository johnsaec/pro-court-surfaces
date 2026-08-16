import { notFound } from "next/navigation";
import { getLeadById } from "@/lib/admin/queries/lead-queries";
import { getCompanies } from "@/lib/admin/queries/company-queries";
import { PageHeader } from "@/components/admin/page-header";
import { LeadForm } from "./_components/lead-form";

export const dynamic = "force-dynamic";

export default async function LeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [lead, companies] = await Promise.all([
    getLeadById(id),
    getCompanies(),
  ]);

  if (!lead) notFound();

  const companyOptions = companies.map((c) => ({ id: c.id, name: c.name }));

  return (
    <>
      <PageHeader
        title={lead.display_name}
        description="Edit lead details and court assessment information."
      />
      <div className="mt-6">
        <LeadForm lead={lead} companies={companyOptions} />
      </div>
    </>
  );
}
