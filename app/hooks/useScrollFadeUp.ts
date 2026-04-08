"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface UseScrollFadeUpOptions {
  duration?: number;
  y?: number;
  ease?: string;
  start?: string;
  delay?: number;
}

export function useScrollFadeUp({
  duration = 0.7,
  y = 40,
  ease = "power3.out",
  start = "top 90%",
  delay = 0,
}: UseScrollFadeUpOptions = {}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    gsap.fromTo(
      ref.current,
      { opacity: 0, y },
      {
        opacity: 1,
        y: 0,
        duration,
        ease,
        delay,
        scrollTrigger: {
          trigger: ref.current,
          start,
          once: true,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return ref;
}
