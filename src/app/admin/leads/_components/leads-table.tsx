"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { deleteLead } from "@/lib/admin/actions/lead-actions";
import {
  DEAL_STAGE_LABELS,
  DEAL_STAGE_COLORS,
  LEAD_SOURCE_LABELS,
} from "@/lib/constants";
import type { Lead } from "@/lib/admin/queries/lead-queries";

export function LeadsTable({ leads }: { leads: Lead[] }) {
  const [deleteTarget, setDeleteTarget] = useState<Lead | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    if (!deleteTarget) return;
    startTransition(async () => {
      await deleteLead(deleteTarget.id);
      setDeleteTarget(null);
    });
  }

  if (leads.length === 0) {
    return (
      <div className="rounded-lg border border-dashed p-12 text-center text-muted-foreground">
        No leads yet. Create your first lead to start tracking prospects.
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
              <TableHead>Stage</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>City</TableHead>
              <TableHead className="w-16">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leads.map((lead) => (
              <TableRow key={lead.id}>
                <TableCell className="font-medium">
                  <Link
                    href={`/admin/leads/${lead.id}`}
                    className="hover:underline text-primary"
                  >
                    {lead.display_name}
                  </Link>
                </TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${DEAL_STAGE_COLORS[lead.deal_stage] ?? ""}`}
                  >
                    {DEAL_STAGE_LABELS[lead.deal_stage] ?? lead.deal_stage}
                  </span>
                </TableCell>
                <TableCell>
                  {lead.lead_source
                    ? LEAD_SOURCE_LABELS[lead.lead_source] ?? lead.lead_source
                    : "—"}
                </TableCell>
                <TableCell>{lead.email ?? "—"}</TableCell>
                <TableCell>{lead.phone ?? "—"}</TableCell>
                <TableCell>{lead.city ?? "—"}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon-xs"
                    onClick={() => setDeleteTarget(lead)}
                  >
                    <Trash2 className="size-3.5 text-destructive" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile cards */}
      <div className="space-y-3 md:hidden">
        {leads.map((lead) => (
          <Card key={lead.id}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <Link
                    href={`/admin/leads/${lead.id}`}
                    className="font-medium hover:underline text-primary"
                  >
                    {lead.display_name}
                  </Link>
                  {(lead.email || lead.phone) && (
                    <p className="text-sm text-muted-foreground truncate mt-0.5">
                      {lead.email ?? lead.phone}
                    </p>
                  )}
                </div>
                <span
                  className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium shrink-0 ${DEAL_STAGE_COLORS[lead.deal_stage] ?? ""}`}
                >
                  {DEAL_STAGE_LABELS[lead.deal_stage] ?? lead.deal_stage}
                </span>
              </div>
              <div className="mt-2 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  {lead.lead_source
                    ? LEAD_SOURCE_LABELS[lead.lead_source] ?? lead.lead_source
                    : "No source"}
                  {lead.city && ` · ${lead.city}`}
                </span>
                <Button
                  variant="ghost"
                  size="icon-xs"
                  onClick={() => setDeleteTarget(lead)}
                >
                  <Trash2 className="size-3.5 text-destructive" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title="Delete Lead"
        description={`Are you sure you want to delete "${deleteTarget?.display_name}"? This action cannot be undone.`}
        onConfirm={handleDelete}
        isPending={isPending}
      />
    </>
  );
}
