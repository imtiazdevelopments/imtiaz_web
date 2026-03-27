"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";
import { Blog } from "../data";
import CustomOutlineButton from "@/app/components/common/CustomOutlineButton";

const LatestBlogSlider = ({ blogs }: { blogs: Blog[] }) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

const formatted = (date: string) => {
  const d = new Date(date);

  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();

  return `${month}-${day}-${year}`;
};

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
          {blogs.map((blog, i) => (
            <SwiperSlide key={blog.id} className="relative w-full h-full">
              <Image
                src={blog.image}
                alt={blog.title}
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
              <div className="absolute top-50 3xl:top-[55px] left-1/2 -translate-x-1/2">
                <span className="text-19 leading-[100%] text-white font-[avenirHeavy] font-[800] px-6 py-1 uppercase bg-[#FFFFFF3D] backdrop-blur-[30px] rounded-full">
                  Latest Blog
                </span>
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-end py-50 px-20 sm:px-40 md:px-50 text-center">
                <p className="text-white/80 text-description mb-20 capitalize">
                  {blog.category} · {formatted(blog.date)}
                </p>
                <h2 className="text-heading text-white max-w-[1000px] mb-20 line-clamp-2">
                  {blog.title}
                </h2>
                <Link href={`/media-center/${blog.slug}`}>
                <CustomOutlineButton text="Read More"  borderColor="border-white/90" px="px-[26px] lg:px-[37px]" />
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* ✅ Custom dots — completely outside Swiper */}
      <div className="flex items-center justify-center gap-3 mt-20">
        {blogs.map((_, i) => (
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

export default LatestBlogSlider;