"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { momentsOfSustainability } from "../data";

const DESIGN_WIDTH = 1920;
const TRACK_HEIGHT = 615;

function useTrackScale() {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const update = () => {
      setScale(Math.max(0.38, Math.min(1, window.innerWidth / DESIGN_WIDTH)));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return scale;
}

export default function SustainablityMoments() {
  const slides = momentsOfSustainability.slides;
  const colRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const rafId = useRef<number>(0);
  const isVisible = useRef(false);
  const scale = useTrackScale();

  useEffect(() => {
    // ── 1. Only run RAF while section is in viewport ──
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          scheduleUpdate();
        } else {
          cancelAnimationFrame(rafId.current);
          // Reset all cols to grayscale when off-screen
          colRefs.current.forEach((col) => {
            if (col) col.style.filter = "grayscale(1)";
          });
        }
      },
      { threshold: 0 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    function scheduleUpdate() {
      rafId.current = requestAnimationFrame(update);
    }

    function update() {
      if (!isVisible.current) return;

      const viewportCenter = window.innerWidth / 2;
      const threshold = window.innerWidth * 0.25;

      // ── 2. Batch ALL reads first, then ALL writes ──
      const values = colRefs.current.map((col) => {
        if (!col) return null;
        const rect = col.getBoundingClientRect();
        const colCenter = rect.left + rect.width / 2;
        const distance = Math.abs(colCenter - viewportCenter);
        return Math.min(distance / threshold, 1);
      });

      values.forEach((grayscale, i) => {
        if (grayscale === null) return;
        const col = colRefs.current[i];
        if (col) col.style.filter = `grayscale(${grayscale})`;
      });

      scheduleUpdate();
    }

    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  const setColRef = (index: number) => (el: HTMLDivElement | null) => {
    colRefs.current[index] = el;
  };

  return (
    <section ref={sectionRef} className="w-full py-160 overflow-hidden" data-header="dark">
      {/* Header */}
      <div className="container text-center mb-60">
        <h2 className="text-heading font-[optima] uppercase text-foreground mb-20">
          {momentsOfSustainability.title}
        </h2>
        <p className="text-description text-foreground-light max-w-[86ch] mx-auto whitespace-pre-line">
          {momentsOfSustainability.description}
        </p>
      </div>

      {/* Infinite scroll track */}
      <div
        className="relative overflow-hidden"
        style={{ height: `${TRACK_HEIGHT * scale}px` }}
      >
        <div
          style={{
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            width: `${100 / scale}%`,
            // ── 3. Promote to own GPU layer — keeps transform off main thread ──
            willChange: "transform",
          }}
        >
          <div className="flex w-max marquee-track-sustainability">
            {/* Progressive blur overlay */}
            <div className="left-0 bottom-0 absolute w-full h-[60%] z-10 overflow-hidden">
              {[...Array(8)].map((_, i) => {
                const blur = (i / 7) * 7.4;
                const startY = 38.36 + (i / 7) * (100 - 38.36);
                const endY =
                  i === 7 ? 100 : 38.36 + ((i + 1) / 7) * (100 - 38.36);
                return (
                  <div
                    key={i}
                    className="absolute inset-0"
                    style={{
                      backdropFilter: `blur(${blur}px)`,
                      WebkitBackdropFilter: `blur(${blur}px)`,
                      maskImage: `linear-gradient(to bottom, transparent ${startY}%, black ${startY}%, black ${endY}%, transparent ${endY}%)`,
                      WebkitMaskImage: `linear-gradient(to bottom, transparent ${startY}%, black ${startY}%, black ${endY}%, transparent ${endY}%)`,
                    }}
                  />
                );
              })}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0) 28.62%, rgba(255,255,255,0.19) 130.19%)",
                }}
              />
            </div>

            {[...slides, ...slides].map((slide, idx) => (
              <div
                key={`${slide.id}-${idx}`}
                className="flex items-end h-[615px] gap-40 pr-40 flex-shrink-0"
              >
                {/* Col A */}
                <div
                  ref={setColRef(idx * 4 + 0)}
                  className="flex flex-col flex-shrink-0 gap-40 h-[615px]"
                  style={{ transition: "filter 0.5s ease", willChange: "filter" }}
                >
                  {slide.cols[0].images.map((img) => (
                    <div
                      key={img.src}
                      className="relative flex-shrink-0 overflow-hidden"
                      style={{ width: `${img.width}px`, height: `${img.height}px` }}
                    >
                      <Image src={img.src} alt={img.alt} fill className="object-cover object-center pointer-events-none" />
                    </div>
                  ))}
                </div>

                {/* Col B */}
                <div
                  ref={setColRef(idx * 4 + 1)}
                  className="flex flex-col justify-end flex-shrink-0 h-[615px]"
                  style={{ transition: "filter 0.5s ease", willChange: "filter" }}
                >
                  {slide.cols[1].images.map((img) => (
                    <div
                      key={img.src}
                      className="relative flex-shrink-0 overflow-hidden"
                      style={{ width: `${img.width}px`, height: `${img.height}px` }}
                    >
                      <Image src={img.src} alt={img.alt} fill className="object-cover object-center pointer-events-none" />
                    </div>
                  ))}
                </div>

                {/* Col C */}
                <div
                  ref={setColRef(idx * 4 + 2)}
                  className="flex flex-col flex-shrink-0 gap-40 h-[615px]"
                  style={{ transition: "filter 0.5s ease", willChange: "filter" }}
                >
                  {slide.cols[2].images.map((img) => (
                    <div
                      key={img.src}
                      className="relative flex-shrink-0 overflow-hidden"
                      style={{ width: `${img.width}px`, height: `${img.height}px` }}
                    >
                      <Image src={img.src} alt={img.alt} fill className="object-cover object-center pointer-events-none" />
                    </div>
                  ))}
                </div>

                {/* Col D */}
                <div
                  ref={setColRef(idx * 4 + 3)}
                  className="flex flex-col justify-center flex-shrink-0 h-[615px]"
                  style={{ transition: "filter 0.5s ease", willChange: "filter" }}
                >
                  <div
                    className="relative overflow-hidden"
                    style={{ width: `${slide.peekImage.width}px`, height: `${slide.peekImage.height}px` }}
                  >
                    <Image src={slide.peekImage.src} alt={slide.peekImage.alt} fill className="object-cover object-center pointer-events-none" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}