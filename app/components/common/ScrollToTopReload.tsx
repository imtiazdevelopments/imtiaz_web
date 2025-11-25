"use client";

import { useEffect } from "react";

export default function ScrollToTopReload() {
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 200); // small delay so hydration finishes first

    return () => clearTimeout(timer);
  }, []);

  return null;
}
