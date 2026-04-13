"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import Image from "next/image";
import { whatToExpectData } from "../data";

// ─── Config ───────────────────────────────────────────────────────────────────

const GAP   = 30;
const SPEED = 0.5;

/** Card widths per breakpoint — minimum 330px */
const BREAKPOINTS = [
  { minWidth: 1536, width: 429 }, // 3xl
  { minWidth: 1280, width: 390 }, // xl
  { minWidth: 1024, width: 360 }, // lg
  { minWidth: 768,  width: 340 }, // md
  { minWidth: 0,    width: 300 }, // sm
] as const;

function getCardWidth(): number {
  if (typeof window === "undefined") return 429;
  for (const bp of BREAKPOINTS) {
    if (window.innerWidth >= bp.minWidth) return bp.width;
  }
  return 300;
}

/** Base heights at full 429px card width */
export const cardHeights = [433, 517, 324, 517] as const;

/** Height scale factors per breakpoint (3xl = 1.0, shrinks gradually below) */
const HEIGHT_SCALES: { minWidth: number; scale: number }[] = [
  { minWidth: 1536, scale: 1.0 }, // 3xl — full height
  { minWidth: 1280, scale: 0.9 }, // xl
];

function getHeightScale(): number {
  if (typeof window === "undefined") return 1.0;
  for (const bp of HEIGHT_SCALES) {
    if (window.innerWidth >= bp.minWidth) return bp.scale;
  }
  return 0.9;
}

function getCardHeight(index: number, cardWidth: number): number {
  const base  = cardHeights[index % cardHeights.length];
  const scale = getHeightScale();
  return Math.round((base * cardWidth) / 429 * scale);
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function InfiniteCarousel() {
  const carouselImages = whatToExpectData.carousalImages;
  const displayImages  = [...carouselImages, ...carouselImages];

  const trackRef      = useRef<HTMLDivElement>(null);
  const offsetRef     = useRef(0);
  const rafRef        = useRef<number | null>(null);
  const totalWidthRef = useRef(0);

  // ✅ useState so resizing triggers a re-render and heights actually update
  const [cardWidth, setCardWidth] = useState<number>(429);

  // ── Update sizes on mount + resize ─────────────────────────────────────────
  const updateSizes = useCallback(() => {
    const w = getCardWidth();
    setCardWidth(w);
    totalWidthRef.current = carouselImages.length * (w + GAP);
  }, [carouselImages.length]);

  useEffect(() => {
    updateSizes();
    window.addEventListener("resize", updateSizes, { passive: true });
    return () => window.removeEventListener("resize", updateSizes);
  }, [updateSizes]);

  // ── RAF loop ──────────────────────────────────────────────────────────────
  const animate = useCallback(() => {
    if (!trackRef.current) return;

    offsetRef.current += SPEED;

    if (offsetRef.current >= totalWidthRef.current) {
      offsetRef.current -= totalWidthRef.current;
    }

    trackRef.current.style.transform = `translate3d(-${offsetRef.current}px, 0, 0)`;

    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [animate]);

  // ── Hover pause ───────────────────────────────────────────────────────────
  const handleMouseEnter = () => {
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
  };
  const handleMouseLeave = () => {
    rafRef.current = requestAnimationFrame(animate);
  };

  return (
    <div
      className="w-full overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label="Company culture carousel"
    >
      <div
        ref={trackRef}
        className="flex will-change-transform gap-30"
      >
        {displayImages.map((img, i) => {
          const height = getCardHeight(i, cardWidth);

          return (
            <div
              key={`${img.src}-${i}`}
              className="relative shrink-0 overflow-hidden"
              style={{
                width:  "clamp(300px, 28vw, 429px)",
                height: `${height}px`,
              }}
            >
              <Image
                src={img.src}
                alt="img"
                fill
                className="object-cover"
                draggable={false}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}