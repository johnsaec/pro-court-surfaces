import { Suspense } from "react";
import { getLeads } from "@/lib/admin/queries/lead-queries";
import { PageHeader } from "@/components/admin/page-header";
import { LeadsTable } from "./_components/leads-table";
import { LeadsBoard } from "./_components/leads-board";
import { LeadCreateButton } from "./_components/lead-create-button";
import { ViewToggle } from "./_components/view-toggle";

export const dynamic = "force-dynamic";

export default async function LeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ view?: string }>;
}) {
  const { view } = await searchParams;
  const leads = await getLeads();
  const isBoard = view === "board";

  return (
    <>
      <PageHeader
        title="Leads"
        description="Track and manage prospective customers."
      >
        <div className="flex items-center gap-2">
          <Suspense>
            <ViewToggle />
          </Suspense>
          <LeadCreateButton />
        </div>
      </PageHeader>
      <div className="mt-6">
        {isBoard ? <LeadsBoard leads={leads} /> : <LeadsTable leads={leads} />}
      </div>
    </>
  );
}
