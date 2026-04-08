"use client";

import { LandpropertyData } from "../data";
import ProjectCard from "../../common/ProjectCard";
import { SectionHeading } from "../../animations/SectionHeading";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const LandpropertyCards = () => {
  return (
    <section className="w-full">
      <div className="container flex flex-col justify-center">

        {/* Header */}
        <div className="text-center">
          <SectionHeading
            title={LandpropertyData.title}
            className="text-heading mb-50"
          />

        {/* 📱 MOBILE: SWIPER */}
        <div className="block md:hidden mobslider">
          <Swiper
            modules={[Autoplay, Pagination]} 
            loop={true}
            slidesPerView={1}
            spaceBetween={16}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            className="pb-5"
               pagination={{ clickable: true }} 
          >
            {LandpropertyData.cards.map((project) => (
              <SwiperSlide key={project.id}>
                <ProjectCard {...project} />
              </SwiperSlide>
            ))}
          </Swiper>
           
        </div>

        {/* 💻 DESKTOP: GRID (UNCHANGED) */}
        <div className="hidden md:grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 xl:gap-x-[28px] xl:gap-y-[50px]">
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