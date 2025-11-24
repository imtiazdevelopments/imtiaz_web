// "use client";

// import React, { useRef, useState } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination, EffectFade } from "swiper/modules";
// import type { Swiper as SwiperType } from "swiper";

// import Image from "next/image";
// import { motion, AnimatePresence } from "framer-motion";

// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import "swiper/css/effect-fade";

// type Props = { slides: Slide[] };

// export type Feature = {
//   id: string | number;
//   title: string;
//   subtitle?: string;
//   bgImage: string;
//   link?: string;
// };

// export type Slide = {
//   id: string | number;
//   title: string;
//   subtitle?: string;
//   features: Feature[];
// };

// /* ===========================================================
//    Ultra Smooth Fade (No Blank Screen)
//    =========================================================== */
// const bgFadeAnim = {
//   initial: { opacity: 0, scale: 1.03, filter: "blur(4px)" },
//   animate: {
//     opacity: 1,
//     scale: 1,
//     filter: "blur(0px)",
//     transition: {
//       duration: 0.85,
//       ease: [0.22, 1, 0.36, 1],
//     },
//   },
//   exit: {
//     opacity: 0,
//     transition: {
//       duration: 0.01,
//     },
//   },
// };

// const textFade = {
//   initial: { opacity: 0, y: 40 },
//   animate: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] },
//   },
//   exit: {
//     opacity: 0,
//     y: -40,
//     transition: { duration: 0.35, ease: [0.4, 0.0, 1, 1] },
//   },
// };

// export default function HeroFeatureSlider({ slides }: Props) {
//   const prevRef = useRef<HTMLButtonElement | null>(null);
//   const nextRef = useRef<HTMLButtonElement | null>(null);

//   const [activeSlide, setActiveSlide] = useState(0);
//   const [activeFeat, setActiveFeat] = useState(1);
//   const [swiper, setSwiper] = useState<SwiperType | null>(null);

//   /* Base visible background */
//   const [bgBase, setBgBase] = useState(
//     slides[0]?.features?.[1]?.bgImage ?? null
//   );

//   /* Overlay background for fading */
//   const [bgFade, setBgFade] = useState<string | null>(null);

//   /* Safe fade (no blank) */
//   const switchBg = (newBg: string) => {
//     if (!newBg || newBg === bgBase) return;

//     setBgFade(newBg); // fade ON TOP

//     setTimeout(() => {
//       setBgBase(newBg); // update base after fade
//       setBgFade(null); // remove fade layer
//     }, 850); // EXACT duration of animation
//   };

//   return (
//     <section className="w-full relative overflow-hidden">
//       <Swiper
//         modules={[Navigation, Pagination, EffectFade]}
//         effect="fade"
//         fadeEffect={{ crossFade: true }}
//         slidesPerView={1}
//         loop
//         onSwiper={setSwiper}
//         navigation={{
//           prevEl: prevRef.current,
//           nextEl: nextRef.current,
//         }}
//         onBeforeInit={(s) => {
//           const nav = s.params.navigation;
//           if (nav && typeof nav !== "boolean") {
//             nav.prevEl = prevRef.current;
//             nav.nextEl = nextRef.current;
//           }
//         }}
//         onSlideChange={(s) => {
//           const i = s.realIndex;
//           setActiveSlide(i);
//           setActiveFeat(1);
//           switchBg(slides[i].features[1].bgImage);
//         }}
//         pagination={{ el: ".hero-pagination", clickable: true }}
//         className="w-full"
//       >
//         {slides.map((slide) => (
//           <SwiperSlide key={slide.id}>
//             <div className="relative w-full min-h-[520px] md:min-h-[680px]">
//               {/* ===== BASE BACKGROUND (never removed) ===== */}
//               <div
//                 className="absolute inset-0 -z-20 bg-cover bg-center"
//                 style={{ backgroundImage: `url('${bgBase}')` }}
//               />

//               {/* ===== FADING OVERLAY ===== */}
//               <AnimatePresence mode="wait">
//                 {bgFade && (
//                   <motion.div
//                     key={bgFade}
//                     variants={bgFadeAnim}
//                     initial="initial"
//                     animate="animate"
//                     exit="exit"
//                     className="absolute inset-0 -z-10 bg-cover bg-center"
//                     style={{ backgroundImage: `url('${bgFade}')` }}
//                   />
//                 )}
//               </AnimatePresence>

//               {/* Top Gradient */}
//               <div
//                 className="absolute inset-0 -z-[5]"
//                 style={{
//                   background:
//                     "linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 100%)",
//                 }}
//               />

