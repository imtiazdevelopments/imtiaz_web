"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Navigation, Autoplay } from "swiper/modules";
import { motion, AnimatePresence, useInView } from "framer-motion";
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

// -----------------------------------------------------
// Shared motion variants
// -----------------------------------------------------
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
  // const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  // -------- VIEWPORT TRIGGER --------
  const rootRef = useRef(null);
  const inView = useInView(rootRef, { once: true, amount: 0.4 });

  //   const sectionRef = useRef<HTMLDivElement>(null);

  // per-slide refs
  const wrapRefs = useRef<HTMLDivElement[]>([]);
  const imgRefs = useRef<HTMLVideoElement[]>([]);

  const setWrapRef = (el: HTMLDivElement | null, i: number) => {
    if (el) wrapRefs.current[i] = el;
  };

  const setImgRef = (el: HTMLVideoElement | null, i: number) => {
    if (el) imgRefs.current[i] = el;
  };

  const initGSAP = () => {
    const section = rootRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      wrapRefs.current.forEach((wrapper, i) => {
        const img = imgRefs.current[i];

        console.log(img);
        if (!wrapper || !img) return;

        gsap.fromTo(
          img,
          { y: "-25vh" },
          {
            y: "25vh",
            ease: "none",
            scrollTrigger: {
              trigger: wrapper,
              scrub: true,
              start: "top bottom",
              end: "bottom top",
            },
          }
        );
      });
    });

    ScrollTrigger.refresh();
    return () => ctx.revert();
  };

  // Wait for "homeAnimationsReady"
  useEffect(() => {
    const listener = () => initGSAP();
    window.addEventListener("homeAnimationsReady", listener);
    return () => window.removeEventListener("homeAnimationsReady", listener);
  }, []);

  return (
    <div className="w-full relative h-screen" ref={rootRef}>
      <Swiper
        effect="fade"
        fadeEffect={{ crossFade: true }}
        slidesPerView={1}
        loop
        modules={[EffectFade, Autoplay, Navigation]}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        // onSwiper={setSwiperInstance}
        navigation={{ nextEl: ".swiper-btn-next", prevEl: ".swiper-btn-prev" }}
        className="w-full swiper-fade h-full"
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full flex flex-col justify-center items-center">
              {/* -------------------------------- VIDEO BG -------------------------------- */}
              <div
                className="absolute inset-0 -z-10 overflow-hidden"
                ref={(el) => setWrapRef(el, index)}
              >
                <video
                  ref={(el) => setImgRef(el as HTMLVideoElement, index)}
                  src={slide.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover "
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.5)_0%,rgba(0,0,0,0.5)_100%)]" />
              </div>

              {/* -------------------------------- TOP AREA -------------------------------- */}
              <div className="container px-4 md:px-6 lg:px-10 w-full overflow-hidden flex flex-col items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`top-${activeIndex}`}
                    initial="hidden"
                    animate={inView ? "show" : "hidden"}
                    exit="exit"
                    className="flex flex-col justify-between items-center "
                  >
                    {/* Right Label */}
                    {/* <div className="overflow-hidden mb-10 lg:mb-25 2xl:mb-[130px]">
                      <motion.div
                        variants={fadeUp}
                        custom={0.15}
                        initial="hidden"
                        animate={inView ? "show" : "hidden"}
                      >
                        <span
                          className="text-white font-[avenirHeavy] font-[800] uppercase
      text-[16px] sm:text-[18px] md:text-[22px] lg:text-[25px]"
                        >
                          {RightLabel}
                        </span>
                      </motion.div>
                    </div> */}

                    {/* Title */}
                    <div className="overflow-hidden">
                      <motion.h1
                        variants={fadeUp}
                        custom={0.3}
                        initial="hidden"
                        animate={inView ? "show" : "hidden"}
                        className="text-white font-[optima] uppercase leading-[1] text-[36px] md:text-[58px]  lg:text-[60px] 2xl:text-[70px] text-center"
                      >
                        {RightLabel}
                      </motion.h1>
                    </div>

                    <motion.div
                      key={`btns-${activeIndex}`}
                      initial="hidden"
                      animate={inView ? "show" : "hidden"}
                      exit="exit"
                      className="flex gap-4 mt-15  font-[avenirRoman] overflow-hidden"
                    >
                      <motion.a
                        variants={fadeUp}
                        custom={0.3}
                        initial="hidden"
                        animate={inView ? "show" : "hidden"}
                        className="btn-fill-blur px-6 py-3 md:px-9 md:py-[19px]
                      rounded-full border border-white text-white
                      text-[15px] md:text-[17px] cursor-pointer"
                      >
                        <span>Register Interest</span>
                      </motion.a>
                    </motion.div>

                    {/* Logo */}
                    {/* <div className="overflow-hidden">
                      <motion.div
                        variants={fadeUp}
                        custom={0.45}
                        initial="hidden"
                        animate={inView ? "show" : "hidden"}
                      >
                        <Image
                          alt="logo"
                          src={slide.pillFeatures.title}
                          width={150}
                          height={47}
                          className="object-contain w-[150px] h-[47px]"
                        />
                      </motion.div>
                    </div> */}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* -------------------------------- ARROWS + PAGINATION -------------------------------- */}
      <motion.div
        variants={fadeUp}
        custom={0.5}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        exit="exit"
        className="absolute bottom-[150px] lg:bottom-[190px] 3xl:bottom-[215px] left-0 w-full z-[50]"
      >
        <div className="container flex items-center justify-center">
          {/* Prev */}

          {/* Pagination Dots */}
          {/* <div className="flex gap-3 justify-center items-center z-[50]">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => swiperInstance?.slideToLoop(i)}
                className={`w-[10px] h-[10px] rounded-full border transition-all cursor-pointer ${
                  activeIndex === i
                    ? "bg-primary border-primary"
                    : "border-white bg-transparent"
                }`}
              />
            ))}
          </div> */}
        </div>
      </motion.div>

      {slides.length > 1 && (
        <motion.div
          variants={fadeUp}
          custom={0.5}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          exit="exit"
          className="absolute top-[46%] left-0 w-full z-[60]"
        >
          <div className="container flex items-center justify-between">
            {/* Prev */}
            <button
              aria-label="Previous slide"
              className="swiper-btn-prev relative w-[62px] group h-[62px] border border-white rounded-[50px] flex items-center justify-center overflow-hidden"
            >
              <span className="absolute left-0 top-0 h-full w-0 bg-white/30 transition-all duration-300 group-hover:w-full z-0" />
              <Image
                src="/icons/left_arrow_slider_primary.svg"
                alt="Next"
                width={28}
                height={28}
                className="relative z-10 object-contain w-[28px] h-[28px] invert brightness-0 group-hover:invert-0 group-hover:brightness-100 transition-all duration-300"
              />
            </button>
            {/* Pagination Dots */}
            {/* Next */}
            <button
              aria-label="Next slide"
              className="swiper-btn-next relative w-[62px] group h-[62px] border border-white rounded-[50px] flex items-center justify-center overflow-hidden"
            >
              <span className="absolute left-0 top-0 h-full w-0 bg-white/30 transition-all duration-300 group-hover:w-full z-0" />
              <Image
                src="/icons/left_arrow_slider_primary.svg"
                alt="Next"
                width={28}
                height={28}
                className="relative rotate-180 z-10 object-contain w-[28px] h-[28px] invert brightness-0 group-hover:invert-0 group-hover:brightness-100 transition-all duration-300"
              />
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
