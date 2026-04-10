"use client";

import Image from "next/image";
import { footerV2Data } from "../common/data";
import { useState } from "react";
import { motion } from "framer-motion";
import Reveal from "../animations/RevealOneByOneAnimation";
import { moveUp, moveUpV2, moveUpV3 } from "../motionVariants";

const InnerFooter = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (value: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const handleSubmit = () => {
    if (!email) {
      setError("Email is required");
      return;
    }

    if (!validateEmail(email)) {
      setError("Enter a valid email");
      return;
    }

    setError("");
    // ✅ proceed with API / submit
    console.log("Email:", email);
  };
  return (
    <footer className="w-full text-white bg-primary-2 relative z-10 overflow-hidden">
      {/* ================= TOP HERO SECTION ================= */}
      <div className="w-full overflow-hidden py-120 3xl:py-150 bg-primary-2">
        <div className="z-[20] h-full container flex flex-col lg:flex-row lg:justify-between items-center shrink-0">
          {/* Logo */}
          <motion.div
            variants={moveUp(0)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <Image
              src="/images/footer-logo-inner.svg"
              alt="logo"
              width={295}
              height={80}
              className="w-auto max-w-[291px] 3xl:w-[291px] h-[50px] xl:h-[80px] shrink-0"
            />
          </motion.div>

          {/* Stay Updated */}
          <div className="flex flex-col mt-12 lg:mt-0 lg:flex-row gap-5 xl:gap-10 items-center">
            <motion.p
              variants={moveUp(0.1)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="text-19 font-[avenirHeavy] text-white uppercase leading-[1.5]"
            >
              STAY UPDATED
            </motion.p>

            <motion.div
              variants={moveUp(0.15)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="flex items-center gap-8 xl:gap-15 rounded-[50px] p-[6px] border border-white relative"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError(""); // clear on typing
                }}
                placeholder={footerV2Data.top.placeholderEmail}
                className="bg-transparent flex-1 pl-5 xl:pl-9 py-[19px] font-[avenirHeavy] text-16 text-white placeholder-white/60 focus:outline-none"
              />

              <button
                onClick={handleSubmit}
                className="bg-white/10 cursor-pointer backdrop-blur-[30px] px-7 xl:px-10 py-[19.5px] rounded-[50px] text-description text-white"
              >
                {footerV2Data.top.sendText}
              </button>

              {/* ✅ Error message */}
              {error && (
                <p className="text-[14px] text-red-400 absolute -bottom-50 3xl:-bottom-30 left-[27px] xl:left-[42px]">
                  {error}
                </p>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* DIVIDER */}
<div className="relative w-full h-[2px]">
  {/* Gradient line underneath — always there */}
  <div
    className="absolute inset-0 w-full h-full"
    style={{
      background: "linear-gradient(90deg, #490905 0%, rgba(255,255,255,0.4) 50%, #490905 100%)",
    }}
  />

  {/* Left half — slides to the left */}
  <motion.div
    className="absolute left-0 top-0 w-1/2 h-full bg-white"
    initial={{ x: 0 }}
    whileInView={{ x: "-100%" }}
    viewport={{ once: true }}
    transition={{ duration: 0.9, ease: "easeInOut" }}
  />

  {/* Right half — slides to the right */}
  <motion.div
    className="absolute right-0 top-0 w-1/2 h-full bg-white"
    initial={{ x: 0 }}
    whileInView={{ x: "100%" }}
    viewport={{ once: true }}
    transition={{ duration: 0.9, ease: "easeInOut" }}
  />
</div>

      {/* ================= MENU COLUMNS ================= */}
      <div className="bg-primary-2 py-100">
        <div className="container grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 xl:gap-10">
          {footerV2Data.columns.map((col, i) => (
            <Reveal variants={moveUpV2} key={i}>
              <div>
                <h4 className="uppercase text-white md:text-19 font-[800] font-[avenirHeavy] mb-30">
                  {col.heading}
                </h4>
                <ul className="space-y-2">
                  {col.items.map((item, idx) => (
                    <Reveal variants={moveUpV3} key={idx}>
                      <li
                        key={idx}
                        className="text-white/80 3xl:text-19 font-[avenirRoman] hover:text-white transition-colors duration-300 cursor-pointer leading-[2.105]"
                      >
                        {item}
                      </li>
                    </Reveal>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* ================= BOTTOM FOOTER BAR ================= */}
      <div className="bg-primary-2 relative py-[17px]">
        <div className="absolute inset-0 z-0 bg-white/2 w-full h-full pointer-events-none" />

        <div className="container grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 items-center gap-7">
          {/* LEFT LINKS */}
          <motion.div
            variants={moveUp(0)}
            initial="hidden"
            whileInView="show"
            viewport={{once: true}}
            className="flex gap-3 xl:gap-6 3xl:gap-7 text-description justify-center md:justify-start w-full"
          >
            {footerV2Data.bottom.left.map((txt, i) => (
              <span
                key={i}
                className="text-white/45 hover:text-white/70 transition-colors duration-300 cursor-pointer"
              >
                {txt}
              </span>
            ))}
          </motion.div>

          {/* CENTER TEXT */}
          <motion.div
            variants={moveUp(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{once: true}}
            className="text-white/45 text-description text-center w-full"
          >
            ©{new Date().getFullYear()} Imtiaz Development. All Rights Reserved
          </motion.div>

          {/* ICONS */}
          <motion.div
            variants={moveUp(0.14)}
            initial="hidden"
            whileInView="show"
            viewport={{once: true}}
            className="flex gap-2 justify-center md:justify-start xl:justify-end w-full z-10"
          >
            {footerV2Data.bottom.icons.map((icon, i) => (
              <div
                key={i}
                className="cursor-pointer p-[13px] rounded-full bg-primary-2 flex items-center justify-center"
              >
                <Image
                  src={icon}
                  alt="icon"
                  width={22}
                  height={22}
                  className="w-[22px] h-[22px] hover:scale-110 transition-all duration-300"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default InnerFooter;
