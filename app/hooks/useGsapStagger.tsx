"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface UseGsapStaggerOptions {
  selector: string;
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  stagger?: number;
  start?: string;
}

export function useGsapStagger({
  selector,
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
  stagger = 0.15,
  start = "top 80%",
}: UseGsapStaggerOptions) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const elements = ref.current.querySelectorAll(selector);
    if (!elements.length) return;

    gsap.set(elements, from);

    gsap.to(elements, {
      ...to,
      stagger,
      scrollTrigger: {
        trigger: ref.current,
        start,
        once: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [selector, stagger, start]);

  return ref;
}
