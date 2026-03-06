import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/admin/page-header";
import { getQuotes } from "@/lib/admin/queries/quote-queries";
import { QuotesTable } from "./_components/quotes-table";

export const dynamic = "force-dynamic";

export default async function QuotesPage() {
  const quotes = await getQuotes();

  return (
    <>
      <PageHeader title="Quotes" description="Create and manage customer quotes.">
        <Button asChild>
          <Link href="/admin/quotes/new">
            <Plus className="size-4 mr-1" />
            New Quote
          </Link>
        </Button>
      </PageHeader>
      <div className="mt-6">
        <QuotesTable quotes={quotes} />
      </div>
    </>
  );
}
