// "use client";

// import Image from "next/image";
// import { investReasonsData } from "../data";
// import { SectionHeading } from "../../animations/SectionHeading";
// import { SectionDescription } from "../../animations/SectionDescription";
// import Reveal from "../../animations/RevealOneByOneAnimation";
// import { moveUp, moveUpV2 } from "../../motionVariants";
// import { motion } from "framer-motion";
// import { useEffect, useRef, useState } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay } from "swiper/modules";
// import "swiper/css";

// export default function Reasons() {
//   const { sectionTitle, sectionDescription, reasons } = investReasonsData;
//   const [current, setCurrent] = useState(0);
//   const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

//   useEffect(() => {
//     timerRef.current = setInterval(() => {
//       setCurrent((prev) => (prev + 1) % reasons.length);
//     }, 3000);
//     return () => clearInterval(timerRef.current!);
//   }, [reasons.length]);

//   return (
//     <section className="w-full bg-gray">
//       <div className="container py-120 3xl:py-130">
//         {/* Section Header */}
//         <div className="text-center mb-50">
//           <SectionHeading title={sectionTitle} className="uppercase mb-20" />
//           <SectionDescription
//             text={sectionDescription}
//             className="max-w-[750px] mx-auto text-foreground-light whitespace-pre-line"
//           />
//         </div>

// {/* ── Mobile slider (below md) ───────────────────────── */}
// <div className="block md:hidden">
//   <Swiper
//     modules={[Autoplay]}
//     autoplay={{ delay: 3000, disableOnInteraction: false }}
//     loop
//     slidesPerView={1}
//     onSlideChange={(swiper) => setCurrent(swiper.realIndex)}
//     onSwiper={(swiper) => setCurrent(swiper.realIndex)}
//   >
//     {reasons.map((reason, index) => (
//       <SwiperSlide key={reason.id}>
//         <div className="flex flex-col items-center px-50 py-40">
//           <div className="flex items-center justify-center mb-20 w-[64px] h-[64px] rounded-full bg-[#4909050D] backdrop-blur-[30px]">
//             <Image
//               src={reason.icon}
//               alt={reason.title}
//               width={50}
//               height={50}
//               className={`object-contain ${index == 0 ? "h-[22px]" : "h-8"} w-auto`}
//             />
//           </div>
//           <h3 className="font-[optima] uppercase text-25 leading-[1.4] mb-20 tracking-[2%] text-foreground text-center">
//             {reason.title}
//           </h3>
//           <p className="text-description max-w-[335px] text-center text-foreground-light">
//             {reason.description}
//           </p>
//         </div>
//       </SwiperSlide>
//     ))}
//   </Swiper>

//   {/* Custom dots */}
//   <div className="flex justify-center gap-[10px]">
//     {reasons.map((_, i) => (
//       <div
//         key={i}
//         className={`w-[10px] h-[10px] rounded-full border border-primary transition-all duration-300 ${
//           i === current ? "bg-primary" : "bg-white"
//         }`}
//       />
//     ))}
//   </div>
// </div>

//         {/* ── Grid (md and above) ────────────────────────────── */}
//         <div className="hidden md:grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
//           {reasons.map((reason, index) => {
//             const col = index % 4;
//             const row = Math.floor(index / 4);
//             const totalRows = Math.ceil(reasons.length / 4);
//             const isLastRow = row === totalRows - 1;
//             const isFirstCol = col === 0;
//             const isLastCol = col === 3 || index === reasons.length - 1;

//             const col3 = index % 3;
//             const row3 = Math.floor(index / 3);
//             const totalRows3 = Math.ceil(reasons.length / 3);
//             const isLastCol3 = col3 === 2 || index === reasons.length - 1;
//             const isLastRow3 = row3 === totalRows3 - 1;
//             const showVertical3 = !isLastCol3;
//             const showHorizontal3 = !isLastRow3;
//             const showVertical = !isLastCol;
//             const showHorizontal = !isLastRow;

//             const paddingClass = isFirstCol
//               ? "px-50 2xl:pl-0 2xl:pr-50 3xl:pl-0 3xl:pr-[54px]"
//               : isLastCol
//                 ? "px-50 2xl:pl-50 2xl:pr-0 3xl:pl-[54px] 3xl:pr-0"
//                 : "px-50 2xl:px-50 3xl:px-[54px]";

