"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface AnimatedHeadingProps {
  title: string;
  className?: string;
  mode?: "split" | "blade" | "drift";
  delay?: number;
}

export function AnimatedHeading({
  title,
  className = "",
  mode = "split",
  delay = 0,
}: AnimatedHeadingProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const isSingleWordBlade =
    mode === "blade" && title.trim().split(" ").length === 1;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay, defaults: { ease: "expo.out" } });

      if (mode === "split") {
        const chars = el.querySelectorAll<HTMLElement>(".ah-char");
        gsap.set(chars, { yPercent: 120, rotation: 6, opacity: 0 });
        tl.to(chars, {
          yPercent: 0,
          rotation: 0,
          opacity: 1,
          duration: 1.1,
          stagger: { amount: 0.55 },
          onComplete: () => {
            gsap.set(chars, { clearProps: "all" });
            el.querySelectorAll<HTMLElement>(".ah-word-wrap").forEach((w) => {
              w.style.overflow = "visible";
            });
          },
        });
      }

      if (mode === "blade") {
        if (isSingleWordBlade) {
          const chars = el.querySelectorAll<HTMLElement>(".ah-char-blade");
          gsap.set(chars, {
            xPercent: -8,
            opacity: 0,
            clipPath: "inset(0 100% 0 0)",
          });
          tl.to(chars, {
            xPercent: 0,
            opacity: 1,
            clipPath: "inset(0 0% 0 0)",
            duration: 0.95,
            stagger: 0.055,
            onComplete: () => {
              gsap.set(chars, { clearProps: "all" });
              el.querySelectorAll<HTMLElement>(".ah-word-wrap").forEach((w) => {
                w.style.overflow = "visible";
              });
            },
          });
        } else {
          const words = el.querySelectorAll<HTMLElement>(".ah-word-inner");
          gsap.set(words, {
            xPercent: -8,
            opacity: 0,
            clipPath: "inset(0 100% 0 0)",
          });
          tl.to(words, {
            xPercent: 0,
            opacity: 1,
            clipPath: "inset(0 0% 0 0)",
            duration: 1.1,
            stagger: 0.13,
            onComplete: () => {
              gsap.set(words, { clearProps: "all" });
              el.querySelectorAll<HTMLElement>(".ah-word-wrap").forEach((w) => {
                w.style.overflow = "visible";
              });
            },
          });
        }
      }

      if (mode === "drift") {
        const words = el.querySelectorAll<HTMLElement>(".ah-word-inner");
        gsap.set(words, { y: 30, opacity: 0, filter: "blur(6px)" });
        tl.to(words, {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.4,
          stagger: 0.18,
          ease: "power3.out",
          onComplete: () => {
            gsap.set(words, { clearProps: "all" });
            el.querySelectorAll<HTMLElement>(".ah-word-wrap").forEach((w) => {
              w.style.overflow = "visible";
            });
          },
        });
      }
    }, el);

    return () => ctx.revert();
  }, [title, mode, delay, isSingleWordBlade]);

  const words = title.split(" ");

  return (
    <h1 ref={ref} className={`text-heading ${className}`}>
      {words.map((word, wi) => (
        <span
          key={wi}
          className="ah-word-wrap"
          style={{
            display: "inline-block",
            overflow: "hidden",
            verticalAlign: "top",
            marginRight: wi < words.length - 1 ? "0.3em" : 0,
          }}
        >
          {mode === "split" ? (
            [...word].map((char, ci) => (
              <span
                key={ci}
                style={{
                  display: "inline-block",
                  overflow: "hidden",
                  verticalAlign: "top",
                }}
              >
                <span className="ah-char" style={{ display: "inline-block" }}>
                  {char}
                </span>
              </span>
            ))
          ) : isSingleWordBlade ? (
            [...word].map((char, ci) => (
              <span
                key={ci}
                style={{
                  display: "inline-block",
                  overflow: "hidden",
                  verticalAlign: "top",
                }}
              >
                <span
                  className="ah-char-blade"
                  style={{ display: "inline-block" }}
                >
                  {char}
                </span>
              </span>
            ))
          ) : (
            <span className="ah-word-inner" style={{ display: "inline-block" }}>
              {word}
            </span>
          )}
        </span>
      ))}
    </h1>
  );
}