"use client";

import { useDroppable } from "@dnd-kit/core";
import { DEAL_STAGE_LABELS, DEAL_STAGE_COLORS } from "@/lib/constants";
import { KanbanCard } from "./kanban-card";
import type { Lead } from "@/lib/admin/queries/lead-queries";

type KanbanColumnProps = {
  stage: string;
  leads: Lead[];
};

export function KanbanColumn({ stage, leads }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id: stage });

  return (
    <div className="flex flex-col w-64 shrink-0">
      <div className="flex items-center gap-2 mb-2 px-1">
        <span
          className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
            DEAL_STAGE_COLORS[stage] ?? ""
          }`}
        >
          {DEAL_STAGE_LABELS[stage] ?? stage}
        </span>
        <span className="text-xs text-muted-foreground">{leads.length}</span>
      </div>

      <div
        ref={setNodeRef}
        className={`flex-1 rounded-lg border bg-muted/40 p-2 space-y-2 min-h-[100px] transition-colors ${
          isOver ? "ring-2 ring-primary/50 bg-primary/5" : ""
        }`}
      >
        {leads.map((lead) => (
          <KanbanCard key={lead.id} lead={lead} />
        ))}
      </div>
    </div>
  );
}
