"use client";

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
import { CustomerDialog } from "./customer-dialog";
import { deleteCustomer } from "@/lib/admin/actions/customer-actions";
import type { Customer } from "@/lib/admin/queries/customer-queries";

export function CustomersTable({ customers }: { customers: Customer[] }) {
  const [editCustomer, setEditCustomer] = useState<Customer | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Customer | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    if (!deleteTarget) return;
    startTransition(async () => {
      await deleteCustomer(deleteTarget.id);
      setDeleteTarget(null);
    });
  }

  if (customers.length === 0) {
    return (
      <div className="rounded-lg border border-dashed p-12 text-center text-muted-foreground">
        No customers yet. Create your first customer to get started.
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
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>City</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead className="w-24">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell className="font-medium">
                  {customer.display_name}
                </TableCell>
                <TableCell>{customer.email ?? "—"}</TableCell>
                <TableCell>{customer.phone ?? "—"}</TableCell>
                <TableCell>
                  {customer.city
                    ? `${customer.city}, ${customer.state ?? "TX"}`
                    : "—"}
                </TableCell>
                <TableCell>
                  <div className="flex gap-1 flex-wrap">
                    {customer.tags?.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon-xs"
                      onClick={() => setEditCustomer(customer)}
                    >
                      <Pencil className="size-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon-xs"
                      onClick={() => setDeleteTarget(customer)}
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
        {customers.map((customer) => (
          <Card key={customer.id}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="font-medium">{customer.display_name}</p>
                  {customer.email && (
                    <p className="text-sm text-muted-foreground truncate mt-0.5">
                      {customer.email}
                    </p>
                  )}
                </div>
                <div className="flex gap-1 shrink-0">
                  <Button
                    variant="ghost"
                    size="icon-xs"
                    onClick={() => setEditCustomer(customer)}
                  >
                    <Pencil className="size-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-xs"
                    onClick={() => setDeleteTarget(customer)}
                  >
                    <Trash2 className="size-3.5 text-destructive" />
                  </Button>
                </div>
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                {customer.phone ?? "No phone"}
                {customer.city && ` · ${customer.city}, ${customer.state ?? "TX"}`}
              </div>
              {customer.tags && customer.tags.length > 0 && (
                <div className="mt-2 flex gap-1 flex-wrap">
                  {customer.tags.map((tag) => (
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

      <CustomerDialog
        open={!!editCustomer}
        onOpenChange={(open) => !open && setEditCustomer(null)}
        customer={editCustomer}
      />

      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title="Delete Customer"
        description={`Are you sure you want to delete "${deleteTarget?.display_name}"? This action cannot be undone.`}
        onConfirm={handleDelete}
        isPending={isPending}
      />
    </>
  );
}
