import { getColors } from "@/lib/admin/queries/color-queries";
import { PageHeader } from "@/components/admin/page-header";
import { ColorsGrid } from "./_components/colors-grid";
import { ColorCreateButton } from "./_components/color-create-button";

export const dynamic = "force-dynamic";

export default async function ColorsPage() {
  const colors = await getColors();

  return (
    <>
      <PageHeader
        title="Color Palette"
        description="Manage court surface colors for the quote builder."
      >
        <ColorCreateButton />
      </PageHeader>
      <div className="mt-6">
        <ColorsGrid colors={colors} />
      </div>
    </>
  );
}
