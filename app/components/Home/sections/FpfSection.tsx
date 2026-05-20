"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CustomOutlineButton from "../../common/CustomOutlineButton";
import { SectionHeading } from "@/app/components/animations/SectionHeading";
import { SectionDescription } from "@/app/components/animations/SectionDescription";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const rootRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const initGSAP = () => {
    if (!wrapRef.current || !videoRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        videoRef.current,
        { y: "-25vh" },
        {
          y: "25vh",
          ease: "none",
          scrollTrigger: {
            trigger: wrapRef.current,
            scrub: true,
            start: "top bottom",
            end: "bottom top",
          },
        },
      );
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
    <div className="w-full relative h-screen" ref={rootRef}>
      <div className="absolute inset-0 z-10 overflow-hidden" ref={wrapRef}>
        <video
          ref={videoRef}
          src={"/videos/promotion.mp4"}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover scale-[1.08]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.5)_0%,rgba(0,0,0,0.5)_100%)]" />
      </div>

      <div className="container absolute bottom-10 lg:bottom-[67px] left-0 right-0 z-10 flex justify-center px-4 pb-6">
        <div className="w-full">
          <div className="text-center flex justify-center flex-col items-center">
            <SectionHeading title={"A National Initiative by Imtiaz"} className="text-white mb-[20px] sm:mb-30" />

                        {/* <SectionDescription
              text={
                "The future is not something we wait for. It is something we build."
              }
              className="text-25 text-white font-[avenirBook] leading-[1] mx-auto uppercase mb-[20px] max-w-[50ch]"
            /> */}

            <SectionDescription
              text={
                "As one of the UAE's leading real estate developer, Imtiaz Developments believes that building is more than creating spaces. It is a responsibility to the country that enables ambition, and to the people who define its future."
              }
              className="shrink-0 mx-auto text-white whitespace-pre-line mb-40 max-w-[80ch]"
            />
            <Link href={"https://mustaqbal.imtiaz.ae/"} target="_blank">
              <CustomOutlineButton
                text="Explore"
                borderColor="border-white"
                textColor="text-white"
                px="h-[44px] md:h-[50px]  xl:h-[66px] px-[30px] md:px-[37px]"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
