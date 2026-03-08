"use client";

import { useEffect } from "react";

/**
 * Auto-track clicks on tel: and mailto: links globally.
 * Rendered as a client component; the actual gtag scripts
 * are loaded via regular <script> tags in layout.tsx (server component)
 * for reliable execution.
 */
export function AutoLinkTracking() {
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
