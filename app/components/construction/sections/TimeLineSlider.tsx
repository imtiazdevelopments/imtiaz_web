// "use client";

// import { useRef, useState } from "react";
// import Image from "next/image";
// import type { Swiper as SwiperType } from "swiper";
// import { Navigation } from "swiper/modules";
// import { Swiper, SwiperSlide } from "swiper/react";

// import "swiper/css";

// import SliderArrowButton from "../../common/SliderNavigationButton";
// import { timelineSectionData } from "../data";
// import { SectionHeading } from "../../animations/SectionHeading";
// import { SectionDescription } from "../../animations/SectionDescription";

// export default function TimelineSlider() {
//   const { title, description, slides } = timelineSectionData;

//   const swiperRef = useRef<SwiperType | null>(null);
//   const [activeIndex, setActiveIndex] = useState(0);

//   return (
//     <section className="w-full overflow-hidden bg-white py-120 2xl:pb-130">
//         <div className="w-full flex-col gap-20 items-center justify-center text-center mb-[30px] md:mb-50 container">
//           <SectionHeading
//             title={title}
//             className="mb-20 text-foreground max-w-[30ch] mx-auto"
//           />
//           <SectionDescription
//             text={description}
//             className="text-description max-w-[115ch] mx-auto"
//           />
//       </div>

//       <div className="relative h-[482px]">
//         <Swiper
//           modules={[Navigation]}
//           centeredSlides
//           loop
//           spaceBetween={30}
//           speed={600}
//           onSwiper={(swiper) => {
//             swiperRef.current = swiper;
//             setActiveIndex(swiper.realIndex);
//           }}
//           onSlideChange={(swiper) => {
//             setActiveIndex(swiper.realIndex);
//           }}
//           slidesPerView="auto"
//           className="!overflow-visible h-full ![&_.swiper-slide]:flex ![&_.swiper-slide]:items-center ![&_.swiper-slide]:justify-center"
//         >
//           {slides.map((slide, index) => {
//             const isActive = activeIndex === index;

//             return (
//               <SwiperSlide
//                 key={`${slide.year}-${index}`}
//                 className="!w-[280px] sm:!w-[420px] md:!w-[560px] lg:!w-[760px] xl:!w-[896px] 3xl:!w-[896px]"
//                 style={{
//                   height: "482px",
//                   display: "flex",
//                   alignItems: "center",
//                 }}
//               >
//                 <div
//                   className={[
//                     "relative w-full overflow-hidden transition-all duration-500",
//                     isActive ? "opacity-100" : "opacity-30",
//                   ].join(" ")}
//                   style={{ height: isActive ? "482px" : "319px" }}
//                 >
//                   <Image
//                     src={slide.image}
//                     alt={slide.title}
//                     fill
//                     className="object-cover"
//                   />

//                   {isActive && (
//                     <>
//                       <div
//                         className="absolute inset-0"
//                         style={{
//                           background:
//                             "linear-gradient(180deg, rgba(0, 0, 0, 0) 28.16%, #000000 115.22%)",
//                         }}
//                       />
//                       <div className="absolute right-0 bottom-0 left-0 flex justify-center px-6 pb-6">
//                         <span className="text-white font-[optima] text-25 leading-[1.4] uppercase text-center tracking-[0.2em]">
//                           {slide.title}
//                         </span>
//                       </div>
//                     </>
//                   )}
//                 </div>
//               </SwiperSlide>
//             );
//           })}
//         </Swiper>

//         <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-between px-4 xl:px-10">
//           <div className="pointer-events-auto">
//             <SliderArrowButton
//               direction="prev"
//               variant="dark"
//               onClick={() => swiperRef.current?.slidePrev()}
//             />
//           </div>
//           <div className="pointer-events-auto">
//             <SliderArrowButton
//               direction="next"
//               variant="dark"
//               onClick={() => swiperRef.current?.slideNext()}
//             />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }




"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import type { Swiper as SwiperType } from "swiper";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from "framer-motion";

import "swiper/css";

import SliderArrowButton from "../../common/SliderNavigationButton";
import { timelineSectionData } from "../data";
import { SectionHeading } from "../../animations/SectionHeading";
import { SectionDescription } from "../../animations/SectionDescription";
import { moveLeft, moveRight } from "../../motionVariants";