//               {/* ===== PILL HEADER ===== */}
//               {/* ===== PILL HEADER ===== */}
//               <div className="container pt-14 md:pt-20 lg:pt-24 2xl:pt-32">
//                 <div className="flex items-center justify-center relative">
//                   {/* Prev Button */}
//                   <button
//                     ref={prevRef}
//                     className="absolute left-0 -translate-x-6 top-1/2 -mt-6 w-10 h-10 z-20 flex items-center justify-center"
//                   >
//                     <Image
//                       src="/icons/left_slider_arrow.svg"
//                       width={30}
//                       height={30}
//                       alt="prev"
//                     />
//                   </button>

//                   {/* STATIC pill wrapper */}
//                   <div className="px-10 py-8 rounded-[140px] text-center backdrop-blur-[30px] bg-black/20 max-w-[1150px] w-full">
//                     {/* Animated title */}
//                     <AnimatePresence mode="wait">
//                       <motion.h1
//                         key={`title-${activeSlide}`}
//                         variants={textFade}
//                         initial="initial"
//                         animate="animate"
//                         exit="exit"
//                         className="text-white font-[optima] text-[30px] md:text-[45px] lg:text-[60px] leading-[1]"
//                       >
//                         {slide.title}
//                       </motion.h1>
//                     </AnimatePresence>

//                     {/* Animated subtitle */}
//                     {slide.subtitle && (
//                       <AnimatePresence mode="wait">
//                         <motion.p
//                           key={`sub-${activeSlide}`}
//                           variants={textFade}
//                           initial="initial"
//                           animate="animate"
//                           exit="exit"
//                           className="text-white/90 text-[18px] mt-4 max-w-[85ch] mx-auto"
//                         >
//                           {slide.subtitle}
//                         </motion.p>
//                       </AnimatePresence>
//                     )}
//                   </div>

//                   {/* Next Button */}
//                   <button
//                     ref={nextRef}
//                     className="absolute right-0 translate-x-6 top-1/2 -mt-6 w-10 h-10 z-20 flex items-center justify-center"
//                   >
//                     <Image
//                       src="/icons/left_slider_arrow.svg"
//                       width={30}
//                       height={30}
//                       className="rotate-180"
//                       alt="next"
//                     />
//                   </button>
//                 </div>

//                 {/* Pagination */}
//                 <div className="mt-8 flex gap-3 justify-center">
//                   {slides.map((_, i) => (
//                     <button
//                       key={i}
//                       onClick={() => swiper?.slideTo(i)}
//                       className={`w-[10px] h-[10px] rounded-full transition-all ${
//                         activeSlide === i ? "bg-primary" : "border border-white"
//                       }`}
//                     />
//                   ))}
//                 </div>
//               </div>

//               {/* ===== FEATURES ===== */}
//               <div className="mt-[26px]">
//                 <div className="grid grid-cols-2 lg:grid-cols-4 rounded overflow-hidden relative">
//                   {slide.features.map((f, i) => {
//                     const active = activeFeat === i;

//                     return (
//                       <div key={f.id} className="relative flex flex-1">
//                         <div
//                           className="relative flex-1 min-h-[360px] md:min-h-[420px] 3xl:h-[618px]
//                           flex justify-center items-end px-4 group transition-all"
//                           onMouseEnter={() => {
//                             setActiveFeat(i);
//                             switchBg(f.bgImage);
//                           }}
//                           onMouseLeave={() =>
//                             switchBg(slide.features[activeFeat].bgImage)
//                           }
//                         >
//                           <div
//                             className={`absolute inset-0 transition-opacity duration-400 ${
//                               active ? "opacity-100" : "opacity-0"
//                             }`}
//                             style={{
//                               background:
//                                 "linear-gradient(180deg, rgba(0,0,0,0) 7.68%, rgba(0,0,0,0.66) 100%)",
//                             }}
//                           />

//                           <div className="relative z-20 w-full flex justify-center">
//                             <div className="flex flex-col items-center absolute bottom-[40px] xl:bottom-[60px] 3xl:bottom-[100px]">
//                               <h3
//                                 className={`text-white font-[optima] uppercase text-center text-[22px] md:text-[25px] xl:text-[30px] transition-all duration-400 ${
//                                   active
//                                     ? "translate-y-[-70px] 3xl:translate-y-[-85px]"
//                                     : "translate-y-0"
//                                 }`}
//                               >
//                                 {f.title}
//                               </h3>

//                               <div
//                                 className={`transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] ${
//                                   active
//                                     ? "opacity-100 pointer-events-auto translate-y-0"
//                                     : "opacity-0 pointer-events-none absolute translate-y-[40px] xl:translate-y-[60px] 3xl:translate-y-[100px]"
//                                 }`}
//                               >
//                                 <a
//                                   href={f.link ?? "#"}
//                                   className="inline-block border border-white px-[23px] py-[19.5px] rounded-[50px] text-white text-sm"
//                                 >
//                                   Read More
//                                 </a>
//                               </div>
//                             </div>
//                           </div>
//                         </div>

