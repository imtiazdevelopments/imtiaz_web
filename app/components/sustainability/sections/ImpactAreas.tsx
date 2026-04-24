"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import SliderArrowButton from "../../common/SliderNavigationButton";
import { SectionHeading } from "../../animations/SectionHeading";
import Reveal from "../../animations/RevealOneByOneAnimation";
import { moveUpV2 } from "../../motionVariants";
import { SectionDescription } from "../../animations/SectionDescription";

type ImpactAreaItem = {
  id: string;
  title: string;
  description: string;
  image: string;
};

type ImpactAreas = {
  title: string;
  description?: string;
  items: ImpactAreaItem[];
};

const ColItem = ({
  item,
  i,
  isActive,
  showDivider,
  onEnter,
}: {
  item: ImpactAreaItem;
  i: number;
  isActive: boolean;
  showDivider: boolean;
  onEnter: (i: number) => void;
}) => (
  <div
    className="flex-1 relative flex items-end pb-[130px] md:pb-0 md:items-center justify-center cursor-default min-h-[368px]"
    onMouseEnter={() => onEnter(i)}
  >
    {showDivider && (
      <div
        className="absolute left-0 top-0 h-full w-[1px] -translate-x-1/2"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0) 0%, #FFFFFF 100%)",
        }}
      />
    )}

    <motion.div
      className="absolute inset-0"
      initial={false}
      animate={{ opacity: isActive ? 1 : 0 }}
      transition={{ duration: 0.9, ease: [0.62, 0.05, 0.01, 0.99] }}
      style={{
        background:
          "linear-gradient(180deg, rgba(0,0,0,0) 7.68%, rgba(0,0,0,0.94) 100%)",
      }}
    />

    <div className="relative flex flex-col items-center justify-center text-center">
      {/* Title — moves up smoothly */}
      <motion.h3
        className="text-white font-[optima] uppercase max-w-[201px] text-25"
        initial={false}
        animate={{ y: isActive ? -16 : 0 }}
        transition={{
          duration: 0.9,
          ease: [0.25, 0.46, 0.45, 0.94],
          delay: isActive ? 0.08 : 0,
        }}
      >
        {item.title}
      </motion.h3>

      {/* Clip wrapper — animate height via motion, not maxHeight */}
      <motion.div
        className="overflow-hidden"
        initial={false}
        animate={{ height: isActive ? "auto" : 0 }}
        transition={{
          duration: 0.7,
          ease: [0.25, 0.46, 0.45, 0.94],
          delay: isActive ? 0.15 : 0,
        }}
      >
        <motion.div
          initial={false}
          animate={{
            opacity: isActive ? 1 : 0,
            y: isActive ? 0 : 16,
          }}
          transition={{
            opacity: {
              duration: 0.6,
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: isActive ? 0.2 : 0,
            },
            y: {
              duration: 0.6,
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: isActive ? 0.25 : 0,
            },
          }}
          className="pt4 md:pt-[10px]"
        >
          <p className="text-white/80 text-16 font-[avenirBook] leading-[1.54] max-w-[507px] mx-auto px-30 3xl:px-5">
            {item.description}
          </p>
        </motion.div>
      </motion.div>
    </div>
  </div>
);

