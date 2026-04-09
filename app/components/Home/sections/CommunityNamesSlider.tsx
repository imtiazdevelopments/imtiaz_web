"use client";

import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Autoplay, Navigation } from "swiper/modules";
import Image from "next/image";

import CustomOutlineButton from "../../common/CustomOutlineButton";
import { motion, useInView } from "framer-motion";
import { textFade, moveUp, moveUpV2 } from "../../motionVariants";

import "swiper/css";
import "swiper/css/pagination";

import { cubicBezier } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "../../animations/RevealOneByOneAnimation";

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

  // const featureItem = {
  //   initial: { opacity: 0, y: 20 },
  //   animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  // };

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
      className="w-full relative overflow-hidden h-[82vh] lg:h-[85vh] xl:h-screen z-10"
    >
      {/* Nav Buttons */}
      <div className="absolute w-full z-50 h-fit inset-0 flex justify-between top-1/2 -translate-y-1/2 mx-auto container items-center">
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
              className="relative lg:w-[50px] lg:h-[50px] 3xl:w-[62px] 3xl:h-[62px] w-[45px] h-[45px]  group   border border-white rounded-[50px] flex items-center justify-center overflow-hidden"
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
              className="relative lg:w-[50px] lg:h-[50px] 3xl:w-[62px] 3xl:h-[62px] w-[45px] h-[45px]  group border border-white rounded-[50px] flex items-center justify-center overflow-hidden"
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
      </div>
      {/* Background */}
      <div
        ref={bgRef}
        className="absolute w-full h-full inset-0 -z-20 overflow-hidden scale-[1.08]"
      >
        {prevBg && (
          <motion.div
            key={`prev-${prevBg}`}
            initial={{ opacity: 1, filter: "blur(0px)" }}
            animate={{ opacity: 0.9, filter: "blur(1px)" }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full bg-cover bg-center scale-[1.2]"
            style={{ backgroundImage: `url('${prevBg}')` }}
          />
        )}
        {bgBase && (
          <motion.div
            key={`base-${bgBase}`}
            initial={{ opacity: 0, filter: "blur(1px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
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
      <div className="container pt-120 2xl:pt-[130px] relative z-10">
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
                custom={0.23}
                initial="initial"
                whileInView="animate"
                animate={isHalfInView ? "animate" : "initial"}
                viewport={{ once: true }}
                className="text-white font-[optima] text-heading "
              >
                {heading}
              </motion.h1>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Swiper Feature Cards */}
      <div
        className="absolute bottom-0 w-full z-20 "
        onMouseLeave={handleMouseLeave}
      >
        <Swiper
          modules={[Autoplay, Navigation]}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          slidesPerView={4}
          loop={true}
          speed={600}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
            1580: { slidesPerView: 5 },
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
                <Reveal key={c.id} variants={moveUpV2}>
                <div className="relative flex flex-1 ">
                  <div
                    className="relative flex-1 min-h-[360px] md:min-h-[420px] 3xl:h-[500px] flex justify-center items-end px-4 cursor-pointer"
                    onMouseEnter={() => {
                      setActiveFeat(i);
                      switchBg(c.bgImage);
                    }}
                   
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
                            initial={{ y: 0 }}
                            animate={{ y: active ? -16 : 0 }}
                            transition={{
                              duration: 0.9, // was already good
                              ease: [0.25, 0.46, 0.45, 0.94],
                              delay: active ? 0.08 : 0,
                            }}
                            className="text-white font-[optima] uppercase text-center text-25 leading-[1.4] px-4"
                          >
                            {c.name}
                          </motion.h3>

                          {/* Button wrapper — remove the instant class swap, use opacity+y only */}
                          <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{
                              opacity: active ? 1 : 0,
                              y: active ? 0 : 30,
                              marginTop: active ? "var(--gap-active)" : "0px",
                            }}
                            transition={{
                              duration: active ? 0.5 : 0.5, // faster fade-out than fade-in
                              ease: [0.25, 0.1, 0.25, 1],
                            }}
                            style={
                              {
                                ["--gap-active"]: "50px",
                              } as unknown as React.CSSProperties
                            }
                            className="gap-responsive pointer-events-none" // ← always pointer-events-none
                          >
                            <div
                              style={{
                                pointerEvents: active ? "auto" : "none",
                              }} // ← control clicks here instead
                            >
                              <CustomOutlineButton
                                onClick={() =>
                                  c.link && (window.location.href = c.link)
                                }
                                text="Read More"
                                borderColor="border-white"
                                textColor="text-white"
                                px="px-[12px] sm:px-[26px] xl:px-[37px]"
                              />
                            </div>
                          </motion.div>
                      </div>
                    </div>
                  </div>

                  <div
                    className="hidden sm:block absolute top-0 right-0 h-full w-[1px]"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.5) 100%)",
                    }}
                  />
                </div>
              </Reveal>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
}
