"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { CommunityCard as CommunityCardType } from "../data";
import OutlineButton from "@/app/components/common/CustomOutlineButton";

const TAG_ICONS = [
  "/images/community/icons/1.svg",
  "/images/community/icons/2.svg",
  "/images/community/icons/3.svg",
];

const CommunityCard = ({ card }: { card: CommunityCardType }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative w-full h-[340px] lg:h-[579px] overflow-hidden cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Background Image */}
      <Image
        src={card.image}
        alt={card.title}
        fill
        sizes="100vw"
        className="object-cover object-center"
        style={{
          transform: hovered ? "scale(1.06)" : "scale(1)",
          transition: "transform 0.5s ease-out",
        }}
      />

      {/* Base gradient — always present */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, rgba(0,0,0,0) 50.09%, #000000 100%)`,
        }}
      />

      {/* Hover overlay — framer fade */}
      <motion.div
        className="absolute inset-0"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{
          background: `linear-gradient(180deg, rgba(0,0,0,0) 35.92%, #000000 100%), linear-gradient(0deg, rgba(0,0,0,0.5), rgba(0,0,0,0.5))`,
        }}
      />

      {/* DEFAULT STATE */}
      <motion.div
        className="absolute inset-0 flex flex-col justify-end gap-3 p-5"
        animate={{ opacity: hovered ? 0 : 1 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        <h3 className="text-white font-[optima] font-[400] text-25 leading-[1.4] tracking-[2%] text-center mb-20">
          {card.title}
        </h3>

        <div className="flex items-center justify-between bg-[#FFFFFF0D] backdrop-blur-[30px] rounded-full px-[30px] 3xl:px-[57px] py-[14px] 3xl:py-[34px] w-full">
          {card.tags.map((tag, i) => (
            <div key={i} className="flex items-center gap-[10px]">
              <Image
                src={TAG_ICONS[i] ?? TAG_ICONS[0]}
                alt={tag.label}
                width={25}
                height={25}
                className="h-[18px] w-auto object-contain"
              />
              <span className="text-white font-[avenirHeavy] text-16 uppercase">
                {tag.label}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* HOVERED STATE */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center gap-5"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut", delay: hovered ? 0.14 : 0 }}
      >
        <h3 className="text-white font-[optima] font-[400] text-25 leading-[1.4] tracking-[2%] text-center mb-[120px]">
          {card.title}
        </h3>
        <Link href={card.href}>
          <OutlineButton
            text="View Community"
            borderColor="rgba(255,255,255,0.9)"
            px="px-10"
          />
        </Link>
      </motion.div>
    </div>
  );
};

export default CommunityCard;