export default function ImpactAreas({ data }: { data: ImpactAreas }) {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const fadeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const swiperRef = useRef<SwiperType | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const bgImageRef = useRef<HTMLImageElement>(null);
  const bgPrevImageRef = useRef<HTMLImageElement>(null);
  const bgCurrentWrapperRef = useRef<HTMLDivElement>(null); // only current fades

  useEffect(() => {
    data.items.forEach((item) => {
      const img = new window.Image();
      img.src = item.image;
    });
  }, []);

  // Parallax — stable ref, works throughout entire scroll
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = (vh / 2 - (rect.top + rect.height / 2)) / vh;
      const y = progress * 15;
      [bgImageRef, bgPrevImageRef].forEach((ref) => {
        if (ref.current) {
          ref.current.style.transform = `scale(1.15) translateY(${y}vh)`;
        }
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleEnter = (index: number) => {
    if (index === activeIndex) return;
    if (fadeTimer.current) clearTimeout(fadeTimer.current);

    const nextSrc = data.items[index].image;

    // Pre-load next image first, then crossfade instantly
    const preload = new window.Image();
    preload.src = nextSrc;

    const swap = () => {
      if (bgPrevImageRef.current && bgImageRef.current) {
        bgPrevImageRef.current.src = bgImageRef.current.src;
      }
      if (bgImageRef.current) {
        bgImageRef.current.src = nextSrc;
      }
      if (bgCurrentWrapperRef.current) {
        bgCurrentWrapperRef.current.style.transition = "none";
        bgCurrentWrapperRef.current.style.opacity = "0";
        // Force a reflow so the browser registers opacity:0 before transitioning
        void bgCurrentWrapperRef.current.offsetHeight;
        bgCurrentWrapperRef.current.style.transition = "opacity 0.6s ease";
        bgCurrentWrapperRef.current.style.opacity = "1";
      }
    };

    if (preload.complete) {
      swap();
    } else {
      preload.onload = swap;
    }

    setCurrentIndex(index);
    setActiveIndex(index);
  };

  const handleSlideChange = (swiper: SwiperType) => {
    const index = swiper.realIndex;
    const nextSrc = data.items[index].image;

    const preload = new window.Image();
    preload.src = nextSrc;

    const swap = () => {
      if (bgPrevImageRef.current && bgImageRef.current) {
        bgPrevImageRef.current.src = bgImageRef.current.src;
      }
      if (bgImageRef.current) {
        bgImageRef.current.src = nextSrc;
      }
      if (bgCurrentWrapperRef.current) {
        bgCurrentWrapperRef.current.style.transition = "none";
        bgCurrentWrapperRef.current.style.opacity = "0";
        void bgCurrentWrapperRef.current.offsetHeight;
        bgCurrentWrapperRef.current.style.transition = "opacity 0.6s ease";
        bgCurrentWrapperRef.current.style.opacity = "1";
      }
    };

    if (preload.complete) {
      swap();
    } else {
      preload.onload = swap;
    }

    setCurrentIndex(index);
    setActiveIndex(index);
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden"
      data-header="light"
    >
      <div className="absolute inset-0 bg-[#0a0a0a] z-0" />

      <div className="absolute inset-0 z-[1]">
        {/* Previous — never fades, always visible underneath */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={bgPrevImageRef}
          src={data.items[0].image}
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ transform: "scale(1.15) translateY(0vh)" }}
        />

        {/* Current — fades in/out on top of previous */}
        <div ref={bgCurrentWrapperRef} className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={bgImageRef}
            src={data.items[0].image}
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-center"
            style={{ transform: "scale(1.15) translateY(0vh)" }}
          />
        </div>
      </div>

      <div className="absolute inset-0 bg-black/50 z-10" />

      <div className="absolute top-120 md:top-130 left-1/2 -translate-x-1/2 z-20 container">
        <SectionHeading
          title={data.title}
          className="text-white text-center pointer-events-none mb-20"
        />
        {data.description && (
          <SectionDescription
            text={data.description}
            className="text-white text-center max-w-[931px] mx-auto whitespace-pre-line"
          />
        )}
      </div>

      {/* Desktop (md+) */}
      <div className="absolute left-0 bottom-0 right-0 z-20 hidden md:grid md:grid-cols-3">
        {data.items.map((item, i) => (
          <Reveal key={item.id} variants={moveUpV2}>
            <ColItem
              item={item}
              i={i}
              isActive={activeIndex === i}
              showDivider={i !== 0}
              onEnter={handleEnter}
            />
          </Reveal>
        ))}
      </div>

      {/* Mobile nav buttons */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 z-30 flex justify-between px-30 pointer-events-none md:hidden">
        {data.items.length > 1 && (
          <>
            <div className="pointer-events-auto">
              <SliderArrowButton
                onClick={() => swiperRef.current?.slidePrev()}
                direction="prev"
                variant="light"
              />
            </div>
            <div className="pointer-events-auto">
              <SliderArrowButton
                onClick={() => swiperRef.current?.slideNext()}
                direction="next"
                variant="light"
              />
            </div>
          </>
        )}
      </div>

      {/* Mobile (below md) */}
      <div className="absolute left-0 bottom-0 right-0 z-20 md:hidden">
        <Swiper
          modules={[Autoplay]}
          slidesPerView={1}
          breakpoints={{ 640: { slidesPerView: 2 } }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            handleSlideChange(swiper);
          }}
          onSlideChange={handleSlideChange}
        >
          {data.items.map((item, i) => (
            <SwiperSlide key={item.id}>
              <ColItem
                item={item}
                i={i}
                isActive={activeIndex === i}
                showDivider={i !== 0}
                onEnter={handleEnter}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        {/* Pagination Dots */}
        <div className="flex gap-3 justify-center items-center z-[50] absolute bottom-[70px] md:bottom-70 left-1/2 -translate-x-1/2">
          {data.items.map((_, i) => (
            <button
              key={i}
              onClick={() => swiperRef.current?.slideToLoop(i)}
              className={`w-[10px] h-[10px] rounded-full border transition-all cursor-pointer ${
                activeIndex === i
                  ? "bg-white border-white"
                  : "border-white bg-transparent"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
