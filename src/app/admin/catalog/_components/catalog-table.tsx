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
import { ServiceDialog } from "./service-dialog";
import { deleteService } from "@/lib/admin/actions/catalog-actions";
import {
  SERVICE_CATEGORY_LABELS,
  UNIT_OF_MEASURE_LABELS,
} from "@/lib/constants";
import type { Service } from "@/lib/admin/queries/catalog-queries";

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

export function CatalogTable({ services }: { services: Service[] }) {
  const [editService, setEditService] = useState<Service | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Service | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    if (!deleteTarget) return;
    startTransition(async () => {
      await deleteService(deleteTarget.id);
      setDeleteTarget(null);
    });
  }

  if (services.length === 0) {
    return (
      <div className="rounded-lg border border-dashed p-12 text-center text-muted-foreground">
        No services yet. Add your first service to build your catalog.
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
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Unit</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-24">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {services.map((service) => (
              <TableRow key={service.id}>
                <TableCell className="font-medium">{service.name}</TableCell>
                <TableCell>
                  {SERVICE_CATEGORY_LABELS[service.category] ?? service.category}
                </TableCell>
                <TableCell>{formatPrice(service.base_price)}</TableCell>
                <TableCell>
                  {UNIT_OF_MEASURE_LABELS[service.unit_of_measure] ??
                    service.unit_of_measure}
                </TableCell>
                <TableCell>
                  {service.is_add_on && (
                    <Badge variant="outline">Add-On</Badge>
                  )}
                </TableCell>
                <TableCell>
                  <Badge variant={service.is_active ? "secondary" : "outline"}>
                    {service.is_active ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon-xs"
                      onClick={() => setEditService(service)}
                    >
                      <Pencil className="size-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon-xs"
                      onClick={() => setDeleteTarget(service)}
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
        {services.map((service) => (
          <Card key={service.id}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="font-medium">{service.name}</p>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {SERVICE_CATEGORY_LABELS[service.category] ?? service.category}
                    {" · "}
                    {UNIT_OF_MEASURE_LABELS[service.unit_of_measure] ??
                      service.unit_of_measure}
                  </p>
                </div>
                <div className="flex gap-1 shrink-0">
                  <Button
                    variant="ghost"
                    size="icon-xs"
                    onClick={() => setEditService(service)}
                  >
                    <Pencil className="size-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-xs"
                    onClick={() => setDeleteTarget(service)}
                  >
                    <Trash2 className="size-3.5 text-destructive" />
                  </Button>
                </div>
              </div>
              <div className="mt-2 flex items-center justify-between text-sm">
                <span className="font-medium tabular-nums">
                  {formatPrice(service.base_price)}
                </span>
                <div className="flex gap-1">
                  {service.is_add_on && (
                    <Badge variant="outline" className="text-xs">Add-On</Badge>
                  )}
                  <Badge
                    variant={service.is_active ? "secondary" : "outline"}
                    className="text-xs"
                  >
                    {service.is_active ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <ServiceDialog
        open={!!editService}
        onOpenChange={(open) => !open && setEditService(null)}
        service={editService}
      />

      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title="Delete Service"
        description={`Are you sure you want to delete "${deleteTarget?.name}"? This action cannot be undone.`}
        onConfirm={handleDelete}
        isPending={isPending}
      />
    </>
  );
}
