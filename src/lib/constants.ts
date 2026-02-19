// Enum label maps for display in UI

export const DEAL_STAGE_LABELS: Record<string, string> = {
  cold: "Cold",
  new_lead: "New Lead",
  qualified_lead: "Qualified Lead",
  proposal_stage: "Proposal Stage",
  proposal_sent: "Proposal Sent",
  buyer_interested: "Buyer Interested",
  won: "Won",
  lost: "Lost",
  converted: "Converted",
};

export const DEAL_STAGE_COLORS: Record<string, string> = {
  cold: "bg-gray-100 text-gray-700",
  new_lead: "bg-blue-100 text-blue-700",
  qualified_lead: "bg-indigo-100 text-indigo-700",
  proposal_stage: "bg-yellow-100 text-yellow-700",
  proposal_sent: "bg-orange-100 text-orange-700",
  buyer_interested: "bg-purple-100 text-purple-700",
  won: "bg-green-100 text-green-700",
  lost: "bg-red-100 text-red-700",
  converted: "bg-emerald-100 text-emerald-700",
};

export const LEAD_SOURCE_LABELS: Record<string, string> = {
  inbound: "Inbound",
  outbound: "Outbound",
  referral: "Referral",
  event: "Event",
  partner: "Partner",
  website: "Website",
  linkedin: "LinkedIn",
  ai_search: "AI Search",
  permit_mining: "Permit Mining",
  other: "Other",
};

export const PROJECT_TYPE_LABELS: Record<string, string> = {
  new_court_full_build: "New Court (Full Build)",
  new_court_surfacing_only: "New Court (Surfacing Only)",
  repair_resurfacing: "Repair / Resurfacing",
  conversion_tennis_to_pickleball: "Tennis to Pickleball Conversion",
  color_coating_only: "Color Coating Only",
  crack_repair_only: "Crack Repair Only",
  other: "Other",
};

export const SPORT_TYPE_LABELS: Record<string, string> = {
  pickleball: "Pickleball",
  tennis: "Tennis",
  basketball: "Basketball",
  volleyball: "Volleyball",
  multi_sport: "Multi-Sport",
};

export const UNIT_OF_MEASURE_LABELS: Record<string, string> = {
  per_sqft: "Per Sq Ft",
  per_linear_ft: "Per Linear Ft",
  per_court: "Per Court",
  flat_rate: "Flat Rate",
  per_hour: "Per Hour",
  each: "Each",
};

export const LINE_ITEM_TYPE_LABELS: Record<string, string> = {
  base_service: "Base Service",
  add_on: "Add-On",
  material: "Material",
  color_application: "Color Application",
  game_lines: "Game Lines",
  discount: "Discount",
  other: "Other",
};

export const SERVICE_CATEGORY_LABELS: Record<string, string> = {
  surfacing: "Surfacing",
  repair: "Repair",
  lines: "Lines",
  equipment: "Equipment",
  other: "Other",
};

export const COLOR_RECOMMENDED_OPTIONS = ["inside", "outside", "lines"] as const;

// Quote status
export const QUOTE_STATUS_LABELS: Record<string, string> = {
  draft: "Draft",
  sent: "Sent",
  viewed: "Viewed",
  accepted: "Accepted",
  declined: "Declined",
  expired: "Expired",
  revised: "Revised",
  deposit_paid: "Deposit Paid",
  completed: "Completed",
};

export const QUOTE_STATUS_COLORS: Record<string, string> = {
  draft: "bg-gray-100 text-gray-700",
  sent: "bg-blue-100 text-blue-700",
  viewed: "bg-indigo-100 text-indigo-700",
  accepted: "bg-green-100 text-green-700",
  declined: "bg-red-100 text-red-700",
  expired: "bg-orange-100 text-orange-700",
  revised: "bg-yellow-100 text-yellow-700",
  deposit_paid: "bg-teal-100 text-teal-700",
  completed: "bg-green-100 text-green-700",
};

// Package tiers
export const PACKAGE_TIER_LABELS: Record<string, string> = {
  good: "Good",
  better: "Better",
  best: "Best",
};

// Project status
export const PROJECT_STATUS_LABELS: Record<string, string> = {
  quoting: "Quoting",
  scheduled: "Scheduled",
  in_progress: "In Progress",
  completed: "Completed",
  on_hold: "On Hold",
  cancelled: "Cancelled",
};
