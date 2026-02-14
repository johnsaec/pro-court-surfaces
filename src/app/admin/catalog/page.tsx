import { getServices } from "@/lib/admin/queries/catalog-queries";
import { PageHeader } from "@/components/admin/page-header";
import { CatalogTable } from "./_components/catalog-table";
import { ServiceCreateButton } from "./_components/service-create-button";

export default async function CatalogPage() {
  const services = await getServices();

  return (
    <>
      <PageHeader
        title="Services Catalog"
        description="Manage your service offerings and pricing."
      >
        <ServiceCreateButton />
      </PageHeader>
      <div className="mt-6">
        <CatalogTable services={services} />
      </div>
    </>
  );
}
