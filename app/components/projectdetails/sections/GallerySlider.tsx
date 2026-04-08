"use client";

import { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectFade, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import Image from "next/image";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const INTERIOR_SLIDES = [
  { id: 1, src: "/images/projects/int1.jpg", alt: "Interior – Study Room" },
  { id: 2, src: "/images/projects/int2.jpg", alt: "Interior – Living Room" },
  { id: 3, src: "/images/projects/int3.jpg", alt: "Interior – Master Bedroom" },
];

const EXTERIOR_SLIDES = [
  { id: 1, src: "/images/projects/ext1.jpg", alt: "Exterior – Building Front" },
  { id: 2, src: "/images/projects/ext2.jpg", alt: "Exterior – Pool Deck" },
  { id: 3, src: "/images/projects/ext3.jpg", alt: "Exterior – Garden View" },
];

type TabType = "interior" | "exterior";

export default function GallerySlider() {
  const [activeTab, setActiveTab] = useState<TabType>("interior"); 
  const [mounted, setMounted] = useState(false);

  const swiperRef = useRef<SwiperType | null>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const paginationRef = useRef<HTMLDivElement>(null);

  const slides = activeTab === "interior" ? INTERIOR_SLIDES : EXTERIOR_SLIDES;

  // Mount flag — ensures refs are ready before Swiper initializes
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleTabSwitch = (tab: TabType) => {
  if (tab === activeTab) return;
  setActiveTab(tab);
};

  return (
    <section className="gallery-slider-root relative w-full overflow-hidden h-[75vh] 2xl:h-screen bg-[#0e0e0e]">

      {/* ── Swiper ── */}
      <div
        className="absolute inset-0"
         
      >
        {mounted && (
          <Swiper
            key={activeTab}
            modules={[Navigation, Pagination, EffectFade, Autoplay]}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            pagination={{
              clickable: true,
              el: paginationRef.current,
            }}
            onBeforeInit={(swiper) => {
              // @ts-expect-error swiper navigation type
              swiper.params.navigation.prevEl = prevRef.current;
              // @ts-expect-error swiper navigation type
              swiper.params.navigation.nextEl = nextRef.current;
              // @ts-expect-error swiper pagination type
              swiper.params.pagination.el = paginationRef.current;
            }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
              // Force update navigation & pagination after mount
              swiper.navigation.update();
              swiper.pagination.update();
              swiper.pagination.render();
            }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            loop={slides.length > 1}
            speed={800}
            className="gallery-swiper w-full h-full"
          >
            {slides.map((slide) => (
              <SwiperSlide key={slide.id} className="relative w-full h-full">
                <div className="relative w-full h-full">
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    className="object-cover"
                    priority
                    sizes="100vw"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.45) 100%)",
                    }}
                  />
                  <div
                    className="absolute inset-x-0 bottom-0 h-full"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%)",
                    }}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>

      {/* ── Nav arrows ── */}
      <div className="container relative h-full">
        {/* Prev */}
        <button
          ref={prevRef}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-20 lg:w-[50px] lg:h-[50px] 3xl:w-[62px] 3xl:h-[62px] w-[45px] h-[45px] cursor-pointer group rounded-[50px] flex items-center justify-center overflow-hidden border border-white"
          aria-label="Previous slide"
        >
          <span className="absolute top-0 left-0 h-full w-0 transition-all duration-300 group-hover:w-full z-0 bg-white/30" />
          <Image
            src="/icons/left_arrow_slider_primary.svg"
            alt="Prev"
            width={28}
            height={28}
            className="relative z-10 object-contain 3xl:w-[28px] 3xl:h-[28px] lg:w-[22px] lg:h-[22px] w-[20px] h-[20px] transition-all duration-300 invert brightness-0 group-hover:brightness-100 group-hover:invert-0"
          />
        </button>

        {/* Next */}
        <button
          ref={nextRef}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-20 lg:w-[50px] lg:h-[50px] 3xl:w-[62px] 3xl:h-[62px] w-[45px] h-[45px] cursor-pointer group rounded-[50px] flex items-center justify-center overflow-hidden border border-white"
          aria-label="Next slide"
        >
          <span className="absolute top-0 left-0 h-full w-0 transition-all duration-300 group-hover:w-full z-0 bg-white/30" />
          <Image
            src="/icons/left_arrow_slider_primary.svg"
            alt="Next"
            width={28}
            height={28}
            className="relative z-10 object-contain 3xl:w-[28px] 3xl:h-[28px] lg:w-[22px] lg:h-[22px] w-[20px] h-[20px] transition-all duration-300 rotate-180 invert brightness-0 group-hover:brightness-100 group-hover:invert-0"
          />
        </button>
      </div>

      {/* ── Bottom controls ── */}
      <div className="absolute bottom-120 2xl:bottom-[130px] inset-x-0 z-30 flex flex-col items-center gap-5 2xl:gap-[30px]">

        {/* Tab pill with sliding bg */}
        <div className="relative flex rounded-full border border-white/40 overflow-hidden">
          {/* Sliding white background */}
          <div
            className="absolute top-0 h-full w-1/2 bg-white transition-transform duration-400 ease-in-out rounded-full"
            style={{
              transform:
                activeTab === "interior"
                  ? "translateX(0%)"
                  : "translateX(100%)",
            }}
          />

          <button
            onClick={() => handleTabSwitch("interior")}
            className={`relative z-10 text-25 leading-[1.4] px-5 md:px-[68px] py-3 md:py-[20px] font-[optima] transition-colors duration-300 ${
              activeTab === "interior" ? "text-primary" : "text-white"
            }`}
          >
            Interior
          </button>
          <button
            onClick={() => handleTabSwitch("exterior")}
            className={`relative z-10 text-25 leading-[1.4] px-5 md:px-[68px] py-3 md:py-[20px] font-[optima] transition-colors duration-300 ${
              activeTab === "exterior" ? "text-primary" : "text-white"
            }`}
          >
            Exterior
          </button>
        </div>

        {/* Pagination bullets */}
        <div
          ref={paginationRef}
          className="custom-pagination flex items-center gap-[6px] justify-center"
        />
      </div>
    </section>
  );
}