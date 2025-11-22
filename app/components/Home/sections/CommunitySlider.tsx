"use client";

import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectFade } from "swiper/modules";

import type { Swiper as SwiperType } from "swiper";
import Image from "next/image";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  slides: Slide[];
};

export type Feature = {
  id: string | number;
  title: string;
  subtitle?: string;
  bgImage: string;
  link?: string;
};

export type Slide = {
  id: string | number;
  title: string;
  subtitle?: string;
  features: Feature[];
};

export default function HeroFeatureSlider({ slides }: Props) {
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
  const [activeFeatureIndex, setActiveFeatureIndex] = useState<number>(1);

  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  const [hoveredBg, setHoveredBg] = useState<string | null>(null);

  const [displayBg, setDisplayBg] = useState<string | null>(null);
  const [animBg, setAnimBg] = useState<string | null>(null);

  const currentSlide = slides[activeSlideIndex];

  const baseBg =
    hoveredBg ?? currentSlide.features[activeFeatureIndex]?.bgImage ?? "";

  // Background switch system (cinematic fade)
  const switchBg = (newBg: string) => {
    if (!newBg) return;
    setDisplayBg(baseBg);
    setAnimBg(newBg);

    setTimeout(() => {
      setDisplayBg(newBg);
      setAnimBg(null);
    }, 650);
  };

  return (
    <section className="w-full relative overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        slidesPerView={1}
        speed={700}
        loop
        onSwiper={setSwiperInstance}
        onSlideChange={(s: SwiperType) => {
          setActiveSlideIndex(s.realIndex);
          setActiveFeatureIndex(1);
          setHoveredBg(null);

          const newBg = slides[s.realIndex].features[1].bgImage;
          switchBg(newBg);
        }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(s) => {
          const nav = s.params.navigation;
          if (nav && typeof nav !== "boolean") {
            nav.prevEl = prevRef.current;
            nav.nextEl = nextRef.current;
          }
        }}
        pagination={{
          el: ".hero-pagination",
          clickable: true,
        }}
        className="w-full"
      >
        {slides.map((slide, slideIndex) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full min-h-[520px] md:min-h-[680px]">
              {/* -------- BACKGROUND LAYERS -------- */}
              <div className="absolute inset-0 -z-20">
                {displayBg && (
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${displayBg}')` }}
                  />
                )}

                <AnimatePresence mode="wait">
                  {animBg && (
                    <motion.div
                      key={animBg}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url('${animBg}')` }}
                    />
                  )}
                </AnimatePresence>
              </div>

              {/* Gradient Overlay */}
              <div
                className="absolute inset-0 -z-10"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 100%)",
                }}
              />

              {/* -------- PILL HEADER WITH ENTER/EXIT ANIMATION -------- */}
              <div className="container pt-14 md:pt-20 lg:pt-24 2xl:pt-32">
                <div className="flex items-center justify-center relative">
                  {/* Left Arrow */}
                  <button
                    ref={prevRef}
                    className="absolute left-0 -translate-x-6 top-1/2 -mt-6 w-10 h-10 z-20 flex items-center justify-center"
                  >
                    <Image
                      src="/icons/left_slider_arrow.svg"
                      width={30}
                      height={30}
                      alt="prev"
                    />
                  </button>

                  {/* Animated Pill */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeSlideIndex}
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -40 }}
                      transition={{
                        duration: 0.6,
                        ease: [0.25, 0.1, 0.25, 1],
                      }}
                      className="px-10 py-8 rounded-[140px] text-center backdrop-blur-[30px] bg-black/20 max-w-[1150px] w-full"
                    >
                      <h1 className="text-white font-[optima] text-[30px] md:text-[45px] lg:text-[60px] leading-[1]">
                        {slide.title}
                      </h1>

                      {slide.subtitle && (
                        <p className="text-white/90 text-[18px] mt-4 max-w-[85ch] mx-auto">
                          {slide.subtitle}
                        </p>
                      )}
                    </motion.div>
                  </AnimatePresence>

                  {/* Right Arrow */}
                  <button
                    ref={nextRef}
                    className="absolute right-0 translate-x-6 top-1/2 -mt-6 w-10 h-10 z-20 flex items-center justify-center"
                  >
                    <Image
                      src="/icons/left_slider_arrow.svg"
                      width={30}
                      height={30}
                      className="rotate-180"
                      alt="next"
                    />
                  </button>
                </div>

                {/* Pagination */}
                <div className="mt-8 flex gap-3 justify-center">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => swiperInstance?.slideTo(i)}
                      className={`w-[10px] h-[10px] rounded-full transition-all ${
                        activeSlideIndex === i
                          ? "bg-primary"
                          : "border border-white"
                      } `}
                    />
                  ))}{" "}
                </div>
              </div>

              {/* ---------- FEATURES ---------- */}
              <div className="mt-[26px]">
                <div className="grid grid-cols-2 lg:grid-cols-4 rounded overflow-hidden relative">
                  {slide.features.map((feat, i) => {
                    const isActive = activeFeatureIndex === i;

                    return (
                      <div key={feat.id} className="relative flex flex-1">
                        <div
                          className="relative flex-1 min-h-[360px] md:min-h-[420px] 3xl:h-[618px]
                          flex justify-center items-end px-4 group transition-all"
                          onMouseEnter={() => {
                            setActiveFeatureIndex(i);
                            setHoveredBg(feat.bgImage);
                            switchBg(feat.bgImage);
                          }}
                          onMouseLeave={() => {
                            setHoveredBg(null);
                            const stayBg =
                              slide.features[activeFeatureIndex].bgImage;
                            switchBg(stayBg);
                          }}
                        >
                          {/* Card gradient */}
                          <div
                            className={`absolute inset-0 transition-opacity duration-400
                              ${isActive ? "opacity-100" : "opacity-0"}`}
                            style={{
                              background:
                                "linear-gradient(180deg, rgba(0,0,0,0) 7.68%, rgba(0,0,0,0.66) 100%)",
                            }}
                          />

                          {/* Card Text */}
                          <div className="relative z-20 w-full flex justify-center">
                            <div
                              className="
      flex flex-col items-center absolute
      bottom-[40px] xl:bottom-[60px] 3xl:bottom-[100px]
    "
                            >
                              {/* Title */}
                              <h3
                                className={`
        text-white font-[optima] uppercase text-center
        text-[22px] md:text-[25px] xl:text-[30px]
        transition-all duration-400
        ${
          isActive
            ? "translate-y-[-70px] 3xl:translate-y-[-85px]"
            : "translate-y-0"
        }
      `}
                              >
                                {feat.title}
                              </h3>

                              {/* Button */}
                              <div
                                className={`
        transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)]
        ${
          isActive
            ? "opacity-100 pointer-events-auto translate-y-[0px]"
            : "opacity-0 pointer-events-none absolute translate-y-[40px] xl:translate-y-[60px] 3xl:translate-y-[100px]"
        }
      `}
                              >
                                <a
                                  href={feat.link ?? "#"}
                                  className="inline-block border border-white px-[23px] py-[19.5px] rounded-[50px] text-white text-sm"
                                >
                                  Read More
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Divider */}
                        {i < slide.features.length - 1 && (
                          <div
                            className="hidden lg:block absolute top-0 right-0 h-full w-[1px]"
                            style={{
                              background:
                                "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.5) 100%)",
                            }}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
