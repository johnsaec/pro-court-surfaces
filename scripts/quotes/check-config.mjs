// check-config.mjs — editable word lists for quote-check.mjs.
//
// Add a term here instead of writing a new rule. Every pattern is tested against
// customer-facing text: package names, line names/descriptions, cover note, and
// clause bodies (BANNED_TERMS skips clause bodies — those are ours).

// Words that should never appear on a quote, with the reason shown in the report.
export const BANNED_TERMS = [
  { pattern: /\bmobili[sz]ation\b/i, why: "No mobilization lines. Fold the cost into the system rates instead." },
  { pattern: /\bTBD\b|\bTODO\b|\bXXX\b|lorem ipsum/i, why: "Placeholder text left on a customer-facing quote." },
];

// Brand / product spellings. `wrong` matches a misspelling; `right` is the fix.
export const BRAND_SPELLINGS = [
  { wrong: /\blay\s+kold\b|\blaycold\b|\blaykhold\b|\blaykol\b/i, right: "Laykold" },
  { wrong: /\bacry[\s-]tech\b|\bacrytec\b/i, right: "Acrytech" },
  { wrong: /\bfault[\s-]line\s+(system|membrane|repair)\b/i, right: "Faultline" },
  { wrong: /\bcushion-?x\b|\bcushionx\b/i, right: "Cushion X" },
  { wrong: /procoursurfaces/i, right: "procourtsurfaces" },
];

// Terms that should be spelled one way across cover note, lines, and clauses.
// The clause library uses `preferred`, so match it in briefs.
export const TERM_VARIANTS = [
  { label: "birdbath", preferred: "birdbath", forms: [/\bbird baths?\b/i, /\bbird-baths?\b/i, /\bbirdbaths?\b/i] },
  { label: "haul-off", preferred: "haul-off", forms: [/\bhaul offs?\b/i, /\bhaul-offs?\b/i, /\bhauloffs?\b/i] },
  { label: "non-volley zone", preferred: "non-volley zone", forms: [/\bnon-volley zone\b/i, /\bnon volley zone\b/i, /\bNVZ\b/] },
];

// Scope words in the cover note that should have a matching line item.
// `note` matches the cover note; `line` must then match some line's name/description.
export const COVER_NOTE_SCOPE = [
  { label: "haul-off", note: /haul[\s-]?off|disposal/i, line: /haul|disposal/i },
  { label: "basketball lines", note: /basketball (lines|key|court)/i, line: /basketball/i },
  { label: "crack repair", note: /\bcracks?\b/i, line: /crack|faultline/i },
  { label: "bird baths", note: /bird.?baths?|low spots?/i, line: /bird.?bath|low spot/i },
  { label: "primer / vapor barrier", note: /primer|vapor barrier/i, line: /primer|vapor/i },
  { label: "grind", note: /\bgrind/i, line: /grind/i },
  { label: "pickleball lines", note: /lined for pickleball|pickleball lines/i, line: /pickleball/i },
  { label: "tennis lines", note: /tennis lines/i, line: /tennis/i },
  { label: "net posts", note: /net posts?/i, line: /net post|post/i },
  { label: "fence", note: /\bfenc(e|ing)\b/i, line: /fenc/i },
];
