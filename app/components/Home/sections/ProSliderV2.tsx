"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Navigation, Autoplay } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import type { Swiper as SwiperType } from "swiper";

import { moveUpExit } from "../../motionVariants";

export interface feats {
  icon: string;
  label: string;
}

export interface SlideData {
  title: string;
  video: string;
  pillFeatures: {
    title: string;
    features: feats[];
  };
}

type HeroSliderProps = {
  slides: SlideData[];
  RightLabel?: string;
};

export default function HeroSlider({ slides, RightLabel }: HeroSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  const swiperRef = useRef<SwiperType | null>(null);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  // detect arrow click → trigger exit animation early
  useEffect(() => {
    const nextBtn = document.querySelector(".swiper-btn-next");
    const prevBtn = document.querySelector(".swiper-btn-prev");

    const handleClick = () => {
      setIsExiting(true);
      setTimeout(() => setIsExiting(false), 450);
    };

    nextBtn?.addEventListener("click", handleClick);
    prevBtn?.addEventListener("click", handleClick);

    return () => {
      nextBtn?.removeEventListener("click", handleClick);
      prevBtn?.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div className="w-full relative">
      <Swiper
        effect="fade"
        fadeEffect={{ crossFade: true }}
        slidesPerView={1}
        loop
        modules={[EffectFade, Autoplay, Navigation]}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        onSwiper={setSwiperInstance}
        navigation={{ nextEl: ".swiper-btn-next", prevEl: ".swiper-btn-prev" }}
        className="w-full swiper-fade"
        onSlideChange={(swiper: SwiperType) => setActiveIndex(swiper.realIndex)}
        onAutoplayTimeLeft={(_, timeLeft) => {
          // Trigger exit animation slightly before slide fades
          if (timeLeft < 150 && !isExiting) {
            setIsExiting(true);

            // Reset after exit animation completes
            setTimeout(() => {
              setIsExiting(false);
            }, 200);
          }
        }}
        // onSwiper={(s) => (swiperRef.current = s)}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full flex flex-col justify-center items-center">
              {/* ---------------- BACKGROUND VIDEO ---------------- */}
              <div className="absolute inset-0 -z-10 overflow-hidden">
                <video
                  src={slide.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.5)_0%,rgba(0,0,0,0.5)_100%)]" />
              </div>

              {/* ---------------- TOP CONTENT ---------------- */}
              <div className="container px-4 md:px-6 lg:px-10 w-full pt-[50px] lg:pt-[60px] xl:pt-[80px] 2xl:pt-[100px] 3xl:pt-[200px] overflow-hidden flex flex-col items-center justify-center ">
                <AnimatePresence mode="wait">
                  {!isExiting && (
                    <motion.div
                      key={`top-${activeIndex}`}
                      initial="hidden"
                      animate="show"
                      exit="exit"
                      className="flex flex-col justify-between items-center"
                    >
                      <span
                        className="text-white font-[avenirHeavy] font-[800] uppercase
                        text-[16px] sm:text-[18px] md:text-[22px] lg:text-[25px] mb-10 lg-mb-15 2xl:mb-25 3xl:mb-[130px]"
                      >
                        {RightLabel}
                      </span>
                      <motion.h1
                        variants={{
                          hidden: { opacity: 0, y: 40 },
                          show: {
                            opacity: 1,
                            y: 0,
                            transition: { duration: 0.7, delay: 0.15 },
                          },
                          exit: moveUpExit.exit,
                        }}
                        className="text-white font-[optima] uppercase leading-[1]
                        text-[36px] md:text-[58px] lg:text-[58px] 2xl:text-[64px] 3xl:text-[70px] text-center mb-[22px]"
                      >
                        {slide.title}
                      </motion.h1>
                      <motion.div
                        variants={{
                          hidden: { opacity: 0, y: 40 },
                          show: {
                            opacity: 1,
                            y: 0,
                            transition: { duration: 0.7, delay: 0.15 },
                          },
                          exit: moveUpExit.exit,
                        }}
                      >
                        <Image
                          alt="logo"
                          src={slide.pillFeatures.title}
                          width={150}
                          height={47}
                          className="object-contain w-[150px] h-[47px]"
                        />
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* ---------------- BUTTONS ---------------- */}
                <AnimatePresence mode="wait">
                  {!isExiting && (
                    <motion.div
                      key={`btns-${activeIndex}`}
                      initial="hidden"
                      animate="show"
                      exit="exit"
                      className="flex gap-4 mt-[40px] 2xl:mt-[60px] 3xl:mt-[73px] font-[avenirRoman]"
                    >
                      <motion.a
                        variants={{
                          hidden: { opacity: 0, y: 40 },
                          show: {
                            opacity: 1,
                            y: 0,
                            transition: { duration: 0.6, delay: 0.28 },
                          },
                          exit: moveUpExit.exit,
                        }}
                        className="btn-fill-blur px-6 py-3 md:px-9 md:py-[19px] rounded-full border border-white
                        text-white text-[15px] md:text-[17px] inline-block cursor-pointer"
                      >
                        <span>Register</span>
                      </motion.a>

                      <motion.a
                        variants={{
                          hidden: { opacity: 0, y: 40 },
                          show: {
                            opacity: 1,
                            y: 0,
                            transition: { duration: 0.6, delay: 0.38 },
                          },
                          exit: moveUpExit.exit,
                        }}
                        className="btn-fill-blur px-6 py-3 md:px-9 md:py-[19px] 
             rounded-full border border-white text-white 
             text-[15px] md:text-[17px] inline-block cursor-pointer"
                      >
                        <span>Explore</span>
                      </motion.a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* ---------------- PILL SECTION ---------------- */}
              <div className="container px-4 md:px-6 lg:px-10 mt-[150px] 2xl:mt-[170px] 3xl:mt-[184px] pb-[50px] overflow-hidden">
                <AnimatePresence mode="wait">
                  {!isExiting && (
                    <motion.div
                      key={`pill-${activeIndex}`}
                      initial="hidden"
                      animate="show"
                      exit="exit"
                      className="bg-white/5 backdrop-blur-[30px] rounded-full flex items-center justify-between gap-6 pr-8"
                    >
                      <motion.div
                        className="px-6 md:px-[68px] bg-white/10 backdrop-blur-[30px] rounded-full 
                        h-[70px] md:h-[90px] flex items-center justify-center overflow-hidden"
                      >
                        <div className="overflow-hidden">
                          <motion.div
                            variants={{
                              hidden: { opacity: 0, y: 40 },
                              show: {
                                opacity: 1,
                                y: 0,
                                transition: { duration: 0.55, delay: 0.35 },
                              },
                              exit: moveUpExit.exit,
                            }}
                          >
                            <Image
                              src={slide.pillFeatures.title}
                              alt={slide.pillFeatures.title}
                              width={140}
                              height={40}
                              className="object-contain w-[140px] h-[40px]"
                            />
                          </motion.div>
                        </div>
                      </motion.div>

                      <div className="flex gap-6 md:gap-16 2xl:gap-20 items-center flex-col lg:flex-row flex-wrap lg:flex-nowrap overflow-hidden">
                        {slide.pillFeatures.features.map((f, idx) => (
                          <motion.div
                            key={`${idx}-${activeIndex}`}
                            variants={{
                              hidden: { opacity: 0, y: 40 },
                              show: {
                                opacity: 1,
                                y: 0,
                                transition: {
                                  duration: 0.35,
                                  delay: 0.25 + idx * 0.12,
                                },
                              },
                              exit: moveUpExit.exit,
                            }}
                            className="flex items-center gap-2 md:gap-3"
                          >
                            <Image
                              src={f.icon}
                              width={20}
                              height={20}
                              alt={f.label}
                            />
                            <span className="text-white text-[14px] md:text-[17px] font-[avenirRoman] uppercase">
                              {f.label}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* FIXED ARROWS */}
      <div className="absolute bottom-[150px] lg:bottom-[190px] 3xl:bottom-[215px] left-0 w-full z-[50]">
        <div className="container flex items-center justify-between">
          <button
            aria-label="Previous slide"
            className="swiper-btn-prev cursor-pointer"
          >
            <Image
              src="/icons/left_slider_arrow.svg"
              width={35}
              height={35}
              alt="Previous"
              className="w-[35px] h-[35px] opacity-80"
            />
          </button>

          {/* Pagination */}
          <div className="flex gap-3 justify-center items-center">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => swiperInstance?.slideTo(i)}
                className={`w-[10px] h-[10px] rounded-full transition-all ${
                  activeIndex === i ? "bg-primary" : "border border-white"
                } `}
              />
            ))}{" "}
          </div>

          <button
            aria-label="Next slide"
            className="swiper-btn-next cursor-pointer"
          >
            <Image
              src="/icons/left_slider_arrow.svg"
              width={35}
              height={35}
              className="rotate-180 w-[35px] h-[35px] opacity-80"
              alt="Next"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
