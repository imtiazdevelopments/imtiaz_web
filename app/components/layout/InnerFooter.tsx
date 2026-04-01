"use client";

import Image from "next/image";
import { footerV2Data } from "../common/data";
import { useState } from "react";

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
    <footer className="w-full text-white">
      {/* ================= TOP HERO SECTION ================= */}
      <div className="w-full overflow-hidden py-120 3xl:py-150 bg-primary-2">
        <div className="z-[20] h-full container flex flex-col lg:flex-row lg:justify-between items-center shrink-0">
          {/* Logo */}
          <Image
            src="/images/footer-logo-inner.svg"
            alt="logo"
            width={295}
            height={80}
            className="w-auto max-w-[291px] 3xl:w-[291px] h-[50px] xl:h-[80px] shrink-0"
          />

          {/* Stay Updated */}
          <div className="flex flex-col mt-12 lg:mt-0 lg:flex-row gap-5 xl:gap-10 items-center">
            <p className="text-19 font-[avenirHeavy] text-white uppercase leading-[1.5]">
              STAY UPDATED
            </p>

            <div className="flex items-center gap-8 xl:gap-15 rounded-[50px] p-[6px] border border-white relative">
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
      <div className="bg-primary-2 py-100">
        <div className="container grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 xl:gap-10">
          {footerV2Data.columns.map((col, i) => (
            <div key={i}>
              <h4 className="uppercase text-white md:text-19 font-[800] font-[avenirHeavy] mb-30">
                {col.heading}
              </h4>
              <ul className="space-y-2">
                {col.items.map((item, idx) => (
                  <li
                    key={idx}
                    className="text-white/80 3xl:text-19 font-[avenirRoman] hover:text-white transition-colors duration-300 cursor-pointer leading-[2.105]"
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
      <div className="bg-primary-2 relative py-[17px]">
        <div className="absolute inset-0 z-0 bg-white/2 w-full h-full pointer-events-none" />

        <div className="container grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 items-center gap-7">
          {/* LEFT LINKS */}
          <div className="flex gap-3 xl:gap-6 3xl:gap-7 text-description justify-center md:justify-start w-full">
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
          <div className="text-white/45 text-description text-center w-full">
            ©{new Date().getFullYear()} Imtiaz Development. All Rights Reserved
          </div>

          {/* ICONS */}
          <div className="flex gap-2 justify-center md:justify-start xl:justify-end w-full z-10">
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
          </div>
        </div>
      </div>
    </footer>
  );
};

export default InnerFooter;
