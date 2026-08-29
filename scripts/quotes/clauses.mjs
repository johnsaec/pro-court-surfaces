// clauses.mjs — fact-keyed conditions / exclusions / schedule / warranty library.
//
// Each clause declares which section it belongs to and a predicate over a
// "conditions context" describing the job. assembleConditions(ctx) returns the
// applicable clauses as resolved snapshots [{ section, title, body }], ordered by
// section, which quote-build.mjs stores on the quote (quotes.conditions jsonb) and
// the PDF / public page render as structured sections.
//
// Conditions context shape (all optional; sensible defaults applied):
//   {
//     slab:            "new" | "existing",     // new pour vs existing court
//     coated:          boolean,                // existing surface already has coating
//     primer:          "solvent" | "latex",    // Acrytech Solvent Primer vs Acrylock latex
//     moisture_barrier:"known" | "unknown" | "none",
//     facility:        string | null,          // e.g. "religious", "hoa", "school"
//     crack_repair:    boolean,                // a crack-repair line is on the quote
//   }
//
// Body text may contain "• " bullet lines; renderers split on newlines.

export const SECTION_ORDER = [
  "Substrate Conditions",
  "Exclusions",
  "Schedule & Access",
  "Warranty",
];

const has = (v) => v !== undefined && v !== null;

export const CLAUSES = [
  // ── Substrate Conditions ────────────────────────────────────────────
  {
    code: "adhesion-verification",
    section: "Substrate Conditions",
    title: "Adhesion Verification",
    body:
      "Before full primer application, PCS will apply a 3'x3' test section and attempt to delaminate it, per Acrytech Solvent Primer TDS §2.1. If the section delaminates after grinding, the manufacturer deems the concrete unsuitable for coatings and this project will not proceed. In that event PCS invoices only for surface preparation completed to that point, and the balance of this estimate is void.",
    appliesWhen: (c) => c.primer === "solvent",
  },
  {
    code: "when-this-option-fits",
    section: "Substrate Conditions",
    title: "Moisture & Vapor Barrier",
    body:
      "This surfacing is recommended where a moisture barrier beneath the slab can be confirmed, or where a moisture test confirms the slab is dry enough to coat. If neither can be established, a top-side vapor barrier built into the coating system is required and quoted separately. PCS will confirm which applies before any material is ordered, and will reschedule rather than proceed if slab conditions are not suitable.",
    appliesWhen: (c) => c.moisture_barrier === "unknown",
  },
  {
    code: "substrate-composition",
    section: "Substrate Conditions",
    title: "Substrate Composition",
    body:
      "Manufacturer coating warranties are void on concrete containing fly ash, heavy limestone, or a mix design inadequate for sports surfacing (Acrytech TDS §4.2). The composition of this slab is unknown and outside PCS control. PCS warrants its workmanship and installation only; no manufacturer warranty is represented or implied.",
    appliesWhen: () => true,
  },
  {
    code: "crack-repair-scope",
    section: "Substrate Conditions",
    title: "Crack Repair Scope",
    body:
      "The crack repair line is an allowance for surface cracking at or below 3/8\" width. Cracking beyond that quantity or width, or any crack indicating substrate movement, is handled by change order at the client's direction. Per manufacturer sequence, patching is performed after the primer coat has dried, not before.",
    appliesWhen: (c) => c.crack_repair === true,
  },
  {
    code: "cracking-substrate-movement",
    section: "Substrate Conditions",
    title: "Cracking & Substrate Movement",
    body:
      "Existing or future cracking originating in the substrate is not covered. Acrylic coatings are not crack-suppression systems and will not bridge or prevent substrate movement; filled cracks may reappear as the slab moves. Substrate performance remains the responsibility of the concrete and foundation contractor.",
    appliesWhen: () => true,
  },
  {
    code: "surface-temperature",
    section: "Substrate Conditions",
    title: "Surface Temperature",
    body:
      "Solvent primer may not be applied above 100°F surface temperature (TDS §4.6). Scheduling accommodates early-morning application windows during summer conditions.",
    appliesWhen: (c) => c.primer === "solvent",
  },
  {
    code: "summer-heat",
    section: "Substrate Conditions",
    title: "Summer Heat Disclosure",
    body:
      "In extreme Central Texas heat, squeegee marks, lap lines, and minor variations in texture and sheen are expected characteristics of hand-applied acrylic systems. These are cosmetic and are not grounds for rework.",
    appliesWhen: () => true,
  },

  // ── Exclusions (single bulleted clause) ─────────────────────────────
  {
    code: "exclusions",
    section: "Exclusions",
    title: "Exclusions",
    body: [
      "• Crack repair beyond the stated allowance, or cracks wider than 3/8\"",
      "• Structural repair, spall repair, or leveling of low spots",
      "• Drainage correction or ponding remediation",
      "• Fencing, windscreen, gates, or perimeter work",
      "• Nets, goals, posts, sleeves, or hardware unless purchased above",
      "• Permits, bonds, testing, engineering, inspection, and traffic control",
      "• Third-party moisture testing, if required — billed at cost",
      "• Electrical, lighting, or site utilities",
      "• Water and power, assumed available on site at no charge",
    ].join("\n"),
    appliesWhen: () => true,
  },

  // ── Schedule & Access ───────────────────────────────────────────────
  {
    code: "schedule-access",
    section: "Schedule & Access",
    title: "Schedule & Access",
    body:
      "Schedule confirmed on contract execution. The slab must be available for consecutive working days — the surfacing system carries mandatory inter-coat cure periods that cannot be compressed. The slab is assumed drive-up accessible and free of significant cracking, spalling, and ponding; correction work is handled by change order.",
    appliesWhen: () => true,
  },
  {
    code: "religious-facility-coordination",
    section: "Schedule & Access",
    title: "Facility Coordination",
    body:
      "PCS will coordinate all work around the facility's prayer times, services, and community activities.",
    appliesWhen: (c) => c.facility === "religious",
  },

  // ── Warranty ────────────────────────────────────────────────────────
  {
    code: "warranty",
    section: "Warranty",
    title: "Warranty",
    body:
      "One (1) year on materials and workmanship of the applied acrylic surfacing system, subject to the cracking and substrate disclaimers above. Substrate design, inspection, testing, and quality control of work by others are excluded.",
    appliesWhen: () => true,
  },
];

// Resolve the applicable clauses for a context into ordered snapshots.
export function assembleConditions(context = {}) {
  const ctx = {
    slab: has(context.slab) ? context.slab : "existing",
    coated: has(context.coated) ? context.coated : false,
    primer: has(context.primer) ? context.primer : "latex",
    moisture_barrier: has(context.moisture_barrier) ? context.moisture_barrier : "none",
    facility: has(context.facility) ? context.facility : null,
    crack_repair: has(context.crack_repair) ? context.crack_repair : false,
  };
  const rank = (s) => {
    const i = SECTION_ORDER.indexOf(s);
    return i === -1 ? SECTION_ORDER.length : i;
  };
  return CLAUSES.filter((cl) => {
    try {
      return cl.appliesWhen(ctx);
    } catch {
      return false;
    }
  })
    .sort((a, b) => rank(a.section) - rank(b.section))
    .map((cl) => ({ section: cl.section, title: cl.title, body: cl.body }));
}
