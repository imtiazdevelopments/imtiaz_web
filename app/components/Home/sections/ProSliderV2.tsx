// "use client";

// import React, { useState } from "react";
// import Image from "next/image";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { EffectFade, Navigation, Autoplay } from "swiper/modules";
// import { motion, AnimatePresence } from "framer-motion";
// import type { Swiper as SwiperType } from "swiper";

// import "swiper/css";
// import "swiper/css/navigation";

// import { moveUpExit } from "../../motionVariants";

// export interface feats {
//   icon: string;
//   label: string;
// }

// export interface SlideData {
//   title: string;
//   video: string;
//   pillFeatures: {
//     title: string;
//     features: feats[];
//   };
// }

// type HeroSliderProps = {
//   slides: SlideData[];
//   RightLabel?: string;
// };

// // -----------------------------------------------------
// // Shared motion variants
// // -----------------------------------------------------
// const fadeUp = {
//   hidden: { opacity: 0, y: 40 },
//   show: (d: number = 0) => ({
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.7, delay: d },
//   }),
//   exit: moveUpExit.exit,
// };

// export default function HeroSlider({ slides, RightLabel }: HeroSliderProps) {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

//   return (
//     <div className="w-full relative">
//       <Swiper
//         effect="fade"
//         fadeEffect={{ crossFade: true }}
//         slidesPerView={1}
//         loop
//         modules={[EffectFade, Autoplay, Navigation]}
//         autoplay={{ delay: 3500, disableOnInteraction: false }}
//         onSwiper={setSwiperInstance}
//         navigation={{ nextEl: ".swiper-btn-next", prevEl: ".swiper-btn-prev" }}
//         className="w-full swiper-fade"
//         onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
//       >
//         {slides.map((slide, index) => (
//           <SwiperSlide key={index}>
//             <div className="relative w-full flex flex-col justify-center items-center">
//               {/* -------------------------------- VIDEO BG -------------------------------- */}
//               <div className="absolute inset-0 -z-10 overflow-hidden">
//                 <video
//                   src={slide.video}
//                   autoPlay
//                   loop
//                   muted
//                   playsInline
//                   className="w-full h-full object-cover"
//                 />
//                 <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.5)_0%,rgba(0,0,0,0.5)_100%)]" />
//               </div>

//               {/* -------------------------------- TOP AREA -------------------------------- */}
//               <div className="container px-4 md:px-6 lg:px-10 w-full pt-[50px] lg:pt-[60px] xl:pt-[80px] 2xl:pt-[100px] 3xl:pt-[200px] overflow-hidden flex flex-col items-center justify-center">
//                 <AnimatePresence mode="wait">
//                   <motion.div
//                     key={`top-${activeIndex}`}
//                     initial="hidden"
//                     animate="show"
//                     exit="exit"
//                     className="flex flex-col justify-between items-center"
//                   >
//                     {/* Right Label */}
//                     <span
//                       className="text-white font-[avenirHeavy] font-[800] uppercase
//                       text-[16px] sm:text-[18px] md:text-[22px] lg:text-[25px]
//                       mb-10 lg-mb-15 2xl:mb-25 3xl:mb-[130px]"
//                     >
//                       {RightLabel}
//                     </span>

//                     {/* Title */}
//                     <div className="overflow-hidden">
//                       <motion.h1
//                         variants={fadeUp}
//                         custom={0.15}
//                         className="text-white font-[optima] uppercase leading-[1]
//                           text-[36px] md:text-[58px] lg:text-[58px] 2xl:text-[64px] 3xl:text-[70px]
//                           text-center mb-[22px]"
//                       >
//                         {slide.title}
//                       </motion.h1>
//                     </div>

//                     {/* Logo */}
//                     <div className="overflow-hidden">
//                       <motion.div variants={fadeUp} custom={0.3}>
//                         <Image
//                           alt="logo"
//                           src={slide.pillFeatures.title}
//                           width={150}
//                           height={47}
//                           className="object-contain w-[150px] h-[47px]"
//                         />
//                       </motion.div>
//                     </div>
//                   </motion.div>
//                 </AnimatePresence>

