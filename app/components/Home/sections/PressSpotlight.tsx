"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";

import { motion, AnimatePresence } from "framer-motion";
import { moveUp } from "../../motionVariants";

import type { Swiper as SwiperType } from "swiper";

export type PressItem = {
  id: number;
  date: string;
  title: string;
  image: string;
  link: string;
};

type PressSpotlightProps = {
  data: {
    sectionTitle: string;
    items: PressItem[];
  };
};

const PressSpotlight = ({ data }: PressSpotlightProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  return (
    <section className="w-full py-[80px] md:py-[120px] lg:py-[150px] 2xl:py-[170px] bg-white container overflow-hidden">
      {/* MAIN SWIPER */}
      <Swiper
        modules={[EffectFade, Autoplay]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        slidesPerView={1}
        speed={600}
        onSwiper={setSwiperInstance}
        onSlideChange={(s) => setActiveIndex(s.realIndex)}
        className="w-full"
      >
        {data.items.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="grid grid-cols-1 xl:grid-cols-2 place-items-center gap-10 3xl:gap-0">
              {/* LEFT SECTION */}
              <div className="flex flex-col items-center">
                <motion.h2
                  variants={moveUp(0)}
                  initial="hidden"
                  animate="show"
                  className="text-[38px] md:text-[70px] font-[optima] uppercase pb-[70px] 2xl:pb-[90px]"
                >
                  {data.sectionTitle}
                </motion.h2>

                {/* ⭐ TEXT + BUTTON + DOTS animate on EVERY slide */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    className="flex flex-col items-center"
                  >
                    {/* Date */}
                    <motion.p
                      variants={moveUp(0.1)}
                      className="text-[17px] font-[avenirRoman] text-[#404040] pb-[30px]"
                    >
                      {item.date}
                    </motion.p>

                    {/* Title */}
                    <motion.h3
                      variants={moveUp(0.2)}
                      className="text-[22px] md:text-[30px] font-[optima] text-center leading-[1.15] uppercase max-w-[28ch] xl:max-w-[36ch] pb-[30px] xl:pb-[50px]"
                    >
                      {item.title}
                    </motion.h3>

                    {/* Button */}
                    <motion.div variants={moveUp(0.3)} className="mb-[20px]">
                      <Link
                        href={item.link}
                        className="flex items-center justify-center text-primary hover:text-white group hover:bg-primary p-2 rounded-full transition-colors"
                      >
                        <Image
                          src="/icons/left_arrow_slider_primary.svg"
                          alt="next"
                          width={28}
                          height={28}
                          className="rotate-180 w-[28px] h-[28px] group-hover:invert group-hover:brightness-0"
                        />
                      </Link>
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
                {/* Pagination */}
                <motion.div
                  variants={moveUp(0.4)}
                  initial="hidden"
                  whileInView="show"
                  exit="hidden"
                  viewport={{ amount: 0.1, once: true }}
                  className="flex gap-3 mt-10 3xl:mt-20"
                >
                  {data.items.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => swiperInstance?.slideTo(idx)}
                      className={`w-[10px] h-[10px] rounded-full transition-all ${
                        activeIndex === idx
                          ? "bg-primary"
                          : "bg-white border border-[#404040]"
                      }`}
                    />
                  ))}
                </motion.div>
              </div>

              {/* RIGHT IMAGE */}
              <div className="relative w-full 3xl:w-[858px] h-[420px] md:h-[520px] lg:h-[600px] 2xl:h-[600px] 3xl:h-[680px]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* VIEW ALL */}
      <div className="flex justify-center mt-[50px]">
        <Link
          href="/press"
          className="border border-primary text-primary px-[36px] py-[19.5px] rounded-full font-[avenirRoman] text-[17px] hover:bg-primary hover:text-white transition-colors"
        >
          View All
        </Link>
      </div>
    </section>
  );
};

export default PressSpotlight;
