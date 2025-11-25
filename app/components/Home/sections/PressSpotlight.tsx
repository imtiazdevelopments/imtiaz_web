"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";

import { motion, AnimatePresence, useInView } from "framer-motion";
import { moveUp } from "../../motionVariants";

import type { Swiper as SwiperType } from "swiper";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export type PressItem = {
  id: number;
  date: string;
  title: string;
  image: string;
  link: string;
};

type PressSpotlightProps = {
  data: {
    sectionTitle: string;
    items: PressItem[];
  };
};

const PressSpotlight = ({ data }: PressSpotlightProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const rootRef = useRef(null);
  const inView = useInView(rootRef, { once: true, amount: 0.2 });

  const sectionRef = useRef<HTMLDivElement>(null);

  // per-slide refs
  const wrapRefs = useRef<HTMLDivElement[]>([]);
  const imgRefs = useRef<HTMLImageElement[]>([]);

  const setWrapRef = (el: HTMLDivElement | null, i: number) => {
    if (el) wrapRefs.current[i] = el;
  };

  const setImgRef = (el: HTMLImageElement | null, i: number) => {
    if (el) imgRefs.current[i] = el;
  };

  const initGSAP = () => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      wrapRefs.current.forEach((wrapper, i) => {
        const img = imgRefs.current[i];
        if (!wrapper || !img) return;

        gsap.fromTo(
          img,
          { y: "-25vh" },
          {
            y: "25vh",
            ease: "none",
            scrollTrigger: {
              trigger: wrapper,
              scrub: true,
              start: "top bottom",
              end: "bottom top",
            },
          }
        );
      });
    });

    ScrollTrigger.refresh();
    return () => ctx.revert();
  };

  // Wait for "homeAnimationsReady"
  useEffect(() => {
    const listener = () => initGSAP();
    window.addEventListener("homeAnimationsReady", listener);
    return () => window.removeEventListener("homeAnimationsReady", listener);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="make-header-black w-full py-12 md:py-[80px] lg:py-[120px] 2xl:py-[150px] 3xl:py-[170px] bg-white container overflow-hidden"
    >
      <div ref={rootRef}>
        <Swiper
          modules={[EffectFade, Autoplay]}
          effect="fade"
          loop
          fadeEffect={{ crossFade: true }}
          allowTouchMove={true}
          autoplay={{ delay: 3000, disableOnInteraction: true }}
          slidesPerView={1}
          speed={600}
          onSwiper={setSwiperInstance}
          onSlideChange={(s) => setActiveIndex(s.realIndex)}
          className="w-full"
        >
          {data.items.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="grid grid-cols-1 xl:grid-cols-2 place-items-center gap-10 3xl:gap-0 overflow-hidden">
                {/* LEFT SECTION */}
                <div className="flex flex-col items-center">
                  <motion.h2
                    variants={moveUp(0.2)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="text-[38px] md:text-[70px] font-[optima] uppercase pb-[70px] 2xl:pb-[90px]"
                  >
                    {data.sectionTitle}
                  </motion.h2>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeIndex}
                      initial="hidden"
                      animate="show"
                      exit="hidden"
                      className="flex flex-col items-center"
                    >
                      <div className="overflow-hidden">
                        <motion.p
                          variants={moveUp(0.1)}
                          // custom={0.1}
                          initial="hidden"
                          animate={inView ? "show" : "hidden"}
                          exit="exit"
                          className="text-[17px] font-[avenirRoman] text-[#404040] pb-[30px]"
                        >
                          {item.date}
                        </motion.p>
                      </div>
                      <div className="overflow-hidden">
                        <motion.h3
                          variants={moveUp(0.3)}
                          // custom={0.3}
                          initial="hidden"
                          animate={inView ? "show" : "hidden"}
                          exit="exit"
                          className="text-[22px] md:text-[30px] font-[optima] text-center leading-[1.15] uppercase max-w-[28ch] xl:max-w-[36ch] mb-[30px] xl:mb-[50px] line-clamp-2"
                        >
                          {item.title}
                        </motion.h3>
                      </div>
                      <div className="overflow-hidden">
                        <motion.div
                          variants={moveUp(0.45)}
                          // custom={0.45}
                          initial="hidden"
                          animate={inView ? "show" : "hidden"}
                          exit="exit"
                          className="mb-[20px]"
                        >
                          {/* <Link */}
                          {/* href={item.link} */}
                          <button className="flex items-center justify-center text-primary hover:text-white group hover:bg-primary p-2 rounded-full transition-colors">
                            <Image
                              src="/icons/left_arrow_slider_primary.svg"
                              alt="next"
                              width={28}
                              height={28}
                              className="rotate-180 w-[28px] h-[28px] group-hover:invert group-hover:brightness-0"
                            />
                          </button>
                          {/* </Link> */}
                        </motion.div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                  <motion.div
                    variants={moveUp(0.4)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="flex gap-3 mt-10 3xl:mt-20"
                  >
                    {data.items.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => swiperInstance?.slideTo(idx)}
                        className={`w-[10px] h-[10px] rounded-full transition-all cursor-pointer ${
                          activeIndex === idx
                            ? "bg-primary"
                            : "bg-white border border-[#404040]"
                        }`}
                      />
                    ))}
                  </motion.div>
                </div>
                {/* RIGHT IMAGE — ZOOM PER SLIDE */}
                <div
                  ref={(el) => setWrapRef(el, index)}
                  className="relative w-full 3xl:w-[858px] h-[420px] md:h-[520px] lg:h-[560px] 2xl:h-[580px] 3xl:h-[680px] overflow-hidden"
                >
                  <Image
                    ref={(el) => setImgRef(el as HTMLImageElement, index)}
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover absolute scale-[1.4]"
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="overflow-hidden">
          <motion.div
            variants={moveUp(0.3)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex justify-center mt-[50px]"
          >
            {/* <Link
              href="/#" */}
            <button className="border cursor-pointer border-primary text-primary px-[36px] py-[19.5px] rounded-full font-[avenirRoman] text-[17px] hover:bg-primary hover:text-white transition-colors">
              View All
            </button>
            {/* </Link> */}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PressSpotlight;
