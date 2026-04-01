// "use client";

// import { useRef, useState, useEffect } from "react";
// import Image from "next/image";
// // import Link from "next/link";

// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation } from "swiper/modules";

// import "swiper/css";
// import "swiper/css/navigation";
// import type { Swiper as SwiperType } from "swiper";
// import { motion } from "framer-motion";
// import { moveUp } from "../../motionVariants";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// type ImtiazPropertiesData = {
//   data: {
//     sectionTitle: string;
//     properties: {
//       id: number;
//       title: string;
//       image: string;
//       link: string;
//       logo: string;
//     }[];
//   };
// };

// const ImtiazProperties = ({ data }: ImtiazPropertiesData) => {
//   const prevRef = useRef<HTMLButtonElement | null>(null);
//   const nextRef = useRef<HTMLButtonElement | null>(null);
//   const swiperRef = useRef<SwiperType | null>(null);

//   const [activeSlide, setActiveSlide] = useState<number>(1);
//   const rootRef = useRef<HTMLDivElement>(null);

//   // Autoplay only when section is in viewport
//   useEffect(() => {
//     const section = document.querySelector(".make-header-black");
//     if (!section) return;

//     // const observer = new IntersectionObserver(
//     //   ([entry]) => {
//     //     if (entry.isIntersecting) {
//     //       swiperRef.current?.autoplay.start();
//     //     } else {
//     //       swiperRef.current?.autoplay.stop();
//     //     }
//     //   },
//     //   {
//     //     threshold: 0.3,
//     //   }
//     // );

//     // observer.observe(section);

//     // return () => observer.disconnect();
//   }, []);

//   const wrapRefs = useRef<HTMLDivElement[]>([]);
//   const imgRefs = useRef<HTMLImageElement[]>([]);

//   const setWrapRef = (el: HTMLDivElement | null, i: number) => {
//     if (el) wrapRefs.current[i] = el;
//   };

//   const setImgRef = (el: HTMLImageElement | null, i: number) => {
//     if (el) imgRefs.current[i] = el;
//   };

//   const initGSAP = () => {
//     const section = rootRef.current;
//     if (!section) return;

//     const ctx = gsap.context(() => {
//       wrapRefs.current.forEach((wrapper, i) => {
//         const img = imgRefs.current[i];

//         console.log(img);
//         if (!wrapper || !img) return;

//         gsap.fromTo(
//           img,
//           { y: "-5vh" },
//           {
//             y: "5vh",
//             ease: "none",
//             scrollTrigger: {
//               trigger: wrapper,
//               scrub: true,
//               start: "top bottom",
//               end: "bottom top",
//             },
//           }
//         );
//       });
//     });

//     ScrollTrigger.refresh();
//     return () => ctx.revert();
//   };

//   // Wait for "homeAnimationsReady"
//   useEffect(() => {
//     const listener = () => initGSAP();
//     window.addEventListener("homeAnimationsReady", listener);
//     return () => window.removeEventListener("homeAnimationsReady", listener);
//   }, []);

//   return (
//     <section className="make-header-black w-full py-12 md:py-[80px] lg:py-[120px] 2xl:py-[150px] 3xl:py-[170px] bg-white container">
//       {/* ================= TITLE ================= */}
//       <div className="overflow-hidden">
//         <motion.h2
//           variants={moveUp(0.35)}
//           initial="hidden"
//           whileInView="show"
//           viewport={{ once: true }}
//           className="text-center text-[42px] md:text-[55px] font-[optima] mb-[50px]"
//         >
//           {data.sectionTitle}
//         </motion.h2>
//       </div>

//       {/* ================= SWIPER ================= */}
//       <div className="relative" ref={rootRef}>
//         <Swiper
//           modules={[Navigation]}
//           spaceBetween={8}
//           slidesPerView={1}
//           loop
//           onSwiper={(swiper) => (swiperRef.current = swiper)}
//           onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
//           navigation={{
//             prevEl: prevRef.current,
//             nextEl: nextRef.current,
//           }}
//           onBeforeInit={(swiper: SwiperType) => {
//             swiper.params.navigation = {
//               ...(swiper.params.navigation as object),
//               prevEl: prevRef.current,
//               nextEl: nextRef.current,
//             };
//           }}
//           breakpoints={{
//             768: { slidesPerView: 2 },
//             1024: { slidesPerView: 3 },
//             1280: { slidesPerView: 4 },
//           }}
//         >
//           {data.properties.map((item, idx) => {
//             const isActiveMobile = idx === activeSlide;

