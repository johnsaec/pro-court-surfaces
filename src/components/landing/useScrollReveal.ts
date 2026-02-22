"use client";

import { useEffect, useRef } from "react";

/**
 * Scroll-reveal hook. Attaches an IntersectionObserver to the returned ref.
 * All children with `.reveal-item` will stagger-fade in when the container
 * enters the viewport.
 */
export function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin: "0px 0px -60px 0px" }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}