//             return (
//               <Reveal key={reason.id} variants={moveUpV2} delayRange={0.1 * index}>
//                 <div className="relative group h-full">
//                   <div className={`flex flex-col items-center pb-40 pt-40 3xl:pt-[43px] 3xl:pb-[46px] ${paddingClass}`}>
//                     <motion.div
//                       variants={moveUp(0)} initial="hidden" whileInView="show" viewport={{ once: true }}
//                       className="flex items-center justify-center mb-20
//                                w-[64px] h-[64px] xl:w-[72px] xl:h-[72px] 3xl:w-[80px] 3xl:h-[80px]
//                                rounded-full bg-[#4909050D] backdrop-blur-[30px]"
//                     >
//                       <Image src={reason.icon} alt={reason.title} width={50} height={50}
//                         className={`object-contain ${index == 0 ? "h-[22px]" : "h-8"} w-auto`} />
//                     </motion.div>
//                     <motion.h3
//                       variants={moveUp(0.1)} initial="hidden" whileInView="show" viewport={{ once: true }}
//                       className="font-[optima] uppercase text-25 leading-[1.4] mb-20 tracking-[2%] text-foreground text-center"
//                     >{reason.title}</motion.h3>
//                     <motion.p
//                       variants={moveUp(0.15)} initial="hidden" whileInView="show" viewport={{ once: true }}
//                       className="text-description max-w-[335px] text-center text-foreground-light"
//                     >{reason.description}</motion.p>
//                   </div>

//                   {showVertical3 && (
//                     <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[1px] h-[87%] hidden xl:block 2xl:hidden"
//                       style={{ background: "linear-gradient(180deg, rgba(73,9,5,0) 0%, #490905 50%, rgba(73,9,5,0) 100%)" }} />
//                   )}
//                   {showVertical && (
//                     <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[1px] h-[87%] hidden 2xl:block"
//                       style={{ background: "linear-gradient(180deg, rgba(73,9,5,0) 0%, #490905 50%, rgba(73,9,5,0) 100%)" }} />
//                   )}
//                   {showHorizontal3 && (
//                     <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[1px] w-[87%] xl:block 2xl:hidden"
//                       style={{ background: "linear-gradient(90deg, rgba(73,9,5,0) 0%, #490905 50%, rgba(73,9,5,0) 100%)" }} />
//                   )}
//                   {showHorizontal && (
//                     <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[1px] w-[87%] hidden 2xl:block"
//                       style={{ background: "linear-gradient(90deg, rgba(73,9,5,0) 0%, #490905 50%, rgba(73,9,5,0) 100%)" }} />
//                   )}

//                   {col % 2 === 0 && (
//                     <div className="absolute top-0 right-0 w-[1px] h-full block lg:hidden sm:block hidden"
//                       style={{ background: "linear-gradient(180deg, rgba(73,9,5,0) 0%, #490905 50%, rgba(73,9,5,0) 100%)" }} />
//                   )}
//                 </div>
//               </Reveal>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import Image from "next/image";
import { investReasonsData } from "../data";
import { SectionHeading } from "../../animations/SectionHeading";
import { SectionDescription } from "../../animations/SectionDescription";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useRef, useLayoutEffect, useState, useCallback } from "react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import Reveal from "../../animations/RevealOneByOneAnimation";
import { moveUp, moveUpV2 } from "../../motionVariants";
import { motion } from "framer-motion";

const LINE_GRADIENT_H =
  "linear-gradient(90deg, rgba(73,9,5,0) 0%, #490905 50%, rgba(73,9,5,0) 100%)";
const LINE_GRADIENT_V =
  "linear-gradient(180deg, rgba(73,9,5,0) 0%, #490905 50%, rgba(73,9,5,0) 100%)";

