"use client";

type CourtZone = "outside" | "inside" | "lines";

interface CourtDiagramProps {
  courtType: "pickleball" | "tennis";
  outsideColor: string;
  insideColor: string;
  linesColor: string;
  activeZone: CourtZone | null;
  onZoneClick: (zone: CourtZone) => void;
}

const ZONE_HIGHLIGHT = "drop-shadow(0 0 6px rgba(59,130,246,0.6))";

export function CourtDiagram({
  courtType,
  outsideColor,
  insideColor,
  linesColor,
  activeZone,
  onZoneClick,
}: CourtDiagramProps) {
  if (courtType === "pickleball") {
    return (
      <PickleballCourt
        outsideColor={outsideColor}
        insideColor={insideColor}
        linesColor={linesColor}
        activeZone={activeZone}
        onZoneClick={onZoneClick}
      />
    );
  }

  return (
    <TennisCourt
      outsideColor={outsideColor}
      insideColor={insideColor}
      linesColor={linesColor}
      activeZone={activeZone}
      onZoneClick={onZoneClick}
    />
  );
}

type CourtProps = Omit<CourtDiagramProps, "courtType">;

function PickleballCourt({
  outsideColor,
  insideColor,
  linesColor,
  activeZone,
  onZoneClick,
}: CourtProps) {
  // Pickleball: 44' x 20' → viewBox 880x400, with 60px padding
  const pad = 60;
  const w = 880;
  const h = 400;
  const vw = w + pad * 2;
  const vh = h + pad * 2;

  return (
    <svg
      viewBox={`0 0 ${vw} ${vh}`}
      className="w-full max-w-xl mx-auto"
      role="img"
      aria-label="Pickleball court diagram"
    >
      {/* Outside area */}
      <rect
        x={0}
        y={0}
        width={vw}
        height={vh}
        fill={outsideColor}
        className="cursor-pointer"
        style={activeZone === "outside" ? { filter: ZONE_HIGHLIGHT } : undefined}
        onClick={() => onZoneClick("outside")}
      />

      {/* Inside playing area */}
      <rect
        x={pad}
        y={pad}
        width={w}
        height={h}
        fill={insideColor}
        className="cursor-pointer"
        style={activeZone === "inside" ? { filter: ZONE_HIGHLIGHT } : undefined}
        onClick={() => onZoneClick("inside")}
      />

      {/* Lines group */}
      <g
        className="cursor-pointer"
        style={activeZone === "lines" ? { filter: ZONE_HIGHLIGHT } : undefined}
        onClick={() => onZoneClick("lines")}
      >
        {/* Court boundary */}
        <rect
          x={pad}
          y={pad}
          width={w}
          height={h}
          fill="none"
          stroke={linesColor}
          strokeWidth={4}
        />
        {/* Center line (net) */}
        <line
          x1={pad + w / 2}
          y1={pad}
          x2={pad + w / 2}
          y2={pad + h}
          stroke={linesColor}
          strokeWidth={4}
        />
        {/* Non-Volley Zone (kitchen) lines — 7' from net each side = 140px */}
        <line
          x1={pad + w / 2 - 140}
          y1={pad}
          x2={pad + w / 2 - 140}
          y2={pad + h}
          stroke={linesColor}
          strokeWidth={3}
        />
        <line
          x1={pad + w / 2 + 140}
          y1={pad}
          x2={pad + w / 2 + 140}
          y2={pad + h}
          stroke={linesColor}
          strokeWidth={3}
        />
        {/* Center service lines */}
        <line
          x1={pad}
          y1={pad + h / 2}
          x2={pad + w / 2 - 140}
          y2={pad + h / 2}
          stroke={linesColor}
          strokeWidth={3}
        />
        <line
          x1={pad + w / 2 + 140}
          y1={pad + h / 2}
          x2={pad + w}
          y2={pad + h / 2}
          stroke={linesColor}
          strokeWidth={3}
        />
      </g>
    </svg>
  );
}

function TennisCourt({
  outsideColor,
  insideColor,
  linesColor,
  activeZone,
  onZoneClick,
}: CourtProps) {
  // Tennis: 78' x 36' → viewBox 1560x720, with 80px padding
  const pad = 80;
  const w = 1560;
  const h = 720;
  const vw = w + pad * 2;
  const vh = h + pad * 2;

  // Doubles sideline offset: singles court is 27' wide = 540px, so 90px alley each side
  const alley = 90;
  // Service box depth: 21' = 420px from net
  const serviceDepth = 420;

  return (
    <svg
      viewBox={`0 0 ${vw} ${vh}`}
      className="w-full max-w-2xl mx-auto"
      role="img"
      aria-label="Tennis court diagram"
    >
      {/* Outside area */}
      <rect
        x={0}
        y={0}
        width={vw}
        height={vh}
        fill={outsideColor}
        className="cursor-pointer"
        style={activeZone === "outside" ? { filter: ZONE_HIGHLIGHT } : undefined}
        onClick={() => onZoneClick("outside")}
      />

      {/* Inside playing area */}
      <rect
        x={pad}
        y={pad}
        width={w}
        height={h}
        fill={insideColor}
        className="cursor-pointer"
        style={activeZone === "inside" ? { filter: ZONE_HIGHLIGHT } : undefined}
        onClick={() => onZoneClick("inside")}
      />

      {/* Lines group */}
      <g
        className="cursor-pointer"
        style={activeZone === "lines" ? { filter: ZONE_HIGHLIGHT } : undefined}
        onClick={() => onZoneClick("lines")}
      >
        {/* Court boundary (doubles) */}
        <rect
          x={pad}
          y={pad}
          width={w}
          height={h}
          fill="none"
          stroke={linesColor}
          strokeWidth={4}
        />
        {/* Singles sidelines */}
        <line
          x1={pad}
          y1={pad + alley}
          x2={pad + w}
          y2={pad + alley}
          stroke={linesColor}
          strokeWidth={3}
        />
        <line
          x1={pad}
          y1={pad + h - alley}
          x2={pad + w}
          y2={pad + h - alley}
          stroke={linesColor}
          strokeWidth={3}
        />
        {/* Net (center vertical) */}
        <line
          x1={pad + w / 2}
          y1={pad}
          x2={pad + w / 2}
          y2={pad + h}
          stroke={linesColor}
          strokeWidth={4}
        />
        {/* Service lines — 21' from net each side */}
        <line
          x1={pad + w / 2 - serviceDepth}
          y1={pad + alley}
          x2={pad + w / 2 - serviceDepth}
          y2={pad + h - alley}
          stroke={linesColor}
          strokeWidth={3}
        />
        <line
          x1={pad + w / 2 + serviceDepth}
          y1={pad + alley}
          x2={pad + w / 2 + serviceDepth}
          y2={pad + h - alley}
          stroke={linesColor}
          strokeWidth={3}
        />
        {/* Center service line (horizontal, between service lines) */}
        <line
          x1={pad + w / 2 - serviceDepth}
          y1={pad + h / 2}
          x2={pad + w / 2 + serviceDepth}
          y2={pad + h / 2}
          stroke={linesColor}
          strokeWidth={3}
        />
        {/* Center mark at baselines */}
        <line
          x1={pad}
          y1={pad + h / 2}
          x2={pad + 20}
          y2={pad + h / 2}
          stroke={linesColor}
          strokeWidth={3}
        />
        <line
          x1={pad + w - 20}
          y1={pad + h / 2}
          x2={pad + w}
          y2={pad + h / 2}
          stroke={linesColor}
          strokeWidth={3}
        />
      </g>
    </svg>
  );
}
