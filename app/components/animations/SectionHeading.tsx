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
  const ref = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const chars = el.querySelectorAll<HTMLElement>("[data-char]");

    gsap.set(chars, { yPercent: 120, rotation: 2, opacity: 0 });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        delay,
        scrollTrigger: {
          trigger: el,
          start: "top 95%",
          once: true,
        },
      });

      tl.to(chars, {
        yPercent: 0,
        rotation: 0,
        opacity: 1,
        duration: 1.1,
        ease: "power3.out",
        stagger: { amount: 0.55 },
      });
    }, el);

    return () => ctx.revert();
  }, [title, delay]);

  // Split into lines first, then words within each line
  const lines = title.split("\n");

 return (
    <Tag ref={ref} className={`text-heading ${className}`}>
      {lines.map((line, lineIndex) => (
        <span key={lineIndex} style={{ display: "block" }}>
          {line.trim().split(" ").map((word, wordIndex) => (
            <span
              key={`${lineIndex}-${wordIndex}-${word}`}
              style={{
                display: "inline-block",
                whiteSpace: "nowrap",
                marginRight: "0.25em",
                overflow: "hidden",
                lineHeight: "inherit",
                verticalAlign: "top",
                paddingBottom: "0.2em",
                marginBottom: "-0.2em",
              }}
            >
              {word.split("").map((char, charIndex) => (
                <span
                  key={`${lineIndex}-${wordIndex}-${charIndex}`}
                  data-char
                  style={{ display: "inline-block" }}
                >
                  {char}
                </span>
              ))}
            </span>
          ))}
        </span>
      ))}
    </Tag>
  );
}