export default function Reasons() {
  const { sectionTitle, sectionDescription, reasons } = investReasonsData;
  const [activeIndex, setActiveIndex] = useState(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const slides: (typeof reasons)[] = [];
  for (let i = 0; i < reasons.length; i += 2) {
    slides.push(reasons.slice(i, i + 2));
  }
  const total = slides.length; // e.g. 4

  // innerSlideIndices: set of original slide indices (0..total-1) that should
  // show a vertical line on their right — i.e. all visible except the rightmost.
  const [innerSlideIndices, setInnerSlideIndices] = useState<Set<number>>(
    new Set(),
  );

  const computeInnerIndices = useCallback(
    (swiper: SwiperType) => {
      const spv = Math.round(swiper.params.slidesPerView as number) || 1;
      // activeIndex is the real DOM index (includes clones in loop mode)
      // realIndex maps it back to original 0..total-1
      const startReal = swiper.realIndex; // 0-based original index of leftmost visible slide

      // Build list of original indices currently visible, left to right
      const visible: number[] = [];
      for (let i = 0; i < spv; i++) {
        visible.push((startReal + i) % total);
      }

      // All except the last (rightmost) get a line
      const inner = new Set(visible.slice(0, -1));
      setInnerSlideIndices(inner);
    },
    [total],
  );

  // Equalize all card heights across all slides
  useLayoutEffect(() => {
    const measure = () => {
      cardRefs.current.forEach((el) => {
        if (el) el.style.height = "auto";
      });
      const maxH = Math.max(
        0,
        ...cardRefs.current.map(
          (el) => el?.getBoundingClientRect().height ?? 0,
        ),
      );
      if (maxH > 0) {
        cardRefs.current.forEach((el) => {
          if (el) el.style.height = `${maxH}px`;
        });
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <section data-header="dark" className="w-full bg-gray">
      <div className="container py-120 3xl:py-130">
        <div className="text-center mb-60 3xl:mb-[66px]">
          <SectionHeading title={sectionTitle} className="uppercase mb-20" />
          <SectionDescription
            text={sectionDescription}
            className="max-w-[750px] mx-auto text-foreground-light whitespace-pre-line"
          />
        </div>

        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          speed={700}
          loop={true}
          watchSlidesProgress={true}
          slidesPerView={1}
          onSwiper={(s) => {
            computeInnerIndices(s);
            setActiveIndex(s.realIndex);
          }}
          onSlideChange={(s) => {
            computeInnerIndices(s);
            setActiveIndex(s.realIndex);
          }}
          onBreakpoint={(s) => computeInnerIndices(s)}
          breakpoints={{
            728: { slidesPerView: 2 },
            1280: { slidesPerView: 3 },
            1540: { slidesPerView: 4 },
          }}
        >
          {slides.map((pair, slideIndex) => (
            <SwiperSlide key={slideIndex}>
              <Reveal variants={moveUpV2} delayRange={slideIndex * 0.12}>
                <div className="relative flex flex-col">
                  {pair.map((reason, cardIndex) => {
                    const reasonIndex = slideIndex * 2 + cardIndex;
                    const refIndex = slideIndex * 2 + cardIndex;
                    const isLastCard = cardIndex === pair.length - 1;
                    const showLine = innerSlideIndices.has(slideIndex);

                    return (
                      <div
                        key={reason.id}
                        ref={(el) => {
                          cardRefs.current[refIndex] = el;
                        }}
                        className="relative flex flex-col"
                      >
                        <div className="flex flex-col items-center justify-center flex-1 px-50 py-40 3xl:py-[46px] overflow-hidden">
                          <div
                            className="flex items-center justify-center mb-20
                                     w-[64px] h-[64px] xl:w-[72px] xl:h-[72px] 3xl:w-[80px] 3xl:h-[80px]
                                     rounded-full bg-[#4909050D] backdrop-blur-[30px]"
                          >
                            <Image
                              src={reason.icon}
                              alt={reason.title}
                              width={50}
                              height={50}
                              className={`object-contain ${
                                reasonIndex === 0 ? "h-[22px]" : "h-8"
                              } w-auto`}
                            />
                          </div>
                          <motion.h3
                            variants={moveUp(0.1)}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                            className="font-[optima] uppercase text-25 leading-[1.4] mb-20 tracking-[2%] text-foreground text-center"
                          >
                            {reason.title}
                          </motion.h3>
                          <motion.p
                            variants={moveUp(0.15)}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                            className="text-description max-w-[335px] text-center text-foreground-light"
                          >
                            {reason.description}
                          </motion.p>
                        </div>

                        {/* Horizontal separator between stacked cards */}
                        {!isLastCard && (
                          <div
                            className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[1px] w-[87%]"
                            style={{ background: LINE_GRADIENT_H }}
                          />
                        )}

                        {/* Vertical line — only on inner visible slides, never on rightmost */}
                        <div
                          className="absolute top-[6.5%] right-0 w-[1px] hidden md:block"
                          style={{
                            height: "87%",
                            background: LINE_GRADIENT_V,
                            opacity: showLine ? 1 : 0,
                            transition: "opacity 0.4s ease",
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              </Reveal>
            </SwiperSlide>
          ))}
        </Swiper>
        {/* Pagination (only below 1540px) */}
        <div className="flex justify-center mt-50 gap-[10px] max-[1540px]:flex hidden">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`w-[10px] h-[10px] rounded-full border border-primary transition-all duration-300 ${
                i === activeIndex ? "bg-primary" : "bg-white"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
