"use client";

import Image from "next/image";
import { Dispatch, SetStateAction, useState, useEffect } from "react";
import { menuItems, subMenuItems, contactInfo, socialLinks } from "./data";
import { motion } from "framer-motion";
import { moveRight, moveUp } from "../motionVariants";
import InfiniteSlider from "./InfiniteSlider";

export default function MegaMenu({
  setIsMenuOpen,
}: {
  setIsMenuOpen?: Dispatch<SetStateAction<boolean>>;
}) {
  const [activeMenu, setActiveMenu] = useState(menuItems[0]);
  const currentSubmenu = subMenuItems[activeMenu.id];
  const [prevImage, setPrevImage] = useState(menuItems[0].bgImage);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPrevImage(activeMenu.bgImage);
    }, 300); // match fade duration

    return () => clearTimeout(timer);
  }, [activeMenu]);

  return (
    <div className="relative w-full h-screen overflow-hidden z-1000 bg-white">
      {/* Background Image */}
      {/* STATIC PREVIOUS IMAGE */}
      <Image
        key={`prev-${prevImage}`}
        src={prevImage}
        alt="background-prev"
        fill
        className="object-cover absolute inset-0 z-0"
        priority
      />

      {/* FADING-IN NEW IMAGE */}
      <motion.div
        key={`active-${activeMenu.bgImage}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="absolute inset-0 z-0"
      >
        <Image
          src={activeMenu.bgImage}
          alt="background-active"
          fill
          className="object-cover"
          priority
        />
      </motion.div>

      <div className="absolute inset-0 bg-black/75" />
      {/* LEFT EDGE OVERLAY */}
      <div
        className="absolute inset-0 z-10 w-full"
        style={{
          background:
            "linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 2%, rgba(0,0,0,0) 50%, rgba(0,0,0,1) 100%, rgba(0,0,0,1) 100%)",
        }}
      />

      {/* Content wrapper */}
      <div className="relative z-20 flex h-full w-full container pb-40 xl:pb-45 2xl:pb-[218px] pt-30">
        {/* LEFT SIDE MENU */}
        <div className="w-1/2 lg:w-1/4 flex items-center">
          <div className="flex flex-col justify-center gap-[25px] w-full text-white overflow-hidden">
            {menuItems.map((item, index) => {
              const isActive = activeMenu.id === item.id;
              return (
                <motion.div
                  variants={moveRight(index * 0.13)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  key={item.id}
                  className="flex gap-2 lg:gap-[18px] items-center cursor-pointer"
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
               text-17 lg:text-30 font-[optima] leading-[1.2] uppercase duration-500 transition-all
              ${
                isActive
                  ? "translate-x-1 bg-gradient-to-r from-[#7A253A] to-white bg-clip-text text-transparent"
                  : "text-white"
              }
            `}
                  >
                    {item.label}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* MIDDLE DIVIDER */}
        <div className="relative w-[1px] mr-10 lg:mr-[70px]">
          <div
            className="absolute left-0 top-0 h-full w-[1px]"
            style={{
              background:
                "linear-gradient(360deg, #FFFFFF 0%, #FFFFFF 50%, rgba(255,255,255,0) 100%)",
            }}
          />
        </div>

        {/* RIGHT SIDE SUBMENU */}
        <div className="flex flex-col gap-2 lg:gap-4  text-white w-1/3 justify-center overflow-hidden">
          {currentSubmenu.map((item, idx) => (
            <motion.div
              key={`menu-${item.id}-${idx}`}
              variants={moveRight(idx * 0.16)}
              initial="hidden"
              animate="show"
              viewport={{ once: true }}
            >
              <div className="text-17 font-[avenirRoman] leading-[2.2] uppercase cursor-pointer hover:translate-x-2 transition-all duration-300">
                {item.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CLOSE BTN */}
        <button
          className="absolute top-14 left-[49.5%] xl:left-[25.3%] -translate-x-1/2 
          bg-white/25 text-white rounded-full h-[60px] w-[60px] flex items-center justify-center cursor-pointer"
          onClick={() => (setIsMenuOpen ? setIsMenuOpen(false) : null)}
        >
          <Image
            src={"/icons/close_nav.svg"}
            alt="close"
            width={21}
            height={19}
            className="w-[21px] h-[19px] hover:scale-[1.2] transition-all duration-300"
          />
        </button>

        {/* RIGHT CONTACT INFO */}
        <motion.div
          variants={moveUp(0.2)}
          initial="hidden"
          animate="show"
          className="flex flex-col text-white text-sm w-1/4 self-end mb-23 items-end hidden lg:block"
        >
          <div>
            <motion.div
              variants={moveUp(0.2)}
              initial="hidden"
              animate="show"
              className="mb-4 font-[avenir] font-[900] text-[16px] opacity-70"
            >
              CONTACT US
            </motion.div>
            <div className="flex items-center font-[avenirRoman] gap-4 text-white opacity-70">
              <motion.div
                variants={moveUp(0.25)}
                initial="hidden"
                animate="show"
                className="text-[16px] leading-[2.2]"
              >
                {contactInfo.email}
              </motion.div>

              {/* VERTICAL DIVIDER */}
              <div className="w-[1px] h-[13px] bg-white" />

              <motion.div
                variants={moveUp(0.2)}
                initial="hidden"
                animate="show"
                className="text-[16px] leading-[2.2]"
              >
                {contactInfo.phone}
              </motion.div>
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
        </motion.div>
      </div>

      {/* BOTTOM DIVIDER */}
      <div
        className="absolute left-0 bottom-40 xl:bottom-45 2xl:bottom-[218px] w-full h-[1px] z-20"
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
