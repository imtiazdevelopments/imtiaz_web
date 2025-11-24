"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function FloatingRightIcons() {
  const [darkHeader, setDarkHeader] = useState(false);

  useEffect(() => {
    const sections = document.querySelectorAll(
      "[data-header], .make-header-black"
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const isDark = entry.target.classList.contains("make-header-black");
            setDarkHeader(isDark);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "-100px 0px 0px 0px", // adjust for header height if needed
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="fixed right-[50px] top-1/2 -translate-y-1/2 flex flex-col gap-[9px] z-[900]">
      {/* ICON 1 */}
      <div
        className={`w-[50px] h-[50px] rounded-full backdrop-blur-[30px] flex items-center justify-center cursor-pointer transition-colors duration-300 ${
          darkHeader ? "bg-black" : "bg-white/25"
        }`}
      >
        <Image
          src="/icons/layout_icons/phone.svg"
          alt="icon1"
          width={27}
          height={27}
          className="w-[27px] h-[27px]"
        />
      </div>

      {/* ICON 2 */}
      <div
        className={`w-[50px] h-[50px] rounded-full backdrop-blur-[30px] flex items-center justify-center cursor-pointer transition-colors duration-300 ${
          darkHeader ? "bg-black" : "bg-white/25"
        }`}
      >
        <Image
          src="/icons/layout_icons/whatsapp.svg"
          alt="icon2"
          width={27}
          height={27}
          className="w-[27px] h-[27px]"
        />
      </div>

      {/* ICON 3 */}
      <div
        className={`w-[50px] h-[50px] rounded-full backdrop-blur-[30px] flex items-center justify-center cursor-pointer transition-colors duration-300 ${
          darkHeader ? "bg-black" : "bg-white/25"
        }`}
      >
        <Image
          src="/icons/layout_icons/message.svg"
          alt="icon3"
          width={27}
          height={27}
          className="w-[27px] h-[27px]"
        />
      </div>
    </div>
  );
}
