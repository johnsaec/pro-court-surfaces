/**
 * Lightweight GA4 event tracking utility.
 *
 * Uses the recommended GA4 event names where possible:
 * - generate_lead  → form submission
 * - phone_click    → tel: link tap
 * - email_click    → mailto: link tap
 * - cta_click      → "Get an Estimate" / "Request a Bid" buttons
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>
) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
  }
}