//                 {/* -------------------------------- BUTTONS -------------------------------- */}
//                 <AnimatePresence mode="wait">
//                   <motion.div
//                     key={`btns-${activeIndex}`}
//                     initial="hidden"
//                     animate="show"
//                     exit="exit"
//                     className="flex gap-4 mt-[40px] 2xl:mt-[60px] 3xl:mt-[73px] font-[avenirRoman] overflow-hidden"
//                   >
//                     <motion.a
//                       variants={fadeUp}
//                       custom={0.38}
//                       className="btn-fill-blur px-6 py-3 md:px-9 md:py-[19px]
//                       rounded-full border border-white text-white
//                       text-[15px] md:text-[17px] cursor-pointer"
//                     >
//                       <span>Register</span>
//                     </motion.a>

//                     <motion.a
//                       variants={fadeUp}
//                       custom={0.48}
//                       className="btn-fill-blur px-6 py-3 md:px-9 md:py-[19px]
//                       rounded-full border border-white text-white
//                       text-[15px] md:text-[17px] cursor-pointer"
//                     >
//                       <span>Explore</span>
//                     </motion.a>
//                   </motion.div>
//                 </AnimatePresence>
//               </div>

//               {/* -------------------------------- PILL SECTION -------------------------------- */}
//               <div className="container px-4 md:px-6 lg:px-10 mt-[150px] 2xl:mt-[170px] 3xl:mt-[184px] pb-[50px] overflow-hidden">
//                 <AnimatePresence mode="wait">
//                   <motion.div
//                     key={`pill-${activeIndex}`}
//                     initial="hidden"
//                     animate="show"
//                     exit="exit"
//                     className="bg-white/5 backdrop-blur-[30px] rounded-full flex items-center justify-between gap-6 pr-8"
//                   >
//                     {/* Pill Logo */}
//                     <motion.div
//                       className="px-6 md:px-[68px] bg-white/10 backdrop-blur-[30px] rounded-full
//                       h-[70px] md:h-[90px] flex items-center justify-center overflow-hidden"
//                     >
//                       <motion.div variants={fadeUp} custom={0.35}>
//                         <Image
//                           src={slide.pillFeatures.title}
//                           alt={slide.pillFeatures.title}
//                           width={140}
//                           height={40}
//                           className="object-contain w-[140px] h-[40px]"
//                         />
//                       </motion.div>
//                     </motion.div>

//                     {/* Features */}
//                     <div className="flex gap-6 md:gap-16 2xl:gap-20 items-center flex-col lg:flex-row flex-wrap lg:flex-nowrap overflow-hidden">
//                       {slide.pillFeatures.features.map((f, idx) => (
//                         <motion.div
//                           key={`${idx}-${activeIndex}`}
//                           variants={fadeUp}
//                           custom={0.25 + idx * 0.12}
//                           className="flex items-center gap-2 md:gap-3"
//                         >
//                           <Image
//                             src={f.icon}
//                             width={20}
//                             height={20}
//                             alt={f.label}
//                           />
//                           <span className="text-white text-[14px] md:text-[17px] font-[avenirRoman] uppercase">
//                             {f.label}
//                           </span>
//                         </motion.div>
//                       ))}
//                     </div>
//                   </motion.div>
//                 </AnimatePresence>
//               </div>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>

//       {/* -------------------------------- ARROWS + PAGINATION -------------------------------- */}
//       <div className="absolute bottom-[150px] lg:bottom-[190px] 3xl:bottom-[215px] left-0 w-full z-[50]">
//         <div className="container flex items-center justify-between">
//           {/* Prev */}
//           <button
//             aria-label="Previous slide"
//             className="swiper-btn-prev cursor-pointer"
//           >
//             <Image
//               src="/icons/left_slider_arrow.svg"
//               width={35}
//               height={35}
//               alt="Previous"
//               className="w-[35px] h-[35px] opacity-80"
//             />
//           </button>