//                         {i < slide.features.length - 1 && (
//                           <div
//                             className="hidden lg:block absolute top-0 right-0 h-full w-[1px]"
//                             style={{
//                               background:
//                                 "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.5) 100%)",
//                             }}
//                           />
//                         )}
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </section>
//   );
// }

"use client";

import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  textFade,
  bgFadeAnim,
  moveLeft,
  moveRight,
  moveUp,
} from "../../motionVariants";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { cubicBezier } from "framer-motion";

type Props = { slides: Slide[] };

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
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeFeat, setActiveFeat] = useState(1);
  const [swiper, setSwiper] = useState<SwiperType | null>(null);

  /* Base visible background */
  const [bgBase, setBgBase] = useState(
    slides[0]?.features?.[1]?.bgImage ?? null
  );

  /* Overlay background for fading */
  const [bgFade, setBgFade] = useState<string | null>(null);

  /* Safe fade (no blank) */
  const switchBg = (newBg: string) => {
    if (!newBg || newBg === bgBase) return;

    setBgFade(newBg); // fade ON TOP

    setTimeout(() => {
      setBgBase(newBg); // update base after fade
      setBgFade(null); // remove fade layer
    }, 850); // EXACT duration of animation
  };

  const featureStagger = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.15,   // delay between each feature item
    },
  },
}


const featureItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}


const dropWrapper = {
  hidden: { opacity: 0, y: -60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: cubicBezier(0.16, 1, 0.3, 1), // proper type-safe easing
    },
  },
};


