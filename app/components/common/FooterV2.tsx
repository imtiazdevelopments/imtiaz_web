"use client";

import Image from "next/image";
import { footerV2Data } from "./data";

const Footer = () => {
  return (
    <footer className="w-full text-white">
      {/* ================= TOP HERO SECTION ================= */}
      <div
        className="w-full bg-cover bg-center relative py-[70px] lg:py-[120px] 2xl:py-[150px]"
        style={{
          backgroundImage: `url(${footerV2Data.top.bgImage})`,
        }}
      >
        <div className="absolute inset-0 bg-black/70" />

        <div className="relative h-full container flex flex-col lg:flex-row lg:justify-between items-center">
          {/* Logo */}
          <Image
            src={footerV2Data.top.logo}
            alt="logo"
            width={270}
            height={80}
            className="w-auto max-w-[270px] h-[80px]"
          />

          {/* Stay Updated */}
          <div className="flex flex-col lg:flex-row gap-10 items-center">
            <p className="uppercase text-[19px] font-[avenirHeavy] text-white">
              STAY UPDATED
            </p>

            <div className="flex items-center gap-10 xl:gap-15 rounded-[50px] p-[6px] border border-white">
              <input
                type="email"
                placeholder={footerV2Data.top.placeholderEmail}
                className="bg-transparent flex-1 pl-5 xl:pl-9 py-[19px] font-[avenirRoman] text-[17px] text-white placeholder-white/60 focus:outline-none"
              />
              <button className="bg-white/25 backdrop-blur-[30px] px-7 xl:px-10 py-[19.5px] rounded-[50px] font-[avenirRoman] text-[17px]">
                {footerV2Data.top.sendText}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ================= MENU COLUMNS ================= */}
      <div className="bg-primary pt-[114px] pb-[120px]">
        <div className="container grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-10">
          {footerV2Data.columns.map((col, i) => (
            <div key={i}>
              <h4 className="uppercase text-white text-[19px] font-[800] font-[avenirHeavy] mb-[30px]">
                {col.heading}
              </h4>

              <ul className="space-y-3">
                {col.items.map((item, idx) => (
                  <li
                    key={idx}
                    className="text-[#FFD8E1] text-[17px] font-[avenirRoman] hover:text-white transition-colors duration-300 cursor-pointer leading-[2.05]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ================= BOTTOM FOOTER BAR ================= */}
      <div className="bg-[#842D43] py-[17px]">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-7">
          {/* Left Links */}
          <div className="flex gap-7 text-[16px] font-[avenirRoman] text-white flex-wrap w-[30%] opacity-45">
            {footerV2Data.bottom.left.map((txt, i) => (
              <span
                key={i}
                className="hover:text-white/70 transition-colors duration-300 cursor-pointer "
              >
                {txt}
              </span>
            ))}
          </div>

          {/* Center Text */}
          <div className="text-white text-[15px] font-[avenirRoman] leading-[2.1] text-center opacity-45">
            {footerV2Data.bottom.center}
          </div>

          {/* Icons */}
          <div className="flex gap-2 w-[30%] justify-end">
            {footerV2Data.bottom.icons.map((icon, i) => (
              <div
                key={i}
                className="cursor-pointer p-[13px] rounded-full bg-primary flex items-center justify-center"
              >
                <Image
                  src={icon}
                  alt="icon"
                  width={22}
                  height={22}
                  className="opacity-100 w-[22px] h-[22px] hover:opacity-80 transition-opacity duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
