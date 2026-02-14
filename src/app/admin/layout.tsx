import { SidebarNav } from "@/components/admin/sidebar-nav";
import { MobileSidebar } from "@/components/admin/mobile-sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-64 shrink-0 flex-col border-r bg-sidebar">
        <div className="flex h-14 items-center border-b px-6">
          <span className="text-lg font-semibold text-sidebar-foreground">
            Pro Court Surfaces
          </span>
        </div>
        <SidebarNav />
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col">
        {/* Mobile top bar */}
        <header className="flex h-14 items-center gap-4 border-b bg-sidebar px-4 md:hidden">
          <MobileSidebar />
          <span className="text-lg font-semibold text-sidebar-foreground">
            Pro Court Surfaces
          </span>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
