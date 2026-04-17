 

"use client";

import Image from "next/image";
import { useState, useEffect, useId } from "react";

import type { ProjectCardType } from "@/types/cardtype";
import { useParallax } from "@/app/hooks/useParallax";
import CustomOutlineButton from "./CustomOutlineButton";
import Link from "next/link";

export default function Cardconstruction({
  image,
  status,
  location,
  title,
  subtitle,
  startingFrom,
  units,
  hoverImage,
}: ProjectCardType) {
  const { ref, parallaxY } = useParallax(2);
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const cardId = useId(); // unique ID for each card instance

  const show = isHovered || isActive;
const breakWord = "by Imtiaz";

const parts = title.split(new RegExp(`(${breakWord})`, "i"));
  useEffect(() => {
    // When another card broadcasts its activation, deactivate this one
    const handleOtherCardActive = (e: Event) => {
      const { id } = (e as CustomEvent).detail;
      if (id !== cardId) setIsActive(false);
    };

    window.addEventListener("card:activated", handleOtherCardActive);
    return () => window.removeEventListener("card:activated", handleOtherCardActive);
  }, [cardId]);

const handleCardClick = () => {
  if (!window.matchMedia("(hover: none)").matches) return;

  const next = !isActive;
  setIsActive(next);

  if (next) {
    window.dispatchEvent(
      new CustomEvent("card:activated", { detail: { id: cardId } })
    );
  }
};

  return (
    <div
      className="block w-full"
      ref={ref}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      <div className="relative w-full aspect-[10.72/13] md:aspect-[9/13] xl:aspect-[8.5/13] 3xl:aspect-[8.48/13] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          style={{
            transform: `scale(${1.02}) translateY(${parallaxY}vh)`,
          }}
        />

        {/* Default overlay */}
        <div
          className="absolute inset-0 z-10 transition-opacity"
          style={{
            background:
              "linear-gradient(180deg, rgba(0, 0, 0, 0) 35.69%, rgba(0, 0, 0, 0.8) 84.83%), linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2))",
          }}
        />

        {/* Hover overlay */}
        <div
          className={`absolute inset-0 z-10 transition-opacity duration-500  `}
          style={{
            background:
              "linear-gradient(180deg, rgba(0, 0, 0, 0) 36.05%, rgba(0, 0, 0, 0.) 83.74%),linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2))",
          }}
        />

        {/* ── DEFAULT STATE ── */}
        <div
          className={`absolute inset-0 z-20 flex flex-col transition-opacity mt-[30px] sm:mt-[38px] mb-[30px] md:my-[30px] xl:my-[40px] duration-700 pointer-events-none `}
        >
          <div className={`absolute top-0 left-0 right-0 flex justify-center flex-col items-center transition-opacity duration-500 `}>
            {status && (
              <div className={`bg-white/30 backdrop-blur-[30px] px-[15px] py-[1.5px] rounded-full h-[28px] flex items-center justify-center transition-transform duration-900  `}>
                <p className="text-white/80 text-description font-bold uppercase h-[18px] lg:h-[22px]">
                  {status}
                </p>
              </div>
            )}
            <div className={`flex items-center justify-center gap-[10px] mt-[20px] transition-transform duration-900  `}>
              {location && (
                <>
                  <svg width="19" height="22" viewBox="0 0 19 22" fill="none">
                    <path d="M9.34539 12.1493C11.0689 12.1493 12.4662 10.7521 12.4662 9.0285C12.4662 7.30494 11.0689 5.90771 9.34539 5.90771C7.62183 5.90771 6.22461 7.30494 6.22461 9.0285C6.22461 10.7521 7.62183 12.1493 9.34539 12.1493Z" stroke="white" strokeWidth="1.44"/>
                    <path d="M0.96352 7.21184C2.93401 -1.45033 15.7672 -1.44032 17.7277 7.22184C18.878 12.3031 15.7172 16.6042 12.9465 19.2649C10.936 21.2053 7.75522 21.2053 5.73471 19.2649C2.97402 16.6042 -0.186768 12.2931 0.96352 7.21184Z" stroke="white" strokeWidth="1.44"/>
                  </svg>
                  <span className="text-white/80 text-description">{location}</span>
                </>
              )}
            </div>
          </div>

          <div className={`absolute bottom-0 xl:bottom-[13px] left-0 right-0 px-5 transition-opacity duration-500  `}>
            {/* <h3
              className={`font-[optima] text-white text-25 leading-[1.4] uppercase text-center mb-[10px] transition-transform duration-900 ${show ? "translate-y-0" : "translate-y-2"}`}
              dangerouslySetInnerHTML={{ __html: title }}
            /> */} 
             <h3
            className={`font-[optima] text-white text-25 leading-[1.4] uppercase text-center mb-[10px] transition-transform duration-900 ${
              show ? "translate-y-0" : "translate-y-2"
            }`}
          >
            {parts.length > 1 ? (
              <>
                {parts[0]}
                <br className="hidden sm:block" />
                {breakWord} 
              </>
            ) : (
              title
            )}
          </h3>
            <div
              className={`w-full h-px mb-[10px] transition-transform duration-900  `}
              style={{
                background: "linear-gradient(90deg, rgba(255,255,255,0) 0%, #FFFFFF 50%, rgba(255,255,255,0) 100%)",
              }}
            />
            <p className={`text-white/80 text-description text-center transition-transform duration-900  `}>
              {subtitle}
            </p>
            <div onClick={(e) => e.stopPropagation()} className="mx-auto w-fit mt-5   ">
            <Link
  href={`/properties/${title
    .replace(/<br\s*\/?>/gi, "")
    .toLowerCase()
    .replace(/\s+/g, "-")}`}
>
              <CustomOutlineButton
                text="View Property"
                px="py-[16px] px-[29.4px] sm:px-[20px] lg:px-[25px] 2xl:px-[30px] 3xl:px-[40px]"
                className=" "
              />
            </Link>
          </div>
          </div>
        </div>

        
      </div>
    </div>
  );
}