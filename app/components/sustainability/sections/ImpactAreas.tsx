"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { impactAreas } from "../data";
import "swiper/css";
import SliderArrowButton from "../../common/SliderNavigationButton";

const ColItem = ({
  item,
  i,
  isActive,
  showDivider,
  onEnter,
}: {
  item: (typeof impactAreas.items)[0];
  i: number;
  isActive: boolean;
  showDivider: boolean;
  onEnter: (i: number) => void;
}) => (
  <div
    className="flex-1 relative flex items-center justify-center cursor-default min-h-[368px]"
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
        animate={{ y: isActive ? -10 : 0 }}
        transition={{ duration: 0.7, ease: [0.62, 0.05, 0.01, 0.99] }}
      >
        {item.title}
      </motion.h3>

      {/* Outer wrapper: clips and reveals height */}
      <motion.div
        className="overflow-hidden"
        initial={false}
        animate={{
          height: isActive ? "auto" : 0,
          opacity: isActive ? 1 : 0,
        }}
        transition={{
          height: {
            duration: 0.65,
            ease: [0.62, 0.05, 0.01, 0.99],
            delay: isActive ? 0.18 : 0,
          },
          opacity: {
            duration: 0.5,
            ease: [0.62, 0.05, 0.01, 0.99],
            delay: isActive ? 0.18 : 0,
          },
        }}
      >
        {/* Inner: slides up independently */}
        <motion.div
          initial={false}
          animate={{ y: isActive ? 0 : 10 }}
          transition={{
            duration: 0.65,
            ease: [0.62, 0.05, 0.01, 0.99],
            delay: isActive ? 0.4 : 0,
          }}
          className="pt-5"
        >
          <p className="text-white/80 text-16 font-[avenirHeavy] leading-[1.54] max-w-[507px] mx-auto px-30 3xl:px-5">
            {item.description}
          </p>
        </motion.div>
      </motion.div>
    </div>
  </div>
);

export default function ImpactAreas() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const fadeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const swiperRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    impactAreas.items.forEach((item) => {
      const img = new window.Image();
      img.src = item.image;
    });
  }, []);

  const handleEnter = (index: number) => {
    if (index === activeIndex) return;
    if (fadeTimer.current) clearTimeout(fadeTimer.current);
    setCurrentIndex(index);
    setActiveIndex(index);
  };

  const handleSlideChange = (swiper: SwiperType) => {
    setCurrentIndex(swiper.realIndex);
    setActiveIndex(swiper.realIndex);
  };

  return (
    <section className="relative w-full h-[82vh] md:h-[70vh] lg:h-[75vh] xl:h-[95vh] 3xl:h-[907px] overflow-hidden" data-header="light">
      <div className="absolute inset-0 bg-[#0a0a0a] z-0" />

      <AnimatePresence mode="sync">
        <motion.div
          key={currentIndex}
          className="absolute inset-0 z-[1]"
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 1.4, ease: [0.62, 0.05, 0.01, 0.99] }}
        >
          <Image
            src={impactAreas.items[currentIndex].image}
            alt=""
            fill
            className="object-cover object-center"
            priority
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-black/50 z-10" />

      <h2 className="absolute top-130 left-1/2 -translate-x-1/2 z-20 text-white text-heading text-center pointer-events-none whitespace-nowrap">
        {impactAreas.title}
      </h2>

      {/* Desktop (md+) */}
      <div className="absolute left-0 bottom-0 right-0 z-20 hidden md:flex">
        {impactAreas.items.map((item, i) => (
          <ColItem
            key={item.id}
            item={item}
            i={i}
            isActive={activeIndex === i}
            showDivider={i !== 0}
            onEnter={handleEnter}
          />
        ))}
      </div>

      {/* Mobile nav buttons — centered to full section */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 z-30 flex justify-between px-30 pointer-events-none md:hidden">
        {impactAreas.items.length > 1 && (
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
          {impactAreas.items.map((item, i) => (
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
      </div>
    </section>
  );
}