//           {/* Pagination Dots */}
//           <div className="flex gap-3 justify-center items-center z-[50]">
//             {slides.map((_, i) => (
//               <button
//                 key={i}
//                 onClick={() => swiperInstance?.slideToLoop(i)}
//                 className={`w-[10px] h-[10px] rounded-full border transition-all cursor-pointer ${
//                   activeIndex === i
//                     ? "bg-primary border-primary"
//                     : "border-white bg-transparent"
//                 }`}
//               />
//             ))}
//           </div>

//           {/* Next */}
//           <button
//             aria-label="Next slide"
//             className="swiper-btn-next cursor-pointer"
//           >
//             <Image
//               src="/icons/left_slider_arrow.svg"
//               width={35}
//               height={35}
//               className="rotate-180 w-[35px] h-[35px] opacity-80"
//               alt="Next"
//             />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

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

  const [startAnim, setStartAnim] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);





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


//  const wrapRefs = useRef<HTMLDivElement[]>([]);
//   const imgRefs = useRef<HTMLImageElement[]>([]);

//   const setWrapRef = (el: HTMLDivElement | null, i: number) => {
//     if (el) wrapRefs.current[i] = el;
//   };

//   const setImgRef = (el: HTMLImageElement | null, i: number) => {
//     if (el) imgRefs.current[i] = el;
//   };

//   const initGSAP = () => {
//     const section = sectionRef.current;
//     if (!section) return;

//     console.log(section)

//     const ctx = gsap.context(() => {
//       wrapRefs.current.forEach((wrapper, i) => {
//         const img = imgRefs.current[i];

//         console.log(img);
//         if (!wrapper || !img) return;

//         gsap.fromTo(
//           img,
//           { y: "-25vh" },
//           {
//             y: "25vh",
//             ease: "none",
//             scrollTrigger: {
//               trigger: wrapper,
             
//               start: "top bottom",
//               end: "bottom top",
//             },
//           }
//         );
//       });
//     });

//     ScrollTrigger.refresh();
//     return () => ctx.revert();
//   };

