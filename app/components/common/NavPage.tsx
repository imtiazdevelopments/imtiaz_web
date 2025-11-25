"use client";

import Image from "next/image";
import { useState } from "react";
import { menuItems, subMenuItems, contactInfo, socialLinks } from "./data";
import { motion } from "framer-motion";
import { moveUp } from "../motionVariants";
import InfiniteSlider from "./InfiniteSlider";

export default function MegaMenu() {
  const [activeMenu, setActiveMenu] = useState(menuItems[0]);
  const currentSubmenu = subMenuItems[activeMenu.id];

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Image */}
      <Image
        src={activeMenu.bgImage}
        alt="background"
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/75" />

      {/* Content wrapper */}
      <div className="relative z-10 flex h-full w-full container pb-50 pt-30">
        {/* LEFT SIDE MENU */}
        <div className="w-1/4 flex items-center">
          <div className="flex flex-col justify-center gap-[25px] w-fit text-white">
            {menuItems.map((item) => {
              const isActive = activeMenu.id === item.id;
              return (
                <div
                  key={item.id}
                  className="flex gap-[21px] items-center cursor-pointer"
                  onMouseEnter={() => setActiveMenu(item)}
                >
                  {/* ARROW */}
                  <div
                    className={`${
                      isActive ? "block" : "hidden"
                    } transition-all duration-300`}
                  >
                    <Image
                      src={"/icons/arrow_nav.svg"}
                      alt={item.label}
                      width={27}
                      height={16}
                      className="w-[27px] h-[20px]"
                    />
                  </div>
                  {/* TITLE */}
                  <span
                    className={`
              text-30 font-[optmia] leading-[1.2] uppercase duration-300 transition-all
              ${
                isActive
                  ? "translate-x-1 bg-gradient-to-r from-[#7A253A] to-white bg-clip-text text-transparent"
                  : "text-white"
              }
            `}
                  >
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* MIDDLE DIVIDER */}
        <div className="relative w-[1px] mr-[70px]">
          <div
            className="absolute left-0 top-0 h-full w-[1px]"
            style={{
              background:
                "linear-gradient(360deg, #FFFFFF 0%, #FFFFFF 50%, rgba(255,255,255,0) 100%)",
            }}
          />
        </div>

        {/* RIGHT SIDE SUBMENU */}
        <div className="flex flex-col gap-4 text-white w-1/3 justify-center">
          {currentSubmenu.map((item) => (
            <div
              key={item.id}
              className="text-[16px] font-[avenirRoman] leading-[2.2] uppercase cursor-pointer hover:translate-x-2 transition-all duration-300"
            >
              {item.label}
            </div>
          ))}
        </div>

        {/* CLOSE BTN */}
        <button
          className="absolute top-14 left-[25.3%] -translate-x-1/2 
          bg-white/25 text-white rounded-full h-[60px] w-[60px] flex items-center justify-center"
        >
          <Image
            src={"/icons/close_nav.svg"}
            alt="close"
            width={21}
            height={19}
            className="w-[21px] h-[19px]"
          />
        </button>

        {/* RIGHT CONTACT INFO */}
        <div className="flex flex-col text-white text-sm w-1/4 self-end mb-23 items-end">
          <div>
            <div className="mb-4 font-[avenir] font-[900] text-[16px] opacity-70">
              CONTACT US
            </div>
            <div className="flex items-center font-[avenirRoman] gap-4 text-white opacity-70">
              <div className="text-[16px] leading-[2.2]">
                {contactInfo.email}
              </div>

              {/* VERTICAL DIVIDER */}
              <div className="w-[1px] h-[13px] bg-white" />

              <div className="text-[16px] leading-[2.2]">
                {contactInfo.phone}
              </div>
            </div>

            <div className="flex gap-[5px] w-full mt-[46px]">
              {socialLinks.map((icon, i) => (
                <motion.div
                  variants={moveUp(i * 0.2)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ amount: 0.2, once: true }}
                  key={i}
                  className="cursor-pointer rounded-full w-[33px] h-[33px] bg-white/25 backdrop-blur-[30px] flex items-center justify-center"
                >
                  <Image
                    src={icon}
                    alt="icon"
                    width={22}
                    height={22}
                    className="opacity-100 w-[16px] h-[16px] hover:opacity-80 transition-opacity duration-300"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM DIVIDER */}
      <div
        className="absolute left-0 bottom-50 w-full h-[1px]"
        style={{
          background:
            "linear-gradient(90deg, rgba(255,255,255,0) 0%, #FFFFFF 50%, rgba(255,255,255,0) 100%)",
        }}
      />

      {/* INFINITE SLIDER */}
      <InfiniteSlider />
    </div>
  );
}
