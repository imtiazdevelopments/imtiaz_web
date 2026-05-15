// "use client";

// import Image from "next/image";
// import { SectionHeading } from "../animations/SectionHeading";
// import { SectionDescription } from "../animations/SectionDescription";
// import { useGsapStagger } from "../../hooks/useGsapStagger";
// import { useEffect, useState } from "react";
// // ── Types ──────────────────────────────────────────────
// type EverythingWithinData = {
//   title: string;
//   description: string;
//   cards: {
//     id: number;
//     icon: string;
//     label: string;
//     minutes: string;
//     iconWidth?: number;
//     iconHeight?: number;
//   }[];
// };

// type Props = {
//   data: EverythingWithinData;
//   bgClass?: string;
// };

// // ── Component ──────────────────────────────────────────
// export default function IconGrid({ data, bgClass }: Props) {
//   const [isXL, setIsXL] = useState(false);

//   useEffect(() => {
//     const check = () => setIsXL(window.innerWidth >= 1280);
//     check();
//     window.addEventListener("resize", check);
//     return () => window.removeEventListener("resize", check);
//   }, []);
//   const gridRef = useGsapStagger({
//     selector: ".location-card",
//     from: { opacity: 0, y: 40 },
//     to: { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
//     stagger: 0.15,
//     start: "top 80%",
//   });

//   return (
//     <section
//       data-header="dark"
//       className={`w-full py-[70px] lg:py-120 3xl:py-130 ${bgClass ? bgClass : ""}`}
//     >
//       <div className="container flex flex-col justify-center">
//         {/* Header */}
//         <div className="text-center">
//           <SectionHeading
//             title={data.title}
//             className="text-heading leading-[1.4] mb-20"
//           />
//           <SectionDescription
//             text={data.description}
//             className="text-description text-foreground-light max-w-[43ch] mx-auto"
//           />
//         </div>

//         {/* Cards */}
//         <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-[50px] lg:mt-60">
//           {data.cards.map((loc, i) => (
//             <div
//               key={loc.id}
//               className="location-card relative flex flex-col items-center justify-start p-2 md:px-4 sm:px-8 md:py-5 text-center"
//             >
//               {/* Desktop divider */}
//               {i !== 0 && (
//                 <div
//                   className="absolute left-0 top-0 w-px h-full hidden lg:block"
//                   style={{
//                     background:
//                       "linear-gradient(rgba(73, 9, 5, 0) 0%, rgb(73 9 5 / 70%) 50%, rgba(73, 9, 5, 0) 100%)",
//                   }}
//                 />
//               )}

//               {/* Mobile divider */}
//               {(i === 1 || i === 3) && (
//                 <div
//                   className="absolute left-0 top-0 w-px h-full hidden md:block lg:hidden"
//                   style={{
//                     background:
//                       "linear-gradient(rgba(73, 9, 5, 0) 0%, rgb(73 9 5 / 70%) 50%, rgba(73, 9, 5, 0) 100%)",
//                   }}
//                 />
//               )}

//               {/* Icon */}
//               <div className="w-[50px] h-[50px] md:w-[60px] md:h-[60px] lg:w-[70px] mb-20 lg:h-[70px] xl:w-[80px] xl:h-[80px] rounded-full flex items-center justify-center bg-primary/5">
//                 <Image
//                   src={loc.icon}
//                   alt={loc.label}
//                   width={isXL ? loc.iconWidth : 20}
//                   height={isXL ? loc.iconWidth : 20}
//                 />
//               </div>

//               {/* Label */}
//               <p
//                 className="text-foreground font-[optima] text-25 leading-[1.4] uppercase mb-2"
//                 dangerouslySetInnerHTML={{ __html: loc.label }}
//               />

//               {/* Minutes */}
//               <p className="text-description text-foreground-light">
//                 {loc.minutes}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }



// "use client";

// import Image from "next/image";
// import { SectionHeading } from "../animations/SectionHeading";
// import { SectionDescription } from "../animations/SectionDescription";
// import { useGsapStagger } from "../../hooks/useGsapStagger";
// import { useEffect, useState } from "react";

// type EverythingWithinData = {
//   title: string;
//   description: string;
//   cards: {
//     title: string;
//     caption: string;
//     icon_url: string;
//   }[];
// };

