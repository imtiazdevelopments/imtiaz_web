"use client";

import Image from "next/image";
import { footerV2Data } from "./data";
import { moveUp } from "../motionVariants";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const InnerFooter = () => {
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-25vh", "25vh"]);

  return (
    <footer className="w-full text-white">
      {/* ================= TOP HERO SECTION ================= */}
      <div
        ref={heroRef}
        className="w-full overflow-hidden py-12 md:py-[70px] lg:py-25 2xl:py-30 3xl:py-[150px] bg-[#490905]"
      >
        <div className="z-[2] h-full container flex flex-col lg:flex-row lg:justify-between items-center shrink-0">
          {/* Logo */}
          <div className="overflow-hidden">
            <motion.div
              variants={moveUp(0.4)}
              initial="hidden"
              whileInView="show"
              viewport={{ amount: 0.2, once: true }}
              exit="exit"
            >
              <Image
                src="/images/footer-logo-inner.svg"
                alt="logo"
                width={295}
                height={80}
                className="w-auto max-w-[291px] 3xl:w-[291px] h-[50px] xl:h-[80px] shrink-0"
              />
            </motion.div>
          </div>

          {/* Stay Updated */}
          <div className="flex flex-col mt-12 lg:mt-0 lg:flex-row gap-5 xl:gap-10 items-center">
            <motion.div
              variants={moveUp(0.7)}
              initial="hidden"
              whileInView="show"
              viewport={{ amount: 0.2, once: true }}
              exit="exit"
            >
              <p className="uppercase text-[19px] font-[avenirHeavy] text-white">
                STAY UPDATED
              </p>
            </motion.div>

            <div className="overflow-hidden">
              <motion.div
                variants={moveUp(0.9)}
                initial="hidden"
                whileInView="show"
                viewport={{ amount: 0.2, once: true }}
                exit="exit"
                className="flex items-center gap-8 xl:gap-15 rounded-[50px] p-[6px] border border-white"
              >
                <input
                  type="email"
                  placeholder={footerV2Data.top.placeholderEmail}
                  className="bg-transparent flex-1 pl-5 xl:pl-9 py-[19px] font-[avenirHeavy] font-[800] text-[16px] text-white placeholder-white/60 focus:outline-none"
                />
                <button className="bg-white/10 cursor-pointer backdrop-blur-[30px] px-7 xl:px-10 py-[19.5px] rounded-[50px] font-[avenirRoman] text-[17px]">
                  {footerV2Data.top.sendText}
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* DIVIDER */}
      <div
        className="w-full h-px"
        style={{
          background:
            "linear-gradient(90deg, #490905 0%, rgba(255,255,255,0.4) 50%, #490905 100%)",
        }}
      />

      {/* ================= MENU COLUMNS ================= */}
      <div className="bg-[#490905] py-10 md:py-15 xl:py-20 2xl:py-20 3xl:pt-[114px] 3xl:pb-[120px]">
        <div className="container grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 xl:gap-10">
          {footerV2Data.columns.map((col, i) => (
            <motion.div
              variants={moveUp(i * 0.25)}
              initial="hidden"
              whileInView="show"
              viewport={{ amount: 0.2, once: true }}
              exit="exit"
              key={i}
            >
              <h4 className="uppercase text-white text-[17px] md:text-[19px] font-[800] font-[avenirHeavy] mb-[30px]">
                {col.heading}
              </h4>
              <ul className="space-y-2">
                {col.items.map((item, idx) => (
                  <motion.li
                    variants={moveUp(idx * 0.2)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ amount: 0.2, once: true }}
                    exit="exit"
                    key={idx}
                    className="text-white/80 text-[17px] 3xl:text-[19px] font-[avenirRoman] hover:text-white transition-colors duration-300 cursor-pointer leading-[2.105]"
                  >
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ================= BOTTOM FOOTER BAR ================= */}
      <div className="bg-[#490905] relative py-[17px]">
        <div className="absolute inset-0 z-0 bg-[#FFFFFF05] w-full h-full" />

        <div className="container grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 items-center gap-7">
          {/* LEFT LINKS */}
          <div className="flex gap-3 xl:gap-7 text-[16px] font-[avenirHeavy] justify-center md:justify-start w-full">
            {footerV2Data.bottom.left.map((txt, i) => (
              <span
                key={i}
                className="text-white/45 hover:text-white/70 transition-colors duration-300 cursor-pointer"
              >
                {txt}
              </span>
            ))}
          </div>

          {/* CENTER TEXT */}
          <div className="text-white/45 text-[16px] font-[avenirHeavy] leading-[2.1] text-center w-full">
            {footerV2Data.bottom.center}
          </div>

          {/* ICONS */}
          <div className="flex gap-2 justify-center md:justify-start xl:justify-end w-full z-10">
            {footerV2Data.bottom.icons.map((icon, i) => (
              <div
                key={i}
                className="cursor-pointer p-[13px] rounded-full bg-[#490905] flex items-center justify-center"
              >
                <Image
                  src={icon}
                  alt="icon"
                  width={22}
                  height={22}
                  className="w-[22px] h-[22px] hover:opacity-80 transition-opacity duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default InnerFooter;
