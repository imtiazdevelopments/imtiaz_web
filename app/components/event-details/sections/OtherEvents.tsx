"use client";

import { useRef,useState } from "react";
import { pressItems } from "../../news/data";
import CustomOutlineButton from "../../common/CustomOutlineButton";
import { moveUp, moveUpV2 } from "../../motionVariants";
import Reveal from "../../animations/RevealOneByOneAnimation";
import { SectionHeading } from "../../animations/SectionHeading";
import { motion } from "framer-motion";
import EventCard from "../../events/sections/EventCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";
import { useParallax } from "@/app/hooks/useParallax"; 
import SliderArrowButton from "../../common/SliderNavigationButton"; 
import Link from "next/link";

const OtherEvents = () => {
    const swiperRef = useRef<SwiperType | null>(null);
      const [activeIndex, setActiveIndex] = useState(0);
        const { ref, parallaxY } = useParallax(15);
  return (
    <section className="pb-120 3xl:pb-160 container" data-header="dark">
      <div className="border-t border-black/10 pt-[70px] md:pt-50">
        <SectionHeading
          title="Other Events"
          className="text-center uppercase"
        />
        <div className="hidden md:block">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-40 mt-20 overflow-hidden">
          {pressItems.slice(0, 2).map((item) => (
            <Reveal key={item.id} variants={moveUpV2}>
              <EventCard item={item} />
            </Reveal>
          ))}
        </div>
        <motion.div
          variants={moveUp(0)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex justify-center mt-50"
        >
          <CustomOutlineButton
            variant="dark"
            text="View All"
            borderColor="border-primary-2"
            textColor="text-foreground-light"
            px="px-[12px] lg:px-[20px] 3xl:px-[36.6px]"
          />
        </motion.div>
           </div>
           <div
        ref={ref}
        className="relative w-full   md:hidden mt-5  "
      >
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
          {pressItems.map((press, i) => (
            <SwiperSlide key={press.id} className="relative w-full h-full">
                 <Reveal variants={moveUpV2} key={press.id}> 
               <EventCard item={press} />
            </Reveal>
            </SwiperSlide>
          ))}
        </Swiper>
         <div className="flex justify-between md:justify-center gap-30 w-full mt-5"> 
           <Link href='/media-center/blog'>
            <CustomOutlineButton
              variant="dark"
              text="View All"
              borderColor="border-primary-2"
              textColor="text-foreground-light"
              px="px-[12px] sm:px-[26px]"
              className="min-w-[139px] md:w-full"
            /></Link>
          
            <div className="flex items-center gap-[15px]">
             <SliderArrowButton
  direction="prev"
  variant="dark"
  onClick={() => swiperRef.current?.slidePrev()}
/>
<SliderArrowButton
  direction="next"
  variant="dark"
  onClick={() => swiperRef.current?.slideNext()}
/>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OtherEvents;
