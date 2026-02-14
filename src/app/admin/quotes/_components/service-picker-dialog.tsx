"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  SERVICE_CATEGORY_LABELS,
  UNIT_OF_MEASURE_LABELS,
} from "@/lib/constants";
import { lineItemFromService } from "@/lib/admin/quote-builder-reducer";
import type { Service } from "@/lib/admin/queries/catalog-queries";
import type { ProjectOption, QuoteBuilderAction } from "@/lib/admin/types/quote-types";

interface ServicePickerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  services: Service[];
  packageKey: string;
  project: ProjectOption | null;
  dispatch: React.Dispatch<QuoteBuilderAction>;
}

function getDefaultQuantity(service: Service, project: ProjectOption | null): number {
  if (!project) return 1;
  switch (service.unit_of_measure) {
    case "per_sqft":
      return project.square_feet ?? 1;
    case "per_court":
      return project.number_of_courts ?? 1;
    case "per_linear_ft":
      return project.crack_length_ft ?? 1;
    case "each":
      return project.bird_bath_count ?? 1;
    default:
      return 1;
  }
}

export function ServicePickerDialog({
  open,
  onOpenChange,
  services,
  packageKey,
  project,
  dispatch,
}: ServicePickerDialogProps) {
  const [search, setSearch] = useState("");

  const activeServices = useMemo(
    () => services.filter((s) => s.is_active),
    [services]
  );

  const filtered = useMemo(() => {
    if (!search.trim()) return activeServices;
    const q = search.toLowerCase();
    return activeServices.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q)
    );
  }, [activeServices, search]);

  function addService(service: Service) {
    const qty = getDefaultQuantity(service, project);
    const item = lineItemFromService(service, qty);
    dispatch({ type: "ADD_LINE_ITEM", packageKey, item });
    onOpenChange(false);
    setSearch("");
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Add Service</DialogTitle>
        </DialogHeader>

        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search services..."
            className="pl-9"
          />
        </div>

        <div className="overflow-auto flex-1 -mx-6 px-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Service</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead className="text-right">Base Price</TableHead>
                <TableHead className="w-20" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((service) => (
                <TableRow key={service.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{service.name}</div>
                      {service.description && (
                        <div className="text-xs text-muted-foreground">
                          {service.description}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {SERVICE_CATEGORY_LABELS[service.category] ??
                        service.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {UNIT_OF_MEASURE_LABELS[service.unit_of_measure] ??
                      service.unit_of_measure}
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    ${service.base_price.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => addService(service)}
                    >
                      Add
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center text-muted-foreground py-8"
                  >
                    No services found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
}
