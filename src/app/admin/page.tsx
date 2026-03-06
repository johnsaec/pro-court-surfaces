import { Suspense } from "react";
import { PageHeader } from "@/components/admin/page-header";
import { DashboardContent } from "./_components/dashboard-content";

export const dynamic = "force-dynamic";

function DashboardSkeleton() {
  return (
    <>
      <div className="mt-6 grid gap-4 grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-24 animate-pulse rounded-lg border bg-muted" />
        ))}
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="h-64 animate-pulse rounded-lg border bg-muted" />
        <div className="h-64 animate-pulse rounded-lg border bg-muted" />
      </div>
    </>
  );
}

export default function AdminDashboard() {
  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Overview of your court resurfacing business."
      />
      <Suspense fallback={<DashboardSkeleton />}>
        <DashboardContent />
      </Suspense>
    </>
  );
}
