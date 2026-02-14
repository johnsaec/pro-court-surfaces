import { notFound } from "next/navigation";
import { getLeadById } from "@/lib/admin/queries/lead-queries";
import { PageHeader } from "@/components/admin/page-header";
import { LeadForm } from "./_components/lead-form";

export default async function LeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const lead = await getLeadById(id);

  if (!lead) notFound();

  return (
    <>
      <PageHeader
        title={lead.display_name}
        description="Edit lead details and court assessment information."
      />
      <div className="mt-6">
        <LeadForm lead={lead} />
      </div>
    </>
  );
}
