import { PageHeader } from "@/components/admin/page-header";

export default function AdminDashboard() {
  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Overview of your court resurfacing business."
      />
      <div className="mt-6 rounded-lg border border-dashed p-12 text-center text-muted-foreground">
        Dashboard coming soon. Use the sidebar to manage customers, leads,
        services, and colors.
      </div>
    </>
  );
}
