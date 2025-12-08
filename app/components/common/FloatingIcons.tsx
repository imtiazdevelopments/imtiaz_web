"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function FloatingRightIcons() {
  const [darkHeader, setDarkHeader] = useState(false);

  useEffect(() => {
    const checkBackground = () => {
      const floating = document.querySelector(".floating-icons") as HTMLElement;
      if (!floating) return;

      const prevPE = floating.style.pointerEvents;
      floating.style.pointerEvents = "none";

      const posY = window.innerHeight / 2;
      const posX = window.innerWidth - 75;

      const el = document.elementFromPoint(posX, posY);
      floating.style.pointerEvents = prevPE;

      if (!el) return;

      let node: HTMLElement | null = el as HTMLElement;
      let isDark = false;

      while (node && node !== document.body) {
        if (node.classList.contains("make-header-black")) {
          isDark = true;
          break;
        }
        node = node.parentElement;
      }

      setDarkHeader(isDark);
    };

    window.addEventListener("scroll", checkBackground);
    window.addEventListener("resize", checkBackground);
    checkBackground();

    return () => {
      window.removeEventListener("scroll", checkBackground);
      window.removeEventListener("resize", checkBackground);
    };
  }, []);

  const bgColor = darkHeader ? "bg-black/50" : "bg-white/25";

  return (
    <div className="floating-icons fixed right-[15px] top-1/2 -translate-y-1/2 flex flex-col gap-[9px] z-[900]">
      <div
        className={`w-[50px] h-[50px] rounded-full backdrop-blur-[30px] flex items-center justify-center transition-colors duration-300 cursor-pointer ${bgColor}`}
      >
        <Image
          src="/icons/layout_icons/phone.svg"
          alt="phone"
          width={27}
          height={27}
          className="w-[27px] h-[27px]"
        />
      </div>

      <div
        className={`w-[50px] h-[50px] rounded-full backdrop-blur-[30px] flex items-center justify-center transition-colors duration-300 cursor-pointer ${bgColor}`}
      >
        <Image
          src="/icons/layout_icons/whatsapp.svg"
          alt="whatsapp"
          width={27}
          height={27}
          className="w-[27px] h-[27px]"
        />
      </div>

      <div
        className={`w-[50px] h-[50px] rounded-full backdrop-blur-[30px] flex items-center justify-center transition-colors duration-300 cursor-pointer ${bgColor}`}
      >
        <Image
          src="/icons/layout_icons/message.svg"
          alt="message"
          width={27}
          height={27}
          className="w-[27px] h-[27px]"
        />
      </div>
    </div>
  );
}