//             return (
//               <SwiperSlide key={item.id}>
//                 {/* <Link href={item.link}> */}
//                 <motion.div
//                   variants={moveUp(idx * 0.13)}
//                   initial="hidden"
//                   whileInView="show"
//                   viewport={{ once: true }}
//                   className="relative group h-[520px] md:h-[500px] xl:h-[580px] 3xl:h-[650px] w-full max-w-[424px] mx-auto overflow-hidden cursor-pointer"
//                   // onMouseEnter={() => swiperRef.current?.autoplay.stop()}
//                   // onMouseLeave={() => swiperRef.current?.autoplay.start()}
//                   ref={(el) => setWrapRef(el, idx)}
//                 >
//                   {/* Background Image */}
//                   <Image
//                     ref={(el) => setImgRef(el, idx)}
//                     src={item.image}
//                     alt={item.title}
//                     width={1000}
//                     height={1200}
//                     className="absolute object-cover w-full h-full scale-[1.1]"
//                   />

//                   {/* DEFAULT GRADIENT */}
//                   <div
//                     className={`absolute inset-0 z-[2] transition-all duration-500 ${
//                       isActiveMobile ? "opacity-0" : "group-hover:opacity-0"
//                     }`}
//                     style={{
//                       background:
//                         "linear-gradient(180deg, rgba(0,0,0,0) 47.23%, rgba(0,0,0,0.7) 100%)",
//                     }}
//                   />

//                   {/* HOVER GRADIENT */}
//                   <div
//                     className={`absolute inset-0 z-[3] transition-opacity duration-500 ${
//                       isActiveMobile
//                         ? "opacity-100"
//                         : "opacity-0 group-hover:opacity-100"
//                     }`}
//                     style={{
//                       background:
//                         "linear-gradient(180deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.7) 100%)",
//                     }}
//                   />

//                   {/* ================= HOVER CONTENT ================= */}
//                   <div className="absolute inset-0 z-[5] flex flex-col items-center justify-center text-center px-[50px]">
//                     {/* Logo */}
//                     <div
//                       className={`transition-all duration-400 translate-y-25 ${
//                         isActiveMobile
//                           ? "!opacity-100 !translate-y-0"
//                           : "opacity-0 group-hover:opacity-100 group-hover:translate-y-0"
//                       } mb-[50px]`}
//                     >
//                       <Image
//                         src={item.logo}
//                         alt="Project Logo"
//                         width={207}
//                         height={50}
//                         className="object-contain"
//                       />
//                     </div>

//                     {/* Title */}
//                     <h3
//                       className={`text-white text-[22px] md:text-[30px] font-[optima] uppercase mb-[100px] xl:mb-[130px] 2xl:mb-[150px] 3xl:mb-[190px] transition-all duration-600 translate-y-18 ${
//                         isActiveMobile
//                           ? "!opacity-100 !translate-y-0"
//                           : "opacity-0 group-hover:opacity-100 group-hover:translate-y-0"
//                       }`}
//                     >
//                       {item.title}
//                     </h3>

//                     {/* Read More Btn */}
//                     <span
//                       className={`inline-block border border-white px-[36px] py-[19.5px] rounded-full font-[avenirRoman] text-[17px] leading-[1] text-white transition-all duration-800 translate-y-6 ${
//                         isActiveMobile
//                           ? "!opacity-100 !translate-y-0"
//                           : "opacity-0 group-hover:opacity-100 group-hover:translate-y-0"
//                       }`}
//                     >
//                       Read More
//                     </span>
//                   </div>

//                   {/* ================= DEFAULT BOTTOM TITLE ================= */}
//                   <h4
//                     className={`absolute bottom-10 left-1/2 -translate-x-1/2 w-full justify-center items-center
//       flex px-6 z-[4] text-center text-white
//       text-[18px] md:text-[20px] lg:text-[25px] 2xl:text-[27px] 3xl:text-[30px]
//       font-[optima] uppercase tracking-wide
//       transition-all duration-500
//       ${
//         isActiveMobile
//           ? "opacity-0 translate-y-3"
//           : "group-hover:opacity-0 group-hover:translate-y-3"
//       }`}
//                   >
//                     {item.title}
//                   </h4>
//                 </motion.div>
//                 {/* </Link> */}
//               </SwiperSlide>
//             );
//           })}
//         </Swiper>
//       </div>

