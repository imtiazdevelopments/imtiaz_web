"use client";

import Image from "next/image";
import { Dispatch, SetStateAction, useState, useEffect, useRef } from "react";
import { menuItems, subMenuItems, contactInfo, socialLinks } from "./data";
import { motion } from "framer-motion";
import { moveRight, moveUp } from "../motionVariants";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function MegaMenu({
  setIsMenuOpen,
}: {
  setIsMenuOpen?: Dispatch<SetStateAction<boolean>>;
}) {
  const router = useRouter();
  const mounted = useRef(true);
  const navTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [activeMenu, setActiveMenu] = useState(menuItems[0]);
  const currentSubmenu = subMenuItems[activeMenu.id];

  // ── Two permanent BG layers, no key-swapping ──────────────────────────────
  const [bgA, setBgA] = useState(menuItems[0].bgImage);
  const [bgB, setBgB] = useState(menuItems[0].bgImage);
  const [aOnTop, setAOnTop] = useState(true); // which layer is currently visible
  // ─────────────────────────────────────────────────────────────────────────

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      if (navTimer.current) clearTimeout(navTimer.current);
    };
  }, []);

  const handleMenuChange = (item: (typeof menuItems)[0]) => {
    if (!mounted.current) return;
    setActiveMenu(item);
    // Load the new image into the hidden layer, then flip
    if (aOnTop) {
      setBgB(item.bgImage);
      setAOnTop(false);
    } else {
      setBgA(item.bgImage);
      setAOnTop(true);
    }
  };

