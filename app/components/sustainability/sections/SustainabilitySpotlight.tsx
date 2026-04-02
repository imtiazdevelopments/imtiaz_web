"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { sustainabilitySpotlight } from "../data";
import CustomOutlineButton from "../../common/CustomOutlineButton";
import SliderArrowButton from "../../common/SliderNavigationButton";
import { moveUp, itemVariants } from "../../motionVariants";
import { SectionHeading } from "../../animations/SectionHeading";

export default function SustainabilitySpotlight() {
  const slides = sustainabilitySpotlight.slides;
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const currentRef = useRef(0);
  const directionRef = useRef<1 | -1>(1);

  const dLayerARef = useRef<HTMLDivElement>(null);
  const dLayerBRef = useRef<HTMLDivElement>(null);
  const dLayerBImgRef = useRef<HTMLDivElement>(null);

  const mLayerARef = useRef<HTMLDivElement>(null);
  const mLayerBRef = useRef<HTMLDivElement>(null);
  const mLayerBImgRef = useRef<HTMLDivElement>(null);

  const dragStartX = useRef<number | null>(null);
  const isDragging = useRef(false);
  const DRAG_THRESHOLD = 50;

  const sectionRef = useRef<HTMLElement>(null);
  const dImgParallaxRef = useRef<HTMLDivElement>(null);
  const mImgParallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = (vh / 2 - (rect.top + rect.height / 2)) / vh;
      const y = progress * 15;
      [dImgParallaxRef, mImgParallaxRef].forEach((ref) => {
        if (ref.current) {
          ref.current.style.transform = `scale(1.15) translateY(${y}vh)`;
        }
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

const setBg = (el: HTMLDivElement | null, src: string) => {
  if (!el) return;
  const img = el.querySelector("img");
  if (img) {
    img.srcset = "";
    img.src = src;
  }
};

  const animateLayer = (
    layerA: HTMLDivElement | null,
    layerB: HTMLDivElement | null,
    layerBImg: HTMLDivElement | null,
    dir: 1 | -1,
    prevSrc: string,
    nextSrc: string,
    onComplete?: () => void,
  ) => {
    if (!layerB || !layerBImg) return;
    setBg(layerA, prevSrc);
    setBg(layerB, nextSrc);
    gsap.killTweensOf([layerB, layerBImg]);
    gsap.set(layerB, {
      clipPath: dir === 1 ? "inset(0% 0% 0% 100%)" : "inset(0% 100% 0% 0%)",
    });
    gsap.set(layerBImg, { scale: 1.06 });
    const tl = gsap.timeline({ onComplete });
    tl.to(layerB, {
      clipPath: "inset(0% 0% 0% 0%)",
      duration: 1.0,
      ease: "expo.inOut",
    });
    tl.to(layerBImg, { scale: 1, duration: 1.4, ease: "power2.out" }, "<");
  };

  const go = useCallback(
    (nextIndex: number, forcedDirection?: 1 | -1) => {
      if (isAnimating || nextIndex === currentRef.current) return;
      const prevIndex = currentRef.current;
      const dir: 1 | -1 = forcedDirection ?? (nextIndex > prevIndex ? 1 : -1);
      directionRef.current = dir;
      currentRef.current = nextIndex;
      const prevSrc = slides[prevIndex].image;
      const nextSrc = slides[nextIndex].image;
      setIsAnimating(true);
      setCurrent(nextIndex);
      let completed = 0;
      const onComplete = () => {
        completed++;
        if (completed >= 2) {
          setBg(dLayerARef.current, nextSrc);
          gsap.set(dLayerBRef.current, { clipPath: "inset(0% 100% 0% 0%)" });
          gsap.set(dLayerBImgRef.current, { scale: 1 });
          setBg(mLayerARef.current, nextSrc);
          gsap.set(mLayerBRef.current, { clipPath: "inset(0% 100% 0% 0%)" });
          gsap.set(mLayerBImgRef.current, { scale: 1 });
          setIsAnimating(false);
        }
      };
      animateLayer(
        dLayerARef.current,
        dLayerBRef.current,
        dLayerBImgRef.current,
        dir,
        prevSrc,
        nextSrc,
        onComplete,
      );
      animateLayer(
        mLayerARef.current,
        mLayerBRef.current,
        mLayerBImgRef.current,
        dir,
        prevSrc,
        nextSrc,
        onComplete,
      );
    },
    [isAnimating, slides],
  );

  const goPrev = useCallback(() => {
    const prev =
      currentRef.current === 0 ? slides.length - 1 : currentRef.current - 1;
    go(prev, -1);
  }, [slides.length, go]);

  const goNext = useCallback(() => {
    const next =
      currentRef.current === slides.length - 1 ? 0 : currentRef.current + 1;
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

  const pointerHandlers = {
    onPointerDown: handlePointerDown,
    onPointerMove: handlePointerMove,
    onPointerUp: handlePointerUp,
    onPointerLeave: handlePointerLeave,
  };

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#EBEBEC] py-120 3xl:py-130"
      data-header="dark"
    >
      <div className="container">
        {/* ── Mobile (below lg) ── */}
        <div className="flex flex-col items-center lg:hidden">
          <SectionHeading
            title={sustainabilitySpotlight.title}
            className="uppercase text-foreground mb-50 text-center"
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              className="flex flex-col items-center text-center mb-50"
            >
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
                  className="text-primary-2 text-19 leading-[100%] font-[avenirHeavy] hover:opacity-70 transition-opacity duration-300"
                >
                  Read More...
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center gap-[10px] mb-50">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                className={`rounded-full transition-all duration-300 cursor-pointer w-[10px] h-[10px] ${i === current ? "bg-primary-2" : "bg-white border border-primary-2"}`}
              />
            ))}
          </div>

          {/* Mobile image — own refs */}
          <div
            className="w-full relative h-[320px] sm:h-[400px] overflow-hidden cursor-grab active:cursor-grabbing select-none mb-50"
            {...pointerHandlers}
          >
            <div
              ref={mImgParallaxRef}
              className="absolute inset-0"
              style={{ transform: "scale(1.15) translateY(0vh)" }}
            >
              <div ref={mLayerARef} className="absolute inset-0">
                <Image
                  src={slides[0].image}
                  alt={slides[0].alt}
                  fill
                  className="object-cover object-center"
                  draggable={false}
                />
              </div>
              <div
                ref={mLayerBRef}
                className="absolute inset-0"
                style={{ clipPath: "inset(0% 100% 0% 0%)" }}
              >
                <div ref={mLayerBImgRef} className="absolute inset-0">
                  <Image
                    src={slides[0].image}
                    alt={slides[0].alt}
                    fill
                    className="object-cover object-center"
                    draggable={false}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-30">
            <CustomOutlineButton
              variant="dark"
              text="View All"
              borderColor="border-primary-2"
              textColor="text-foreground-light"
              px="px-[12px] sm:px-[26px]"
            />
            <div className="flex items-center gap-[15px]">
              <SliderArrowButton
                onClick={goPrev}
                direction="prev"
                variant="dark"
              />
              <SliderArrowButton
                onClick={goNext}
                direction="next"
                variant="dark"
              />
            </div>
          </div>
        </div>

        {/* ── Desktop (lg+) ── */}
        <div className="hidden lg:block">
          <div className="flex items-center gap-50 3xl:gap-0">
            <div className="w-1/2 flex flex-col items-center justify-center">
              <div className="flex flex-col items-center text-center">
                <SectionHeading
                  title={sustainabilitySpotlight.title}
                  className="uppercase text-foreground mb-90"
                />

                <AnimatePresence mode="wait">
                  <motion.div
                    key={slide.id}
                    className="flex flex-col items-center text-center"
                  >
                    <div className="overflow-hidden mb-20">
                      <motion.span
                        custom={0}
                        variants={moveUp(0)}
                        initial="hidden"
                        animate="show"
                        exit="exit"
                        className="text-16 font-[avenirHeavy] text-foreground-light"
                      >
                        {slide.date}
                      </motion.span>
                    </div>
                    <div className="overflow-hidden">
                      <motion.h3
                        custom={1}
                        variants={moveUp(0.1)}
                        initial="hidden"
                        animate="show"
                        exit="exit"
                        className="text-25 font-[optima] uppercase text-foreground leading-[1.2] mb-50 max-w-[598px]"
                      >
                        {slide.title}
                      </motion.h3>
                    </div>
                    <div className="overflow-hidden">
                      <motion.div
                        custom={2}
                        variants={moveUp(0.14)}
                        initial="hidden"
                        animate="show"
                        exit="exit"
                      >
                        <Link
                          href={slide.href}
                          className="text-primary-2 text-19 font-[avenirHeavy] leading-[100%] hover:opacity-70 transition-colors duration-300"
                        >
                          Read More...
                        </Link>
                      </motion.div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                <div className="flex items-center gap-[10px] mt-80">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => go(i)}
                      className={`rounded-full transition-all duration-300 cursor-pointer w-[10px] h-[10px] ${i === current ? "bg-primary-2" : "bg-white border border-primary-2"}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Desktop image — own refs */}
            <div
              className="w-1/2 relative h-[460px] 3xl:h-[602px] overflow-hidden cursor-grab active:cursor-grabbing select-none"
              {...pointerHandlers}
            >
              <div
                ref={dImgParallaxRef}
                className="absolute inset-0"
                style={{ transform: "scale(1.15) translateY(0vh)" }}
              >
                <div ref={dLayerARef} className="absolute inset-0">
                  <Image
                    src={slides[0].image}
                    alt={slides[0].alt}
                    fill
                    className="object-cover object-center"
                    draggable={false}
                  />
                </div>
                <div
                  ref={dLayerBRef}
                  className="absolute inset-0"
                  style={{ clipPath: "inset(0% 100% 0% 0%)" }}
                >
                  <div ref={dLayerBImgRef} className="absolute inset-0">
                    <Image
                      src={slides[0].image}
                      alt={slides[0].alt}
                      fill
                      className="object-cover object-center"
                      draggable={false}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-hidden">
            <div className="flex justify-center mt-50 gap-20 3xl:gap-30">
              <motion.div
                variants={moveUp(0)}
                initial="hidden"
                whileInView="show"
                exit="exit"
              >
                <CustomOutlineButton
                  variant="dark"
                  text="View All"
                  borderColor="border-primary-2"
                  textColor="text-foreground-light"
                  px="px-[12px] lg:px-[20px] 3xl:px-[36.6px]"
                />
              </motion.div>
              <div className="flex items-center gap-[10px] 3xl:gap-[15px]">
                <motion.div
                  variants={moveUp(0.1)}
                  initial="hidden"
                  whileInView="show"
                  exit="exit"
                >
                  <SliderArrowButton
                    onClick={goPrev}
                    direction="prev"
                    variant="dark"
                  />
                </motion.div>
                <motion.div
                  variants={moveUp(0.13)}
                  initial="hidden"
                  whileInView="show"
                  exit="exit"
                >
                  <SliderArrowButton
                    onClick={goNext}
                    direction="next"
                    variant="dark"
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}