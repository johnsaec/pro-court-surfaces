/**
 * Native UTM attribution tracking (replaces Attributer.io).
 *
 * Captures UTMs, click IDs, referrer, and landing page on first visit.
 * Stores first-touch + last-touch in a 30-day cookie.
 * Forms read the cookie and send attribution with each lead.
 */

const COOKIE_NAME = "pcs_attribution";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days
const OWN_DOMAINS = ["procourtsurfaces.com", "www.procourtsurfaces.com", "localhost"];

const SEARCH_ENGINES = ["google.", "bing.", "yahoo.", "duckduckgo.", "baidu."];
const SOCIAL_PLATFORMS = ["facebook.com", "instagram.com", "linkedin.com", "twitter.com", "t.co", "tiktok.com"];

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;
const CLICK_IDS = ["fbclid", "gclid", "ttclid"] as const;

export type AttributionTouch = {
  source: string | null;
  medium: string | null;
  campaign: string | null;
  content: string | null;
  term: string | null;
  channel: string;
  referrer: string | null;
  landing_page: string;
  click_id: string | null;
  click_id_type: string | null;
  timestamp: string;
};

type CookieData = {
  ft: AttributionTouch;
  lt: AttributionTouch;
};

// --- Channel classification ---

function classifyChannel(
  source: string | null,
  medium: string | null,
  clickIdType: string | null,
  referrerDomain: string | null
): string {
  // 1. UTM-based classification
  if (medium) {
    const m = medium.toLowerCase();
    if (m === "paid" || m === "cpc" || m === "ppc") return "paid";
    if (m === "email") return "email";
    if (m === "social") return "organic_social";
  }

  // 2. Click ID implies paid
  if (clickIdType) return "paid";

  // 3. Referrer-based
  if (referrerDomain) {
    if (SEARCH_ENGINES.some((se) => referrerDomain.includes(se))) return "organic_search";
    if (SOCIAL_PLATFORMS.some((sp) => referrerDomain.includes(sp))) return "organic_social";
    return "referral";
  }

  return "direct";
}

function inferSourceFromClickId(clickIdType: string): string {
  if (clickIdType === "fbclid") return "facebook";
  if (clickIdType === "gclid") return "google";
  if (clickIdType === "ttclid") return "tiktok";
  return "unknown";
}

function parseReferrerDomain(referrer: string): string | null {
  if (!referrer) return null;
  try {
    const hostname = new URL(referrer).hostname;
    if (OWN_DOMAINS.some((d) => hostname === d || hostname.endsWith("." + d))) return null;
    return hostname;
  } catch {
    return null;
  }
}

// --- Cookie helpers ---

function readCookie(): CookieData | null {
  if (typeof document === "undefined") return null;
  try {
    const match = document.cookie.match(new RegExp(`(?:^|; )${COOKIE_NAME}=([^;]*)`));
    if (!match) return null;
    return JSON.parse(decodeURIComponent(match[1]));
  } catch {
    return null;
  }
}

function writeCookie(data: CookieData) {
  if (typeof document === "undefined") return;
  const value = encodeURIComponent(JSON.stringify(data));
  const secure = window.location.protocol === "https:" ? ";Secure" : "";
  document.cookie = `${COOKIE_NAME}=${value};path=/;max-age=${COOKIE_MAX_AGE};SameSite=Lax${secure}`;
}

// --- Main capture function (called on every page load) ---

export function captureAttribution() {
  if (typeof window === "undefined") return;

  const params = new URLSearchParams(window.location.search);

  // Extract UTMs
  const source = params.get("utm_source");
  const medium = params.get("utm_medium");
  const campaign = params.get("utm_campaign");
  const content = params.get("utm_content");
  const term = params.get("utm_term");

  // Extract click ID
  let clickId: string | null = null;
  let clickIdType: string | null = null;
  for (const cid of CLICK_IDS) {
    const val = params.get(cid);
    if (val) {
      clickId = val;
      clickIdType = cid;
      break;
    }
  }

  const referrerDomain = parseReferrerDomain(document.referrer);
  const hasNewSource = UTM_KEYS.some((k) => params.has(k)) || clickId !== null || referrerDomain !== null;

  // If no new external source, nothing to capture
  if (!hasNewSource) {
    // Still set cookie with direct attribution if no cookie exists at all
    const existing = readCookie();
    if (!existing) {
      const touch: AttributionTouch = {
        source: null,
        medium: null,
        campaign: null,
        content: null,
        term: null,
        channel: "direct",
        referrer: null,
        landing_page: window.location.pathname,
        click_id: null,
        click_id_type: null,
        timestamp: new Date().toISOString(),
      };
      writeCookie({ ft: touch, lt: touch });
    }
    return;
  }

  // Build the current touch
  const effectiveSource = source || (clickIdType ? inferSourceFromClickId(clickIdType) : null);
  const channel = classifyChannel(effectiveSource, medium, clickIdType, referrerDomain);

  const touch: AttributionTouch = {
    source: effectiveSource,
    medium: medium,
    campaign: campaign,
    content: content,
    term: term,
    channel,
    referrer: referrerDomain,
    landing_page: window.location.pathname,
    click_id: clickId,
    click_id_type: clickIdType,
    timestamp: new Date().toISOString(),
  };

  const existing = readCookie();

  if (!existing) {
    // First visit ever — set both first-touch and last-touch
    writeCookie({ ft: touch, lt: touch });
  } else {
    // Update last-touch only (first-touch is immutable)
    writeCookie({ ft: existing.ft, lt: touch });
  }
}

// --- Read attribution for form submission ---

export type AttributionPayload = {
  ft_source: string | null;
  ft_medium: string | null;
  ft_campaign: string | null;
  ft_content: string | null;
  ft_term: string | null;
  ft_channel: string | null;
  ft_referrer: string | null;
  ft_landing_page: string | null;
  ft_click_id: string | null;
  ft_click_id_type: string | null;
  ft_timestamp: string | null;
  lt_source: string | null;
  lt_medium: string | null;
  lt_campaign: string | null;
  lt_content: string | null;
  lt_term: string | null;
  lt_channel: string | null;
  lt_referrer: string | null;
  lt_landing_page: string | null;
  lt_click_id: string | null;
  lt_click_id_type: string | null;
  lt_timestamp: string | null;
};

export function getAttribution(): AttributionPayload | null {
  const data = readCookie();
  if (!data) return null;

  return {
    ft_source: data.ft.source,
    ft_medium: data.ft.medium,
    ft_campaign: data.ft.campaign,
    ft_content: data.ft.content,
    ft_term: data.ft.term,
    ft_channel: data.ft.channel,
    ft_referrer: data.ft.referrer,
    ft_landing_page: data.ft.landing_page,
    ft_click_id: data.ft.click_id,
    ft_click_id_type: data.ft.click_id_type,
    ft_timestamp: data.ft.timestamp,
    lt_source: data.lt.source,
    lt_medium: data.lt.medium,
    lt_campaign: data.lt.campaign,
    lt_content: data.lt.content,
    lt_term: data.lt.term,
    lt_channel: data.lt.channel,
    lt_referrer: data.lt.referrer,
    lt_landing_page: data.lt.landing_page,
    lt_click_id: data.lt.click_id,
    lt_click_id_type: data.lt.click_id_type,
    lt_timestamp: data.lt.timestamp,
  };
}
