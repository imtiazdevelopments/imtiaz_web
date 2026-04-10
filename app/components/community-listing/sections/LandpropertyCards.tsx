"use client";

import { LandpropertyData } from "../data";
import ProjectCard from "../../common/ProjectCard";
import { SectionHeading } from "../../animations/SectionHeading";
import type { Swiper as SwiperType } from "swiper";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { motion } from "framer-motion";
import { moveUp } from "@/app/components/motionVariants";
import Image from "next/image";

const LandpropertyCards = () => {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section data-header="dark" className="w-full">
      <div className="container flex flex-col justify-center">

        <div className="text-center">
          <SectionHeading
            title={LandpropertyData.title}
            className="text-heading mb-50"
          />

          {/* 📱 MOBILE: SWIPER */}
          <div className="block md:hidden mobslider relative">
            <Swiper
              modules={[Autoplay, Pagination]}
              loop={true}
              slidesPerView={1}
              spaceBetween={16}
              onSwiper={(swiper) => {
                swiperRef.current = swiper; // ✅ assign here
              }}
              className="pb-5"
            >
              {LandpropertyData.cards.map((project) => (
                <SwiperSlide key={project.id}>
                  <ProjectCard {...project} />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* prev button — z-30 above gradient, pointer-events-auto */}
                    <motion.div
                      variants={moveUp(0.2)}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true }}
                      className="absolute left-20 lg:left-70 bottom-1/2 lg:bottom-auto lg:top-1/2 lg:-translate-y-1/2 z-30 pointer-events-auto"
                    >
                      <button
                        onClick={() => swiperRef.current?.slidePrev()}
                        className="cursor-pointer group lg:w-[50px] lg:h-[50px] 3xl:w-[62px] 3xl:h-[62px] w-[45px] h-[45px] border border-white rounded-[50px] flex items-center justify-center overflow-hidden relative"
                      >
                        <span className="absolute right-0 top-0 h-full w-0 bg-white/30 transition-all duration-300 group-hover:w-full z-0" />
                        <Image
                          src="/icons/left_arrow_slider_primary.svg"
                          alt="Previous"
                          width={28}
                          height={28}
                          className="relative z-10 object-contain 3xl:w-[28px] 3xl:h-[28px] lg:w-[22px] lg:h-[22px] w-[20px] h-[20px] invert brightness-0 group-hover:invert-0 group-hover:brightness-100 transition-all duration-300"
                        />
                      </button>
                    </motion.div>
            
                    {/* next button — z-30 above gradient, pointer-events-auto */}
                    <motion.div
                      variants={moveUp(0.3)}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true }}
                      className="absolute right-20 lg:right-70 bottom-1/2 lg:bottom-auto lg:top-1/2 lg:-translate-y-1/2 z-30 pointer-events-auto"
                    >
                      <button
                        onClick={() => swiperRef.current?.slideNext()}
                        className="cursor-pointer group lg:w-[50px] lg:h-[50px] 3xl:w-[62px] 3xl:h-[62px] w-[45px] h-[45px] border border-white rounded-[50px] flex items-center justify-center overflow-hidden relative"
                      >
                        <span className="absolute left-0 top-0 h-full w-0 bg-white/30 transition-all duration-300 group-hover:w-full z-0" />
                        <Image
                          src="/icons/left_arrow_slider_primary.svg"
                          alt="Next"
                          width={28}
                          height={28}
                          className="relative rotate-180 z-10 object-contain 3xl:w-[28px] 3xl:h-[28px] lg:w-[22px] lg:h-[22px] w-[20px] h-[20px] invert brightness-0 group-hover:invert-0 group-hover:brightness-100 transition-all duration-300"
                        />
                      </button>
                    </motion.div>
          </div>

          {/* 💻 DESKTOP: GRID */}
          <div className="hidden md:grid grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4 gap-5 xl:gap-x-[28px] xl:gap-y-[50px]">
            {LandpropertyData.cards.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default LandpropertyCards;