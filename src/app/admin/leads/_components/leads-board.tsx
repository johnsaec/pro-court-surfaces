"use client";

import { useId, useState, useTransition } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragEndEvent,
} from "@dnd-kit/core";
import { toast } from "sonner";
import { DEAL_STAGE_LABELS } from "@/lib/constants";
import { updateLeadStage } from "@/lib/admin/actions/lead-actions";
import { KanbanColumn } from "./kanban-column";
import { KanbanCardContent } from "./kanban-card";
import type { Lead } from "@/lib/admin/queries/lead-queries";

const STAGES = Object.keys(DEAL_STAGE_LABELS);

export function LeadsBoard({ leads: initialLeads }: { leads: Lead[] }) {
  const dndId = useId();
  const [leads, setLeads] = useState(initialLeads);
  const [activeCard, setActiveCard] = useState<Lead | null>(null);
  const [, startTransition] = useTransition();

  // Require 5px movement before starting drag to allow clicks on links
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const grouped = STAGES.reduce<Record<string, Lead[]>>((acc, stage) => {
    acc[stage] = leads.filter((l) => l.deal_stage === stage);
    return acc;
  }, {});

  function handleDragStart(event: DragStartEvent) {
    const lead = event.active.data.current?.lead as Lead | undefined;
    setActiveCard(lead ?? null);
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveCard(null);
    const { active, over } = event;
    if (!over) return;

    const leadId = active.id as string;
    const newStage = over.id as string;
    const lead = leads.find((l) => l.id === leadId);

    if (!lead || lead.deal_stage === newStage) return;

    // Optimistic update
    const previousLeads = leads;
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, deal_stage: newStage } : l))
    );

    startTransition(async () => {
      const result = await updateLeadStage(leadId, newStage);
      if (!result.success) {
        setLeads(previousLeads);
        toast.error("Failed to update stage", {
          description: result.error,
        });
      }
    });
  }

  return (
    <DndContext
      id={dndId}
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="overflow-x-auto pb-4">
        <div className="flex gap-3 min-w-max">
          {STAGES.map((stage) => (
            <KanbanColumn
              key={stage}
              stage={stage}
              leads={grouped[stage] ?? []}
            />
          ))}
        </div>
      </div>

      <DragOverlay>
        {activeCard ? (
          <KanbanCardContent lead={activeCard} isDragOverlay />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
