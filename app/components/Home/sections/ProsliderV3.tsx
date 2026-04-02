"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Navigation, Autoplay } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import type { Swiper as SwiperType } from "swiper";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import { useInView } from "framer-motion";
import CustomOutlineButton from "../../common/CustomOutlineButton";

import "swiper/css";
import "swiper/css/navigation";

import { moveUpExit, moveUp } from "../../motionVariants";

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
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  const sectionRef = useRef(null);
  const startAnim = useInView(sectionRef, { once: true, amount: 0.3 });

  const wrapRefs = useRef<HTMLDivElement[]>([]);
  const imgRefs = useRef<HTMLVideoElement[]>([]);

  const setWrapRef = (el: HTMLDivElement | null, i: number) => {
    if (el) wrapRefs.current[i] = el;
  };

  const setImgRef = (el: HTMLVideoElement | null, i: number) => {
    if (el) imgRefs.current[i] = el;
  };

  // const initGSAP = () => {
  //   const section = sectionRef.current;
  //   if (!section) return;

  //   console.log(section)

  //   const ctx = gsap.context(() => {
  //     wrapRefs.current.forEach((wrapper, i) => {
  //       const img = imgRefs.current[i];

  //       console.log(img);
  //       if (!wrapper || !img) return;

  //       gsap.fromTo(
  //         img,
  //         { y: "-25vh" },
  //         {
  //           y: "25vh",
  //           ease: "none",
  //           scrollTrigger: {
  //             trigger: wrapper,

  //             start: "top bottom",
  //             end: "bottom top",
  //           },
  //         }
  //       );
  //     });
  //   });

  //   ScrollTrigger.refresh();
  //   return () => ctx.revert();
  // };

  // // Wait for "homeAnimationsReady"
  // useEffect(() => {
  //   const listener = () => initGSAP();
  //   window.addEventListener("homeAnimationsReady", listener);
  //   return () => window.removeEventListener("homeAnimationsReady", listener);
  // }, []);

  // -------- VIEWPORT TRIGGER --------
  // const rootRef = useRef(null);
  // const inView = useInView(rootRef, { once: true, amount: 0.2 });

  return (
    <div className="w-full relative h-[82vh] md:h-[70vh] lg:h-[75vh] xl:h-screen" ref={sectionRef}>
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
            <div className="relative w-full h-full flex flex-col pt-15 lg:pt-0 lg:justify-center items-center">
              {/* -------------------------------- VIDEO BG -------------------------------- */}
              <div
                className="absolute inset-0 -z-10 overflow-hidden"
                ref={(el) => setWrapRef(el, index)}
              >
                <video
                  ref={(el) => setImgRef(el, index)}
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
              <div className="container px-4 md:px-6 lg:px-10 w-full  overflow-hidden flex flex-col items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`top-${activeIndex}`}
                    initial="hidden"
                    animate={startAnim ? "show" : "hidden"}
                    exit="exit"
                    className="flex flex-col justify-between items-center pb-15 lg:pb-[250px]"
                  >
                    {/* Right Label */}
                    <div className="overflow-hidden mb-50">
                      <motion.div
                        // variants={fadeUp}
                        variants={moveUp(0.25)}
                        // custom={0.15}
                        // custom={0.5}
                        initial="hidden"
                        animate={startAnim ? "show" : "hidden"}                      >
                        <span
                          className="text-white   uppercase text-description"
                        >
                          {RightLabel}
                        </span>
                      </motion.div>
                    </div>

                    {/* Title */}
                    <div className="overflow-hidden">
                      <motion.h1
                        // variants={fadeUp}
                        variants={moveUp(0.2)}
                        // custom={0.35}
                        // custom={0.8}
                        initial="hidden"
                        animate={startAnim ? "show" : "hidden"}
                        className="text-white   uppercase  text-heading  text-center "
                      >
                        {slide.title}
                      </motion.h1>
                    </div>

                    {/* Logo */}
                    {/* <div className="overflow-hidden">
                      <motion.div
                        // variants={fadeUp}
                        variants={moveUp(2.6)}
                        // custom={0.5}
                        // custom={0.9}
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
                    </div> */}
                  </motion.div>
                </AnimatePresence>

                {/* -------------------------------- BUTTONS -------------------------------- */}
              </div>

              {/* -------------------------------- PILL SECTION -------------------------------- */}
              <div className="absolute w-full bottom-15 lg:bottom-[50px]">
                <motion.div
                  // variants={fadeUp}
                  variants={moveUp(1.2)}
                  // custom={0.5}
                  // custom={1.2}
                  initial="hidden"
                  animate={startAnim ? "show" : "hidden"}
                  exit="exit"
                  className={`container px-4 md:px-6 lg:px-10 mt-10 lg:mt-[150px] 2xl:mt-[170px] 3xl:mt-[184px]  overflow-hidden`}
                >
                  {/* <AnimatePresence mode="wait"> */}
                    <div className="relative">
                      <div className="absolute inset-0 bg-white/5 backdrop-blur-[30px] rounded-xl lg:rounded-full pointer-events-none" />
                      <motion.div
                        key={`pill-${activeIndex}`}
                        // initial="hidden"
                        // animate={startAnim ? "show" : "hidden"}
                        // exit="exit"
                        className="bg-white/5 backdrop-blur-[30px] py-6 lg:py-0 rounded-xl lg:rounded-full flex flex-col lg:flex-row md:items-center justify-between gap-6    lg:min-h-[90px]"
                      >
                        {/* Pill Logo */}

                        {/* Features */}
                        <div className=" grid grid-cols-1 md:flex gap-3 md:gap-4  3xl:gap-[80px] md:items-center  flex-wrap lg:flex-nowrap   px-6 lg:px-[30px] 3xl:px-[68px]">
                          {slide.pillFeatures.features.map((f, idx) => (
                          
                             <motion.div 
                              // variants={fadeUp}
                              // custom={0.25 + idx * 0.12}
                              variants={moveUp(idx * 0.4)}
                              initial="hidden"
                              // animate={startAnim ? "show" : "hidden"}
                              animate="show"
                              key={`${idx}-${activeIndex}`}>   
                              <motion.div 
                              // variants={fadeUp}
                              // custom={0.25 + idx * 0.12}
                              variants={moveUp(idx * 0.4)}
                              initial="hidden"
                              // animate={startAnim ? "show" : "hidden"}
                              animate="show"
                              className="flex items-center mb-3 md:mb-0 gap-2 md:gap-3"
                            ><Image
                                src={f.icon}
                                width={20}
                                height={20}
                                alt={f.label}
                              />
                              <span className="text-white text-description uppercase">
                                {f.label}
                              </span>
                              </motion.div>   
                              <div className=" left-0 top-0 h-[1px] w-full  md:hidden  " style={{ background: "linear-gradient(rgb(255 255 255 / 0%) 0%, rgba(255, 255, 255, 0.404) 50%, rgb(255 255 255 / 0%) 100%)" }}></div>
                         
                            </motion.div>
                            
                          ))}
                        </div>

                        <motion.div
                          className="md:pr-6 md:pr-[15px] flex items-center justify-center "
                        >
                          <AnimatePresence mode="wait">
                            <motion.div
                              key={`btns-${activeIndex}`}
                              variants={moveUp(1)}
                              initial="hidden"
                              animate={startAnim ? "show" : "hidden"}
                              exit="exit"
                              className="flex gap-4 font-[avenirRoman] overflow-hidden"
                            >
                              <motion.div
                                // variants={fadeUp}
                                // custom={0.38} 
                                variants={moveUp(1.4)} 
                              > 
                                 <CustomOutlineButton 
                                    text="Register"
                                    borderColor="border-white"
                                    textColor="text-white"
                                    px="px-[18px] h-[45px] lg:h-[66px]   !leading-[1.58]"
                                  />
                              </motion.div>

                              <motion.div
                                // variants={fadeUp}
                                // custom={0.5}
                                variants={moveUp(1.8)} 
                              > 
                                <CustomOutlineButton 
                                    text="Explore"
                                    borderColor="border-white"
                                    textColor="text-white"
                                    px="px-[16px]  h-[45px] lg:h-[66px]  !leading-[1.58]"
                                  />
                              </motion.div>
                            </motion.div>
                          </AnimatePresence>
                          {/*   <motion.div
                            variants={fadeUp}
                            custom={0.35}
                            initial="hidden"
                            animate={startAnim ? "show" : "hidden"}
                          >
                            <Image
                              src={slide.pillFeatures.title}
                              alt={slide.pillFeatures.title}
                              width={140}
                              height={40}
                              className="object-contain w-[140px] h-[40px]"
                            />
                          </motion.div> */}
                        </motion.div>
                      </motion.div>
                    </div>
                  {/* </AnimatePresence> */}
                </motion.div>
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
        animate={startAnim ? "show" : "hidden"}
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

          {/* Next */}
        </div>
      </motion.div>
      <motion.div
        variants={fadeUp}
        custom={0.5}
        initial="hidden"
        animate={startAnim ? "show" : "hidden"}
        exit="exit"
        className="absolute top-[35%] lg:top-[40%] left-0 w-full z-[60] hidden md:block"
      >
        <div className="container flex items-center justify-between">
          {/* Prev */}
          <button
            aria-label="Previous slide"
            className="swiper-btn-prev relative w-10 h-10 lg:w-[62px] lg:h-[62px] group  border border-white rounded-[50px] flex items-center justify-center overflow-hidden"
          >
            <span className="absolute left-0 top-0 h-full w-0 bg-white/30 transition-all duration-300 group-hover:w-full z-0" />
            <Image
              src="/icons/left_arrow_slider_primary.svg"
              alt="Next"
              width={28}
              height={28}
              className="relative z-10 object-contain w-[20px] h-[20px] lg:w-[28px] lg:h-[28px] invert brightness-0 group-hover:invert-0 group-hover:brightness-100 transition-all duration-300"
            />
          </button>

          {/* Pagination Dots */}

          {/* Next */}
          <button
            aria-label="Next slide"
            className="swiper-btn-next relative  w-10 h-10 lg:w-[62px] lg:h-[62px]  group   border border-white rounded-[50px] flex items-center justify-center overflow-hidden"
          >
            <span className="absolute left-0 top-0 h-full w-0 bg-white/30 transition-all duration-300 group-hover:w-full z-0" />
            <Image
              src="/icons/left_arrow_slider_primary.svg"
              alt="Next"
              width={28}
              height={28}
              className="relative rotate-180 z-10 object-contain w-[20px] h-[20px] lg:w-[28px] lg:h-[28px] invert brightness-0 group-hover:invert-0 group-hover:brightness-100 transition-all duration-300"
            />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
