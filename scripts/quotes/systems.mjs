// systems.mjs — surfacing "system" templates (recipes) for the quote builder.
//
// A system is a named recipe: which catalog services compose it, in what order,
// how each step's quantity is derived from the lead's facts, and which steps are
// optional (add-ons). This file holds NO prices and NO DB access — prices live in
// `services_catalog` (looked up by `code` at build time by quote-build.mjs), so a
// rate change is a DB edit, not a code change here.
//
// Step shape:
//   {
//     code,            // FK into services_catalog.code (must exist in the DB)
//     qtyRule,         // "sqft" | "courts" | "linear_ft" | "birdbaths" | "fixed"
//     qty,             // required only when qtyRule === "fixed"
//     optional,        // default false; true => is_optional / not included by default
//     priceOverride,   // default null => use catalog base_price
//     nameOverride,    // default null => use catalog name
//     lineType,        // default null => use catalog line_item_type
//   }
//
// qtyRule → lead fact:
//   sqft       -> lead.square_feet
//   courts     -> lead.number_of_courts
//   linear_ft  -> lead.crack_length_ft
//   birdbaths  -> lead.bird_bath_count
//   fixed      -> step.qty (explicit)

export const SYSTEMS = {
  // New slab, standard acrylic build (Laykold 3-coat): grind + resurfacer + 2 color.
  "laykold-acrylic-3coat": {
    title: "Laykold Acrylic (3-Coat)",
    appliesTo: "new_slab",
    steps: [
      { code: "diamond-grind", qtyRule: "sqft" },
      { code: "adhesion-promoter", qtyRule: "sqft" },
      { code: "acrylic-resurfacer-black", qtyRule: "sqft" },
      { code: "laykold-color-coats-2", qtyRule: "sqft" },
      { code: "pickleball-striping", qtyRule: "sqft" },
    ],
  },

  // Premium cushioned system over a smooth troweled pad (NO grind).
  "cushion-x-premium": {
    title: "Cushion X (Premium)",
    appliesTo: "new_slab",
    steps: [
      { code: "smooth-pad-prep-no-grind", qtyRule: "sqft" },
      { code: "adhesion-promoter", qtyRule: "sqft" },
      { code: "cushion-x-base", qtyRule: "sqft" },
      { code: "acrylic-color-coats", qtyRule: "sqft" },
      { code: "pickleball-striping", qtyRule: "sqft" },
    ],
  },

  // Resurface of an EXISTING acrylic court (Goldstein-type): wash, repair cracks /
  // bird baths as needed, then re-lay the acrylic system + game lines. Crack/bird-bath
  // and secondary-sport line steps are optional — enable via brief overrides (setOptional
  // false) or drop with {op:"remove"} when the condition facts are zero.
  "laykold-resurface-existing": {
    title: "Laykold Resurface (Existing Court)",
    appliesTo: "existing_court",
    steps: [
      { code: "pressure-washing", qtyRule: "sqft" },
      { code: "ats-faultline-repair", qtyRule: "linear_ft", optional: true },
      { code: "bird-bath-leveling", qtyRule: "birdbaths", optional: true },
      { code: "acrylic-resurfacer-black", qtyRule: "sqft" },
      { code: "laykold-color-coats-2", qtyRule: "sqft" },
      { code: "tennis-lines", qtyRule: "courts" },
      { code: "basketball-lines", qtyRule: "courts", optional: true },
      { code: "pickleball-striping", qtyRule: "sqft", optional: true },
    ],
  },
};

export function listSystems() {
  return Object.entries(SYSTEMS).map(([key, s]) => ({ key, title: s.title, appliesTo: s.appliesTo }));
}
