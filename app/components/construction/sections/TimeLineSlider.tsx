"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import type { Swiper as SwiperType } from "swiper";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

import SliderArrowButton from "../../common/SliderNavigationButton";
import { timelineSectionData } from "../data";

export default function TimelineSlider() {
  const { title, description, slides } = timelineSectionData;

  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="w-full overflow-hidden bg-white py-16 xl:py-24">
      <div className="mx-auto mb-12 max-w-4xl px-6 text-center">
        <h2 className="mb-6 text-[32px] font-normal leading-tight tracking-wide uppercase text-gray-900 md:text-[44px]">
          {title}
        </h2>

        <p className="mx-auto max-w-3xl text-sm leading-relaxed text-gray-500">
          {description}
        </p>
      </div>

      <div className="relative h-[482px]">
        <Swiper
          modules={[Navigation]}
          centeredSlides
          loop
          spaceBetween={30}
          speed={600}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            setActiveIndex(swiper.realIndex);
          }}
          onSlideChange={(swiper) => {
            setActiveIndex(swiper.realIndex);
          }}
          slidesPerView="auto"
          className="!overflow-visible"
        >
          {slides.map((slide, index) => {
            const isActive = activeIndex === index;

            return (
              <SwiperSlide
                key={`${slide.year}-${index}`}
                className={[
                  "!transition-all",
                  "!duration-500",
                  isActive
                    ? "!w-[280px] sm:!w-[420px] md:!w-[560px] lg:!w-[760px] xl:!w-[896px]"
                    : "!w-[120px] sm:!w-[180px] md:!w-[240px] lg:!w-[320px] xl:!w-[482px]",
                ].join(" ")}
              >
                <div
                  className={[
                    "relative overflow-hidden transition-all duration-500",
                    isActive
                      ? "h-[220px] sm:h-[300px] lg:h-[420px] xl:h-[482px] opacity-100"
                      : "h-[120px] sm:h-[180px] lg:h-[260px] xl:h-[319px] opacity-30",
                  ].join(" ")}
                >
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    className="object-cover"
                  />

                  {isActive && (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                      <div className="absolute right-0 bottom-0 left-0 flex justify-center px-6 pb-6">
                        <span className="text-center text-xs font-medium tracking-[0.2em] text-white uppercase xl:text-sm">
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
          <div className="pointer-events-auto">
            <SliderArrowButton
              direction="prev"
              variant="dark"
              onClick={() => swiperRef.current?.slidePrev()}
            />
          </div>

          <div className="pointer-events-auto">
            <SliderArrowButton
              direction="next"
              variant="dark"
              onClick={() => swiperRef.current?.slideNext()}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
