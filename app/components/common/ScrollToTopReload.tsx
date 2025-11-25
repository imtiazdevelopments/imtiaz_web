"use client";

import { useEffect } from "react";
import { useSmoothScrollContext } from "../../contexts/smoothScrollContext";

export default function ScrollToTopReload() {
    const {setSmoothScrollActive} = useSmoothScrollContext();
    setSmoothScrollActive(false)
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // 1. After hydration
    setTimeout(() => {
      document.getElementById("sec1")?.scrollIntoView({ behavior: "smooth" });
    }, 200);

    // 2. After page fully loads
    const onLoad = () => document.getElementById("sec1")?.scrollIntoView({ behavior: "smooth" });
    window.addEventListener("load", onLoad);
    // setSmoothScrollActive(true)

    return () => window.removeEventListener("load", onLoad);
  }, []);

  return null;
}
