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
import Image from "next/image";
import { useRef, useState } from "react";
import type { Swiper as SwiperType } from "swiper";

const LandpropertyCards = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [slidesPerView, setSlidesPerView] = useState(1);

  const totalSlides = LandpropertyData.cards.slice(-4).length;
  const showNav = totalSlides > slidesPerView;
  return (
    <section className="w-full">
      <div className="container flex flex-col justify-center md:pt-100 pb-[70px] lg:pb-120 3xl:pb-160 md:border-t md:border-black/10">
        <div className="text-center">
          <SectionHeading
            title={LandpropertyData.title}
            className="text-heading mb-[20px] md:mb-50"
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
              loop={true}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              onSwiper={(s) => {
                swiperRef.current = s;
                setSlidesPerView(
                  Math.round(s.params.slidesPerView as number) || 1,
                );
              }}
              onBreakpoint={(s) =>
                setSlidesPerView(
                  Math.round(s.params.slidesPerView as number) || 1,
                )
              }
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

          {/* BOTTOM BUTTONS */}
          <div className="flex items-center justify-between md:justify-center mt-[20px] sm:mt-50">
            <motion.div
              variants={moveUp(0.1)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <Link href="/properties">
                <CustomOutlineButton
                  text="View All"
                  variant="dark"
                  borderColor="border-primary"
                  textColor="text-foreground-light"
                  px="px-[30px] sm:px-[26px] xl:px-[37px] h-[50px] sm:h-[66px]"
                />
              </Link>
            </motion.div>
            {showNav && (
              <div className="flex gap-[15px] ml-[30px]">
                <motion.div
                  variants={moveUp(0.16)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                >
                  <button
                    onClick={() => swiperRef.current?.slidePrev()}
                    className="relative cursor-pointer w-[50px] h-[50px] 3xl:w-[62px] 3xl:h-[62px] group  border border-[#404040] rounded-[50px] flex items-center justify-center overflow-hidden"
                  >
                    {/* FILL ANIMATION */}
                    <span className="absolute right-0 top-0 h-full w-0 bg-primary transition-all duration-300 group-hover:w-full z-0" />
                    {/* ICON */}
                    <Image
                      src="/icons/left_arrow_slider_primary.svg"
                      alt="Arrow Right"
                      width={28}
                      height={28}
                      className="relative z-10  object-contain 3xl:w-[28px] 3xl:h-[28px] lg:w-[22px] lg:h-[22px] w-[21px] h-[21px] group-hover:invert group-hover:brightness-0 transition-colors duration-300"
                    />
                  </button>
                </motion.div>
                <motion.div
                  variants={moveUp(0.22)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                >
                  <button
                    onClick={() => swiperRef.current?.slideNext()}
                    className="relative cursor-pointer w-[50px] h-[50px] 3xl:w-[62px] 3xl:h-[62px] group  border border-[#404040] rounded-[50px] flex items-center justify-center overflow-hidden"
                  >
                    {/* FILL ANIMATION */}
                    <span className="absolute left-0 top-0 h-full w-0 bg-primary transition-all duration-300 group-hover:w-full z-0" />
                    {/* ICON */}
                    <Image
                      src="/icons/left_arrow_slider_primary.svg"
                      alt="Arrow Right"
                      width={28}
                      height={28}
                      className="relative z-10 rotate-180 object-contain 3xl:w-[28px] 3xl:h-[28px] lg:w-[22px] lg:h-[22px] w-[20px] h-[20px] group-hover:invert group-hover:brightness-0 transition-colors duration-300"
                    />
                  </button>
                </motion.div>
              </div>
            )}
          </div>
        </div>
        <div></div>
      </div>
    </section>
  );
};

export default LandpropertyCards;
