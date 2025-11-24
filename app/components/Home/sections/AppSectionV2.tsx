"use client";

import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export type FeatureCircle = {
  title: string;
  icon: string; // path to icon
};

export type AppSectionData = {
  heading: string;
  subtitle: string;
  mobileImage: string; // the phone mockup svg
  leftCircles: FeatureCircle[];
  rightCircles: FeatureCircle[];
  download: {
    text: string;
    googlePlay: string;
    appStore: string;
  };
};

const Circle = ({
  title,
  icon,
  rotate = 0,
}: {
  title: string;
  icon: string;
  rotate?: number;
}) => (
  <div
    className="flex items-center justify-center"
    style={{ transform: `rotate(${rotate}deg)` }}
  >
    {/* OUTER GRADIENT RING */}
    <div
      className="rounded-full p-[1px]"
      style={{
        background:
          "linear-gradient(226.3deg, #7A253A 14.58%, rgba(122, 37, 58, 0) 85.53%)",
      }}
    >
      {/* WHITE INNER RING */}
      <div className="rounded-full bg-[#F4F2F2]">
        {/* RESPONSIVE INNER GRADIENT CIRCLE */}
        <div
          className="
            rounded-full
            flex items-center justify-center
            w-[130px] h-[130px]
            sm:w-[150px] sm:h-[150px]
            md:w-[170px] md:h-[170px]
            xl:w-[201px] xl:h-[201px]
          "
          style={{
            background:
              "linear-gradient(221.92deg, rgba(122, 37, 58, 0.1) 15.2%, rgba(122, 37, 58, 0) 84.46%)",
          }}
        >
          {/* CONTENT — COUNTER ROTATE */}
          <div
            className="flex flex-col items-center justify-center text-center p-2"
            style={{ transform: `rotate(${-rotate}deg)` }}
          >
            <Image
              src={icon}
              alt={title}
              width={32}
              height={32}
              className="
                w-[22px] h-[22px]
                sm:w-[26px] sm:h-[26px]
                md:w-[30px] md:h-[30px]
                xl:w-[32px] xl:h-[32px]
              "
            />

            <p
              className="
                mt-3 text-[#404040]
                text-[12px]
                sm:text-[14px]
                md:text-[16px]
                xl:text-[19px]
                font-avenirRoman
                leading-[1.2]
                uppercase
              "
            >
              {title}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const AppSection = ({ data }: { data: AppSectionData }) => {
  const imageRef = useRef<HTMLDivElement>(null);
  const section5Ref = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const initGSAP = () => {
    const image = imageRef.current;
    const section = section5Ref.current;
    const textBox = textRef.current;

    if (!image || !section || !textBox) return;

    const items = textBox.querySelectorAll(".anim-item");

    const ctx = gsap.context(() => {
      /* --- PARALLAX --- */
      gsap.fromTo(
        image,
        { y: "12vh" },
        {
          y: "-35vh",
          ease: "none",
          scrollTrigger: {
            trigger: section,
            scrub: true,
            start: "top bottom",
            end: "bottom top",
          },
        }
      );

      /* --- TEXT FADE IN --- */
      gsap.fromTo(
        items,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 60%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // SLIDE FIRST LEFT CIRCLE FROM -right-100 TO right-0
      // SLIDE FIRST LEFT CIRCLE: start 400px right (off-screen) → final (right:0)

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 60%",
          toggleActions: "restart none none reverse",
        },
      });

      /* -------------------------------------
   PHASE 1 — right animation (1 & 3)
------------------------------------- */
      tl.fromTo(
        ".left-circle-1",
        { right: -400, opacity: 0, scale: 0, y: 200 },
        {
          right: 0,
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "power3.out",
          delay: 0.5,
        },
        "phase1"
      );

      tl.fromTo(
        ".left-circle-3",
        { right: -400, opacity: 0, scale: 0, y: -125 },
        {
          right: 0,
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "power3.out",
          delay: 0.5,
        },
        "phase1"
      );

      /* -------------------------------------
   PHASE 2 — y(1&3) + right(2) TOGETHER
------------------------------------- */
      tl.to(
        [".left-circle-1", ".left-circle-3"],
        {
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "phase2" // label for phase 2
      );

      // circle 2 joins phase 2:
      tl.fromTo(
        ".left-circle-2",
        { right: -100, opacity: 0, scale: 0 },
        {
          right: "192px",
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
        },
        "phase2" // SAME LABEL → runs together
      );

      // start phase2 immediately after phase1 ends
      tl.addLabel("phase2", "phase1+=1.2");

      /* ==========================================================
   RIGHT CIRCLES — EXACT SAME LOGIC MIRRORED
========================================================== */

      const tlRight = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 60%",
          toggleActions: "restart none none reverse",
        },
      });

      /* -------------------------------------
   PHASE 1 — right animation (1 & 3)
------------------------------------- */
      tlRight.fromTo(
        ".right-circle-1",
        { left: -400, opacity: 0, scale: 0, y: 200 },
        {
          left: 0,
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "power3.out",
          delay: 0.5,
        },
        "phase1-right"
      );

      tlRight.fromTo(
        ".right-circle-3",
        { left: -400, opacity: 0, scale: 0, y: -125 },
        {
          left: 0,
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "power3.out",
          delay: 0.5,
        },
        "phase1-right"
      );

      /* -------------------------------------
   PHASE 2 — y(1&3) + right(2)
------------------------------------- */
      tlRight.to(
        [".right-circle-1", ".right-circle-3"],
        {
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "phase2-right"
      );

      // circle 2 right animation
      tlRight.fromTo(
        ".right-circle-2",
        { left: -100, opacity: 0, scale: 0 },
        {
          left: "192px",
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
        },
        "phase2-right"
      );

      // phase2 starts after phase1
      tlRight.addLabel("phase2-right", "phase1-right+=1.2");
    });

    return () => ctx.revert();
  };

  useEffect(() => {
    const listener = () => initGSAP();
    window.addEventListener("homeAnimationsReady", listener);

    return () => window.removeEventListener("homeAnimationsReady", listener);
  }, []);

  const d = data;

  return (
    <section
      ref={section5Ref}
      className="make-header-black w-full py-12 md:py-15 xl:py-20 2xl:py-25 3xl:pb-[150px] 3xl:pt-[136px] bg-[#F4F2F2]"
    >
      <div
        className="container"
        ref={textRef}
        style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
      >
        {/* Heading */}
        <h2 className="anim-item text-[26px] md:text-[40px] xl:text-[45px] 2xl:text-[58px] 3xl:text-[70px] font-[optima] uppercase text-center leading-[1.2] max-w-[30ch] mx-auto">
          {d.heading}
        </h2>
        {/* Subtitle */}
        <p className="anim-item text-center font-avenirRoman text-[19px] text-[#404040] mt-5">
          {d.subtitle}
        </p>
        {/* ----- MAIN LAYOUT ----- */}
        <div
          className="
  grid
  grid-cols-1
  lg:grid-cols-[2fr_350px_2fr]
  place-items-center
  place-content-center
  gap-8
  xl:gap-10
  2xl:gap-28
  relative
  mt-[50px]
  3xl:mt-[70px]
"
        >
          {/* LEFT CIRCLES (visible only on lg+) */}
          <div className="hidden lg:flex flex-col items-center justify-center relative h-[600px] w-full">
            <div className="absolute right-0 top-9 circle-item z-[100] left-circle-1">
              <Circle {...d.leftCircles[0]} />
            </div>
            <div className="absolute right-27 xl:right-48 top-52 circle-item z-[0] left-circle-2">
              <Circle {...d.leftCircles[1]} rotate={180} />
            </div>
            <div className="absolute right-0 bottom-9 circle-item z-[0] left-circle-3">
              <Circle {...d.leftCircles[2]} />
            </div>
          </div>

          {/* PHONE - ALWAYS CENTERED */}
          <div className="flex justify-center w-fit">
            <div className="relative w-[350px] h-[650px] overflow-hidden phone-wrapper z-[100]">
              <Image
                className="absolute z-10 h-full w-full"
                src={"/images/home/app/phone.png"}
                alt="phone"
                width={900}
                height={900}
              />
              <div className="left-[25px] right-[25px] absolute" ref={imageRef}>
                <Image
                  src={d.mobileImage}
                  alt="mobile"
                  width={1500}
                  height={2000}
                  className=" absolute
       w-full
        
      "
                />
              </div>
            </div>
          </div>

          {/* RIGHT CIRCLES (visible only on lg+) */}
          <div className="hidden lg:flex flex-col items-center relative h-[600px] w-full">
            <div className="absolute left-0 top-9 circle-item right-circle-1">
              <Circle {...d.rightCircles[0]} rotate={-90} />
            </div>
            <div className="absolute left-27 xl:left-48 top-52 circle-item right-circle-2">
              <Circle {...d.rightCircles[1]} rotate={90} />
            </div>
            <div className="absolute left-0 bottom-9 circle-item right-circle-3">
              <Circle {...d.rightCircles[2]} rotate={-90} />
            </div>
          </div>
        </div>

        {/* MOBILE CIRCLES (ONLY BELOW lg) */}
        <div className="lg:hidden mt-16 grid grid-cols-2 gap-10 place-items-center">
          {[...d.leftCircles, ...d.rightCircles].map((c, i) => (
            <Circle key={i} {...c} />
          ))}
        </div>

        {/* ----- DOWNLOAD SECTION ----- */}
        <div className="text-center mt-8 lg:mt-[50px] 2xl:mt-[70px] 3xl:mt-[80px]">
          <p className="uppercase text-[24px] sm:text-[28px] md:text-[32px] leading-[1] font-[optima] mb-6 sm:mb-8">
            {d.download.text}
          </p>

          <div className="flex justify-center items-center gap-4 sm:gap-6 md:gap-[15px]">
            {/* GOOGLE PLAY */}
            <Image
              src={d.download.googlePlay}
              alt="google play"
              width={241}
              height={74}
              className="w-[150px] sm:w-[180px] md:w-[200px] xl:w-[241px] h-auto cursor-pointer hover:scale-[1.04] transition-all duration-300"
            />

            {/* APP STORE */}
            <Image
              src={d.download.appStore}
              alt="app store"
              width={241}
              height={74}
              className="w-[150px] sm:w-[180px] md:w-[200px] xl:w-[241px] h-auto cursor-pointer hover:scale-[1.04] transition-all duration-300"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppSection;
