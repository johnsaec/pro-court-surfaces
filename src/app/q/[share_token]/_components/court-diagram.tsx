"use client";

type CourtZone = "outside" | "inside" | "lines" | "nvz";

type PbLayout = "service-line" | "net-aligned";

interface CourtDiagramProps {
  courtType: "pickleball" | "tennis";
  sports?: string[];
  pbLayout?: PbLayout;
  outsideColor: string;
  insideColor: string;
  nvzColor: string;
  linesColor: string;
  activeZone: CourtZone | null;
  onZoneClick: (zone: CourtZone) => void;
}

const ZONE_HIGHLIGHT = "drop-shadow(0 0 6px rgba(59,130,246,0.6))";

export function CourtDiagram({
  courtType,
  sports = [],
  pbLayout = "service-line",
  outsideColor,
  insideColor,
  nvzColor,
  linesColor,
  activeZone,
  onZoneClick,
}: CourtDiagramProps) {
  if (courtType === "pickleball") {
    return (
      <PickleballCourt
        sports={sports}
        outsideColor={outsideColor}
        insideColor={insideColor}
        nvzColor={nvzColor}
        linesColor={linesColor}
        activeZone={activeZone}
        onZoneClick={onZoneClick}
      />
    );
  }

  return (
    <TennisCourt
      sports={sports}
      pbLayout={pbLayout}
      outsideColor={outsideColor}
      insideColor={insideColor}
      nvzColor={nvzColor}
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
  nvzColor,
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
  // NVZ is 7' from net each side = 140px
  const nvzWidth = 140;

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

      {/* NVZ (kitchen) zones — rendered on top of inside area */}
      <rect
        x={pad + w / 2 - nvzWidth}
        y={pad}
        width={nvzWidth}
        height={h}
        fill={nvzColor}
        className="cursor-pointer"
        style={activeZone === "nvz" ? { filter: ZONE_HIGHLIGHT } : undefined}
        onClick={() => onZoneClick("nvz")}
      />
      <rect
        x={pad + w / 2}
        y={pad}
        width={nvzWidth}
        height={h}
        fill={nvzColor}
        className="cursor-pointer"
        style={activeZone === "nvz" ? { filter: ZONE_HIGHLIGHT } : undefined}
        onClick={() => onZoneClick("nvz")}
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
          x1={pad + w / 2 - nvzWidth}
          y1={pad}
          x2={pad + w / 2 - nvzWidth}
          y2={pad + h}
          stroke={linesColor}
          strokeWidth={3}
        />
        <line
          x1={pad + w / 2 + nvzWidth}
          y1={pad}
          x2={pad + w / 2 + nvzWidth}
          y2={pad + h}
          stroke={linesColor}
          strokeWidth={3}
        />
        {/* Center service lines */}
        <line
          x1={pad}
          y1={pad + h / 2}
          x2={pad + w / 2 - nvzWidth}
          y2={pad + h / 2}
          stroke={linesColor}
          strokeWidth={3}
        />
        <line
          x1={pad + w / 2 + nvzWidth}
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
  sports = [],
  pbLayout = "service-line",
  outsideColor,
  insideColor,
  // nvzColor not used for tennis courts
  linesColor,
  activeZone,
  onZoneClick,
}: CourtProps) {
  // Tennis: 78' x 36' → 1560x720 (20px per foot). Extra padding = surround area, so
  // overlay courts that extend past the tennis boundary have room ("zoomed out").
  const pad = 280;
  const w = 1560;
  const h = 720;
  const vw = w + pad * 2;
  const vh = h + pad * 2;

  // Doubles sideline offset: singles court is 27' wide = 540px, so 90px alley each side
  const alley = 90;
  // Service box depth: 21' = 420px from net
  const serviceDepth = 420;

  const showPickleball = sports.includes("pickleball");
  const showBasketball = sports.includes("basketball");
  const cy = pad + h / 2;

  // Basketball — just a single short grey ~3' free-throw line on the right, no
  // alignment to the tennis court (roll-up hoop). 3' = 60px.
  const bbCx = pad + w * 0.72;
  const bbY = cy + 60;
  const bbHalf = 30;
  const netX = pad + w / 2;
  const svcLeft = netX - serviceDepth; // tennis left service line

  // Pickleball overlay — a full 44'x20' court on the LEFT, extending past the tennis
  // boundary into the surround. Blended-lines rule: the CENTER-facing kitchen line
  // (playing-box↔NVZ boundary) lands on the tennis service line, NOT the net.
  const nvz = 7 * 20; // 140px = 7'
  const pbHalf = 22 * 20; // 440px = 22' (net to baseline)
  // Option 1 (service-line): center-facing kitchen line lands on the tennis service line.
  // Option 2 (net-aligned): the pickleball net lands on the tennis net (centered).
  const pbNetX = pbLayout === "net-aligned" ? netX : svcLeft - nvz;
  const pbX = pbNetX - pbHalf; // left baseline
  const pbW = pbHalf * 2; // 880 (44')
  const pbH = 20 * 20; // 400 (20' playing width)
  const pbY = cy - pbH / 2;
  // Kitchen lines are pbNetX ± nvz; the center-facing one (pbNetX + nvz) == svcLeft.

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

        {/* Pickleball overlay — LEFT court. Grey play lines; the center line (the net)
            is black dotted. Kitchen (NVZ) lines flank the net; center service lines
            run from each baseline to the kitchen. */}
        {showPickleball && (
          <>
            <g opacity={0.9} fill="none" stroke="#9ca3af" strokeWidth={3}>
              <rect x={pbX} y={pbY} width={pbW} height={pbH} />
              <line x1={pbNetX - nvz} y1={pbY} x2={pbNetX - nvz} y2={pbY + pbH} />
              <line x1={pbNetX + nvz} y1={pbY} x2={pbNetX + nvz} y2={pbY + pbH} />
              <line x1={pbX} y1={cy} x2={pbNetX - nvz} y2={cy} />
              <line x1={pbNetX + nvz} y1={cy} x2={pbX + pbW} y2={cy} />
            </g>
            {/* Net — black dotted center line */}
            <line
              x1={pbNetX}
              y1={pbY}
              x2={pbNetX}
              y2={pbY + pbH}
              stroke="#111111"
              strokeWidth={4}
              strokeDasharray="4 8"
              strokeLinecap="round"
            />
          </>
        )}

        {/* Basketball — one short grey free-throw line, no court alignment (roll-up hoop) */}
        {showBasketball && (
          <line
            x1={bbCx - bbHalf}
            y1={bbY}
            x2={bbCx + bbHalf}
            y2={bbY}
            stroke="#9ca3af"
            strokeWidth={6}
            strokeLinecap="round"
          />
        )}

      </g>
    </svg>
  );
}
