"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import type { Swiper as SwiperType } from "swiper";

type ImtiazPropertiesData = {
  data: {
    sectionTitle: string;
    properties: {
      id: number;
      title: string;
      image: string;
      link: string;
      logo: string;
    }[];
  };
};

const ImtiazProperties = ({ data }: ImtiazPropertiesData) => {
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);
  const swiperRef = useRef<SwiperType | null>(null);

  const [activeSlide, setActiveSlide] = useState<number>(1);

  return (
    <section className="w-full py-[80px] bg-white container">
      {/* ================= TITLE ================= */}
      <h2 className="text-center text-[42px] md:text-[55px] font-[optima] mb-[50px]">
        {data.sectionTitle}
      </h2>

      {/* ================= SWIPER ================= */}
      <div className="relative">
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={8}
          slidesPerView={1}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper: SwiperType) => {
            swiper.params.navigation = {
              ...(swiper.params.navigation as object),
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            };
          }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          className="w-full"
        >
          {data.properties.map((item, idx) => {
            const isActiveMobile = idx === activeSlide;

            return (
              <SwiperSlide key={item.id}>
                <Link href={item.link}>
                  <div
                    className="relative group h-[520px] md:h-[600px] 3xl:h-[650px] w-full max-w-[424px] mx-auto overflow-hidden cursor-pointer"
                    onMouseEnter={() => swiperRef.current?.autoplay.stop()}
                    onMouseLeave={() => swiperRef.current?.autoplay.start()}
                  >
                    {/* Background Image */}
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* DEFAULT GRADIENT */}
                    <div
                      className={`absolute inset-0 z-[2] transition-all duration-500 ${
                        isActiveMobile ? "opacity-0" : "group-hover:opacity-0"
                      }`}
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(0,0,0,0) 47.23%, rgba(0,0,0,0.7) 100%)",
                      }}
                    />

                    {/* HOVER GRADIENT */}
                    <div
                      className={`absolute inset-0 z-[3] transition-opacity duration-500 ${
                        isActiveMobile
                          ? "opacity-100"
                          : "opacity-0 group-hover:opacity-100"
                      }`}
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.7) 100%)",
                      }}
                    />

                    {/* ================= HOVER CONTENT ================= */}
                    <div className="absolute inset-0 z-[5] flex flex-col items-center justify-center text-center px-[50px]">
                      {/* Logo */}
                      <div
                        className={`transition-all duration-500 translate-y-18 ${
                          isActiveMobile
                            ? "!opacity-100 !translate-y-0"
                            : "opacity-0 group-hover:opacity-100 group-hover:translate-y-0"
                        } mb-[50px]`}
                      >
                        <Image
                          src={item.logo}
                          alt="Project Logo"
                          width={207}
                          height={50}
                          className="object-contain"
                        />
                      </div>

                      {/* Title */}
                      <h3
                        className={`text-white text-[22px] md:text-[30px] font-[optima] uppercase mb-[190px] transition-all duration-500 translate-y-12 ${
                          isActiveMobile
                            ? "!opacity-100 !translate-y-0"
                            : "opacity-0 group-hover:opacity-100 group-hover:translate-y-0"
                        }`}
                      >
                        {item.title}
                      </h3>

                      {/* Read More Btn */}
                      <span
                        className={`inline-block border border-white px-6 py-2 rounded-full text-[14px] tracking-wide text-white transition-all duration-500 translate-y-6 ${
                          isActiveMobile
                            ? "!opacity-100 !translate-y-0"
                            : "opacity-0 group-hover:opacity-100 group-hover:translate-y-0"
                        }`}
                      >
                        Read More
                      </span>
                    </div>

                    {/* ================= DEFAULT BOTTOM TITLE ================= */}
                    <h4
                      className={`absolute bottom-5 left-1/2 -translate-x-1/2 z-[4] 
                          text-center text-white text-[18px] md:text-[20px]
                          font-[optima] uppercase tracking-wide transition-all duration-500 ${
                            isActiveMobile
                              ? "opacity-0 translate-y-3"
                              : "group-hover:opacity-0 group-hover:translate-y-3"
                          }`}
                    >
                      {item.title}
                    </h4>
                  </div>
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      {/* ================= BOTTOM BUTTONS ================= */}
      <div className="flex items-center justify-center gap-6 mt-10">
        <Link
          href="/properties"
          className="border border-[#7A253A] text-[#7A253A] py-2 px-6 rounded-full 
          hover:bg-[#7A253A] hover:text-white transition-colors duration-300"
        >
          View All
        </Link>

        <button
          ref={prevRef}
          className="w-[36px] h-[36px] border border-gray-400 rounded-full flex items-center justify-center hover:bg-gray-200"
        >
          <span className="text-xl text-gray-700">{`<`}</span>
        </button>

        <button
          ref={nextRef}
          className="w-[36px] h-[36px] border border-gray-400 rounded-full flex items-center justify-center hover:bg-gray-200"
        >
          <span className="text-xl text-gray-700">{`>`}</span>
        </button>
      </div>
    </section>
  );
};

export default ImtiazProperties;
