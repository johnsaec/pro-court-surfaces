"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CourtDiagram } from "./court-diagram";
import { ColorPickerSheet } from "./color-picker-sheet";
import type { Color } from "@/lib/admin/queries/color-queries";
import type { ColorSelections } from "@/lib/quotes/quote-calculator";

type CourtZone = "outside" | "inside" | "lines";

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
        : colorSelections.lines_id;

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
          linesColor={linesColor?.hex_code ?? "#FFFFFF"}
          activeZone={activeZone}
          onZoneClick={handleZoneClick}
        />

        {/* Current color labels */}
        <div className="grid grid-cols-3 gap-4 text-center text-sm">
          <ColorLabel label="Outside" color={outsideColor} onClick={() => handleZoneClick("outside")} />
          <ColorLabel label="Inside" color={insideColor} onClick={() => handleZoneClick("inside")} />
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
          colors={colors}
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