//       {/* ================= BOTTOM BUTTONS ================= */}
//       <div className="flex items-center justify-center gap-6 mt-10">
//         <motion.div
//           variants={moveUp(0.1)}
//           initial="hidden"
//           whileInView="show"
//           viewport={{ once: true }}
//         >
//           {/* <Link
//             href="/#" */}
//           <button
//             className="border border-primary text-[#404040] py-[19.5px] px-[36px] font-[avenirRoman] text-[17px] rounded-full
//             hover:bg-primary hover:text-white transition-colors duration-300"
//           >
//             View All
//           </button>
//           {/* </Link> */}
//         </motion.div>

//         <motion.div
//           variants={moveUp(0.2)}
//           initial="hidden"
//           whileInView="show"
//           viewport={{ once: true }}
//         >
//           <button
//             ref={prevRef}
//             className="w-[62px] h-[62px] border border-[#404040] rounded-[50px] flex items-center justify-center cursor-pointer"
//           >
//             <Image
//               src="/icons/left_arrow_slider_primary.svg"
//               alt="Arrow Left"
//               width={28}
//               height={28}
//               className="object-contain w-[28px] h-[28px]"
//             />
//           </button>
//         </motion.div>

//         <motion.div
//           variants={moveUp(0.3)}
//           initial="hidden"
//           whileInView="show"
//           viewport={{ once: true }}
//         >
//           <button
//             ref={nextRef}
//             className="w-[62px] h-[62px] border border-[#404040] rounded-[50px] flex items-center justify-center cursor-pointer"
//           >
//             <Image
//               src="/icons/left_arrow_slider_primary.svg"
//               alt="Arrow Right"
//               width={28}
//               height={28}
//               className="object-contain rotate-180 w-[28px] h-[28px]"
//             />
//           </button>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default ImtiazProperties;

"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { projectsData } from "../data"; 
import ProjectCard from "../../common/ProjectCard";
import "swiper/css";
import "swiper/css/navigation";
import type { Swiper as SwiperType } from "swiper";
import { motion } from "framer-motion";
import { moveUp } from "../../motionVariants";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
      { threshold: 0.5 }
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
          }
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
    <section className="make-header-black w-full py-12 md:py-[80px] lg:py-[120px] 3xl:py-[160px] bg-white container">
      <div className="overflow-hidden">
        <motion.h2
          // variants={moveUp(0.35)}
          variants={moveUp(0.7)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-center text-[36px] md:text-[58px]  lg:text-[60px] 3xl:text-[70px] font-[optima] mb-50"
        >
          {data.sectionTitle}
        </motion.h2>
      </div>

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
            1280: { slidesPerView: 4 },
          }}
        >
          {projectsData.map((project, i) => { 

            return (
              <SwiperSlide key={i}> 
                          <ProjectCard key={i} {...project} />
                      
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      {/* BOTTOM BUTTONS */}
      <div className="flex items-center justify-center mt-10 2xl:mt-12">
        <motion.div
          // variants={moveUp(0.1)}
          variants={moveUp(0.6)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <button className="border border-primary text-[#404040] py-[19.5px] px-[36px] max-h-[62px] rounded-full hover:bg-primary hover:text-white transition-colors duration-300">
            View All
          </button>
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
              className="relative w-[62px] group h-[62px] border border-[#404040] rounded-[50px] flex items-center justify-center overflow-hidden"
            >
              {/* FILL ANIMATION */}
              <span className="absolute right-0 top-0 h-full w-0 bg-primary transition-all duration-300 group-hover:w-full z-0" />
              {/* ICON */}
              <Image
                src="/icons/left_arrow_slider_primary.svg"
                alt="Arrow Right"
                width={28}
                height={28}
                className="relative z-10  object-contain w-[28px] h-[28px] group-hover:invert group-hover:brightness-0 transition-colors duration-300"
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
              className="relative w-[62px] group h-[62px] border border-[#404040] rounded-[50px] flex items-center justify-center overflow-hidden"
            >
              {/* FILL ANIMATION */}
              <span className="absolute left-0 top-0 h-full w-0 bg-primary transition-all duration-300 group-hover:w-full z-0" />
              {/* ICON */}
              <Image
                src="/icons/left_arrow_slider_primary.svg"
                alt="Arrow Right"
                width={28}
                height={28}
                className="relative z-10 rotate-180 object-contain w-[28px] h-[28px] group-hover:invert group-hover:brightness-0 transition-colors duration-300"
              />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ImtiazProperties;
