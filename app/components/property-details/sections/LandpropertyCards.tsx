"use client";
import { LandpropertyData } from "../data";
import ProjectCard from "../../common/ProjectCard";
import CustomOutlineButton from "../../common/CustomOutlineButton";
import { SectionHeading } from "../../animations/SectionHeading";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { moveUp, moveUpV2 } from "../../motionVariants";
import { motion } from "framer-motion";
import Reveal from "../../animations/RevealOneByOneAnimation";

const LandpropertyCards = () => {
  return (
    <section className="w-full">
      <div className="container flex flex-col justify-center pt-100 pb-120 3xl:pb-160 border-t border-black/10">
        <div className="text-center">
          <SectionHeading
            title={LandpropertyData.title}
            className="text-heading mb-50"
          />

          <motion.div
            variants={moveUp(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <Swiper
              modules={[Autoplay]}
              spaceBetween={28}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 2 },
                1140: { slidesPerView: 3 },
                1700: { slidesPerView: 4 },
              }}
              loop={false}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
            >
              {LandpropertyData.cards.slice(-4).map((project, i) => (
                <SwiperSlide key={i}>
                  <Reveal variants={moveUpV2} delayRange={i * 0.12}>
                  <ProjectCard {...project} />
                </Reveal>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>

          <motion.div
            variants={moveUp(0.15)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <Link href="/properties">
              <CustomOutlineButton
                text="View All"
                px="px-[12px] lg:px-[20px] 3xl:px-[36px] 3xl:py-[22.5px] mx-auto mt-50"
                borderColor="border-primary"
                textColor="text-foreground-light"
                variant="dark"
              />
            </Link>
          </motion.div>
        </div>
        <div></div>
      </div>
    </section>
  );
};

export default LandpropertyCards;