// type Props = {
//   data: EverythingWithinData;
//   bgClass?: string;
// };

// export default function IconGrid({ data, bgClass }: Props) {
//   const [isXL, setIsXL] = useState(false);

//   useEffect(() => {
//     const check = () => setIsXL(window.innerWidth >= 1280);
//     check();
//     window.addEventListener("resize", check);
//     return () => window.removeEventListener("resize", check);
//   }, []);

//   const gridRef = useGsapStagger({
//     selector: ".location-card",
//     from: { opacity: 0, y: 40 },
//     to: { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
//     stagger: 0.15,
//     start: "top 80%",
//   });

//   return (
//     <section
//       data-header="dark"
//       className={`w-full py-[70px] lg:py-120 3xl:py-130 ${bgClass ? bgClass : ""}`}
//     >
//       <div className="container flex flex-col justify-center">
//         {/* Header */}
//         <div className="text-center">
//           <SectionHeading
//             title={data.title}
//             className="text-heading leading-[1.4] mb-20 max-w-[45ch] mx-auto"
//           />
//           <SectionDescription
//             text={data.description}
//             className="text-description text-foreground-light max-w-[60ch] mx-auto"
//           />
//         </div>

//         {/* Cards */}
//         <div
//           ref={gridRef}
//           className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-[50px] lg:mt-60"
//         >
//           {data.cards.map((loc, i) => (
//             <div
//               key={i}
//               className="location-card relative flex flex-col items-center justify-start pb-20 pt-20 first:pt-0 sm:first:pt-20 last:pb-0 md:px-4 sm:px-8 text-center"
//             >
//               {/* Desktop divider */}
//               {i !== 0 && (
//                 <div
//                   className="absolute left-0 top-0 w-px h-full hidden lg:block"
//                   style={{
//                     background:
//                       "linear-gradient(rgba(73, 9, 5, 0) 0%, rgb(73 9 5 / 70%) 50%, rgba(73, 9, 5, 0) 100%)",
//                   }}
//                 />
//               )}

//               {/* Tablet vertical divider */}
//               {(i === 1 || i === 3) && (
//                 <div
//                   className="absolute left-0 top-0 w-px h-full hidden sm:block lg:hidden"
//                   style={{
//                     background:
//                       "linear-gradient(rgba(73, 9, 5, 0) 0%, rgb(73 9 5 / 70%) 50%, rgba(73, 9, 5, 0) 100%)",
//                   }}
//                 />
//               )}

//               {/* Mobile (< sm) */}
//               {i < data.cards.length - 1 && (
//                 <div
//                   className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px block sm:hidden"
//                   style={{
//                     background:
//                       "linear-gradient(90deg, rgba(73, 9, 5, 0) 0%, rgb(73 9 5 / 70%) 50%, rgba(73, 9, 5, 0) 100%)",
//                   }}
//                 />
//               )}

//               {/* Tablet (≥ md, < lg) */}
//               {i < data.cards.length - 2 && (
//                 <div
//                   className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px hidden sm:block lg:hidden"
//                   style={{
//                     background:
//                       "linear-gradient(90deg, rgba(73, 9, 5, 0) 0%, rgb(73 9 5 / 70%) 50%, rgba(73, 9, 5, 0) 100%)",
//                   }}
//                 />
//               )}

//               {/* Icon */}
//               <div className="w-[50px] h-[50px] md:w-[60px] md:h-[60px] lg:w-[70px] mb-20 lg:h-[70px] xl:w-[80px] xl:h-[80px] rounded-full flex items-center justify-center bg-primary/5">
//                 <Image
//                   src={loc.icon_url}
//                   alt={loc.caption}
//                   width={isXL ? 34 : 20}
//                   height={isXL ? 34 : 20}
//                 />
//               </div>

//               {/* Label */}
//               <p
//                 className="text-foreground font-[optima] text-25 leading-[1.4] uppercase mb-2"
//                 dangerouslySetInnerHTML={{ __html: loc.title }}
//               />

//               {/* Minutes */}
//               <p className="text-description text-foreground-light">
//                 {loc.caption}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }






"use client";

