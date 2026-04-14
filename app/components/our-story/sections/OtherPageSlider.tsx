"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { moveUp } from "../../motionVariants";
import { otherPageSliderData } from "../data";
import gsap from "gsap";
import CustomOutlineButton from "../../common/CustomOutlineButton";

export default function OtherPageSlider() {
  const { slides } = otherPageSliderData;
  const [current, setCurrent] = useState(0);
  const currentRef = useRef(0);
  const transitioning = useRef(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const cooldownRef = useRef(false); // debounce guard

  // Two canvas layers
  const layerARef = useRef<HTMLDivElement>(null);
  const layerBRef = useRef<HTMLDivElement>(null);
  const activeLayerRef = useRef<"A" | "B">("A");

  // Drag tracking
  const dragStartX = useRef<number | null>(null);
  const isDragging = useRef(false);

  // Preloaded images cache
  const imageCache = useRef<Record<string, HTMLImageElement>>({});

  // Preload all images on mount
  useEffect(() => {
    slides.forEach((slide) => {
      if (!imageCache.current[slide.bgImage]) {
        const img = new window.Image();
        img.src = slide.bgImage;
        imageCache.current[slide.bgImage] = img;
      }
    });
  }, [slides]);

  // Parallax on scroll
  useEffect(() => {
    const PARALLAX_STRENGTH = 15; // vh units

    const handleScroll = () => {
      const section = layerARef.current?.closest(
        "section",
      ) as HTMLElement | null;
      if (!section) return;

      const { top, height } = section.getBoundingClientRect();
      const viewportH = window.innerHeight;

      // progress: -1 (section bottom at top of viewport) → +1 (section top at bottom)
      const progress = (viewportH / 2 - (top + height / 2)) / (viewportH / 2);
      const offset = progress * PARALLAX_STRENGTH;

      [layerARef.current, layerBRef.current].forEach((layer) => {
        if (!layer) return;
        layer.style.backgroundPositionY = `calc(50% + ${offset}vh)`;
        // scale is applied via transform on a wrapper — use backgroundSize for zoom
        layer.style.backgroundSize = `cover`;
        layer.style.transform = `scale(1.15)`;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // run once on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const setLayerBg = (layer: HTMLDivElement, src: string) => {
    layer.style.backgroundImage = `url(${src})`;
    layer.style.backgroundSize = "cover";
    layer.style.backgroundPosition = "center";
    layer.style.transform = "scale(1.15)"; // headroom for parallax movement
  };

  // Reset autoplay — always restarts the 4500ms clock from zero
  const resetAutoplay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      goNextAuto();
    }, 4500);
  }, []); // goNextAuto defined below via ref to avoid stale closure

  const goNextAutoRef = useRef<() => void>(() => {});

  const goTo = useCallback(
    (index: number, fromAuto = false) => {
      // Block if already transitioning OR cooldown active (except autoplay which manages its own rhythm)
      if (transitioning.current) return;
      if (!fromAuto && cooldownRef.current) return;
      if (index === currentRef.current) return;

      transitioning.current = true;
      cooldownRef.current = true;

      const layerA = layerARef.current!;
      const layerB = layerBRef.current!;
      const incoming = activeLayerRef.current === "A" ? layerB : layerA;
      const outgoing = activeLayerRef.current === "A" ? layerA : layerB;
      setLayerBg(incoming, slides[index].bgImage);
      gsap.set(incoming, { opacity: 0, zIndex: 10 });
      gsap.set(outgoing, { zIndex: 5 });

      // ✅ Update content immediately when image starts fading
      currentRef.current = index;
      setCurrent(index);

      gsap.to(incoming, {
        opacity: 1,
        duration: 1,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.set(outgoing, { opacity: 0 });
          activeLayerRef.current = activeLayerRef.current === "A" ? "B" : "A";
          transitioning.current = false;

          setTimeout(() => {
            cooldownRef.current = false;
          }, 600);
        },
      });
    },
    [slides],
  );

  const goPrev = useCallback(() => {
    resetAutoplay();
    goTo((currentRef.current - 1 + slides.length) % slides.length);
  }, [slides.length, goTo, resetAutoplay]);

  const goNext = useCallback(() => {
    resetAutoplay();
    goTo((currentRef.current + 1) % slides.length);
  }, [slides.length, goTo, resetAutoplay]);

  const goNextAuto = useCallback(() => {
    goTo((currentRef.current + 1) % slides.length, true);
  }, [slides.length, goTo]);

  // Keep ref in sync so resetAutoplay's interval always calls latest goNextAuto
  useEffect(() => {
    goNextAutoRef.current = goNextAuto;
  }, [goNextAuto]);

  // Init layer A with first slide
  useEffect(() => {
    if (layerARef.current) {
      setLayerBg(layerARef.current, slides[0].bgImage);
      gsap.set(layerARef.current, { opacity: 1, zIndex: 10 });
    }
    if (layerBRef.current) {
      gsap.set(layerBRef.current, { opacity: 0, zIndex: 5 });
    }
  }, [slides]);

  // Initial autoplay
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      goNextAutoRef.current();
    }, 4500);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // ── Drag handlers ──────────────────────────────────────────────
  const DRAG_THRESHOLD = 50; // px needed to trigger a slide change

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    dragStartX.current = e.clientX;
    isDragging.current = false;
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (dragStartX.current === null) return;
    if (Math.abs(e.clientX - dragStartX.current) > 8) {
      isDragging.current = true;
    }
  }, []);

  const onPointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (dragStartX.current === null) return;
      const delta = e.clientX - dragStartX.current;

      if (isDragging.current && Math.abs(delta) >= DRAG_THRESHOLD) {
        if (delta < 0) {
          goNext(); // dragged left → next
        } else {
          goPrev(); // dragged right → prev
        }
      }

      dragStartX.current = null;
      isDragging.current = false;
    },
    [goNext, goPrev],
  );

  const onPointerLeave = useCallback(() => {
    dragStartX.current = null;
    isDragging.current = false;
  }, []);

  return (
    <section
      data-header="dark"
      className="relative w-full overflow-hidden select-none h-[90vh] cursor-grab"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerLeave}
    >
      {/* Full-bleed background layers — these must stay outside container to cover full width */}
      <div
        ref={layerARef}
        className="absolute inset-0"
        style={{ willChange: "opacity" }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>
      <div
        ref={layerBRef}
        className="absolute inset-0"
        style={{ willChange: "opacity" }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Container — all visible UI lives here */}
      <div className="container h-full relative z-20">
        {/* Left nav */}
        <motion.div
          variants={moveUp(0.3)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="absolute left-[15px] bottom-20 md:bottom-auto md:top-1/2 md:-translate-y-1/2 z-30"
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            style={{ cursor: "pointer" }}
            className="relative w-[62px] h-[62px] w-[45px] h-[45px] group border border-white rounded-[50px] flex items-center justify-center overflow-hidden"
          >
            <span className="absolute left-0 top-0 h-full w-0 bg-white/30 transition-all duration-300 group-hover:w-full z-0" />
            <img
              src="/icons/left_arrow_slider_primary.svg"
              alt="Prev"
              className="relative z-10 object-contain w-[28px] h-[28px]   invert brightness-0 group-hover:invert-0 group-hover:brightness-100 transition-all duration-300"
            />
          </button>
        </motion.div>

        {/* Right nav */}
        <motion.div
          variants={moveUp(0.3)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="absolute right-[15px] bottom-20 md:bottom-auto md:top-1/2 md:-translate-y-1/2 z-30"
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            style={{ cursor: "pointer" }}
            className="relative  w-[62px] h-[62px]   group border border-white rounded-[50px] flex items-center justify-center overflow-hidden"
          >
            <span className="absolute left-0 top-0 h-full w-0 bg-white/30 transition-all duration-300 group-hover:w-full z-0" />
            <img
              src="/icons/left_arrow_slider_primary.svg"
              alt="Next"
              className="relative rotate-180 z-10 object-contain w-[28px] h-[28px]  invert brightness-0 group-hover:invert-0 group-hover:brightness-100 transition-all duration-300"
            />
          </button>
        </motion.div>

        {/* Center content */}
        <div
          key={current}
          className="absolute inset-0 flex flex-col items-center justify-center text-center"
        >
          <motion.h2
            variants={moveUp(0)}
            initial="hidden"
            animate="show"
            className="uppercase text-white text-heading mb-20"
          >
            {slides[current].title}
          </motion.h2>
          <motion.p
            variants={moveUp(0.15)}
            initial="hidden"
            animate="show"
            className="text-description text-white/80 mb-50 max-w-[50ch]"
          >
            {slides[current].description}
          </motion.p>
          <motion.div variants={moveUp(0.2)} initial="hidden" animate="show">
            <CustomOutlineButton
              text="learn more"
              className="capitalize"
              variant="light"
              px="px-[12px] sm:px-[26px] lg:px-[34px]"
            />
          </motion.div>
        </div>

        {/* Pagination dots */}
        <div className="absolute bottom-70 left-1/2 -translate-x-1/2 z-30 flex items-center justify-center gap-3">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.stopPropagation();
                resetAutoplay();
                goTo(i);
              }}
              style={{ cursor: "pointer" }}
              className={`rounded-full transition-all duration-300 border border-white w-[10px] h-[10px] ${
                i === current ? "bg-white" : "bg-transparent"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
