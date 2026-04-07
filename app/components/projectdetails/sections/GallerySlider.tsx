"use client";

import { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectFade, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import Image from "next/image"; 

// ─── Import Swiper styles in your global CSS instead:
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

// ─── Placeholder slide data — replace src with your actual images ───────────
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
  const [isTransitioning, setIsTransitioning] = useState(false);
  const interiorSwiperRef = useRef<SwiperType | null>(null);
  const exteriorSwiperRef = useRef<SwiperType | null>(null);
  const customPaginationRef = useRef<HTMLDivElement>(null);
  const interiorPrevRef = useRef<HTMLButtonElement>(null);
  const interiorNextRef = useRef<HTMLButtonElement>(null);
  const exteriorPrevRef = useRef<HTMLButtonElement>(null);
  const exteriorNextRef = useRef<HTMLButtonElement>(null);

  const slides = activeTab === "interior" ? INTERIOR_SLIDES : EXTERIOR_SLIDES;

  const handleTabSwitch = (tab: TabType) => {
    if (tab === activeTab || isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveTab(tab);
      setIsTransitioning(false);
    }, 300);
  };

  const isInterior = activeTab === "interior";

  return (
    <>
     

      <section
        className="gallery-slider-root relative w-full overflow-hidden h-[75vh] 2xl:h-screen  bg-[#0e0e0e]" 
      >
        {/* ── Swiper instance — re-mounts on tab change via key ── */}
        <div
          className="absolute inset-0"
          style={{
            opacity: isTransitioning ? 0 : 1,
            transform: isTransitioning ? "scale(1.012)" : "scale(1)",
            transition: "opacity 0.3s ease, transform 0.3s ease",
          }}
        >
          <Swiper
            key={activeTab} // forces remount on tab switch
            modules={[Navigation, Pagination, EffectFade, Autoplay]}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            pagination={{ clickable: true, el: customPaginationRef.current }}
            navigation={{
              prevEl: isInterior ? interiorPrevRef.current : exteriorPrevRef.current,
              nextEl: isInterior ? interiorNextRef.current : exteriorNextRef.current,
            }}
            onBeforeInit={(swiper) => {
              if (isInterior) {
                // @ts-expect-error swiper navigation type
                swiper.params.navigation.prevEl = interiorPrevRef.current;
                // @ts-expect-error swiper navigation type
                swiper.params.navigation.nextEl = interiorNextRef.current;
              } else {
                // @ts-expect-error swiper navigation type
                swiper.params.navigation.prevEl = exteriorPrevRef.current;
                // @ts-expect-error swiper navigation type
                swiper.params.navigation.nextEl = exteriorNextRef.current;
              }
            }}
            onSwiper={(swiper) => {
              if (isInterior) interiorSwiperRef.current = swiper;
              else exteriorSwiperRef.current = swiper;
            }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            loop={slides.length > 1}
            className="gallery-swiper w-full h-full"
            speed={800}
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
                  {/* Vignette overlay */}
                  <div
                    className="absolute inset-0 h-full w-full"
                    style={{
                      background:
                        "radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.45) 100%)",
                    }}
                  />
                  {/* Bottom gradient for controls */}
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
        </div>

        {/* ── Left nav arrow ── */}
       <div className="container relative h-full "> 
         <button
          ref={isInterior ? interiorPrevRef : exteriorPrevRef}
          className="relative lg:w-[50px] lg:h-[50px] 3xl:w-[62px] 3xl:h-[62px] w-[45px] h-[45px] cursor-pointer group rounded-[50px] flex items-center justify-center overflow-hidden border border-white absolute left-6 top-1/2 -translate-y-1/2"
          aria-label="Previous slide"
        >
          <span
                    className={`bg-white/30 absolute top-0 h-full w-0 transition-all duration-300 group-hover:w-full z-0  left-0  bg-white/30"}`}
                  />
          
                  <Image
                    src="/icons/left_arrow_slider_primary.svg"
                    alt="Next"
                    width={28}
                    height={28}
                    className={`relative z-10 object-contain 3xl:w-[28px] 3xl:h-[28px] lg:w-[22px] lg:h-[22px] w-[20px] h-[20px] transition-all duration-300   invert  brightness-0 group-hover:brightness-100 group-hover:invert-0 group-hover:brightness-100`}
                  />
        </button>

        {/* ── Right nav arrow ── */}
        <button
          ref={isInterior ? interiorNextRef : exteriorNextRef}
          className="absolute right-6 top-1/2 -translate-y-1/2 lg:w-[50px] lg:h-[50px] 3xl:w-[62px] 3xl:h-[62px] w-[45px] h-[45px] cursor-pointer group rounded-[50px] flex items-center justify-center overflow-hidden border border-white  "
         aria-label="Next slide"
        >
          <span
                    className={`bg-white/30 absolute top-0 h-full w-0 transition-all duration-300 group-hover:w-full z-0  left-0  bg-white/30"}`}
                  />
          
                  <Image
                    src="/icons/left_arrow_slider_primary.svg"
                    alt="Next"
                    width={28}
                    height={28}
                    className={`relative z-10 object-contain 3xl:w-[28px] 3xl:h-[28px] lg:w-[22px] lg:h-[22px] w-[20px] h-[20px] transition-all duration-300 rotate-180 invert  brightness-0 group-hover:brightness-100 group-hover:invert-0 group-hover:brightness-100`}
                  />
        </button>
       </div>

        {/* ── Bottom controls — tab switcher + pagination ── */}
        <div className="absolute bottom-120 2xl:bottom-[130px] inset-x-0 z-30 flex flex-col items-center gap-5   2xl:gap-[30px]">
          {/* Tab pill */}
          <div className="tab-pill">
            <button
              className={`tab-btn text-25 leading-[1.4] px-5 md:px-[68px] py-3 md:py-[20px]  font-[optima] ${activeTab === "interior" ? "active text-primary bg-white" : "inactive"}`}
              onClick={() => handleTabSwitch("interior")}
            >
              Interior
            </button>
            <button
              className={`tab-btn text-25 leading-[1.4] px-5 md:px-[68px] py-3 md:py-[20px]  font-[optima] ${activeTab === "exterior" ? "active text-primary bg-white" : "inactive"}`}
              onClick={() => handleTabSwitch("exterior")}
            >
              Exterior
            </button>
          </div>

          {/* Pagination bullets — below tab pill */}
          <div
            ref={customPaginationRef}
            className="custom-pagination flex items-center gap-[6px] justify-center"
          />
        </div>
      </section>
    </>
  );
}
