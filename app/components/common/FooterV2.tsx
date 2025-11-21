"use client";

import Image from "next/image";
import { footerV2Data } from "./data";

const Footer = () => {
  return (
    <footer className="w-full text-white">
      {/* ================= TOP HERO SECTION ================= */}
      <div
        className="w-full h-[373px] bg-cover bg-center relative"
        style={{
          backgroundImage: `url(${footerV2Data.top.bgImage})`,
        }}
      >
        <div className="absolute inset-0 bg-[#000000B2]" />

        <div className="relative h-full container flex justify-between items-center">
          {/* Logo */}
          <Image
            src={footerV2Data.top.logo}
            alt="logo"
            width={200}
            height={60}
            className="w-auto h-[60px]"
          />

          {/* Stay Updated */}
          <div className="flex flex-col gap-4">
            <p className="uppercase tracking-wide text-[16px]">STAY UPDATED</p>

            <div className="flex items-center bg-white/20 backdrop-blur-md rounded-full px-4 py-2 w-[320px] md:w-[380px] border border-white/40">
              <input
                type="email"
                placeholder={footerV2Data.top.placeholderEmail}
                className="bg-transparent flex-1 text-white placeholder-white/60 focus:outline-none"
              />
              <button className="bg-white/20 px-6 py-2 rounded-full border border-white/40 hover:bg-white/30 transition">
                {footerV2Data.top.sendText}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ================= MENU COLUMNS ================= */}
      <div className="bg-[#7A253A] py-[70px]">
        <div className="container grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-10">
          {footerV2Data.columns.map((col, i) => (
            <div key={i}>
              <h4 className="uppercase text-white text-[15px] font-semibold mb-[30px]">
                {col.heading}
              </h4>

              <ul className="space-y-3">
                {col.items.map((item, idx) => (
                  <li
                    key={idx}
                    className="text-[#FFD8E1] text-[14px] hover:text-white transition"
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
      <div className="bg-[#7A253A] border-t border-white/20 py-6">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Left Links */}
          <div className="flex gap-6 text-[13px] text-white/70 flex-wrap">
            {footerV2Data.bottom.left.map((txt, i) => (
              <span key={i} className="hover:text-white transition">
                {txt}
              </span>
            ))}
          </div>

          {/* Center Text */}
          <div className="text-white/70 text-[13px] text-center">
            {footerV2Data.bottom.center}
          </div>

          {/* Icons */}
          <div className="flex gap-4">
            {footerV2Data.bottom.icons.map((icon, i) => (
              <Image
                key={i}
                src={icon}
                alt="icon"
                width={20}
                height={20}
                className="opacity-80 hover:opacity-100 transition"
              />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
