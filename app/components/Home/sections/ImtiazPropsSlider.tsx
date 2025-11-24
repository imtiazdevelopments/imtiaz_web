"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import type { Swiper as SwiperType } from "swiper";
import { motion } from "framer-motion";
import { moveUp } from "../../motionVariants";

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
    <section className="make-header-black w-full py-12 md:py-[80px] lg:py-[120px] 2xl:py-[150px] 3xl:py-[170px] bg-white container">
      {/* ================= TITLE ================= */}
      <div className="overflow-hidden">
        <motion.h2
          variants={moveUp(0.35)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-center text-[42px] md:text-[55px] font-[optima] mb-[50px]"
        >
          {data.sectionTitle}
        </motion.h2>
      </div>

      {/* ================= SWIPER ================= */}
      <div className="relative">
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={8}
          slidesPerView={1}
          loop
          autoplay={{
            delay: 3000,
            disableOnInteraction: true,
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
        >
          {data.properties.map((item, idx) => {
            const isActiveMobile = idx === activeSlide;

            return (
              <SwiperSlide key={item.id}>
                <Link href={item.link}>
                  <motion.div
                    variants={moveUp(idx * 0.13)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="relative group h-[520px] md:h-[500px] xl:h-[580px] 3xl:h-[650px] w-full max-w-[424px] mx-auto overflow-hidden cursor-pointer"
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
                        className={`transition-all duration-400 translate-y-25 ${
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
                        className={`text-white text-[22px] md:text-[30px] font-[optima] uppercase mb-[100px] xl:mb-[130px] 2xl:mb-[150px] 3xl:mb-[190px] transition-all duration-600 translate-y-18 ${
                          isActiveMobile
                            ? "!opacity-100 !translate-y-0"
                            : "opacity-0 group-hover:opacity-100 group-hover:translate-y-0"
                        }`}
                      >
                        {item.title}
                      </h3>

                      {/* Read More Btn */}
                      <span
                        className={`inline-block border border-white px-[36px] py-[19.5px] rounded-full font-[avenirRoman] text-[17px] leading-[1] text-white transition-all duration-800 translate-y-6 ${
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
                      className={`absolute bottom-10 left-1/2 -translate-x-1/2 w-full justify-center items-center
      flex px-6 z-[4] text-center text-white
      text-[18px] md:text-[20px] lg:text-[25px] 2xl:text-[27px] 3xl:text-[30px]
      font-[optima] uppercase tracking-wide 
      transition-all duration-500
      ${
        isActiveMobile
          ? "opacity-0 translate-y-3"
          : "group-hover:opacity-0 group-hover:translate-y-3"
      }`}
                    >
                      {item.title}
                    </h4>
                  </motion.div>
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      {/* ================= BOTTOM BUTTONS ================= */}
      <div className="flex items-center justify-center gap-6 mt-10">
        <motion.div
          variants={moveUp(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <Link
            href="/properties"
            className="border border-primary text-[#404040] py-[19.5px] px-[36px] font-[avenirRoman] text-[17px] rounded-full
            hover:bg-primary hover:text-white transition-colors duration-300"
          >
            View All
          </Link>
        </motion.div>

        <motion.div
          variants={moveUp(0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <button
            ref={prevRef}
            className="w-[62px] h-[62px] border border-[#404040] rounded-[50px] flex items-center justify-center cursor-pointer"
          >
            <Image
              src="/icons/left_arrow_slider_primary.svg"
              alt="Arrow Left"
              width={28}
              height={28}
              className="object-contain w-[28px] h-[28px]"
            />
          </button>
        </motion.div>

        <motion.div
          variants={moveUp(0.3)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <button
            ref={nextRef}
            className="w-[62px] h-[62px] border border-[#404040] rounded-[50px] flex items-center justify-center cursor-pointer"
          >
            <Image
              src="/icons/left_arrow_slider_primary.svg"
              alt="Arrow Right"
              width={28}
              height={28}
              className="object-contain rotate-180 w-[28px] h-[28px]"
            />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default ImtiazProperties;
