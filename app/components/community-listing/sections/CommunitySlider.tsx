"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { motion } from "framer-motion";
import { moveUp } from "@/app/components/motionVariants";
import gsap from "gsap";

const CommunitySlider = ({ images }: { images: string[] }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [bgImage, setBgImage] = useState(images[0]);
  const swiperRef = useRef<SwiperType | null>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  const animateSlideIn = useCallback((index: number) => {
    const el = slideRefs.current[index];
    if (!el) return;
    gsap.killTweensOf(el);
    gsap.fromTo(
      el,
      { scale: 0, opacity: 1, transformOrigin: "center center" },
      { scale: 1, opacity: 1, duration: 1.2, ease: "power3.out" },
    );
  }, []);

  const animateSlideOut = useCallback((index: number) => {
    const el = slideRefs.current[index];
    if (!el) return;
    gsap.killTweensOf(el);
    gsap.set(el, { scale: 0, opacity: 0 });
  }, []);

  const handleSlideChange = useCallback(
    (swiper: SwiperType) => {
      const prev = swiper.previousIndex % images.length;
      const current = swiper.realIndex;
      setBgImage(images[prev]);
      animateSlideOut(prev);
      animateSlideIn(current);
      setActiveIndex(current);
    },
    [animateSlideIn, animateSlideOut, images],
  );

  const handleSwiper = useCallback(
    (swiper: SwiperType) => {
      swiperRef.current = swiper;
      animateSlideIn(0);
    },
    [animateSlideIn],
  );

  return (
    <section className="w-full bg-white border-b border-black/10" data-header="light">
      

      {/* Slider wrapper — all layers stack here */}
      <div className="relative w-full h-[400px] md:h-[680px] 2xl:h-screen">
        {/* z-0 — background image (previous slide) */}
        <div className="absolute inset-0 z-0">
          <Image
            src={bgImage}
            alt="background"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>

        {/* z-10 — swiper slides */}
        <div className="absolute inset-0 z-10">
          <Swiper
            modules={[Autoplay]}
            speed={0}
            loop={true}
            autoplay={{ delay: 4500, disableOnInteraction: false }}
            onSwiper={handleSwiper}
            onSlideChange={handleSlideChange}
            className="w-full h-full"
            allowTouchMove={false}
          >
            {images.map((src, i) => (
              <SwiperSlide key={i} className="relative w-full h-full">
                <div
                  ref={(el) => {
                    slideRefs.current[i] = el;
                  }}
                  className="w-full h-full"
                  style={{
                    transform: "scale(0)",
                    transformOrigin: "center center",
                    willChange: "transform",
                  }}
                >
                  <Image
                    src={src}
                    alt={`Gallery image ${i + 1}`}
                    fill
                    sizes="100vw"
                    className="object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* z-20 — gradient overlay */}
        <div
          className="hidden lg:block absolute inset-0 z-20 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(0, 0, 0, 0) 64.27%, rgba(0, 0, 0, 0.8) 100%)",
          }}
        />

        <div
          className="lg:hidden absolute inset-0 z-20 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(0, 0, 0, 0) 55.27%, rgba(0, 0, 0, 1) 100%)",
          }}
        />

        {/* z-30 — prev button */}
        <motion.div
          variants={moveUp(0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="absolute left-20 lg:left-70 bottom-50 lg:bottom-auto lg:top-1/2 lg:-translate-y-1/2 z-30"
        >
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="w-[62px] group h-[62px] border border-white rounded-[50px] flex items-center justify-center overflow-hidden relative"
          >
            <span className="absolute right-0 top-0 h-full w-0 bg-white/30 transition-all duration-300 group-hover:w-full z-0" />
            <Image
              src="/icons/left_arrow_slider_primary.svg"
              alt="Previous"
              width={28}
              height={28}
              className="relative z-10 object-contain w-[28px] h-[28px] invert brightness-0 group-hover:invert-0 group-hover:brightness-100 transition-all duration-300"
            />
          </button>
        </motion.div>

        {/* z-30 — next button */}
        <motion.div
          variants={moveUp(0.3)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="absolute right-20 lg:right-70 bottom-50 lg:bottom-auto lg:top-1/2 lg:-translate-y-1/2 z-30"
        >
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="w-[62px] group h-[62px] border border-white rounded-[50px] flex items-center justify-center overflow-hidden relative"
          >
            <span className="absolute left-0 top-0 h-full w-0 bg-white/30 transition-all duration-300 group-hover:w-full z-0" />
            <Image
              src="/icons/left_arrow_slider_primary.svg"
              alt="Next"
              width={28}
              height={28}
              className="relative rotate-180 z-10 object-contain w-[28px] h-[28px] invert brightness-0 group-hover:invert-0 group-hover:brightness-100 transition-all duration-300"
            />
          </button>
        </motion.div>

        {/* z-30 — pagination dots */}
        <div className="absolute bottom-130 left-1/2 -translate-x-1/2 z-30 flex items-center justify-center gap-3">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => swiperRef.current?.slideToLoop(i)}
              className={`rounded-full transition-all duration-300 cursor-pointer border border-white ${
                i === activeIndex
                  ? "bg-primary-2 w-[10px] h-[10px]"
                  : "w-[10px] h-[10px]"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommunitySlider;
