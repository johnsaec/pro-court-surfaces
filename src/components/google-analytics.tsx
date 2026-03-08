"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Client-side GA4 helpers:
 * 1. Track SPA route changes as page_view events (Next.js App Router
 *    does client-side nav that GA4 doesn't detect automatically).
 * 2. Auto-track clicks on tel: and mailto: links globally.
 *
 * The actual gtag scripts are loaded via regular <script> tags in
 * layout.tsx (server component) for reliable execution.
 */
export function AutoLinkTracking() {
  const pathname = usePathname();

  // Track SPA route changes — small delay so Next.js metadata updates first
  useEffect(() => {
    if (!window.__gaInitialPageTracked) {
      window.__gaInitialPageTracked = true;
      return;
    }
    const timeout = setTimeout(() => {
      window.gtag?.("event", "page_view", {
        page_path: pathname,
        page_location: window.location.href,
        page_title: document.title,
      });
    }, 100);
    return () => clearTimeout(timeout);
  }, [pathname]);

  // Auto-track tel: and mailto: clicks
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const anchor = (e.target as HTMLElement).closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href") ?? "";

      if (href.startsWith("tel:")) {
        window.gtag?.("event", "phone_click", {
          phone_number: href.replace("tel:", ""),
          link_text: anchor.textContent?.trim() ?? "",
          page_path: window.location.pathname,
        });
      } else if (href.startsWith("mailto:")) {
        window.gtag?.("event", "email_click", {
          email: href.replace("mailto:", ""),
          page_path: window.location.pathname,
        });
      }
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
