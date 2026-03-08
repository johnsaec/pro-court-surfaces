"use client";

import Script from "next/script";
import { useEffect } from "react";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

/**
 * Auto-track clicks on tel: and mailto: links globally.
 * No changes needed in individual page components.
 */
function useAutoLinkTracking() {
  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return;

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
}

export function GoogleAnalytics() {
  useAutoLinkTracking();

  if (!GA_MEASUREMENT_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          window.gtag = function(){window.dataLayer.push(arguments);};
          window.gtag('js', new Date());
          window.gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  );
}
