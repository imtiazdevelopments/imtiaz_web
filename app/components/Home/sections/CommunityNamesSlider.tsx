"use client";

import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Autoplay, Navigation } from "swiper/modules";
import Image from "next/image";

import { motion, useInView } from "framer-motion";
import { textFade, moveUp } from "../../motionVariants";

import "swiper/css";
import "swiper/css/pagination";

import { cubicBezier } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------
   Types for new data
------------------------------- */
export type Community = {
  id: string | number;
  name: string;
  bgImage: string;
  link?: string;
};

export type CommunitySection = {
  heading: string;
  communities: Community[];
};

/* ------------------------------
   Component
------------------------------- */
export default function HeroFeatureSlider({
  slides,
}: {
  slides: CommunitySection;
}) {
  const { heading, communities = [] } = slides || {};

  const initialActive = communities?.[1] ? 1 : 0;

  const [activeFeat, setActiveFeat] = useState<number>(initialActive);
  const [swiper, setSwiper] = useState<SwiperType | null>(null);

  /* Background fade logic */
  const [bgBase, setBgBase] = useState<string | null>(
    communities?.[initialActive]?.bgImage ?? communities?.[0]?.bgImage ?? null
  );
  const [prevBg, setPrevBg] = useState<string | null>(null);

  const bgRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  const preloadImage = (src: string) =>
    new Promise<void>((resolve) => {
      const img = new window.Image();
      img.src = src;
      img.onload = () => resolve();
      img.onerror = () => resolve();
    });

  const switchBg = async (bg: string) => {
    if (!bg) return;
    await preloadImage(bg);
    setPrevBg(bgBase);
    setBgBase(bg);
  };

  const isHalfInView = useInView(sectionRef, {
    margin: "-70% 0px -70% 0px",
    once: true,
  });

  const featureItem = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const dropWrapper = {
    hidden: { opacity: 0, y: -60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: cubicBezier(0.16, 1, 0.3, 1),
      },
    },
  };

  const initGSAP = () => {
    if (!bgRef.current || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        bgRef.current,
        { y: "-25vh" },
        {
          y: "25vh",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            scrub: true,
            start: "top bottom",
            end: "bottom top",
          },
        }
      );
    });

    ScrollTrigger.refresh();
    return () => ctx.revert();
  };

  useEffect(() => {
    const listener = () => initGSAP();
    window.addEventListener("homeAnimationsReady", listener);
    initGSAP();
    return () => window.removeEventListener("homeAnimationsReady", listener);
  }, []);

  const handleMouseLeave = () => {
    const current = communities[activeFeat] ?? communities[0];
    if (current?.bgImage) switchBg(current.bgImage);
  };

  useEffect(() => {
    if (!swiper) return;
    if (!prevRef.current || !nextRef.current) return;

    if (
      swiper.params.navigation &&
      typeof swiper.params.navigation !== "boolean"
    ) {
      swiper.params.navigation.prevEl = prevRef.current;
      swiper.params.navigation.nextEl = nextRef.current;
    }

    swiper.navigation.update();
  }, [swiper, prevRef.current, nextRef.current]);

  return (
    <section
      ref={sectionRef}
      className="w-full relative overflow-hidden h-screen"
    >
      {/* Nav Buttons */}
      <div className="absolute w-full z-50 inset-0 flex justify-between top-1/2 -translate-y-1/2 mx-auto container items-center">
        <div>
          {/* Prev Button */}
          <motion.div
            variants={moveUp(0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <button
              ref={prevRef}
              className="relative w-[62px] group h-[62px] border border-white rounded-[50px] flex items-center justify-center overflow-hidden"
            >
              <span className="absolute right-0 top-0 h-full w-0 bg-white/30 transition-all duration-300 group-hover:w-full z-0" />
              <Image
                src="/icons/left_arrow_slider_primary.svg"
                alt="Previous"
                width={28}
                height={28}
                className="relative z-10 object-contain w-[28px] h-[28px] invert brightness-0 group-hover:invert-0 group-hover:brightness-100 transition-all duration-300"
              />
            </button>
          </motion.div>
        </div>
        <div>
          {/* NEXT BUTTON */}
          <motion.div
            variants={moveUp(0.3)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <button
              ref={nextRef}
              className="relative w-[62px] group h-[62px] border border-white rounded-[50px] flex items-center justify-center overflow-hidden"
            >
              <span className="absolute left-0 top-0 h-full w-0 bg-white/30 transition-all duration-300 group-hover:w-full z-0" />
              <Image
                src="/icons/left_arrow_slider_primary.svg"
                alt="Next"
                width={28}
                height={28}
                className="relative rotate-180 z-10 object-contain w-[28px] h-[28px] invert brightness-0 group-hover:invert-0 group-hover:brightness-100 transition-all duration-300"
              />
            </button>
          </motion.div>
        </div>
      </div>
      {/* Background */}
      <div
        ref={bgRef}
        className="absolute w-full h-full inset-0 -z-20 overflow-hidden"
      >
        {prevBg && (
          <motion.div
            key={`prev-${prevBg}`}
            initial={{ opacity: 1, filter: "blur(0px)" }}
            animate={{ opacity: 0, filter: "blur(1px)" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full bg-cover bg-center scale-[1.2]"
            style={{ backgroundImage: `url('${prevBg}')` }}
          />
        )}
        {bgBase && (
          <motion.div
            key={`base-${bgBase}`}
            initial={{ opacity: 0, filter: "blur(1px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full bg-cover bg-center scale-[1.2]"
            style={{ backgroundImage: `url('${bgBase}')` }}
          />
        )}
      </div>

      {/* Top overlay */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 100%)",
        }}
      />

      {/* Heading */}
      <div className="container pt-14 md:pt-20 lg:pt-24 2xl:pt-32 relative z-10">
        <motion.div className="flex items-center justify-center relative">
          <motion.div
            className=" max-w-[1150px] w-full text center"
            variants={dropWrapper}
            initial="hidden"
            whileInView="visible"
          >
            <div className="overflow-hidden text-center">
              <motion.h1
                key={`title-communities`}
                variants={textFade}
                // custom={0.25}
                custom={0.7}
                initial="initial"
                whileInView="animate"
                animate={isHalfInView ? "animate" : "initial"}
                viewport={{ once: true }}
                className="text-white font-[optima] text-[36px] md:text-[58px] lg:text-[60px] 2xl:text-[70px] leading-none"
              >
                {heading}
              </motion.h1>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Swiper Feature Cards */}
      <div
        className="absolute bottom-0 w-full z-20"
        onMouseLeave={handleMouseLeave}
      >
        <Swiper
          modules={[Autoplay, Navigation]}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          slidesPerView={4}
          loop={true}
          speed={600}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 3 },
            1024: { slidesPerView: 5 },
          }}
          onSwiper={setSwiper}
          onSlideChange={(s) => {
            const idx = s.realIndex;
            setActiveFeat(idx);
            switchBg(communities[idx]?.bgImage);
          }}
          className="w-full"
        >
          {communities.map((c, i) => {
            const active = activeFeat === i;

            return (
              <SwiperSlide key={c.id}>
                <div className="relative flex flex-1">
                  <motion.div
                    className="relative flex-1 min-h-[360px] md:min-h-[420px] 3xl:h-[500px] flex justify-center items-end px-4 cursor-pointer"
                    onMouseEnter={() => {
                      setActiveFeat(i);
                      switchBg(c.bgImage);
                    }}
                    // variants={featureItem}
                    variants={moveUp(i * 0.3)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: false, amount: 0.3 }}
                  >
                    <div
                      className={`absolute inset-0 transition-opacity duration-400 ${
                        active ? "opacity-100" : "opacity-0"
                      }`}
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(0,0,0,0) 7.68%, rgba(0,0,0,0.66) 100%)",
                      }}
                    />
                    <div className="relative z-20 w-full flex justify-center pointer-events-none">
                      <div className="flex flex-col items-center absolute bottom-10 lg:bottom-15 xl:bottom-22 3xl:bottom-[100px]">
                        <motion.h3
                          key={`feat-title-${i}-${active}`}
                          initial={{ opacity: 0, y: 40 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.5,
                            ease: [0.25, 0.1, 0.25, 1],
                            delay: i * 0.2,
                          }}
                          className="text-white font-[optima] uppercase text-center text-[22px] md:text-[25px] xl:text-[30px] px-4"
                        >
                          {c.name}
                        </motion.h3>

                        <motion.div
                          initial={{ opacity: 0, y: 30 }}
                          animate={{
                            opacity: active ? 1 : 0,
                            y: active ? 0 : 30,
                            marginTop: active ? "var(--gap-active)" : "0px",
                          }}
                          transition={{
                            duration: 0.75,
                            ease: [0.25, 0.1, 0.25, 1],
                          }}
                          style={
                            {
                              ["--gap-active"]: "50px",
                            } as unknown as React.CSSProperties
                          }
                          className={`${
                            active
                              ? "pointer-events-auto"
                              : "pointer-events-none absolute"
                          } gap-responsive`}
                        >
                          <button
                            className="inline-block border border-white px-[23px] py-[19.5px] rounded-[50px] text-white text-17"
                            onClick={() =>
                              c.link && (window.location.href = c.link)
                            }
                          >
                            Read More
                          </button>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>

                  <div
                    className="hidden lg:block absolute top-0 right-0 h-full w-[1px]"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.5) 100%)",
                    }}
                  />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
}