export default function TimelineSlider() {
  const { title, description, slides } = timelineSectionData;

  const mainSwiperRef = useRef<SwiperType | null>(null);
  const yearSwiperRef = useRef<SwiperType | null>(null);
  const isSyncing = useRef(false); // ← prevents cross-trigger loop
  const [activeIndex, setActiveIndex] = useState(0);

  const syncTo = (source: "main" | "year", realIndex: number) => {
    if (isSyncing.current) return;
    isSyncing.current = true;
    setActiveIndex(realIndex);
    if (source === "main") {
      yearSwiperRef.current?.slideToLoop(realIndex, 600);
    } else {
      mainSwiperRef.current?.slideToLoop(realIndex, 600);
    }
    // release lock after transition completes
    setTimeout(() => { isSyncing.current = false; }, 650);
  };

  return (
    <section className="w-full overflow-hidden bg-white py-120 2xl:pb-130">
      <div className="w-full flex-col gap-20 items-center justify-center text-center mb-[30px] md:mb-50 container">
        <SectionHeading
          title={title}
          className="mb-20 text-foreground max-w-[30ch] mx-auto"
        />
        <SectionDescription
          text={description}
          className="text-description max-w-[115ch] mx-auto sm:whitespace-pre-line"
        />
      </div>

      {/* Image Slider */}
      <div className="relative h-[300px] md:h-[400px] 3xl:h-[482px]">
        <Swiper
        grabCursor
          modules={[Navigation]}
          centeredSlides
          loop
          spaceBetween={15}
          breakpoints={{
            768: { spaceBetween: 20 },
            1024: { spaceBetween: 30 },
          }}
          speed={600}
          onSwiper={(swiper) => {
            mainSwiperRef.current = swiper;
          }}
          onRealIndexChange={(swiper) => {
            syncTo("main", swiper.realIndex);
          }}
          slidesPerView="auto"
          className="!overflow-visible h-full"
        >
          {slides.map((slide, index) => {
            const isActive = activeIndex === index;

            return (
              <SwiperSlide
                key={`${slide.year}-${index}`}
                className="!w-[280px] sm:!w-[420px] md:!w-[560px] lg:!w-[700px] 2xl:!w-[750px] 3xl:!w-[896px] h-[300px] md:h-[400px] 3xl:!h-[482px] !flex !items-center"
              >
                <div
                  className={`relative w-full overflow-hidden transition-all duration-500 ${isActive ? "h-[300px] md:h-[400px] 3xl:h-[482px]" : "h-[220px] md:h-[270px] 3xl:h-[319px]"}`}
                  style={{opacity: isActive ? 1 : 0.3 }}
                >
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    className="object-cover"
                  />
                  {isActive && (
                    <>
                      <div
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(180deg, rgba(0,0,0,0) 28.16%, #000000 115.22%)",
                        }}
                      />
                      <div className="absolute right-0 bottom-0 left-0 flex justify-center px-6 pb-6">
                        <span className="text-white font-[optima] text-25 leading-[1.4] uppercase text-center tracking-[0.2em]">
                          {slide.title}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>

        <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-between px-4 xl:px-10">
          <motion.div 
          variants={moveRight(0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{once: true}}
          className="pointer-events-auto">
            <SliderArrowButton
              direction="prev"
              variant="dark"
              onClick={() => mainSwiperRef.current?.slidePrev()}
            />
          </motion.div>
          <motion.div 
          variants={moveLeft(0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{once: true}}
          className="pointer-events-auto">
            <SliderArrowButton
              direction="next"
              variant="dark"
              onClick={() => mainSwiperRef.current?.slideNext()}
            />
          </motion.div>
        </div>
      </div>

      {/* Divider */}
      <div className="relative flex items-center justify-center mt-[32px] mb-50 container">
        <div
          className="w-full h-px"
          style={{
            borderTop: "1px solid",
            borderImageSource:
              "linear-gradient(90deg, rgba(73,9,5,0) 0%, #490905 50%, rgba(73,9,5,0) 100%)",
            borderImageSlice: 1,
          }}
        />
        <div className="absolute w-4 h-4 rounded-full bg-primary outline outline-primary outline-offset-4" />
      </div>

      {/* Year Slider */}
      <div className="relative container">
        <Swiper
        grabCursor
          modules={[Navigation]}
          centeredSlides
          loop
          speed={600}
          onSwiper={(swiper) => {
            yearSwiperRef.current = swiper;
          }}
          onRealIndexChange={(swiper) => {
            syncTo("year", swiper.realIndex);
          }}
          slidesPerView="auto"
        >
          {slides.map((slide, index) => {
            const isActive = activeIndex === index;

            return (
              <SwiperSlide
                key={`year-${slide.year}-${index}`}
                className="!w-[120px] sm:!w-[220px] lg:!w-[300px] 3xl:!w-[409px] cursor-pointer"
                onClick={() => {
                  if (isSyncing.current) return;
                  isSyncing.current = true;
                  setActiveIndex(index);
                  mainSwiperRef.current?.slideToLoop(index, 600);
                  yearSwiperRef.current?.slideToLoop(index, 600);
                  setTimeout(() => { isSyncing.current = false; }, 650);
                }}
              >
                <span
                  className={`block text-center font-normal transition-colors duration-300 text-heading ${isActive ? "text-primary" : "text-primary/30"}`}
                >
                  {slide.year}
                </span>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
}