"use client";

import { useEffect } from "react";
import { useLenis } from "@/app/contexts/LenisContext";

export default function LenisUnlock() {
  const { unlock } = useLenis();

  useEffect(() => {
    const handleAnimationComplete = () => {
      unlock();
    };

    window.addEventListener("headerAnimationComplete", handleAnimationComplete);
    return () => window.removeEventListener("headerAnimationComplete", handleAnimationComplete);
  }, []);

  return null;
}