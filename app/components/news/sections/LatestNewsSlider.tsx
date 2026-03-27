"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";
import { PressItem } from "../data";
import CustomOutlineButton from "@/app/components/common/CustomOutlineButton";

const LatestNewsSlider = ({ news }: { news: PressItem[] }) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const formatted = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });

  return (
    <div className="relative w-full">
      {/* Swiper */}
      <div className="relative w-full h-[360px] md:h-[540px] lg:h-[600px] 2xl:h-[650px] 3xl:h-[763px]">
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          className="w-full h-full"
        >
          {news.map((item, i) => (
            <SwiperSlide key={item.id} className="relative w-full h-full">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
                priority={i === 0}
              />
              <div
                className="hidden md:block absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(0, 0, 0, 0) 32.99%, #000000 104.8%)",
                }}
              />
              <div
                className="block md:hidden absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(0, 0, 0, 0) 20.99%, #000000 104.8%)",
                }}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-end py-50 px-20 sm:px-40 md:px-50 text-center">
                <p className="text-white/80 text-description mb-20">
                  {item.category} · {formatted(item.date)}
                </p>
                <h2 className="text-heading text-white max-w-[1638px] mb-20 line-clamp-2 lg:line-clamp-3">
                  {item.title}
                </h2>
                <Link href={`/media-center/${item.slug}`}>
                <CustomOutlineButton text="Read More"  borderColor="border-white/90" px="px-[26px] md:px-[37px]" />
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
 
      {/* Pagination */}
      <div className="flex items-center justify-center gap-3 mt-20">
        {news.map((_, i) => (
          <button
            key={i}
            onClick={() => swiperRef.current?.slideToLoop(i)}
            className={`rounded-full transition-all duration-300 cursor-pointer ${
              activeIndex === i
                ? "bg-primary w-[10px] h-[10px]"
                : "bg-white border border-[#404040] w-[10px] h-[10px]"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default LatestNewsSlider;