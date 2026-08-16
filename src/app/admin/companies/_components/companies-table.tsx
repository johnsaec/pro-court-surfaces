"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { CompanyDialog } from "./company-dialog";
import { deleteCompany } from "@/lib/admin/actions/company-actions";
import { COMPANY_TYPE_LABELS, COMPANY_TYPE_COLORS } from "@/lib/constants";
import type { Company } from "@/lib/admin/queries/company-queries";

function TypeBadge({ type }: { type: string | null }) {
  if (!type) return <span className="text-muted-foreground">—</span>;
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
        COMPANY_TYPE_COLORS[type] ?? "bg-gray-100 text-gray-700"
      }`}
    >
      {COMPANY_TYPE_LABELS[type] ?? type}
    </span>
  );
}

export function CompaniesTable({ companies }: { companies: Company[] }) {
  const [editCompany, setEditCompany] = useState<Company | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Company | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    if (!deleteTarget) return;
    startTransition(async () => {
      await deleteCompany(deleteTarget.id);
      setDeleteTarget(null);
    });
  }

  if (companies.length === 0) {
    return (
      <div className="rounded-lg border border-dashed p-12 text-center text-muted-foreground">
        No companies yet. Add a GC, builder, or HOA to group their contacts and quotes.
      </div>
    );
  }

  return (
    <>
      {/* Desktop table */}
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>City</TableHead>
              <TableHead className="w-24">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {companies.map((company) => (
              <TableRow key={company.id}>
                <TableCell className="font-medium">
                  <Link
                    href={`/admin/companies/${company.id}`}
                    className="hover:underline"
                  >
                    {company.name}
                  </Link>
                </TableCell>
                <TableCell>
                  <TypeBadge type={company.company_type} />
                </TableCell>
                <TableCell>{company.email ?? "—"}</TableCell>
                <TableCell>{company.phone ?? "—"}</TableCell>
                <TableCell>
                  {company.city
                    ? `${company.city}, ${company.state ?? "TX"}`
                    : "—"}
                </TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon-xs"
                      onClick={() => setEditCompany(company)}
                    >
                      <Pencil className="size-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon-xs"
                      onClick={() => setDeleteTarget(company)}
                    >
                      <Trash2 className="size-3.5 text-destructive" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile cards */}
      <div className="space-y-3 md:hidden">
        {companies.map((company) => (
          <Card key={company.id}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <Link
                    href={`/admin/companies/${company.id}`}
                    className="font-medium hover:underline"
                  >
                    {company.name}
                  </Link>
                  <div className="mt-1">
                    <TypeBadge type={company.company_type} />
                  </div>
                </div>
                <div className="flex gap-1 shrink-0">
                  <Button
                    variant="ghost"
                    size="icon-xs"
                    onClick={() => setEditCompany(company)}
                  >
                    <Pencil className="size-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-xs"
                    onClick={() => setDeleteTarget(company)}
                  >
                    <Trash2 className="size-3.5 text-destructive" />
                  </Button>
                </div>
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                {company.email ?? "No email"}
                {company.city && ` · ${company.city}, ${company.state ?? "TX"}`}
              </div>
              {company.tags && company.tags.length > 0 && (
                <div className="mt-2 flex gap-1 flex-wrap">
                  {company.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <CompanyDialog
        open={!!editCompany}
        onOpenChange={(open) => !open && setEditCompany(null)}
        company={editCompany}
      />

      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title="Delete Company"
        description={`Are you sure you want to delete "${deleteTarget?.name}"? Its contacts and quotes stay, but they'll be unlinked from this company.`}
        onConfirm={handleDelete}
        isPending={isPending}
      />
    </>
  );
}
