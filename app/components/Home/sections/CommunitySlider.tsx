"use client";

import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectFade } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import Image from "next/image";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

type Props = {
  slides: Slide[];
};

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
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);

  // Default active = 2nd feature (index 1)
  const [activeFeatureIndex, setActiveFeatureIndex] = useState<number>(1);

  const [hoveredBg, setHoveredBg] = useState<string | null>(null);

  const getDefaultBg = () =>
    slides[activeSlideIndex]?.features[1]?.bgImage ?? "";

  return (
    <section className="w-full relative overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        slidesPerView={1}
        speed={700}
        loop
        onSwiper={(s: SwiperType) => setSwiper(s)}
        onSlideChange={(s: SwiperType) => {
          setActiveSlideIndex(s.realIndex);
          setActiveFeatureIndex(1); // reset default active
          setHoveredBg(null); // reset bg
        }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(s) => {
          const nav = s.params.navigation;

          // Narrow the type
          if (nav && typeof nav !== "boolean") {
            nav.prevEl = prevRef.current;
            nav.nextEl = nextRef.current;
          }
        }}
        pagination={{
          el: ".hero-pagination",
          clickable: true,
        }}
        className="w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full min-h-[520px] md:min-h-[680px]">
              {/* ---- BACKGROUND ---- */}
              <div
                className="absolute inset-0 bg-cover bg-center -z-20 transition-all duration-500"
                style={{
                  backgroundImage: `url('${hoveredBg ?? getDefaultBg()}')`,
                }}
              />

              <div
                className="absolute inset-0 -z-10"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 100%)",
                }}
              />

              {/* ---- PILL HEADER ---- */}
              <div className="container mx-auto px-4 pt-24 md:pt-32 lg:pt-36 2xl:pt-[100px]">
                <div className="flex items-center justify-center relative">
                  {/* Left Arrow */}
                  <button
                    ref={prevRef}
                    className="absolute left-0 -translate-x-6 top-1/2 -mt-6 w-10 h-10 z-20 flex items-center justify-center"
                  >
                    <Image
                      src="/icons/left_slider_arrow.svg"
                      width={35}
                      height={35}
                      className="w-[35px] h-[35px] opacity-80"
                      alt="Previous"
                    />
                  </button>

                  {/* Pill */}
                  <div className="px-8 md:px-16 py-6 rounded-[999px] text-center backdrop-blur-[30px] bg-[#00000033] max-w-[1100px] w-full">
                    <h1 className="text-white font-[optima] text-[28px] md:text-[44px] lg:text-[54px] leading-tight">
                      {slide.title}
                    </h1>
                    {slide.subtitle && (
                      <p className="text-white/90 mt-3 max-w-[70ch] mx-auto text-sm md:text-base">
                        {slide.subtitle}
                      </p>
                    )}
                  </div>

                  {/* Right Arrow */}
                  <button
                    ref={nextRef}
                    className="absolute right-0 translate-x-6 top-1/2 -mt-6 w-10 h-10 z-20 flex items-center justify-center"
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

                {/* Pagination */}
                <div className="mt-6">
                  <div className="hero-pagination flex items-center gap-3 justify-center md:justify-start" />
                </div>
              </div>

              {/* ---- FEATURES ---- */}
              <div className="mt-[26px]">
                <div className="grid grid-cols-2 lg:grid-cols-4 rounded overflow-hidden relative">
                  {slide.features.map((feat, i) => {
                    const isActive = activeFeatureIndex === i;

                    return (
                      <div key={feat.id} className="relative flex flex-1">
                        <div
                          className="relative flex-1 min-h-[360px] md:min-h-[420px] 3xl:h-[618px]
                            flex justify-center items-end p-6 md:p-10 group transition-all"
                          onMouseEnter={() => {
                            setActiveFeatureIndex(i);
                            setHoveredBg(feat.bgImage);
                          }}
                          onMouseLeave={() => {
                            setActiveFeatureIndex(1);
                            setHoveredBg(null);
                          }}
                        >
                          {/* ACTIVE GRADIENT */}
                          <div
                            className={`absolute inset-0 pointer-events-none transition-opacity duration-400
                              ${isActive ? "opacity-100" : "opacity-0"}
                            `}
                            style={{
                              background:
                                "linear-gradient(180deg, rgba(0,0,0,0) 7.68%, rgba(0,0,0,0.66) 100%)",
                            }}
                          />

                          {/* Content */}
                          <div
                            className={`relative z-20 w-full flex flex-col items-center transition-all duration-300
                              ${
                                isActive
                                  ? "-translate-y-20 3xl:-translate-y-50 opacity-100"
                                  : "opacity-70"
                              }
                            `}
                          >
                            <h3 className="text-white font-[optima] text-[20px] md:text-[22px] uppercase text-center">
                              {feat.title}
                            </h3>

                            <div
                              className={`mt-4 transition-opacity duration-300 
                                ${isActive ? "opacity-100" : "opacity-0"}
                              `}
                            >
                              <a
                                href={feat.link ?? "#"}
                                className="inline-block border border-white px-5 py-2 rounded-full 
                                  text-white text-sm hover:bg-white/10 transition"
                              >
                                Read More
                              </a>
                            </div>
                          </div>
                        </div>

                        {/* Divider */}
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
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
