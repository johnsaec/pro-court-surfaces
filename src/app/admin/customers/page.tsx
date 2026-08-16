import { getCustomers } from "@/lib/admin/queries/customer-queries";
import { getCompanies } from "@/lib/admin/queries/company-queries";
import { PageHeader } from "@/components/admin/page-header";
import { CustomersTable } from "./_components/customers-table";
import { CustomerCreateButton } from "./_components/customer-create-button";

export const dynamic = "force-dynamic";

export default async function CustomersPage() {
  const [customers, companies] = await Promise.all([
    getCustomers(),
    getCompanies(),
  ]);
  const companyOptions = companies.map((c) => ({ id: c.id, name: c.name }));

  return (
    <>
      <PageHeader
        title="Customers"
        description="Manage your customer contacts."
      >
        <CustomerCreateButton companies={companyOptions} />
      </PageHeader>
      <div className="mt-6">
        <CustomersTable customers={customers} companies={companyOptions} />
      </div>
    </>
  );
}
