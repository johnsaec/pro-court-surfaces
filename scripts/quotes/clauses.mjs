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
//     grind_alternate: boolean,                // offer full grind-down alternate (default true on coated)
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
  // ── Resurface over an existing coating (coated === true) ─────────────
  {
    code: "existing-coating-disclaimer",
    section: "Substrate Conditions",
    title: "Existing Coating",
    body:
      "The slab carries an existing coating of unknown age and composition, applied by others. PCS is resurfacing over it at the client's direction. Our material bonds to that existing coating; if the existing coating fails, delaminates, or releases from the substrate, any PCS coating bonded to it will release with it. Resurfacing does not repair or reverse delamination originating in the existing coating or the substrate.",
    appliesWhen: (c) => c.coated === true,
  },
  {
    code: "full-grind-alternate",
    section: "Substrate Conditions",
    title: "Full Grind Alternate",
    body:
      "A full mechanical grind-down to bare concrete before resurfacing removes the delamination risk described above and is available as a priced alternate (shown as an optional line item). The base price reflects the client's election to resurface over the existing coating without a full grind.",
    appliesWhen: (c) => c.coated === true && c.grind_alternate === true,
  },
  {
    code: "cracking-over-existing",
    section: "Substrate Conditions",
    title: "Cracking",
    body:
      "PCS fills minor surface cracking as part of standard prep. Cracks wider than 1/4 inch, cracks showing vertical displacement, and any crack that reopens from slab movement are excluded and, if repair is elected, handled by change order. Acrylic coatings are not crack-suppression systems; substrate cracking is the responsibility of the concrete/foundation contractor.",
    appliesWhen: (c) => c.coated === true && c.crack_repair !== true,
  },
  {
    code: "birdbath-patch-fill",
    section: "Substrate Conditions",
    title: "Birdbaths / Low Spots",
    body:
      "PCS will fill obvious birdbaths with patch binder as part of surface prep. This improves ponding but cannot re-establish slope or produce perfect drainage; depressions beyond what patch binder can correct will remain.",
    appliesWhen: (c) => c.coated === true,
  },
  {
    code: "drainage-no-guarantee",
    section: "Substrate Conditions",
    title: "Drainage",
    body:
      "Given the size of the slab and its existing, undetermined slope, PCS does not promise or warrant perfect drainage. The finished surface follows the concrete's existing pitch; areas that pond now may continue to pond. No re-pitching, drainage correction, or slope/flatness tolerance is included.",
    appliesWhen: (c) => c.coated === true,
  },
  {
    code: "crack-repair-scope",
    section: "Substrate Conditions",
    title: "Crack Repair Scope",
    body:
      "Crack repair on this project uses the ATS Faultline glue-and-roll system: a reinforcing fiberglass membrane fully bonded over each prepared crack to bridge normal seasonal slab movement so it does not telegraph back through the new surface. The linear-foot quantity shown is our field estimate for cracking at or below 3/8\" width; cracking beyond that quantity or width, or any crack indicating significant structural movement, is handled by change order at the client's direction.",
    appliesWhen: (c) => c.crack_repair === true,
  },
  {
    code: "cracking-substrate-movement-faultline",
    section: "Substrate Conditions",
    title: "Cracking & Substrate Movement",
    body:
      "Cracks reinforced with the Faultline membrane are built to bridge the slab's normal seasonal expansion and contraction. Faultline is a semi-flexible reinforced repair, not a structural crack-suppression membrane: major new substrate movement, heaving, or settlement originates in the concrete and foundation rather than the coating, is outside the system's design, and remains the responsibility of the concrete and foundation contractor.",
    appliesWhen: (c) => c.crack_repair === true,
  },
  {
    code: "cracking-substrate-movement",
    section: "Substrate Conditions",
    title: "Cracking & Substrate Movement",
    body:
      "Existing or future cracking originating in the substrate is not covered. Acrylic coatings are not crack-suppression systems and will not bridge or prevent substrate movement; filled cracks may reappear as the slab moves. Substrate performance remains the responsibility of the concrete and foundation contractor.",
    appliesWhen: (c) => c.crack_repair !== true && c.coated !== true,
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
    title: "Summer Heat & Finish Appearance",
    body:
      "Acrylic coatings applied in extreme Central Texas summer conditions flash off faster than the squeegee can maintain a wet edge. Some squeegee marks, lap lines, and minor variation in sheen or texture should be expected and are a normal characteristic of hot-weather application, not a defect. These are cosmetic and do not affect playability, durability, or coating performance, and are not grounds for rework under this estimate.",
    appliesWhen: () => true,
  },

  // ── Exclusions (single bulleted clause) ─────────────────────────────
  {
    code: "exclusions",
    section: "Exclusions",
    title: "Exclusions",
    body: [
      "• Crack repair beyond the stated allowance or scope (see the Cracking clause for the covered width)",
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
    appliesWhen: (c) => c.coated !== true,
  },
  {
    code: "warranty-over-coating",
    section: "Warranty",
    title: "Warranty",
    body:
      "Pro Court Surfaces warrants our applied acrylic coating system — materials and workmanship — for one (1) year. Note that we coat over an existing painted/coated surface, and our material bonds to that existing material; resurfacing does not repair or reverse delamination in the original coating or substrate. Within the one-year period, PCS will remediate delamination of our coating by spot repair — grinding/sanding the affected area, re-applying adhesion promoter, and recoating that spot. This is limited to spot touch-up and does not include full resurfacing of the court; it is not a warranty against failure originating in the original coating or substrate. Excludes damage from substrate movement, structural cracking, and ponding/drainage.",
    appliesWhen: (c) => c.coated === true,
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
    grind_alternate: has(context.grind_alternate) ? context.grind_alternate : true,
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
