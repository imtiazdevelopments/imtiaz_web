"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import CustomOutlineButton from "../../common/CustomOutlineButton";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { projectsData } from "../data";
import ProjectCard from "../../common/ProjectCard";
import "swiper/css";
import "swiper/css/navigation";
import type { Swiper as SwiperType } from "swiper";
import { motion } from "framer-motion";
import { moveUp, moveUpV2 } from "../../motionVariants";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionHeading } from "../../animations/SectionHeading";
import Reveal from "../../animations/RevealOneByOneAnimation";

gsap.registerPlugin(ScrollTrigger);

const ImtiazProperties = () => {
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);
  const swiperRef = useRef<SwiperType | null>(null);

  // ⭐ No default active item anymore
  const [activeSlide, setActiveSlide] = useState<number | null>(null);

  // ⭐ Track hover on desktop
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const [isMobile, setIsMobile] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);

  const wrapRefs = useRef<HTMLDivElement[]>([]);
  const imgRefs = useRef<HTMLImageElement[]>([]);

  const setWrapRef = (el: HTMLDivElement | null, i: number) => {
    if (el) wrapRefs.current[i] = el;
  };

  const setImgRef = (el: HTMLImageElement | null, i: number) => {
    if (el) imgRefs.current[i] = el;
  };

  // ⭐ Detect screen size
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // ⭐ Mobile-only intersection observer
  useEffect(() => {
    if (!isMobile) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-idx"));
          if (entry.isIntersecting) {
            setActiveSlide(index);
          }
        });
      },
      { threshold: 0.5 },
    );

    wrapRefs.current.forEach((el, idx) => {
      if (!el) return;
      el.setAttribute("data-idx", String(idx));
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isMobile]);

  const initGSAP = () => {
    const section = rootRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      wrapRefs.current.forEach((wrapper, i) => {
        const img = imgRefs.current[i];
        if (!wrapper || !img) return;

        gsap.fromTo(
          img,
          { y: "-5vh" },
          {
            y: "5vh",
            ease: "none",
            scrollTrigger: {
              trigger: wrapper,
              scrub: true,
              start: "top bottom",
              end: "bottom top",
            },
          },
        );
      });
    });

    ScrollTrigger.refresh();
    return () => ctx.revert();
  };

  useEffect(() => {
    const listener = () => initGSAP();
    window.addEventListener("homeAnimationsReady", listener);
    return () => window.removeEventListener("homeAnimationsReady", listener);
  }, []);

  return (
    <section className="make-header-black w-full py-120 3xl:py-160 bg-white z-10 relative">
      <div className="container">
        <SectionHeading
          title={projectsData.sectionTitle}
          className="text-foreground text-center mb-50"
        />
        <div className="relative" ref={rootRef}>
          <Swiper
            modules={[Navigation]}
            spaceBetween={28}
            slidesPerView={1}
            loop
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
            onBeforeInit={(s) => {
              s.params.navigation = {
                ...(s.params.navigation as object),
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              };
            }}
            breakpoints={{
              700: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1500: { slidesPerView: 4 },
            }}
          >
            {projectsData.properties.map((project, i) => {
              return (
                <SwiperSlide key={i}>
                  <Reveal variants={moveUpV2}>
                    <ProjectCard key={i} {...project} />
                  </Reveal>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
        {/* BOTTOM BUTTONS */}
        <div className="flex items-center justify-center mt-50">
          <motion.div
            // variants={moveUp(0.1)}
            variants={moveUp(0.6)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <CustomOutlineButton
              text="View All"
              variant="dark"
              borderColor="border-primary"
              textColor="text-foreground-light"
              px="px-[12px] sm:px-[26px] xl:px-[37px]"
            />
          </motion.div>
          <div className="flex gap-[15px] ml-[30px]">
            <motion.div
              // variants={moveUp(0.2)}
              variants={moveUp(0.8)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <button
                ref={prevRef}
                className="relative lg:w-[50px] lg:h-[50px] 3xl:w-[62px] 3xl:h-[62px] w-[45px] h-[45px] group  border border-[#404040] rounded-[50px] flex items-center justify-center overflow-hidden"
              >
                {/* FILL ANIMATION */}
                <span className="absolute right-0 top-0 h-full w-0 bg-primary transition-all duration-300 group-hover:w-full z-0" />
                {/* ICON */}
                <Image
                  src="/icons/left_arrow_slider_primary.svg"
                  alt="Arrow Right"
                  width={28}
                  height={28}
                  className="relative z-10  object-contain 3xl:w-[28px] 3xl:h-[28px] lg:w-[22px] lg:h-[22px] w-[20px] h-[20px] group-hover:invert group-hover:brightness-0 transition-colors duration-300"
                />
              </button>
            </motion.div>
            <motion.div
              // variants={moveUp(0.3)}
              variants={moveUp(0.95)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <button
                ref={nextRef}
                className="relative lg:w-[50px] lg:h-[50px] 3xl:w-[62px] 3xl:h-[62px] w-[45px] h-[45px] group  border border-[#404040] rounded-[50px] flex items-center justify-center overflow-hidden"
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
        </div>
      </div>
    </section>
  );
};

export default ImtiazProperties;
