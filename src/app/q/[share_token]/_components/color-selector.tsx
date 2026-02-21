"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CourtDiagram } from "./court-diagram";
import { ColorPickerSheet } from "./color-picker-sheet";
import type { Color } from "@/lib/admin/queries/color-queries";
import type { ColorSelections } from "@/lib/quotes/quote-calculator";

type CourtZone = "outside" | "inside" | "lines" | "nvz";

const LINE_COLOR_NAMES = new Set(["white", "black", "gray", "yellow"]);

interface ColorSelectorProps {
  courtType: "pickleball" | "tennis";
  colors: Color[];
  colorSelections: ColorSelections;
  onColorChange: (zone: CourtZone, colorId: string) => void;
  readOnly?: boolean;
}

export function ColorSelector({
  courtType,
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

  // Filter colors for lines zone to only show white/black/gray/yellow
  const sheetColors = activeZone === "lines"
    ? colors.filter((c) => LINE_COLOR_NAMES.has(c.name.toLowerCase()))
    : colors;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Court Colors</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CourtDiagram
          courtType={courtType}
          outsideColor={outsideColor?.hex_code ?? "#8B9467"}
          insideColor={insideColor?.hex_code ?? "#4A7C59"}
          nvzColor={nvzColor?.hex_code ?? "#3B82F6"}
          linesColor={linesColor?.hex_code ?? "#FFFFFF"}
          activeZone={activeZone}
          onZoneClick={handleZoneClick}
        />

        {/* Current color labels */}
        <div className="grid grid-cols-4 gap-4 text-center text-sm">
          <ColorLabel label="Outside" color={outsideColor} onClick={() => handleZoneClick("outside")} />
          <ColorLabel label="Inside" color={insideColor} onClick={() => handleZoneClick("inside")} />
          <ColorLabel label="NVZ" color={nvzColor} onClick={() => handleZoneClick("nvz")} />
          <ColorLabel label="Lines" color={linesColor} onClick={() => handleZoneClick("lines")} />
        </div>

        {!readOnly && (
          <p className="text-xs text-muted-foreground text-center">
            Click on the court diagram or color labels to change colors
          </p>
        )}

        <ColorPickerSheet
          open={sheetOpen}
          zone={activeZone}
          colors={sheetColors}
          selectedColorId={currentSelectedId}
          onSelect={handleColorSelect}
          onClose={() => setSheetOpen(false)}
        />
      </CardContent>
    </Card>
  );
}

function ColorLabel({
  label,
  color,
  onClick,
}: {
  label: string;
  color: Color | undefined;
  onClick: () => void;
}) {
  return (
    <button onClick={onClick} className="flex flex-col items-center gap-1.5 hover:opacity-80 transition-opacity">
      <div
        className="w-6 h-6 rounded-full border"
        style={{ backgroundColor: color?.hex_code ?? "#ccc" }}
      />
      <span className="font-medium">{label}</span>
      <span className="text-xs text-muted-foreground">{color?.name ?? "Not set"}</span>
    </button>
  );
}
