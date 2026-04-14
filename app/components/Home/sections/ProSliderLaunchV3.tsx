"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Navigation, Autoplay } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import type { Swiper as SwiperType } from "swiper";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import "swiper/css";
import "swiper/css/navigation";

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

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (d: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: d },
  }),
  exit: moveUpExit.exit,
};

export default function HeroSlider({ slides, RightLabel }: HeroSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [startAnim, setStartAnim] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);

  const wrapRefs = useRef<HTMLDivElement[]>([]);
  const videoRefs = useRef<HTMLVideoElement[]>([]);

  const setWrapRef = (el: HTMLDivElement | null, i: number) => {
    if (el) wrapRefs.current[i] = el;
  };

  const setVideoRef = (el: HTMLVideoElement | null, i: number) => {
    if (el) videoRefs.current[i] = el;
  };

  // --------------------- START/STOP UI ANIMATION -----------------------
  useEffect(() => {
    const start = () => setStartAnim(true);
    const reset = () => setStartAnim(false);

    window.addEventListener("bgCollapseComplete", start);
    window.addEventListener("bgCollapseReset", reset);

    return () => {
      window.removeEventListener("bgCollapseComplete", start);
      window.removeEventListener("bgCollapseReset", reset);
    };
  }, []);

  // --------------------- REAL PARALLAX IMPLEMENTATION -----------------------
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      wrapRefs.current.forEach((wrapper, i) => {
        const video = videoRefs.current[i];
        if (!video || !wrapper) return;

        gsap.fromTo(
          video,
          { y: "-2hvh" },
          {
            y: "2hvh",
            ease: "none",
            scrollTrigger: {
              trigger: section,
              scrub: true,
              start: "top bottom",
              end: "bottom top",
            },
          },
        );
      });
    }, section);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, []);

  // --------------------------- UI -------------------------------------
  return (
    <div className="w-full relative h-screen" ref={sectionRef}>
      <Swiper
        effect="fade"
        fadeEffect={{ crossFade: true }}
        slidesPerView={1}
        loop
        modules={[EffectFade, Autoplay, Navigation]}
        autoplay={{ delay: 8000, disableOnInteraction: false }}
        onSwiper={setSwiperInstance}
        navigation={{ nextEl: ".swiper-btn-next", prevEl: ".swiper-btn-prev" }}
        className="w-full swiper-fade h-full"
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full flex flex-col justify-center items-center">
              {/* BG VIDEO */}
              <div
                className="absolute inset-0 -z-10 overflow-hidden"
                ref={(el) => setWrapRef(el, index)}
              >
                <video
                  ref={(el) => setVideoRef(el, index)}
                  src={slide.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.5)_0%,rgba(0,0,0,0.5)_100%)]" />
              </div>

              {/* TOP CONTENT */}
              <div className="container px-4 md:px-6 lg:px-10 w-full overflow-hidden flex flex-col items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`top-${activeIndex}`}
                    initial="hidden"
                    animate={startAnim ? "show" : "hidden"}
                    exit="exit"
                    className="flex flex-col justify-between items-center pb-[250px]"
                  >
                    <div className="overflow-hidden mb-10">
                      <motion.div
                        variants={fadeUp}
                        custom={0.15}
                        initial="hidden"
                        animate={startAnim ? "show" : "hidden"}
                      >
                        <span
                          className="text-white font-[avenirBook] font-[800] uppercase
                            text-[16px] sm:text-[18px] md:text-[22px] lg:text-[25px]"
                        >
                          {RightLabel}
                        </span>
                      </motion.div>
                    </div>

                    <div className="overflow-hidden">
                      <motion.h1
                        variants={fadeUp}
                        custom={0.3}
                        initial="hidden"
                        animate={startAnim ? "show" : "hidden"}
                        className="text-white font-[optima] uppercase leading-[1]
                          text-[36px] md:text-[58px] lg:text-[60px] 2xl:text-[70px]
                          text-center mb-[22px]"
                      >
                        {slide.title}
                      </motion.h1>
                    </div>

                    <div className="overflow-hidden">
                      <motion.div
                        variants={fadeUp}
                        custom={0.45}
                        initial="hidden"
                        animate={startAnim ? "show" : "hidden"}
                      >
                        <Image
                          alt="logo"
                          src={slide.pillFeatures.title}
                          width={150}
                          height={47}
                          className="object-contain w-[150px] h-[47px]"
                        />
                      </motion.div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* PILL SECTION */}
              <div className="absolute w-full bottom-[50px]">
                <motion.div
                  variants={fadeUp}
                  custom={0.5}
                  initial="hidden"
                  animate={startAnim ? "show" : "hidden"}
                  exit="exit"
                  className="container px-4 md:px-6 lg:px-10 mt-[150px] overflow-hidden"
                >
                  <AnimatePresence mode="wait">
                    <div className="relative">
                      <div className="absolute inset-0 bg-white/5 backdrop-blur-[30px] rounded-full pointer-events-none" />
                      <motion.div
                        key={`pill-${activeIndex}`}
                        initial="hidden"
                        animate={startAnim ? "show" : "hidden"}
                        exit="exit"
                        className="bg-white/5 backdrop-blur-[30px] rounded-full flex items-center justify-between gap-6 h-[70px] md:h-[90px]"
                      >
                        <div className="flex gap-6 md:gap-10 items-center flex-wrap lg:flex-nowrap overflow-hidden px-6 lg:px-[30px]">
                          {slide.pillFeatures.features.map((f, idx) => (
                            <motion.div
                              key={`${idx}-${activeIndex}`}
                              variants={fadeUp}
                              custom={0.25 + idx * 0.12}
                              initial="hidden"
                              animate={startAnim ? "show" : "hidden"}
                              className="flex items-center gap-2"
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

                        <motion.div className="pr-6 flex items-center justify-center overflow-hidden">
                          <AnimatePresence mode="wait">
                            <motion.div
                              key={`btns-${activeIndex}`}
                              initial="hidden"
                              animate={startAnim ? "show" : "hidden"}
                              exit="exit"
                              className="flex gap-4 font-[avenirRoman]"
                            >
                              <motion.a
                                variants={fadeUp}
                                custom={0.38}
                                className="btn-fill-blur px-6 py-3 rounded-full border border-white text-white text-[15px] md:text-[17px] cursor-pointer"
                              >
                                Register
                              </motion.a>

                              <motion.a
                                variants={fadeUp}
                                custom={0.48}
                                className="btn-fill-blur px-6 py-3 rounded-full border border-white text-white text-[15px] md:text-[17px] cursor-pointer"
                              >
                                Explore
                              </motion.a>
                            </motion.div>
                          </AnimatePresence>
                        </motion.div>
                      </motion.div>
                    </div>
                  </AnimatePresence>
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* DOTS + ARROWS */}
      <motion.div
        variants={fadeUp}
        custom={0.5}
        initial="hidden"
        animate={startAnim ? "show" : "hidden"}
        exit="exit"
        className="absolute bottom-[150px] left-0 w-full z-[50]"
      >
        <div className="container flex items-center justify-center">
          <div className="flex gap-3">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => swiperInstance?.slideToLoop(i)}
                className={`w-[10px] h-[10px] rounded-full border transition-all ${
                  activeIndex === i
                    ? "bg-primary border-primary"
                    : "border-white bg-transparent"
                }`}
              />
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        variants={fadeUp}
        custom={0.5}
        initial="hidden"
        animate={startAnim ? "show" : "hidden"}
        exit="exit"
        className="absolute top-[40%] left-0 w-full z-[60]"
      >
        <div className="container flex items-center justify-between">
          <button
            aria-label="Previous"
            className="swiper-btn-prev cursor-pointer"
          >
            <Image
              src="/icons/left_slider_arrow.svg"
              width={35}
              height={35}
              alt="Previous"
              className="opacity-80"
            />
          </button>

          <button aria-label="Next" className="swiper-btn-next cursor-pointer">
            <Image
              src="/icons/left_slider_arrow.svg"
              width={35}
              height={35}
              alt="Next"
              className="rotate-180 opacity-80"
            />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
