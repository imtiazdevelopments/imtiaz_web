"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { CommunityCard as CommunityCardType } from "../data";
import OutlineButton from "@/app/components/common/CustomOutlineButton";

const TAG_ICONS = [
  "/images/community/icons/1.svg",
  "/images/community/icons/2.svg",
  "/images/community/icons/3.svg",
];

const CommunityCard = ({ card }: { card: CommunityCardType }) => {
  const [active, setActive] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsTouch(window.matchMedia("(hover: none)").matches);
    }
  }, []);

  return (
    <div
      className="relative w-full h-[340px] lg:h-[520px] 3xl:h-[579px] overflow-hidden cursor-pointer select-none"
      onMouseEnter={() => !isTouch && setActive(true)}
      onMouseLeave={() => !isTouch && setActive(false)}
      onClick={() => isTouch && setActive((prev) => !prev)}
    >
      {/* Background Image */}
      <Image
        src={card.image}
        alt={card.title}
        fill
        sizes="100vw"
        className="object-cover object-center transition-transform duration-500 ease-out"
        style={{ transform: active ? "scale(1.06)" : "scale(1)" }}
      />

      {/* Base gradient — desktop */}
      <div
        className="hidden md:block absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(180deg, rgba(0,0,0,0) 50.09%, #000000 100%)`,
        }}
      />

      {/* Base overlay — mobile */}
      <div className="md:hidden absolute inset-0 bg-black/50 pointer-events-none" />

      {/* Active overlay */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 ease-in-out"
        style={{
          opacity: active ? 1 : 0,
          background: `linear-gradient(180deg, rgba(0,0,0,0) 35.92%, #000000 100%), linear-gradient(0deg, rgba(0,0,0,0.5), rgba(0,0,0,0.5))`,
        }}
      />

      {/* DEFAULT STATE */}
      <div
        className="absolute inset-0 flex flex-col justify-end gap-3 px-40 pb-40 transition-opacity duration-300 ease-in-out pointer-events-none"
        style={{ opacity: active ? 0 : 1 }}
      >
        <h3 className="text-white font-[optima] text-25 text-center mb-[40px] md:mb-20 px-10 md:px-4">
          {card.title}
        </h3>

        <div className="grid grid-cols-1 2xl:grid-cols-2 3xl:hidden gap-3 w-full">
          {card.tags.map((tag, i) => {
            const isLastOdd =
              card.tags.length % 2 !== 0 && i === card.tags.length - 1;

            return (
              <div
                key={i}
                className={`flex items-center gap-[10px] bg-[#FFFFFF0D] backdrop-blur-[20px] border border-[#FFFFFF0D] rounded-full px-3 py-[10px] ${
                  isLastOdd ? "2xl:col-span-2 2xl:w-fit 2xl:mx-auto" : "w-full"
                }`}
              >
                <Image
                  src={TAG_ICONS[i] ?? TAG_ICONS[0]}
                  alt={tag.label}
                  width={25}
                  height={25}
                  className="h-[14px] w-auto"
                />
                <span className="text-white font-[avenirHeavy] text-16 uppercase">
                  {tag.label}
                </span>
              </div>
            );
          })}
        </div>

        <div className="hidden 3xl:flex justify-between bg-[#FFFFFF0D] backdrop-blur-[30px] rounded-full px-[30px] py-[14px] w-full">
          {card.tags.map((tag, i) => (
            <div key={i} className="flex items-center gap-[10px]">
              <Image
                src={TAG_ICONS[i] ?? TAG_ICONS[0]}
                alt={tag.label}
                width={25}
                height={25}
                className="h-[18px] w-auto"
              />
              <span className="text-white font-[avenirHeavy] text-16 uppercase">
                {tag.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ACTIVE STATE */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center gap-5 transition-opacity duration-300 ease-in-out"
        style={{
          opacity: active ? 1 : 0,
          pointerEvents: active ? "auto" : "none",
        }}
      >
        <h3 className="text-white font-[optima] text-25 text-center mb-120">
          {card.title}
        </h3>
        <Link href={card.href} onClick={(e) => e.stopPropagation()}>
          <OutlineButton
            text="View Community"
            borderColor="rgba(255,255,255,0.9)"
            px="px-10"
          />
        </Link>
      </div>
    </div>
  );
};

export default CommunityCard;
