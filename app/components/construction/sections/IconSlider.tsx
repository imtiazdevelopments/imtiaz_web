"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { commitmentSection, commitmentSlides } from "../data";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import { SectionHeading } from "../../animations/SectionHeading";
import { SectionDescription } from "../../animations/SectionDescription";

export default function IconSlider() {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const slidesPerGroup = 1;
  const totalGroups = Math.ceil(commitmentSlides.length / slidesPerGroup);
  const showPagination = commitmentSlides.length > 1;

  return (
    <section data-header="dark" className="pb-120 2xl:pb-130 overflow-hidden">
      <div className="container relative pt-120 2xl:pt-130">
        <div
          className="absolute top-0 left-0 w-full h-px"
          style={{
            background:
              "linear-gradient(90deg, rgba(23, 23, 23, 0) 0%, #171717 50%, rgba(23, 23, 23, 0) 100%)",
          }}
        />
          {/* Header */}
          <div className="w-full flex-col gap-20 items-center justify-center text-center mb-[30px] md:mb-50">
            <SectionHeading
              title={commitmentSection.title}
              className="mb-20 text-foreground max-w-[45ch] mx-auto"
            />
            <SectionDescription text={commitmentSection.description} className="text-description max-w-[105ch] mx-auto 2xl:whitespace-pre-line" />
          </div>
          {/* Slider */}
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            modules={[Autoplay]}
            loop={commitmentSlides.length > 4}
            slidesPerView={1.2}
            spaceBetween={0}
            breakpoints={{
              480: { slidesPerView: 1.8 },
              640: { slidesPerView: 2.2 },
              768: { slidesPerView: 2.55 },
              1024: { slidesPerView: 3.3 },
              1280: { slidesPerView: 3.38 },
            }}
            className="w-full !overflow-visible"
          >
            {commitmentSlides.map((slide, index) => (
              <SwiperSlide key={index}>
                <div className="px-50 py-20 flex flex-col items-center">
                  {/* Icon */}
                  <div className="w-[50px] h-[50px] md:w-[60px] md:h-[60px] lg:w-[80px] lg:h-[80px] rounded-full flex items-center justify-center bg-primary/5 mb-20">
                    {slide.icon_url && (
                      <Image
                        src={slide.icon_url}
                        alt={slide.title}
                        width={32}
                        height={32}
                      />
                    )}
                  </div>
                  {/* Gradient divider */}
                  <div
                    className="w-full h-px mb-20"
                    style={{
                      border: "none",
                      height: "1px",
                      background:
                        "linear-gradient(90deg, rgba(73, 9, 5, 0) 0%, #490905 50%, rgba(73, 9, 5, 0) 100%)",
                    }}
                  />
                  {/* Title */}
                  <p className="text-foreground font-[optima] text-25 leading-[1.4] uppercase text-center">
                    {slide.title}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          {/* Pagination */}
          {showPagination && (
            <div className="flex justify-center mt-[30px] gap-[10px]">
              {Array.from({ length: totalGroups }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => swiperRef.current?.slideToLoop(i)}
                  className={`w-[10px] h-[10px] rounded-full border border-primary transition-all duration-300 cursor-pointer ${
                    i === activeIndex ? "bg-primary" : "bg-white"
                  }`}
                />
              ))}
            </div>
          )}
      </div>
    </section>
  );
}