const handleNavigate = (href?: string) => {
  if (!mounted.current) return;
  
  if (href && href !== "#") {
    // Instantly unmount without waiting for animation
    setIsMenuOpen?.(false);
    router.push(href);
  } else {
    setIsMenuOpen?.(false);
  }
};

  return (
    <div className="relative w-full h-screen overflow-hidden z-1000 bg-white flex flex-col">
      <div className="w-full" />

      <div className="relative flex-1 flex overflow-hidden">

        {/* ── PRELOAD ALL BG IMAGES (hidden, no layout impact) ── */}
        <div aria-hidden className="absolute w-0 h-0 overflow-hidden opacity-0 pointer-events-none">
          {menuItems.map((item) => (
            <Image
              key={item.id}
              src={item.bgImage}
              alt=""
              width={1}
              height={1}
              priority
            />
          ))}
        </div>

        {/* ── BG LAYER A ── */}
        <motion.div
          className="absolute inset-0 z-0"
          animate={{ opacity: aOnTop ? 1 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <Image src={bgA} alt="background" fill className="object-cover" priority />
        </motion.div>

        {/* ── BG LAYER B ── */}
        <motion.div
          className="absolute inset-0 z-0"
          animate={{ opacity: aOnTop ? 0 : 1 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <Image src={bgB} alt="background" fill className="object-cover" priority />
        </motion.div>

        {/* BLACK OVERLAY */}
        <div className="absolute inset-0 bg-black/75" />

        {/* CONTENT WRAPPER */}
        <div className="relative z-20 flex h-full w-full container pt-120">

          {/* LEFT MENU */}
          <div className="w-1/2 lg:w-1/3 2xl:w-1/4 flex flex-col justify-between xl:mr-4">
            <div className="flex flex-col justify-center gap-[22px] w-full text-white relative mb-120">
              {menuItems.map((item, index) => {
                const isActive = activeMenu.id === item.id;
                return (
                  <motion.div
                    variants={moveRight(index * 0.13)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    key={item.id}
                    className="relative flex items-center cursor-pointer"
                    onMouseEnter={() => handleMenuChange(item)}
                    onClick={() => item.href && handleNavigate(item.href)}
                  >
                    {/* ARROW */}
                    <motion.div
                      initial={false}
                      animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="absolute left-0 top-1/2 -translate-y-1/2 pb-1"
                    >
                      <Image
                        src="/icons/arrow_nav.svg"
                        alt={item.label}
                        width={28}
                        height={21}
                        className="md:w-[28px] md:h-[21px] w-[20px] h-[18px] invert brightness-0"
                      />
                    </motion.div>

                    {/* TITLE */}
                    <motion.div
                      initial={false}
                      animate={isActive ? { x: 40 } : { x: 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="relative inline-block"
                    >
                      <motion.span
                        initial={false}
                        animate={isActive ? { opacity: 0 } : { opacity: 1 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="text-16 md:text-25 3xl:text-30 font-[optima] uppercase text-white"
                      >
                        {item.label}
                      </motion.span>
                      <motion.span
                        aria-hidden="true"
                        initial={{ opacity: 0 }}
                        animate={isActive ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="absolute left-0 top-0 text-16 md:text-25 3xl:text-30 font-[optima] uppercase bg-gradient-to-r from-[#7A253A] to-white bg-clip-text text-transparent"
                      >
                        {item.label}
                      </motion.span>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>

            {/* CONTACT */}
            <motion.div
              variants={moveUp(0.2)}
              initial="hidden"
              animate="show"
              className="flex-col text-white text-sm pb-90 flex"
            >
              <div>
                <motion.div
                  variants={moveUp(0.2)}
                  initial="hidden"
                  animate="show"
                  className="mb-[5px] font-[avenir] font-[900] text-[16px] opacity-70"
                >
                  CONTACT US
                </motion.div>
<div className="flex flex-col lg:flex-row lg:items-center font-[avenirRoman] lg:gap-4 text-white opacity-70">
  <motion.div variants={moveUp(0.25)} initial="hidden" animate="show" className="text-[16px] leading-[2.2]">
    <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
  </motion.div>
  <div className="hidden lg:block w-[1px] h-[13px] bg-white" />
  <motion.div variants={moveUp(0.2)} initial="hidden" animate="show" className="text-[18px] leading-[2.2]">
    <a href={`tel:${contactInfo.phone}`}>{contactInfo.phone}</a>
  </motion.div>
</div>
                <div className="flex gap-[5px] w-full mt-[30px]">
                  {socialLinks.map((icon, i) => (
                    <motion.div
                      variants={moveUp(i * 0.2)}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ amount: 0.2, once: true }}
                      key={i}
                      className="cursor-pointer rounded-full w-[33px] h-[33px] bg-white/25 backdrop-blur-[30px] flex items-center justify-center"
                    >
                      <Image src={icon} alt="icon" width={22} height={22} className="opacity-100 w-[16px] h-[16px] hover:opacity-70 transition-opacity duration-300" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* MIDDLE DIVIDER */}
          <div className="relative w-[1px] mr-10 lg:mr-[70px] z-30">
            <div
              className="absolute left-0 top-0 h-full w-[1px] z-30"
              style={{ background: "linear-gradient(180deg, rgba(255,255,255,0) 0%, #FFFFFF 50%, rgba(255,255,255,0.8) 100%)" }}
            />
          </div>

          {/* RIGHT SUBMENU */}
          <div className="flex flex-col gap-2 lg:gap-4 text-white w-1/3 justify-start mt-[8%] overflow-hidden">
            {currentSubmenu.map((item, idx) => (
              <motion.div
                key={`menu-${item.id}-${idx}`}
                variants={moveRight(idx * 0.16)}
                initial="hidden"
                animate="show"
                viewport={{ once: true }}
              >
                <Link
                  href={item.href ?? "#"}
                  onClick={(e) => { e.preventDefault(); handleNavigate(item.href); }}
                  className="text-description md:text-18 leading-[2.2] uppercase cursor-pointer hover:translate-x-2 transition-all duration-300 block"
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* CLOSE BTN */}
          <button
            className="absolute top-4 md:top-8 lg:top-10 left-[50%] lg:left-[33.6%] 2xl:left-[26.5%] 3xl:left-[26.2%] -translate-x-1/2 bg-white/25 text-white rounded-full w-[40px] h-[40px] xl:h-[60px] xl:w-[60px] flex items-center justify-center cursor-pointer"
            onClick={() => setIsMenuOpen?.(false)}
          >
            <Image src="/icons/close_nav.svg" alt="close" width={21} height={19} className="w-[21px] h-[19px] hover:scale-[1.2] transition-all duration-300" />
          </button>
        </div>
      </div>
    </div>
  );
}