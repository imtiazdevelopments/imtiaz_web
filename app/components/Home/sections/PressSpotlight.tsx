"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, EffectFade, Controller, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { motion } from "framer-motion";
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
  const [textSwiper, setTextSwiper] = useState<SwiperType | null>(null);
  const [imageSwiper, setImageSwiper] = useState<SwiperType | null>(null);

  // Sync two swipers
  if (textSwiper && imageSwiper) {
    textSwiper.controller.control = imageSwiper;
    imageSwiper.controller.control = textSwiper;
  }

  return (
    <section className="w-full py-[80px] md:py-[120px] lg:py-[150px] 2xl:py-[170px] bg-white container pressspotlight-pagination overflow-hidden">
      <div className="grid grid-cols-1 xl:grid-cols-2 place-items-center gap-10 xl:gap-0">
        {/* LEFT SECTION */}
        <div className="flex flex-col items-center justify-center relative ">
          {/* STATIC HEADING */}
          <h2 className="text-[38px] md:text-[70px] font-[optima] uppercase pb-[70px] 2xl:pb-[90px]">
            {data.sectionTitle}
          </h2>

          {/* ================= TEXT SWIPER ================= */}
          <Swiper
            modules={[Pagination, Controller, Autoplay]}
            fadeEffect={{ crossFade: true }}
            slidesPerView={1}
            loop
            onSwiper={setTextSwiper}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            pagination={{
              clickable: true,
            }}
          >
            {data.items.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="flex flex-col items-center">
                  {/* Date */}
                  <motion.p
                    variants={moveUp(0.1)}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    className="text-[17px] font-[avenirRoman] text-[#404040] pb-[30px]"
                  >
                    {item.date}
                  </motion.p>

                  {/* Title */}
                  <motion.h3
                    variants={moveUp(0.2)}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    className="text-[22px] md:text-[30px] font-[optima] text-center leading-[1.15] uppercase max-w-[28ch] xl:max-w-[36ch] pb-[30px] xl:pb-[50px]"
                  >
                    {item.title}
                  </motion.h3>

                  {/* Button */}
                  <motion.div
                    variants={moveUp(0.3)}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                  >
                    <Link
                      href={item.link}
                      className="flex items-center justify-center mb-[50px] xl:mb-[80px] text-primary hover:text-white group hover:bg-primary p-2 transition-colors rounded-full"
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
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* ================= RIGHT IMAGE SWIPER ================= */}
        <div className="relative w-full lg:w-[858px] h-[420px] md:h-[520px] lg:h-[600px] 2xl:h-[600px] 3xl:h-[680px]">
          <Swiper
            modules={[EffectFade, Controller, Autoplay]}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            slidesPerView={1}
            loop
            allowTouchMove={true}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            onSwiper={setImageSwiper}
            className="w-full h-full"
          >
            {data.items.map((item) => (
              <SwiperSlide key={item.id}>
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

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