const sectionRef = useRef<HTMLDivElement>(null);
const isHalfInView = useInView(sectionRef, { margin: "-50% 0px -50% 0px", once: true });




  return (
    <section className="w-full relative overflow-hidden">
      <Swiper
        // modules={[Navigation, Pagination]}
        slidesPerView={1}
        loop
        modules={[Navigation, Pagination]}
        speed={1}
        allowTouchMove={false}
        // simulateTouch={false}
        onSwiper={setSwiper}
        navigation={{ nextEl: ".swiper-btn-next", prevEl: ".swiper-btn-prev" }}
        onSlideChange={(s) => {
          const i = s.realIndex;
          setActiveSlide(i);
          setActiveFeat(1);
          switchBg(slides[i].features[1].bgImage);
        }}
        pagination={{ el: ".hero-pagination", clickable: true }}
        className="w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full min-h-[520px] md:min-h-[680px]">
              {/* ===== BASE BACKGROUND (never removed) ===== */}
              <div
                className="absolute inset-0 -z-20 bg-cover bg-center"
                style={{ backgroundImage: `url('${bgBase}')` }}
              />

              {/* ===== FADING OVERLAY ===== */}
              <AnimatePresence mode="wait">
                {bgFade && (
                  <motion.div
                    key={bgFade}
                    variants={bgFadeAnim}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="absolute inset-0 -z-10 bg-cover bg-center"
                    style={{ backgroundImage: `url('${bgFade}')` }}
                  />
                )}
              </AnimatePresence>

              {/* Top Gradient */}
              <div
                className="absolute inset-0 -z-[5]"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 100%)",
                }}
              />

              {/* ===== PILL HEADER ===== */}
              <div className="container pt-14 md:pt-20 lg:pt-24 2xl:pt-32">
                <motion.div className="flex items-center justify-center relative">
                  {/* Prev Button */}
                  <div className="overflow-hidden">
                    <motion.button
                      variants={moveRight(0.3)}
                      initial="hidden"
                      whileInView="show"
                      exit="exit"
                      viewport={{ once: true }}
                      className="swiper-btn-prev  absolute left-0 -translate-x-6 top-1/2 -mt-6 w-10 h-10 z-20 flex items-center justify-center cursor-pointer"
                    >
                      <Image
                        src="/icons/left_slider_arrow.svg"
                        width={34}
                        height={34}
                        className="w-[34px] h-[34px]"
                        alt="prev"
                      />
                    </motion.button>
                  </div>

                  {/* STATIC pill wrapper */}
                  <motion.div className="px-10 py-8 rounded-[140px] text-center backdrop-blur-[30px] bg-black/20 max-w-[1150px] w-full"  variants={dropWrapper} initial="hidden" whileInView="visible" exit="exit">
                    {/* Animated title */}
                    {/* <AnimatePresence mode="wait"> */}
                    <div className="overflow-hidden">
                      <motion.h1
                        key={`title-${activeSlide}`}
                        variants={textFade}
                        custom={0.25}
                        initial="initial"
                        whileInView="animate"
                        animate={isHalfInView ? "animate" : "initial"}
                        exit="exit"
                        viewport={{ once: true }}
                        className="text-white font-[optima] text-[30px] md:text-[45px] lg:text-[60px] leading-[1]"
                      >
                        {slide.title}
                      </motion.h1>
                    </div>
                    {/* </AnimatePresence> */}

                    {/* Animated subtitle */}
                    <div className="overflow-hidden">
                      {slide.subtitle && (
                        // <AnimatePresence mode="wait">
                        <motion.p
                          key={`sub-${activeSlide}`}
                          variants={textFade}
                          initial="initial"
                          whileInView="animate"
                          animate={isHalfInView ? "animate" : "initial"}
                          exit="exit"
                          custom={0.4}
                          viewport={{ once: true }}
                          className="text-white/90 text-[18px] mt-4 max-w-[85ch] mx-auto"
                        >
                          {slide.subtitle}
                        </motion.p>
                        // {/* </AnimatePresence> */}
                      )}
                    </div>
                  </motion.div>

                  {/* Next Button */}
                  <div className="overflow-hidden">
                    <motion.button
                      variants={moveLeft(0.3)}
                      initial="hidden"
                      whileInView={"show"}
                      viewport={{ once: true }}
                      className="swiper-btn-next absolute right-0 translate-x-6 top-1/2 -mt-6 w-10 h-10 z-20 flex items-center cursor-pointer justify-center"
                    >
                      <Image
                        src="/icons/left_slider_arrow.svg"
                        width={34}
                        height={34}
                        className="rotate-180 w-[34px] h-[34px]"
                        alt="next"
                      />
                    </motion.button>
                  </div>
                </motion.div>

                {/* Pagination */}
                <motion.div
                  variants={moveUp(0.3)}
                  initial="hidden"
                  whileInView="show"
                  exit="exit"
                  className="mt-8 flex gap-3 justify-center"
                  viewport={{ once: true }}
                >
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => swiper?.slideTo(i)}
                      className={`w-[10px] h-[10px] rounded-full cursor-pointer transition-all ${
                        activeSlide === i ? "bg-primary" : "border border-white"
                      }`}
                    />
                  ))}
                </motion.div>
              </div>

              {/* ===== FEATURES ===== */}
              <div className="mt-[26px]">
                <motion.div variants={featureStagger} initial="initial"
  whileInView="animate" className="grid grid-cols-2 lg:grid-cols-4 rounded overflow-hidden relative">
                  {slide.features.map((f, i) => {
                    const active = activeFeat === i;

                    return (
                      <div key={f.id} className="relative flex flex-1">
                        <motion.div
                          className="relative flex-1 min-h-[360px] md:min-h-[420px] 3xl:h-[618px]
          flex justify-center items-end px-4 group transition-all"
                          onMouseEnter={() => {
                            setActiveFeat(i);
                            switchBg(f.bgImage);
                          }}
                          onMouseLeave={() =>
                            switchBg(slide.features[activeFeat].bgImage)
                          }
                          variants={featureItem}
                        >
                          {/* Gradient */}
                          <div
                            className={`absolute inset-0 transition-opacity duration-400 ${
                              active ? "opacity-100" : "opacity-0"
                            }`}
                            style={{
                              background:
                                "linear-gradient(180deg, rgba(0,0,0,0) 7.68%, rgba(0,0,0,0.66) 100%)",
                            }}
                          />

                          {/* === CONTENT WRAPPER === */}
                          <div className="relative z-20 w-full flex justify-center">
                            <div className="flex flex-col items-center absolute bottom-10 lg:bottom-15 xl:bottom-22 3xl:bottom-[100px]">
                              {/* === SMOOTH TITLE === */}
                              <motion.h3
                                key={`feat-title-${activeSlide}-${i}-${active}`}
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -40 }}
                                transition={{
                                  duration: 0.7,
                                  ease: [0.25, 0.1, 0.25, 1],
                                  delay: i * 0.3,
                                }}
                                className="text-white font-[optima] uppercase text-center
      text-[22px] md:text-[25px] xl:text-[30px] px-4"
                              >
                                {f.title}
                              </motion.h3>

                              {/* === SMOOTH BUTTON === */}
                              <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{
                                  opacity: active ? 1 : 0,
                                  y: active ? 0 : 30,
                                  marginTop: active
                                    ? "var(--gap-active)" // dynamic responsive spacing
                                    : "0px",
                                }}
                                transition={{
                                  duration: 0.75,
                                  ease: [0.25, 0.1, 0.25, 1],
                                }}
                                style={
                                  {
                                    "--gap-active": "50px",
                                  } as React.CSSProperties
                                }
                                className={`
        ${active ? "pointer-events-auto" : "pointer-events-none absolute"}
        gap-responsive
      `}
                              >
                                <a
                                  href={f.link ?? "#"}
                                  className="inline-block border border-white px-[23px] py-[19.5px]
        rounded-[50px] text-white text-sm"
                                >
                                  Read More
                                </a>
                              </motion.div>
                            </div>
                          </div>
                        </motion.div>

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
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
