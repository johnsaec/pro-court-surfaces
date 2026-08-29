"use client";

import { useState } from "react";
import { CourtDiagram } from "./court-diagram";
import { ColorPickerSheet } from "./color-picker-sheet";
import type { Color } from "@/lib/admin/queries/color-queries";
import type { ColorSelections } from "@/lib/quotes/quote-calculator";

type CourtZone = "outside" | "inside" | "lines" | "nvz";

const LINE_COLOR_NAMES = new Set(["white", "black", "gray", "yellow"]);

interface ColorSelectorProps {
  courtType: "pickleball" | "tennis";
  sports?: string[];
  colors: Color[];
  colorSelections: ColorSelections;
  onColorChange: (zone: CourtZone, colorId: string) => void;
  readOnly?: boolean;
}

export function ColorSelector({
  courtType,
  sports = [],
  colors,
  colorSelections,
  onColorChange,
  readOnly,
}: ColorSelectorProps) {
  const [activeZone, setActiveZone] = useState<CourtZone | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const insideColor = colors.find((c) => c.id === colorSelections.inside_id);
  const outsideColor = colors.find((c) => c.id === colorSelections.outside_id);
  const nvzColor = colors.find((c) => c.id === colorSelections.nvz_id);
  const linesColor = colors.find((c) => c.id === colorSelections.lines_id);

  function handleZoneClick(zone: CourtZone) {
    if (readOnly) return;
    setActiveZone(zone);
    setSheetOpen(true);
  }

  function handleColorSelect(colorId: string) {
    if (activeZone) {
      onColorChange(activeZone, colorId);
    }
  }

  const currentSelectedId =
    activeZone === "inside"
      ? colorSelections.inside_id
      : activeZone === "outside"
        ? colorSelections.outside_id
        : activeZone === "nvz"
          ? colorSelections.nvz_id
          : colorSelections.lines_id;

  const sheetColors = activeZone === "lines"
    ? colors.filter((c) => LINE_COLOR_NAMES.has(c.name.toLowerCase()))
    : colors;

  return (
    <div className="space-y-5">
      <p className="text-[11px] text-stone-400 uppercase tracking-[0.2em] font-medium">
        Court Colors
      </p>

      <div className="rounded-lg border border-stone-200 bg-white p-5 sm:p-8">
        <CourtDiagram
          courtType={courtType}
          sports={sports}
          outsideColor={outsideColor?.hex_code ?? "#8B9467"}
          insideColor={insideColor?.hex_code ?? "#4A7C59"}
          nvzColor={nvzColor?.hex_code ?? "#3B82F6"}
          linesColor={linesColor?.hex_code ?? "#FFFFFF"}
          activeZone={activeZone}
          onZoneClick={handleZoneClick}
        />

        {courtType === "tennis" && (sports.includes("pickleball") || sports.includes("basketball")) && (
          <p className="text-[11px] text-stone-400 text-center mt-3">
            Solid lines: tennis · Dashed: {[sports.includes("pickleball") && "pickleball", sports.includes("basketball") && "basketball"].filter(Boolean).join(" + ")} overlay
          </p>
        )}

        {/* Color swatches row */}
        <div className="grid grid-cols-4 gap-3 sm:gap-6 mt-6 pt-5 border-t border-stone-100">
          <ColorLabel
            label="Outside"
            color={outsideColor}
            onClick={() => handleZoneClick("outside")}
          />
          <ColorLabel
            label="Inside"
            color={insideColor}
            onClick={() => handleZoneClick("inside")}
          />
          <ColorLabel
            label="NVZ"
            color={nvzColor}
            onClick={() => handleZoneClick("nvz")}
          />
          <ColorLabel
            label="Lines"
            color={linesColor}
            onClick={() => handleZoneClick("lines")}
          />
        </div>

        {!readOnly && (
          <p className="text-[11px] text-stone-400 text-center mt-4">
            Tap the court diagram or swatches to change colors
          </p>
        )}
      </div>

      <ColorPickerSheet
        open={sheetOpen}
        zone={activeZone}
        colors={sheetColors}
        selectedColorId={currentSelectedId}
        onSelect={handleColorSelect}
        onClose={() => setSheetOpen(false)}
      />
    </div>
  );
}

function ColorLabel({
  label,
  color,
  onClick,
}: {
  label: string;
  color: { hex_code: string; name: string } | undefined;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-2 hover:opacity-80 transition-opacity"
    >
      <div
        className="w-8 h-8 rounded-full border-2 border-stone-200 shadow-sm"
        style={{ backgroundColor: color?.hex_code ?? "#ccc" }}
      />
      <div className="text-center">
        <span className="block text-xs font-medium text-stone-600">{label}</span>
        <span className="block text-[10px] text-stone-400 mt-0.5">
          {color?.name ?? "Not set"}
        </span>
      </div>
    </button>
  );
}
