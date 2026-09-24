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
//     slab_by_others:  boolean,                // new slab poured by another contractor (PCS is surfacing sub)
//     sleeves_by_others: boolean,              // PCS furnishes net-post hardware; concrete contractor sets sleeves
//     fenced:          boolean,                // court is fenced (default true) — fence overspray / no-paint clause
//     new_net_posts:   boolean,                // PCS sets new in-ground net posts (old footings + excavation clause)
//     trees:           boolean,                // mature trees near the court (roots, leaf/sap staining)
//     basketball:      boolean,                // basketball play on the surface (wear, no goals)
//     blended_lines:   boolean,                // two sports' lines on one court (e.g. tennis + pickleball)
//     birdbath_overlay:boolean,                // birdbaths unassessed on bare slab; concrete overlay may be recommended
//   }
//
// Body text may contain "• " bullet lines; renderers split on newlines.

export const SECTION_ORDER = [
  "Concrete Requirements",
  "Net-Post Sleeves",
  "Substrate Conditions",
  "Exclusions",
  "Schedule & Access",
  "Warranty",
];

const has = (v) => v !== undefined && v !== null;

export const CLAUSES = [
  // ── New slab poured by others (slab_by_others === true) ──────────────
  {
    code: "new-concrete-slab-conditions",
    section: "Concrete Requirements",
    title: "New Concrete Slab Conditions",
    body: [
      "The slab is poured by others. PCS will surface it only if it meets all of the following:",
      "• 4,000 psi minimum compressive strength",
      "• No curing agents or curing compounds on the playing surface",
      "• No cracks",
      "• No blisters",
      "• No limestone or fly ash in the concrete mix",
      "• 1% slope, in a single true plane",
      "• Vapor barrier installed beneath the slab",
      "Any condition not met will be reported in writing before work begins. Correction is by the concrete contractor, or by PCS as a change order at the owner's direction.",
    ].join("\n"),
    appliesWhen: (c) => c.slab_by_others === true,
  },
  {
    code: "concrete-finish-spec",
    section: "Concrete Requirements",
    title: "Required Finish & Tolerances",
    body: [
      "• Finish: float finish followed by a light (fine-textured) broom finish. No steel-trowel, hard-trowel, or burnished finish.",
      "• Flatness: within 1/8\" in 10' in any direction, measured with a 10' straightedge; no birdbaths.",
      "• No sealers, hardeners, densifiers, or form-release residue on the playing surface.",
    ].join("\n"),
    appliesWhen: (c) => c.slab_by_others === true,
  },
  {
    code: "concrete-curing",
    section: "Concrete Requirements",
    title: "Curing Before Coating",
    body:
      "The slab must cure a minimum of 28 days before any coating is applied. Wet curing (water, wet burlap, or curing blankets) is strongly preferred. Membrane-forming curing compounds must NOT be used on the playing surface — they block adhesion and must be fully removed by diamond grinding before coating (priced as the grind alternate). Before priming, the slab must pass a moisture test (ASTM D4263 plastic-sheet test, or as PCS directs); PCS will not coat a slab that fails.",
    appliesWhen: (c) => c.slab_by_others === true,
  },
  {
    code: "slab-acceptance",
    section: "Concrete Requirements",
    title: "Slab Inspection & Acceptance",
    body:
      "PCS will inspect the slab before mobilizing and report in writing any condition that does not meet these requirements. Corrective work (grinding, patching, re-leveling, curing-compound removal) is by the concrete contractor or, at the owner's direction, by PCS as a change order. If the owner directs PCS to proceed over a non-conforming slab, the related warranty exclusions below apply.",
    appliesWhen: (c) => c.slab_by_others === true,
  },
  {
    code: "sleeves-by-others",
    section: "Net-Post Sleeves",
    title: "Sleeves Set by Concrete Contractor",
    body:
      "PCS furnishes the removable net-post system (in-ground sleeves, removable posts, and flush covers) and a sleeve layout with the manufacturer's setting detail. The owner's concrete contractor sets the sleeves during the pour — plumb, at the specified depth, with the top flush to finished slab grade, and centered on the net line 12\" outside each sideline (22' between posts). PCS will confirm the layout before the pour and is available to walk it on site. Sleeve placement, plumb, and elevation are the concrete contractor's responsibility; relocating or re-setting a mis-placed sleeve after the pour is excluded.",
    appliesWhen: (c) => c.sleeves_by_others === true,
  },
  // ── Substrate Conditions ────────────────────────────────────────────
  {
    code: "adhesion-verification",
    section: "Substrate Conditions",
    title: "Adhesion Verification",
    body:
      "Before full primer application, PCS will apply a 3'x3' test section and attempt to delaminate it, per Acrytech Solvent Primer TDS §2.1. If the section delaminates after surface preparation, the manufacturer deems the concrete unsuitable for coatings and this project will not proceed. In that event PCS invoices only for surface preparation completed to that point, and the balance of this estimate is void.",
    appliesWhen: (c) => c.primer === "solvent",
  },
  {
    code: "when-this-option-fits",
    section: "Substrate Conditions",
    title: "Moisture & Vapor Barrier",
    body:
      "This surfacing is recommended where a moisture barrier beneath the slab can be confirmed, or where a moisture test confirms the slab is dry enough to coat. If neither can be established, a top-side vapor barrier built into the coating system is required and quoted separately. PCS will confirm which applies before any material is ordered, and will reschedule rather than proceed if slab conditions are not suitable.",
    // Slab-by-others jobs require a sub-slab vapor barrier (new-concrete-slab-conditions) instead.
    appliesWhen: (c) => c.moisture_barrier === "unknown" && c.slab_by_others !== true,
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
    code: "finish-appearance",
    section: "Substrate Conditions",
    title: "Finish Appearance",
    body:
      "Acrylic court surfacing is applied by hand squeegee. Some squeegee marks, lap lines, and minor variation in color, sheen, or texture are a normal characteristic of the finish — most visible in low-angle morning or evening light and when the surface is wet — and are not a defect. In Central Texas summer heat the coating flashes off faster than a wet edge can be held, so these marks are more pronounced. They are cosmetic, do not affect playability, durability, or coating performance, and are not grounds for rework under this estimate.",
    appliesWhen: () => true,
  },
  {
    code: "birdbath-overlay",
    section: "Substrate Conditions",
    title: "Birdbaths / Low Spots",
    body:
      "Birdbaths have not yet been assessed. PCS will flood-test the court after pressure washing and mark low spots that hold water. Leveling is not included in this estimate. Where low spots are limited, PCS will quote patch-binder leveling by change order; where they are extensive, PCS will recommend a concrete overlay, quoted separately, before coating proceeds. In either case the finished surface follows the slab's existing pitch, and PCS does not warrant perfect drainage.",
    appliesWhen: (c) => c.birdbath_overlay === true,
  },
  {
    code: "hairline-cracks",
    section: "Substrate Conditions",
    title: "Hairline Cracking",
    body:
      "Cracks repaired with the Faultline system are covered as described above. Fine hairline and surface cracks that do not warrant a Faultline repair are filled as part of standard prep; on an older slab these may reappear through the new surface as the concrete moves with the seasons. Reappearing hairline cracks are not covered by the warranty and can be addressed by change order.",
    appliesWhen: (c) => c.crack_repair === true && c.slab === "existing" && c.slab_by_others !== true,
  },
  {
    code: "tree-roots",
    section: "Substrate Conditions",
    title: "Trees & Roots",
    body:
      "Mature trees near the court can crack or heave the slab as roots grow, and drop leaves, sap, and seed that stain the surface. Cracking or heaving caused by roots, and staining from organic debris, are excluded from the warranty. Keeping the surface clear of debris is the owner's responsibility.",
    appliesWhen: (c) => c.trees === true,
  },
  {
    code: "blended-lines",
    section: "Substrate Conditions",
    title: "Blended Lines",
    body:
      "Pickleball lines are laid out over the tennis court in a contrasting color, per standard blended-line practice. With two sports' lines on one surface the layout reads busier than a single-sport court. Line colors are confirmed in writing before striping.",
    appliesWhen: (c) => c.blended_lines === true,
  },
  {
    code: "basketball-use",
    section: "Substrate Conditions",
    title: "Basketball Use",
    body:
      "Basketball play concentrates wear under the goals and in the key. Scuffing, shoe marks, and surface wear from normal play are expected over time and are not warranty items. Goals, backboards, and their footings are not included unless listed above.",
    appliesWhen: (c) => c.basketball === true,
  },
  {
    code: "new-net-posts",
    section: "Substrate Conditions",
    title: "New Net Posts",
    body:
      "New in-ground net posts are set in fresh footings at the regulation net line. Removal of existing posts, sleeves, and footings is not included unless listed above. PCS will call 811 for utility locates before digging; rock, buried concrete, or utilities encountered while excavating footings are handled by change order.",
    appliesWhen: (c) => c.new_net_posts === true,
  },
  {
    code: "fences-adjacent",
    section: "Substrate Conditions",
    title: "Fences & Adjacent Surfaces",
    body:
      "Coating is applied tight to the fence line. The bottom few inches of fence fabric, posts, and rails may receive incidental coating or overspray; this is normal and is not cleaned or repainted. Painting of fences, posts, gates, benches, or structures is not included. Windscreens, signage, and anything attached to the fence must be removed by the owner before work begins.",
    appliesWhen: (c) => c.fenced !== false,
  },

  // ── Exclusions (single bulleted clause) ─────────────────────────────
  {
    code: "exclusions",
    section: "Exclusions",
    title: "Exclusions",
    body: [
      "• Crack repair beyond the stated allowance or scope (see the crack repair and cracking clauses above for covered width)",
      "• Structural repair, spall repair, or leveling of low spots",
      "• Drainage correction or ponding remediation",
      "• Fencing, windscreen, gates, or perimeter work, including painting of fences, posts, or structures",
      "• Nets, goals, posts, sleeves, or hardware unless listed above",
      "• Permits, bonds, testing, engineering, inspection, and traffic control",
      "• Third-party moisture testing, if required — billed at cost",
      "• Electrical, lighting, or site utilities",
      "• Water and power, assumed available on site at no charge",
    ].join("\n"),
    appliesWhen: (c) => c.slab_by_others !== true,
  },
  {
    code: "exclusions-slab-by-others",
    section: "Exclusions",
    title: "Exclusions",
    body: [
      "• Concrete slab, base, forming, reinforcement, placement, finishing, and curing (by others)",
      "• Setting net-post sleeves in the pour (by the concrete contractor)",
      "• Diamond grinding, unless the slab fails the finish/curing requirements (priced as an alternate)",
      "• Crack repair, patching, re-leveling, or slope correction of the new slab",
      "• Fencing, windscreen, gates, lighting, electrical, or site utilities",
      "• Nets and accessories beyond the hardware listed above",
      "• Permits, bonds, engineering, and HOA submittals",
      "• Third-party moisture testing, if required — billed at cost",
      "• Water and power, assumed available on site at no charge",
    ].join("\n"),
    appliesWhen: (c) => c.slab_by_others === true,
  },

  // ── Schedule & Access ───────────────────────────────────────────────
  {
    code: "schedule-access",
    section: "Schedule & Access",
    title: "Schedule & Access",
    body:
      "Schedule confirmed on contract execution. The slab must be available for consecutive working days — the surfacing system carries mandatory inter-coat cure periods that cannot be compressed. The slab is assumed drive-up accessible and free of significant cracking, spalling, and ponding; correction work is handled by change order.",
    appliesWhen: (c) => c.crack_repair !== true && c.birdbath_overlay !== true,
  },
  {
    // Repair-scoped variant: crack repair / birdbath assessment is already part of the job.
    code: "schedule-access-repair",
    section: "Schedule & Access",
    title: "Schedule & Access",
    body:
      "Schedule confirmed on contract execution. The court must be available for consecutive working days — the surfacing system carries mandatory inter-coat cure periods that cannot be compressed. The court is assumed drive-up accessible for equipment and material delivery, with water and power available on site. Repair work beyond the scope described above is handled by change order.",
    appliesWhen: (c) => c.crack_repair === true || c.birdbath_overlay === true,
  },
  {
    code: "schedule-new-pour",
    section: "Schedule & Access",
    title: "Scheduling on a New Pour",
    body:
      "Earliest surfacing date is 28 days after the pour and a passing moisture test. PCS asks for 10 days' notice of the slab-ready date; surfacing takes 3–4 working days on site, weather permitting (no rain, surface between 50°F and 100°F). Pricing is held subject to PCS review of the final stamped foundation package when issued; if the issued slab design differs from the drawings this estimate is based on, PCS will confirm or adjust in writing before contract.",
    appliesWhen: (c) => c.slab_by_others === true,
  },
  // ── Schedule & Access (cure / campus) ───────────────────────────────
  {
    code: "cure-protection",
    section: "Schedule & Access",
    title: "Cure & Court Closure",
    body:
      "The court must stay closed to all foot, wheel, and equipment traffic from the start of coating until PCS releases it — typically 48–72 hours after the final coat. Damage to uncured or newly finished coating by others (footprints, tire marks, animal tracks, vandalism, graffiti, or debris) is not covered and is repaired by change order.",
    appliesWhen: () => true,
  },
  {
    code: "school-facility-coordination",
    section: "Schedule & Access",
    title: "Campus Coordination",
    body:
      "PCS will coordinate working hours, noise, parking, equipment staging, and site access with the facility contact before mobilizing, and will provide a certificate of insurance on request. Campus-specific requirements (badging, escorts, restricted hours, vendor registration) that add time or cost will be confirmed in writing before contract.",
    appliesWhen: (c) => c.facility === "school",
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
    appliesWhen: (c) => c.coated !== true && c.slab_by_others !== true,
  },
  {
    code: "warranty-slab-by-others",
    section: "Warranty",
    title: "Warranty — Slab Poured by Others",
    body: [
      "PCS warrants what PCS installs: the adhesion, materials, and workmanship of the acrylic surfacing system for one (1) year from completion. PCS did not design, pour, finish, or cure the slab and does not warrant it. The surfacing warranty does not cover, and is void for the affected area where failure is caused by:",
      "• Slab cracking, settlement, heaving, or joint movement — new cracks are concrete failures, not coating failures",
      "• Moisture vapor from below (blistering, bubbling, delamination), including where no vapor barrier was installed or the moisture test was waived",
      "• Laitance, a steel-troweled or burnished finish, or any finish not meeting the requirements above",
      "• Curing compounds, sealers, hardeners, or form-release not removed before coating",
      "• Fly ash, heavy limestone, or an unsuitable mix design (manufacturer warranty void per Acrytech TDS §4.2)",
      "• Ponding or drainage caused by slab slope or flatness",
      "• Mis-set, loose, or out-of-plumb net-post sleeves",
      "Within the warranty period, PCS will spot-repair any delamination of its own coating not caused by the conditions above.",
    ].join("\n"),
    appliesWhen: (c) => c.slab_by_others === true,
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
    fenced: has(context.fenced) ? context.fenced : true,
    new_net_posts: has(context.new_net_posts) ? context.new_net_posts : false,
    trees: has(context.trees) ? context.trees : false,
    basketball: has(context.basketball) ? context.basketball : false,
    blended_lines: has(context.blended_lines) ? context.blended_lines : false,
    birdbath_overlay: has(context.birdbath_overlay) ? context.birdbath_overlay : false,
    grind_alternate: has(context.grind_alternate) ? context.grind_alternate : true,
    slab_by_others: has(context.slab_by_others) ? context.slab_by_others : false,
    sleeves_by_others: has(context.sleeves_by_others) ? context.sleeves_by_others : false,
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
