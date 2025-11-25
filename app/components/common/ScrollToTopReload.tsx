"use client";

import { useEffect } from "react";

const ScrollToTopReload = () => {
  useEffect(() => {
    // Disable browser's automatic scroll restore
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // Then scroll to the top
    window.scrollTo(0, 0);
  }, []);

  return null;
};

export default ScrollToTopReload;
