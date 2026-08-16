import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { getCompanyWithContacts } from "@/lib/admin/queries/company-queries";
import { PageHeader } from "@/components/admin/page-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  COMPANY_TYPE_LABELS,
  QUOTE_STATUS_LABELS,
  QUOTE_STATUS_COLORS,
} from "@/lib/constants";

export const dynamic = "force-dynamic";

export default async function CompanyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const company = await getCompanyWithContacts(id);

  if (!company) notFound();

  return (
    <>
      <Link
        href="/admin/companies"
        className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft className="size-4" /> Back to Companies
      </Link>

      <PageHeader
        title={company.name}
        description={
          company.company_type
            ? COMPANY_TYPE_LABELS[company.company_type] ?? company.company_type
            : "Company"
        }
      />

      {/* Rollup stats */}
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard label="Contacts" value={company.contacts.length.toString()} />
        <StatCard label="Total Quotes" value={company.quote_count.toString()} />
        <StatCard label="Won Jobs" value={company.won_count.toString()} />
        <StatCard
          label="Lifetime Value"
          value={`$${company.lifetime_value.toLocaleString()}`}
        />
      </div>

      {/* Company info */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Company Info</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
          <Info label="Email" value={company.email} />
          <Info label="Phone" value={company.phone} />
          <Info
            label="Address"
            value={
              company.address_line1
                ? [
                    company.address_line1,
                    company.address_line2,
                    [company.city, company.state, company.zip]
                      .filter(Boolean)
                      .join(", "),
                  ]
                    .filter(Boolean)
                    .join(", ")
                : null
            }
          />
          <Info label="Notes" value={company.notes} />
        </CardContent>
      </Card>

      {/* Contacts + their quotes */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Contacts &amp; Job History</CardTitle>
        </CardHeader>
        <CardContent>
          {company.contacts.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No contacts linked to this company yet. Edit a customer and set
              their company to this one.
            </p>
          ) : (
            <div className="space-y-4">
              {company.contacts.map((contact) => (
                <div
                  key={contact.id}
                  className="rounded-lg border p-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <p className="font-medium">{contact.display_name}</p>
                      <p className="text-sm text-muted-foreground">
                        {[contact.email, contact.phone]
                          .filter(Boolean)
                          .join(" · ") || "No contact info"}
                      </p>
                    </div>
                  </div>

                  {contact.quotes && contact.quotes.length > 0 ? (
                    <ul className="mt-3 space-y-1.5">
                      {contact.quotes.map((q) => (
                        <li
                          key={q.id}
                          className="flex items-center justify-between gap-2 text-sm"
                        >
                          <Link
                            href={`/admin/quotes/${q.id}`}
                            className="font-medium hover:underline"
                          >
                            {q.quote_number}
                          </Link>
                          <div className="flex items-center gap-3">
                            <Badge className={QUOTE_STATUS_COLORS[q.status]}>
                              {QUOTE_STATUS_LABELS[q.status] ?? q.status}
                            </Badge>
                            <span className="tabular-nums text-muted-foreground">
                              {q.total != null
                                ? `$${q.total.toLocaleString()}`
                                : "—"}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-2 text-sm text-muted-foreground">
                      No quotes yet.
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <Card>
      <CardContent className="p-4">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="mt-1 text-2xl font-semibold tabular-nums">{value}</p>
      </CardContent>
    </Card>
  );
}

function Info({ label, value }: { label: string; value: string | null }) {
  return (
    <div>
      <span className="text-muted-foreground">{label}: </span>
      <span>{value || "—"}</span>
    </div>
  );
}
