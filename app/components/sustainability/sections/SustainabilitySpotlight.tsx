"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { sustainabilitySpotlight } from "../data";
import CustomOutlineButton from "../../common/CustomOutlineButton";
import SliderArrowButton from "../../common/SliderNavigationButton";
import { itemVariants } from "../../motionVariants";

export default function SustainabilitySpotlight() {
  const slides = sustainabilitySpotlight.slides;
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Track current for text AnimatePresence
  const currentRef = useRef(0);
  const directionRef = useRef<1 | -1>(1);

  // Two canvas divs — A (bottom) and B (top)
  // We manually set their background images via refs, never via React state
  const layerARef = useRef<HTMLDivElement>(null); // base / outgoing
  const layerBRef = useRef<HTMLDivElement>(null); // top / incoming
  const layerBImgRef = useRef<HTMLDivElement>(null); // inner for Ken Burns

  const dragStartX = useRef<number | null>(null);
  const isDragging = useRef(false);
  const DRAG_THRESHOLD = 50;

  // Set a layer's background image directly on the DOM node
  const setBg = (el: HTMLDivElement | null, src: string) => {
    if (!el) return;
    // Find the img tag inside and swap src
    const img = el.querySelector("img");
    if (img) img.src = src;
  };

  const go = useCallback(
    (nextIndex: number, forcedDirection?: 1 | -1) => {
      if (isAnimating || nextIndex === currentRef.current) return;

      const prevIndex = currentRef.current;
      const dir: 1 | -1 =
        forcedDirection ?? (nextIndex > prevIndex ? 1 : -1);
      directionRef.current = dir;
      currentRef.current = nextIndex;

      const wrapper = layerBRef.current;
      const img = layerBImgRef.current;
      if (!wrapper || !img) return;

      // 1. Set base layer (A) to the OUTGOING image
      setBg(layerARef.current, slides[prevIndex].image);

      // 2. Set top layer (B) to the INCOMING image
      setBg(wrapper, slides[nextIndex].image);

      // 3. Position B off-screen on correct side — synchronously before paint
      //    All inset() values use consistent units (%) so GSAP can interpolate correctly
      gsap.killTweensOf([wrapper, img]);
      gsap.set(wrapper, {
        clipPath: dir === 1 ? "inset(0% 100% 0% 0%)" : "inset(0% 0% 0% 100%)",
      });
      gsap.set(img, { scale: 1.06 });

      setIsAnimating(true);
      // Trigger React re-render for text only
      setCurrent(nextIndex);

      const tl = gsap.timeline({
        onComplete: () => {
          // After animation: set base layer to incoming (now current) image
          setBg(layerARef.current, slides[nextIndex].image);
          // Reset top layer — hidden, ready for next transition
          gsap.set(wrapper, { clipPath: "inset(0% 100% 0% 0%)" });
          gsap.set(img, { scale: 1 });
          setIsAnimating(false);
        },
      });

      tl.to(wrapper, {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1.0,
        ease: "expo.inOut",
      });
      tl.to(img, { scale: 1, duration: 1.4, ease: "power2.out" }, "<");
    },
    [isAnimating, slides]
  );

  const goPrev = useCallback(() => {
    const prev = currentRef.current === 0 ? slides.length - 1 : currentRef.current - 1;
    go(prev, -1);
  }, [slides.length, go]);

  const goNext = useCallback(() => {
    const next = currentRef.current === slides.length - 1 ? 0 : currentRef.current + 1;
    go(next, 1);
  }, [slides.length, go]);

  const handlePointerDown = (e: React.PointerEvent) => {
    dragStartX.current = e.clientX;
    isDragging.current = false;
  };
  const handlePointerMove = (e: React.PointerEvent) => {
    if (dragStartX.current === null) return;
    if (Math.abs(e.clientX - dragStartX.current) > 5) isDragging.current = true;
  };
  const handlePointerUp = (e: React.PointerEvent) => {
    if (dragStartX.current === null) return;
    const delta = e.clientX - dragStartX.current;
    if (isDragging.current && Math.abs(delta) >= DRAG_THRESHOLD) {
      delta < 0 ? goNext() : goPrev();
    }
    dragStartX.current = null;
    isDragging.current = false;
  };
  const handlePointerLeave = () => {
    dragStartX.current = null;
    isDragging.current = false;
  };

  const slide = slides[current];

  return (
    <section className="w-full bg-[#EBEBEC] py-130">
      <div className="container">
        <div className="flex items-center">
          {/* Left */}
          <div className="w-1/2 flex flex-col items-center justify-center">
            <div className="flex flex-col items-center text-center">
              <h2 className="text-heading uppercase text-foreground mb-90">
                {sustainabilitySpotlight.title}
              </h2>

              <AnimatePresence mode="wait">
                <motion.div key={slide.id} className="flex flex-col items-center text-center">
                  <motion.span
                    custom={0}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="text-16 font-[avenirHeavy] text-foreground-light mb-20"
                  >
                    {slide.date}
                  </motion.span>

                  <motion.h3
                    custom={1}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="text-25 font-[optima] uppercase text-foreground leading-[1.2] mb-50 max-w-[598px]"
                  >
                    {slide.title}
                  </motion.h3>

                  <motion.div
                    custom={2}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <Link
                      href={slide.href}
                      className="text-primary-2 text-16 font-[avenirHeavy] hover:opacity-70 transition-opacity duration-300"
                    >
                      Read More...
                    </Link>
                  </motion.div>
                </motion.div>
              </AnimatePresence>

              {/* Dots */}
              <div className="flex items-center gap-[10px] mt-80">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => go(i)}
                    className={`rounded-full transition-all duration-300 cursor-pointer w-[10px] h-[10px] ${
                      i === current ? "bg-primary-2" : "bg-white border border-primary-2"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right — two image layers, both rendered once, srcs swapped via DOM */}
          <div
            className="w-1/2 relative h-[460px] 3xl:h-[602px] overflow-hidden cursor-grab active:cursor-grabbing select-none"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerLeave}
          >
            {/* Layer A — base / outgoing */}
            <div ref={layerARef} className="absolute inset-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={slides[0].image}
                alt={slides[0].alt}
                className="absolute inset-0 w-full h-full object-cover object-center"
                draggable={false}
              />
            </div>

            {/* Layer B — top / incoming, hidden until GSAP wipes it in */}
            <div
              ref={layerBRef}
              className="absolute inset-0"
              style={{ clipPath: "inset(0% 100% 0% 0%)" }}
            >
              <div ref={layerBImgRef} className="absolute inset-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={slides[0].image}
                  alt={slides[0].alt}
                  className="absolute inset-0 w-full h-full object-cover object-center"
                  draggable={false}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom controls */}
        <div className="overflow-hidden">
          <div className="flex justify-center mt-50 gap-30">
            <CustomOutlineButton
              text="View All"
              borderColor="border-primary-2"
              textColor="text-foreground-light"
              px="px-[26px] lg:px-[37px]"
            />
            <div className="flex items-center gap-[15px]">
              <SliderArrowButton onClick={goPrev} direction="prev" variant="dark" />
              <SliderArrowButton onClick={goNext} direction="next" variant="dark" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}