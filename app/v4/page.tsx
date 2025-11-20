"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import ProSlider from "../components/Home/sections/ProSlider";
import { heroSlides, aboutSectionJourney } from "../components/Home/data";
import AbtJour from "../components/Home/sections/AbtJour";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  /*   const sectionRef = useRef<HTMLDivElement>(null); */
  const leftBgRef = useRef<HTMLDivElement>(null);
  const rightBgRef = useRef<HTMLDivElement>(null);
  const leftTextRef = useRef<HTMLDivElement>(null);
  const rightTextRef = useRef<HTMLDivElement>(null);
  const sec3Ref = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const sec3TitleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const bar = document.getElementById("bar");
      const img1 = document.querySelector(".img1-1");
      const img2 = document.querySelector(".img1-2");
      const img3 = document.querySelector(".img1-3");

      const leftBg = leftBgRef.current!;
      const rightBg = rightBgRef.current!;
      const leftText = leftTextRef.current!;
      const rightText = rightTextRef.current!;

      gsap.set([leftBg, leftText], { x: 0 });
      gsap.set([rightBg, rightText], { x: 0 });

      if (!bar || !img1 || !img2 || !img3) return; // <-- PREVENT ERROR

      gsap.set(bar, { height: 0, width: "0%" });
      gsap.set([img1, img2, img3], { scale: 0 });

       const sec1 = gsap.timeline();

      sec1
    
        .to(".whtbx", {
       
          width: '20%',
    /* x: "10%", */
    duration: 0.5,
    ease: "power4.inOut",
  })
  .to(".whtbx", {
    x: "40%",
    duration: 0.3,
        ease: "power4.inOut",
  })
  .to(".whtbx", {
    width: "100%",
    duration: 1,
     ease: "power4.inOut",
  })
  .to(".whtbx", {
    width: "0%",
    duration: 0.5,
    ease: "power4.inOut",
  })
      .fromTo(
        titleRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          delay: 0.3,
        }, "-=0.5"
      );

      const tlSec1 = gsap.timeline({
        scrollTrigger: {
          trigger: "#sec1",
          start: "end top",
          end: "+=150%",
          pin: true,
          scrub: 1,
        },
      });

      tlSec1
        .to(bar, { height: '20px' })
        .to(bar, { width: "100%" })
        .to(bar, { height: "100vh" })
        .to(img1, { scale: 1, duration: 0.8 }, "-=0.2")
        .to(img2, { scale: 1, duration: 0.8 }, "-=0.3")
        .to(img3, { scale: 1, duration: 0.8 }, "-=0.3")
        .to(
          ".split-section",
          {
            scale: 1,
            ease: "power3.out",
            duration: 1,
          },
          "-=0.3"
        )

        .to([leftBg, leftText], {
          x: "-100%",
          duration: 1.2,
        },"+=0.5")

        .to(
          [rightBg, rightText],
          {
            x: "100%",
            duration: 1.2,
          },
          "<"
        )
        .to(sec3Ref.current, { opacity: 1, duration: 1 }, "-=2");
    });

    gsap.fromTo(
      sec3TitleRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sec3Ref.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    return () => ctx.revert(); // cleanup on route change
  }, []);

  return (
    <div className="overflow-x-hidden"
    >
      {/* SECTION 1 */}

      <section
        id="sec1"
        className="h-screen bg-black text-white flex items-center justify-center relative text-center"
      >
        <div className="relative w-full h-screen overflow-hidden flex items-center justify-center text-center">
          {/* Background Video */}
          <video
            className="absolute top-0 left-0 w-full   object-cover h-[99.9%]"
            src="/videos/WWH_for_Website_Final.mp4"
            autoPlay
            loop
            muted
            playsInline
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.3)_1.12%,rgba(0,0,0,0.15)_40.24%,rgba(0,0,0,0.75)_100%)] pointer-events-none" />

          {/* Text and icon*/}
          <div className="absolute bottom-[110px] 3xl:bottom-[80px] max-w-[135ch] flex flex-col gap-[40px] md:gap-[60px] 3xl:gap-[72px] items-center justify-center">
            <div className="relative overflow-hidden">
            <h1
              ref={titleRef}
              className="text-[35px] md:text-[50px] 2xl:text-[64px] 3xl:text-[80px] font-[optima] leading-[1] uppercase text-white opacity-0"
            >
              Redefining Spaces Elevating Lives
            </h1>
              <div className="whtbx absolute w-0 h-full  inset-0 bg-white top-0"></div>
            </div>
            <Image alt="" src="/icons/mouse.svg" width={50} height={50} />
          </div>
        </div>
        {/* ANIMATED BAR */}

        <div
          id="bar"
          className="bg-primary absolute left-0 right-0 mx-auto z-10"
        ></div>

        <div className="img1-1 absolute w-full h-full z-20 inset-0 scale-[0]">
          <Image
            className="w-full h-full object-cover object-center absolute"
            src="/images/home/imtiaz-properties/1.png"
            alt=""
            width={1500}
            height={100}
          />
        </div>
        <div className="img1-2 absolute w-full h-full z-30 inset-0 scale-[0]">
          <Image
            className="w-full h-full object-cover object-center absolute"
            src="/images/home/imtiaz-properties/3.png"
            alt=""
            width={1500}
            height={100}
          />
        </div>
        <div className="img1-3 absolute w-full h-full z-40 inset-0 scale-[0]">
          <Image
            className="w-full h-full object-cover object-center absolute"
            src="/images/home/imtiaz-properties/2.png"
            alt=""
            width={1500}
            height={100}
          />
        </div>
       
        <div className="split-section h-screen w-screen bg-transparent overflow-hidden flex items-center justify-center absolute z-50 scale-0">
          {/* LEFT BG */}
          <div
            ref={leftBgRef}
            className="absolute left-0 top-0 w-1/2 h-full bg-primary z-10"
          />

          {/* RIGHT BG */}
          <div
            ref={rightBgRef}
            className="absolute right-0 top-0 w-1/2 h-full bg-primary z-10"
          />

          {/* TEXT SPLIT → LEFT */}
          <div
            ref={leftTextRef}
            className="absolute left-0 top-1/2 -translate-y-1/2 w-1/2 h-auto overflow-hidden flex justify-end pr-4 z-20" 
          >
            <div className="transform translate-x-1/2">
           <AbtJour data={aboutSectionJourney} />
           </div>
          </div>

          {/* TEXT SPLIT → RIGHT */}
          <div
            ref={rightTextRef}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-auto overflow-hidden flex justify-start pl-4 z-20"
          >
             <div className="transform -translate-x-[53.4%]">
           <AbtJour data={aboutSectionJourney} />
           </div>
          </div>
        </div>
         <div
          ref={sec3Ref}
          className="h-screen w-screen bg-gray-900 text-white flex items-center justify-center absolute z-40 opacity-0"
        >
            <ProSlider slides={heroSlides} RightLabel="New Launches"/>
           
        </div>
      </section>
      {/* SPLIT SECTION */}
        <div className="">
             <ProSlider
                    slides={heroSlides.slice().reverse()}
                    RightLabel="Coming Soon"
                  />
        </div>
    </div>
  );
}
