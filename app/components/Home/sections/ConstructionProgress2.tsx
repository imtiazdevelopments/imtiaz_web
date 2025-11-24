"use client";
import Link from "next/link";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ConstructionProgressProps {
  data: {
    title: string;
    videoSrc: string;
    posterSrc: string;
    description: string;
    button: {
      label: string;
      link: string;
    };
  };
}

const ConstructionProgress: React.FC<ConstructionProgressProps> = ({
  data,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const initGSAP = () => {
    const video = videoRef.current;
    const section = sectionRef.current;
    const textBox = textRef.current;

    if (!video || !section || !textBox) return;

    // Select only animatable items
    const items = textBox.querySelectorAll(".anim-item");

    const ctx = gsap.context(() => {
      /* --- PARALLAX VIDEO --- */
      gsap.fromTo(
        video,
        { y: "25vh" },
        {
          y: "-25vh",
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
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top center",
            toggleActions: "play none none reverse",
            markers: false,
          },
        }
      );
    });

    ScrollTrigger.refresh();
    return () => ctx.revert();
  };

  /* -----------------------------
     WAIT FOR main page READY event
  ----------------------------- */
  useEffect(() => {
    const listener = () => initGSAP();
    window.addEventListener("homeAnimationsReady", listener);

    return () => window.removeEventListener("homeAnimationsReady", listener);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden pb-[200px] md:pb-[250px] lg:pb-[300px] xl:pb-[350px] 3xl:pb-[432px] flex justify-center pt-10 xl:pt-[140px] 2xl:pt-[160px] 3xl:pt-[196px] h-screen"
    >
      {/* ---------------- BACKGROUND VIDEO ---------------- */}
      <video
        ref={videoRef}
        src={data.videoSrc}
        poster={data.posterSrc}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-[1] scale-[1.5]"
      />

      {/* ---------------- OVERLAY ---------------- */}
      <div className="absolute inset-0 z-[2] bg-black/50" />

      {/* ---------------- TEXT ---------------- */}
      <div
        ref={textRef}
        className="relative z-[5] text-center px-6 max-w-[900px]"
      >
        <div className="overflow-hidden">
          <h2 className="anim-item text-white text-[40px] md:text-[55px] 2xl:text-[64px] 3xl:text-[70px] font-[optima] font-[400] leading-[110%] mb-5 max-w-[20ch] uppercase">
            {data.title}
          </h2>
        </div>
        <div className="overflow-hidden">
          <p className="anim-item text-white text-[19px] font-[avenirRoman] font-[400] leading-[1.3] max-w-[60ch] mx-auto mb-[50px]">
            {data.description}
          </p>
        </div>
        <div className="overflow-hidden">
          <Link href="/#">
            <button className="anim-item px-[36px] py-[19.5px] text-[17px] rounded-full border border-white text-white font-[avenirRoman] font-[400] capitalize transition-all cursor-pointer">
              {data.button.label}
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ConstructionProgress;
