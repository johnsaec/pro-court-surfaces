"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { Pencil, Eye, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { deleteQuote } from "@/lib/admin/actions/quote-actions";
import {
  QUOTE_STATUS_LABELS,
  QUOTE_STATUS_COLORS,
} from "@/lib/constants";
import type { QuoteListRow } from "@/lib/admin/types/quote-types";

export function QuotesTable({ quotes }: { quotes: QuoteListRow[] }) {
  const [deleteTarget, setDeleteTarget] = useState<QuoteListRow | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    if (!deleteTarget) return;
    startTransition(async () => {
      await deleteQuote(deleteTarget.id);
      setDeleteTarget(null);
    });
  }

  if (quotes.length === 0) {
    return (
      <div className="rounded-lg border border-dashed p-12 text-center text-muted-foreground">
        No quotes yet. Create your first quote to get started.
      </div>
    );
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Quote #</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Project</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Total</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="w-28">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {quotes.map((quote) => (
            <TableRow key={quote.id}>
              <TableCell className="font-medium">
                {quote.quote_number}
              </TableCell>
              <TableCell>
                {quote.customer?.display_name ??
                  (quote.lead ? `Lead: ${quote.lead.display_name}` : "—")}
              </TableCell>
              <TableCell>{quote.project?.name ?? "—"}</TableCell>
              <TableCell>
                <Badge className={QUOTE_STATUS_COLORS[quote.status]}>
                  {QUOTE_STATUS_LABELS[quote.status] ?? quote.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right tabular-nums">
                {quote.total != null ? `$${quote.total.toFixed(2)}` : "—"}
              </TableCell>
              <TableCell>
                {new Date(quote.created_at).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon-xs" asChild>
                    <Link href={`/admin/quotes/${quote.id}`}>
                      <Pencil className="size-3.5" />
                    </Link>
                  </Button>
                  <Button variant="ghost" size="icon-xs" asChild>
                    <Link href={`/admin/quotes/${quote.id}/preview`}>
                      <Eye className="size-3.5" />
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-xs"
                    onClick={() => setDeleteTarget(quote)}
                  >
                    <Trash2 className="size-3.5 text-destructive" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title="Delete Quote"
        description={`Are you sure you want to delete quote "${deleteTarget?.quote_number}"? This action cannot be undone.`}
        onConfirm={handleDelete}
        isPending={isPending}
      />
    </>
  );
}
