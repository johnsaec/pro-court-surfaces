"use client";

import { forwardRef } from "react";
import Link from "next/link";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Mail, Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { LEAD_SOURCE_LABELS } from "@/lib/constants";
import type { Lead } from "@/lib/admin/queries/lead-queries";

type KanbanCardProps = {
  lead: Lead;
  isDragOverlay?: boolean;
};

export const KanbanCardContent = forwardRef<
  HTMLDivElement,
  KanbanCardProps & React.HTMLAttributes<HTMLDivElement>
>(function KanbanCardContent({ lead, isDragOverlay, style, ...props }, ref) {
  return (
    <Card
      ref={ref}
      className={`cursor-grab active:cursor-grabbing ${
        isDragOverlay ? "shadow-lg rotate-2 opacity-90" : ""
      }`}
      style={style}
      {...props}
    >
      <CardContent className="p-3 space-y-1.5">
        <Link
          href={`/admin/leads/${lead.id}`}
          className="font-medium text-sm hover:underline text-primary block truncate"
          onClick={(e) => {
            // Prevent navigation when dragging
            if (isDragOverlay) e.preventDefault();
          }}
          onPointerDown={(e) => e.stopPropagation()}
        >
          {lead.display_name}
        </Link>

        {(lead.email || lead.phone) && (
          <div className="space-y-0.5 text-xs text-muted-foreground">
            {lead.email && (
              <div className="flex items-center gap-1 truncate">
                <Mail className="size-3 shrink-0" />
                <span className="truncate">{lead.email}</span>
              </div>
            )}
            {lead.phone && (
              <div className="flex items-center gap-1">
                <Phone className="size-3 shrink-0" />
                {lead.phone}
              </div>
            )}
          </div>
        )}

        {lead.lead_source && (
          <p className="text-xs text-muted-foreground">
            {LEAD_SOURCE_LABELS[lead.lead_source] ?? lead.lead_source}
          </p>
        )}
      </CardContent>
    </Card>
  );
});

export function KanbanCard({ lead }: { lead: Lead }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id: lead.id, data: { lead } });

  const style = transform
    ? { transform: CSS.Translate.toString(transform) }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={isDragging ? "opacity-30" : ""}
    >
      <KanbanCardContent lead={lead} />
    </div>
  );
}
