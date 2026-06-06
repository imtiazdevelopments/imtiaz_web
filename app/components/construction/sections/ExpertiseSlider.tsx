"use client";

import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import Image from "next/image";
import { coreExpertiseData } from "../data";
import SliderArrowButton from "../../common/SliderNavigationButton";

import "swiper/css";
import { SectionHeading } from "../../animations/SectionHeading";

export default function ExpertiseSlider() {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(
    typeof window !== "undefined" && window.innerWidth < 1280 ? 0 : -1,
  );

  return (
    <section data-header="dark" className="bg-gray py-120 2xl:py-130 overflow-hidden">
      <div className="container">
          {/* Title */}
          <div className="w-full flex items-center justify-center text-center">
            <SectionHeading
              title={coreExpertiseData.title}
              className="mb-[30px] md:mb-50 text-foreground max-w-[35ch]"
            />
          </div>
          {/* Slider */}
          <div className="w-full">
            <Swiper
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              onActiveIndexChange={(swiper) => {
  if (window.innerWidth >= 1280) {
    setActiveIndex(-1);
  } else {
    setActiveIndex(swiper.activeIndex);
  }
}}
              slidesPerView={3.6}
              spaceBetween={25}
              centeredSlides={false}
              slidesOffsetBefore={40}
              slidesOffsetAfter={40}
              breakpoints={{
                0: {
                  slidesPerView: 1.2,
                  spaceBetween: 16,
                },
                480: {
                  slidesPerView: 1.6,
                  spaceBetween: 20,
                },
                640: {
                  slidesPerView: 2.2,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 2.6,
                  spaceBetween: 25,
                  slidesOffsetBefore: 32,
                  slidesOffsetAfter: 32,
                },
                1024: {
                  slidesPerView: 3.2,
                  spaceBetween: 25,
                },
                1580: {
                  slidesPerView: 3.45,
                  spaceBetween: 25,
                },
              }}
              className="!overflow-visible"
            >
              {coreExpertiseData.slides.map((slide, i) => {
                const isActive = i === activeIndex;
                return (
                  <SwiperSlide
                    key={i}
                    onClick={() => swiperRef.current?.slideTo(i)}
                  >
                    <div className="group relative aspect-[3/4] 3xl:aspect-auto 3xl:h-[545px] overflow-hidden cursor-pointer">
                      {/* Image */}
                      <Image
                        src={slide.image}
                        alt={slide.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      {/* Default overlay */}
                      <div
                        className={`absolute inset-0 transition-opacity duration-500 ${
                          isActive ? "opacity-0" : "opacity-100"
                        }`}
                        style={{
                          background:
                            "linear-gradient(180deg, rgba(0,0,0,0) -0.01%, rgba(0,0,0,0.8) 100%)",
                        }}
                      />
                      {/* Active / hover full overlay */}
                      <div
                        className={`absolute inset-0 transition-opacity duration-500 ${
                          isActive
                            ? "opacity-80"
                            : "opacity-0 group-hover:opacity-80"
                        }`}
                        style={{
                          background: "linear-gradient(0deg, #000000, #000000)",
                        }}
                      />
                      {/* Content */}
                      <div className="absolute inset-0 flex flex-col justify-end p-[30px] text-white">
                        {/* Title */}
                        <p className="text-[18px] md:text-25 leading-[1.5] md:leading-[1.4] mb-0 tracking-[-0.02em]">
                          {slide.title}
                        </p>
                        {/* Divider + description */}
                        <div
                          className={`grid transition-all duration-500 ease-out ${
                            isActive
                              ? "grid-rows-[1fr] opacity-100 mt-20"
                              : "grid-rows-[0fr] opacity-0 group-hover:grid-rows-[1fr] group-hover:opacity-100 group-hover:mt-20"
                          }`}
                        >
                          <div className="overflow-hidden">
                            <div
                              className="w-full mb-20"
                              style={{
                                height: "1px",
                                background:
                                  "linear-gradient(90deg, #FFFFFF 49.22%, rgba(255, 255, 255, 0) 100%)",
                              }}
                            />
                            <p className="text-description">
                              {slide.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
          {/* Nav buttons */}
          <div className="flex items-center justify-center gap-3 mt-[30px] md:mt-50">
            <SliderArrowButton
              direction="prev"
              variant="dark"
              onClick={() => swiperRef.current?.slidePrev()}
            />
            <SliderArrowButton
              direction="next"
              variant="dark"
              onClick={() => swiperRef.current?.slideNext()}
            />
          </div>
      </div>
    </section>
  );
}
