"use client";

import { useState, useTransition } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { ColorDialog } from "./color-dialog";
import { deleteColor } from "@/lib/admin/actions/color-actions";
import type { Color } from "@/lib/admin/queries/color-queries";

export function ColorsGrid({ colors }: { colors: Color[] }) {
  const [editColor, setEditColor] = useState<Color | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Color | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    if (!deleteTarget) return;
    startTransition(async () => {
      await deleteColor(deleteTarget.id);
      setDeleteTarget(null);
    });
  }

  if (colors.length === 0) {
    return (
      <div className="rounded-lg border border-dashed p-12 text-center text-muted-foreground">
        No colors yet. Add your first color to build your palette.
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {colors.map((color) => (
          <Card key={color.id} className="overflow-hidden py-0 gap-0">
            <div
              className="h-20"
              style={{ backgroundColor: color.hex_code }}
            />
            <CardHeader className="pb-2 pt-4">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-sm">{color.name}</CardTitle>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {color.hex_code}
                    {color.color_code && ` | ${color.color_code}`}
                  </p>
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon-xs"
                    onClick={() => setEditColor(color)}
                  >
                    <Pencil className="size-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-xs"
                    onClick={() => setDeleteTarget(color)}
                  >
                    <Trash2 className="size-3.5 text-destructive" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pb-4">
              <p className="text-xs text-muted-foreground">
                {color.manufacturer}
                {color.product_line && ` — ${color.product_line}`}
              </p>
              <div className="mt-2 flex flex-wrap gap-1">
                {color.recommended_for?.map((r) => (
                  <Badge key={r} variant="outline" className="text-xs capitalize">
                    {r}
                  </Badge>
                ))}
                {color.is_premium && (
                  <Badge variant="secondary" className="text-xs">
                    Premium
                  </Badge>
                )}
                {!color.is_active && (
                  <Badge variant="outline" className="text-xs">
                    Inactive
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <ColorDialog
        open={!!editColor}
        onOpenChange={(open) => !open && setEditColor(null)}
        color={editColor}
      />

      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title="Delete Color"
        description={`Are you sure you want to delete "${deleteTarget?.name}"? This action cannot be undone.`}
        onConfirm={handleDelete}
        isPending={isPending}
      />
    </>
  );
}
