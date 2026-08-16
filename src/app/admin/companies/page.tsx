import { getCompanies } from "@/lib/admin/queries/company-queries";
import { PageHeader } from "@/components/admin/page-header";
import { CompaniesTable } from "./_components/companies-table";
import { CompanyCreateButton } from "./_components/company-create-button";

export const dynamic = "force-dynamic";

export default async function CompaniesPage() {
  const companies = await getCompanies();

  return (
    <>
      <PageHeader
        title="Companies"
        description="Business accounts — GCs, builders, HOAs — that group contacts and quotes."
      >
        <CompanyCreateButton />
      </PageHeader>
      <div className="mt-6">
        <CompaniesTable companies={companies} />
      </div>
    </>
  );
}
