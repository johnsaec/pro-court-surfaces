import { getLeads } from "@/lib/admin/queries/lead-queries";
import { PageHeader } from "@/components/admin/page-header";
import { LeadsTable } from "./_components/leads-table";
import { LeadCreateButton } from "./_components/lead-create-button";

export default async function LeadsPage() {
  const leads = await getLeads();

  return (
    <>
      <PageHeader
        title="Leads"
        description="Track and manage prospective customers."
      >
        <LeadCreateButton />
      </PageHeader>
      <div className="mt-6">
        <LeadsTable leads={leads} />
      </div>
    </>
  );
}