import Image from "next/image";
import { SectionHeading } from "../animations/SectionHeading";
import { SectionDescription } from "../animations/SectionDescription";
import { useEffect, useState, useRef, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";

type EverythingWithinData = {
  title: string;
  description: string;
  cards: {
    title: string;
    caption: string;
    icon_url: string;
  }[];
};

type Props = {
  data: EverythingWithinData;
  bgClass?: string;
};

const LINE_GRADIENT_V =
  "linear-gradient(180deg, rgba(73,9,5,0) 0%, rgb(73 9 5 / 70%) 50%, rgba(73,9,5,0) 100%)";
const LINE_GRADIENT_H =
  "linear-gradient(90deg, rgba(73,9,5,0) 0%, rgb(73 9 5 / 70%) 50%, rgba(73,9,5,0) 100%)";

export default function IconGrid({ data, bgClass }: Props) {
  const [isXL, setIsXL] = useState(false);
  const [isLG, setIsLG] = useState(false);

  // Below lg: 2 cards per slide
  const [activeIndexPaired, setActiveIndexPaired] = useState(0);
  const [slidesPerViewPaired, setSlidesPerViewPaired] = useState(1);
  const swiperPairedRef = useRef<SwiperType | null>(null);
  const [innerIndicesPaired, setInnerIndicesPaired] = useState<Set<number>>(new Set());

  // At lg+: 1 card per slide
  const [activeIndexSingle, setActiveIndexSingle] = useState(0);
  const [slidesPerViewSingle, setSlidesPerViewSingle] = useState(1);
  const swiperSingleRef = useRef<SwiperType | null>(null);
  const [innerIndicesSingle, setInnerIndicesSingle] = useState<Set<number>>(new Set());

  // Paired slides (2 cards each) — used below lg
  const pairedSlides: (typeof data.cards)[] = [];
  for (let i = 0; i < data.cards.length; i += 2) {
    pairedSlides.push(data.cards.slice(i, i + 2));
  }

  // Single slides (1 card each) — used at lg+
  const singleSlides: (typeof data.cards)[] = data.cards.map((card) => [card]);

  const totalPaired = pairedSlides.length;
  const totalSingle = singleSlides.length;

  const showPaginationPaired = slidesPerViewPaired < totalPaired;
  const showPaginationSingle = slidesPerViewSingle < totalSingle;

  useEffect(() => {
    const check = () => {
      setIsXL(window.innerWidth >= 1280);
      setIsLG(window.innerWidth >= 1024);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const computeInnerIndicesPaired = useCallback(
    (swiper: SwiperType) => {
      const spv = Math.round(swiper.params.slidesPerView as number) || 1;
      setSlidesPerViewPaired(spv);
      const startReal = swiper.realIndex;
      const visible: number[] = [];
      for (let i = 0; i < spv; i++) visible.push((startReal + i) % totalPaired);
      setInnerIndicesPaired(new Set(visible.slice(0, -1)));
    },
    [totalPaired],
  );

  const computeInnerIndicesSingle = useCallback(
    (swiper: SwiperType) => {
      const spv = Math.round(swiper.params.slidesPerView as number) || 1;
      setSlidesPerViewSingle(spv);
      const startReal = swiper.realIndex;
      const visible: number[] = [];
      for (let i = 0; i < spv; i++) visible.push((startReal + i) % totalSingle);
      setInnerIndicesSingle(new Set(visible.slice(0, -1)));
    },
    [totalSingle],
  );

  return (
    <section
      data-header="dark"
      className={`w-full py-[70px] lg:py-120 3xl:py-130 ${bgClass ?? ""}`}
    >
      <div className="container flex flex-col justify-center">
        {/* Header */}
        <div className="text-center">
          <SectionHeading
            title={data.title}
            className="text-heading leading-[1.4] mb-20 max-w-[45ch] mx-auto"
          />
          <SectionDescription
            text={data.description}
            className="text-description text-foreground-light max-w-[60ch] mx-auto"
          />
        </div>

        {/* ── BELOW lg: 2 cards per slide ── */}
        <div className="mt-[50px] lg:hidden">
          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            speed={700}
            loop={showPaginationPaired}
            grabCursor={true}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
            }}
            onSwiper={(s) => {
              swiperPairedRef.current = s;
              computeInnerIndicesPaired(s);
              setActiveIndexPaired(s.realIndex);
            }}
            onSlideChange={(s) => {
              computeInnerIndicesPaired(s);
              setActiveIndexPaired(s.realIndex);
            }}
            onBreakpoint={(s) => {
              computeInnerIndicesPaired(s);
              setActiveIndexPaired(s.realIndex);
            }}
          >
            {pairedSlides.map((pair, slideIndex) => (
              <SwiperSlide key={slideIndex}>
                <div className="relative flex flex-col">
                  {pair.map((card, cardIndex) => {
                    const isLastCard = cardIndex === pair.length - 1;
                    const showVerticalLine = innerIndicesPaired.has(slideIndex);

                    return (
                      <div key={cardIndex} className="relative flex flex-col">
                        <div className="flex flex-col items-center justify-start px-4 sm:px-8 py-[20px] md:py-40 text-center">
                          <div className="w-[50px] h-[50px] md:w-[60px] md:h-[60px] rounded-full flex items-center justify-center bg-primary/5 mb-20">
                            <Image
                              src={card.icon_url}
                              alt={card.caption}
                              width={20}
                              height={20}
                            />
                          </div>
                          <p
                            className="text-foreground font-[optima] text-25 leading-[1.4] uppercase mb-2"
                            dangerouslySetInnerHTML={{ __html: card.title }}
                          />
                          <p className="text-description text-foreground-light">
                            {card.caption}
                          </p>
                        </div>

                        {!isLastCard && (
                          <div
                            className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px w-[87%]"
                            style={{ background: LINE_GRADIENT_H }}
                          />
                        )}

                        <div
                          className="absolute top-[6.5%] right-0 w-px"
                          style={{
                            height: "87%",
                            background: LINE_GRADIENT_V,
                            opacity: showVerticalLine ? 1 : 0,
                            transition: "opacity 0.4s ease",
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {showPaginationPaired && (
            <div className="flex justify-center mt-[40px] gap-[10px]">
              {pairedSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => swiperPairedRef.current?.slideToLoop(i)}
                  className={`w-[10px] h-[10px] rounded-full border border-primary transition-all duration-300 cursor-pointer ${
                    i === activeIndexPaired ? "bg-primary" : "bg-white"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* ── AT lg+: 1 card per slide ── */}
        <div className="hidden lg:block mt-60">
          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            speed={700}
            loop={showPaginationSingle}
            grabCursor={true}
            slidesPerView={3}
            breakpoints={{
              1510: { slidesPerView: 4 },
            }}
            onSwiper={(s) => {
              swiperSingleRef.current = s;
              computeInnerIndicesSingle(s);
              setActiveIndexSingle(s.realIndex);
            }}
            onSlideChange={(s) => {
              computeInnerIndicesSingle(s);
              setActiveIndexSingle(s.realIndex);
            }}
            onBreakpoint={(s) => {
              computeInnerIndicesSingle(s);
              setActiveIndexSingle(s.realIndex);
            }}
          >
            {singleSlides.map(([card], slideIndex) => {
              const showVerticalLine = innerIndicesSingle.has(slideIndex);

              return (
                <SwiperSlide key={slideIndex}>
                  <div className="relative flex flex-col">
                    <div className="flex flex-col items-center justify-start px-4 py-40 text-center">
                      <div className="w-[70px] h-[70px] xl:w-[80px] xl:h-[80px] rounded-full flex items-center justify-center bg-primary/5 mb-20">
                        <Image
                          src={card.icon_url}
                          alt={card.caption}
                          width={isXL ? 34 : 20}
                          height={isXL ? 34 : 20}
                        />
                      </div>
                      <p
                        className="text-foreground font-[optima] text-25 leading-[1.4] uppercase mb-2"
                        dangerouslySetInnerHTML={{ __html: card.title }}
                      />
                      <p className="text-description text-foreground-light">
                        {card.caption}
                      </p>
                    </div>

                    <div
                      className="absolute top-[6.5%] right-0 w-px"
                      style={{
                        height: "87%",
                        background: LINE_GRADIENT_V,
                        opacity: showVerticalLine ? 1 : 0,
                        transition: "opacity 0.4s ease",
                      }}
                    />
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>

          {showPaginationSingle && (
            <div className="flex justify-center mt-50 gap-[10px]">
              {singleSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => swiperSingleRef.current?.slideToLoop(i)}
                  className={`w-[10px] h-[10px] rounded-full border border-primary transition-all duration-300 cursor-pointer ${
                    i === activeIndexSingle ? "bg-primary" : "bg-white"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}