"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

export default function FloatingRightIcons() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const icons = el.querySelectorAll<HTMLElement>(".floating-icon");

    const ctx = gsap.context(() => {
      gsap.fromTo(
        icons,
        { x: 80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          ease: "expo.out",
          stagger: 0.12,
          delay: 0.3,
        },
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="floating-icons hidden lg:flex fixed right-[12px] 3xl:right-[15px] top-1/2 -translate-y-1/2 flex-col gap-[9px] z-[900]"
    >
      {[
        { src: "/icons/layout_icons/phone.svg", alt: "phone" },
        { src: "/icons/layout_icons/whatsapp.svg", alt: "whatsapp" },
        { src: "/icons/layout_icons/message.svg", alt: "message" },
      ].map(({ src, alt }) => (
        <div
          key={alt}
          className="floating-icon w-[45px] h-[45px] rounded-full backdrop-blur-[30px] flex items-center justify-center cursor-pointer bg-foreground-light/70 transition-colors duration-300"
        >
          <Image
            src={src}
            alt={alt}
            width={27}
            height={27}
            className="w-[22px] h-[22px] transition-transform duration-300 hover:scale-[1.05]"
          />
        </div>
      ))}
    </div>
  );
}
