import { getCustomers } from "@/lib/admin/queries/customer-queries";
import { PageHeader } from "@/components/admin/page-header";
import { CustomersTable } from "./_components/customers-table";
import { CustomerCreateButton } from "./_components/customer-create-button";

export default async function CustomersPage() {
  const customers = await getCustomers();

  return (
    <>
      <PageHeader
        title="Customers"
        description="Manage your customer accounts."
      >
        <CustomerCreateButton />
      </PageHeader>
      <div className="mt-6">
        <CustomersTable customers={customers} />
      </div>
    </>
  );
}
