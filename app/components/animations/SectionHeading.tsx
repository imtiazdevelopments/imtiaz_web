"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SectionHeadingProps {
  title: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4";
  delay?: number;
}

export function SectionHeading({
  title,
  className = "",
  as: Tag = "h2",
  delay = 0,
}: SectionHeadingProps) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        {
          clipPath: "inset(0 100% 0 0)",
          y: 14,
          opacity: 0,
        },
        {
          clipPath: "inset(0 0% 0 0)",
          y: 0,
          opacity: 1,
          duration: 1.6,
          ease: "expo.out",
          delay,
          scrollTrigger: {
            trigger: el,
            start: "top 88%", // fires when top of element hits 88% down the viewport
            once: true,       // plays once, doesn't reverse on scroll up
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [title, delay]);

  return (
    <Tag ref={ref} className={`text-heading ${className}`}>
      {title}
    </Tag>
  );
}