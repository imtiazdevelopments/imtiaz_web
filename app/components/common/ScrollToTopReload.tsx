"use client";

import { useEffect } from "react";

export default function ScrollToTopReload() {
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // 1. After hydration
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 200);

    // 2. After page fully loads
    const onLoad = () => window.scrollTo(0, 0);
    window.addEventListener("load", onLoad);

    return () => window.removeEventListener("load", onLoad);
  }, []);

  return null;
}