//   // Wait for "homeAnimationsReady"
//   useEffect(() => {
//     const listener = () => initGSAP();
//     window.addEventListener("homeAnimationsReady", listener);
//     return () => window.removeEventListener("homeAnimationsReady", listener);
//   }, []);





  // -------- VIEWPORT TRIGGER --------
  // const rootRef = useRef(null);
  // const inView = useInView(rootRef, { once: true, amount: 0.2 });



  return (
    <div className="w-full relative" ref={sectionRef}>
      <Swiper
        effect="fade"
        fadeEffect={{ crossFade: true }}
        slidesPerView={1}
        loop
        modules={[EffectFade, Autoplay, Navigation]}
        autoplay={{ delay:8000, disableOnInteraction: false }}
        onSwiper={setSwiperInstance}
        navigation={{ nextEl: ".swiper-btn-next", prevEl: ".swiper-btn-prev" }}
        className="w-full swiper-fade"
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-screen flex flex-col justify-center items-center">
              {/* -------------------------------- VIDEO BG -------------------------------- */}
              <div className="absolute h-full inset-0 -z-10 overflow-hidden">
                <video
                  src={slide.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover absolute"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.5)_0%,rgba(0,0,0,0.5)_100%)]" />
              </div>

              {/* -------------------------------- TOP AREA -------------------------------- */}
              <div className="container px-4 md:px-6 lg:px-10 w-full pt-[50px] lg:pt-[60px] xl:pt-[80px] 2xl:pt-[100px] 3xl:pt-[200px] overflow-hidden flex flex-col items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`top-${activeIndex}`}
                    initial="hidden"
                    animate={startAnim ? "show" : "hidden"}
                    exit="exit"
                    className="flex flex-col justify-between items-center"
                  >
                    {/* Right Label */}
                    <div className="overflow-hidden mb-10 lg-mb-15 2xl:mb-25 3xl:mb-[130px]">
                      <motion.div
                        variants={fadeUp}
                        custom={0.15}
                        initial="hidden"
                        animate={startAnim ? "show" : "hidden"}
                      >
                        <span
                          className="text-white font-[avenirHeavy] font-[800] uppercase
      text-[16px] sm:text-[18px] md:text-[22px] lg:text-[25px]"
                        >
                          {RightLabel}
                        </span>
                      </motion.div>
                    </div>

                    {/* Title */}
                    <div className="overflow-hidden">
                      <motion.h1
                        variants={fadeUp}
                        custom={0.3}
                        initial="hidden"
                        animate={startAnim ? "show" : "hidden"}
                        className="text-white font-[optima] uppercase leading-[1]
                          text-[36px] md:text-[58px] lg:text-[58px] 2xl:text-[64px] 3xl:text-[70px]
                          text-center mb-[22px]"
                      >
                        {slide.title}
                      </motion.h1>
                    </div>

                    {/* Logo */}
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

                {/* -------------------------------- BUTTONS -------------------------------- */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`btns-${activeIndex}`}
                    initial="hidden"
                    animate={startAnim ? "show" : "hidden"}
                    exit="exit"
                    className="flex gap-4 mt-[40px] 2xl:mt-[60px] 3xl:mt-[73px] font-[avenirRoman] overflow-hidden"
                  >
                    <motion.a
                      variants={fadeUp}
                      custom={0.38}
                      className="btn-fill-blur px-6 py-3 md:px-9 md:py-[19px]
                      rounded-full border border-white text-white
                      text-[15px] md:text-[17px] cursor-pointer"
                    >
                      <span>Register</span>
                    </motion.a>

                    <motion.a
                      variants={fadeUp}
                      custom={0.48}
                      className="btn-fill-blur px-6 py-3 md:px-9 md:py-[19px]
                      rounded-full border border-white text-white
                      text-[15px] md:text-[17px] cursor-pointer"
                    >
                      <span>Explore</span>
                    </motion.a>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* -------------------------------- PILL SECTION -------------------------------- */}
              <motion.div variants={fadeUp} custom={0.5} initial="hidden" animate={startAnim ? "show" : "hidden"} exit="exit" className={`container px-4 md:px-6 lg:px-10 mt-[150px] 2xl:mt-[170px] 3xl:mt-[184px] pb-[50px] overflow-hidden`}>
                <AnimatePresence mode="wait">
                  <div className="relative">
                  <div className="absolute inset-0 bg-white/5 backdrop-blur-[30px] rounded-full pointer-events-none" />
                  <motion.div
                    key={`pill-${activeIndex}`}
                    initial="hidden"
                    animate={startAnim ? "show" : "hidden"}
                    exit="exit"
                    className="bg-white/5 backdrop-blur-[30px] rounded-full flex items-center justify-between gap-6 pr-8"
                  >
                    {/* Pill Logo */}
                    <motion.div
                      className="px-6 md:px-[68px] bg-white/10 backdrop-blur-[30px] rounded-full 
                      h-[70px] md:h-[90px] flex items-center justify-center overflow-hidden"
                    >
                      <motion.div
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
                      </motion.div>
                    </motion.div>
                    

                    {/* Features */}
                    <div className="flex gap-6 md:gap-16 2xl:gap-20 items-center flex-col lg:flex-row flex-wrap lg:flex-nowrap overflow-hidden">
                      {slide.pillFeatures.features.map((f, idx) => (
                        <motion.div
                          key={`${idx}-${activeIndex}`}
                          variants={fadeUp}
                          custom={0.25 + idx * 0.12}
                          initial="hidden"
                          animate={startAnim ? "show" : "hidden"}
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
                  </div>
                </AnimatePresence>
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* -------------------------------- ARROWS + PAGINATION -------------------------------- */}
      <motion.div variants={fadeUp} custom={0.5} initial="hidden" animate={startAnim ? "show" : "hidden"} exit="exit" className="absolute bottom-[150px] lg:bottom-[190px] 3xl:bottom-[215px] left-0 w-full z-[50]">
        <div className="container flex items-center justify-between">
          {/* Prev */}
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

          {/* Pagination Dots */}
          <div className="flex gap-3 justify-center items-center z-[50]">
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
          </div>

          {/* Next */}
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
      </motion.div>
    </div>
  );
}
