"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

export default function FloatingMobileIcons() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  // 🔥 Animate icons
  useEffect(() => {
    if (!containerRef.current) return;

    const icons = containerRef.current.querySelectorAll(".floating-icon");

    gsap.to(icons, {
      y: open ? 0 : 20,
      opacity: open ? 1 : 0,
      duration: 0.35,
      stagger: 0.08,
      ease: "power3.out",
      pointerEvents: open ? "auto" : "none",
    });
  }, [open]);

  // 🔥 Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (

    <> 
        <div
          ref={containerRef}
          className="floating-icons hidden lg:flex fixed right-[6px] md:right-[12px] top-1/2 -translate-y-1/2 flex-col gap-[5px] md:gap-[9px] z-[900]"
        >
          {[
            { src: "/icons/layout_icons/phone.svg", alt: "phone" },
            { src: "/icons/layout_icons/whatsapp.svg", alt: "whatsapp" },
            { src: "/icons/layout_icons/message.svg", alt: "message" },
          ].map(({ src, alt }) => (
            <div
              key={alt}
              className="floating-icon w-[35px] h-[35px] md:w-[45px] md:h-[45px] rounded-full backdrop-blur-[30px] flex items-center justify-center cursor-pointer bg-foreground-light/70 transition-colors duration-300"
            >
              <Image
                src={src}
                alt={alt}
                width={27}
                height={27}
                className="w-[18px] h-[18px] md:w-[22px] md:h-[22px] transition-transform duration-300 hover:scale-[1.05]"
              />
            </div>
          ))}
        </div>
   
    <div ref={wrapperRef} className="fixed bottom-3 right-3 z-[900] lg:hidden">
      
      {/* Icons */}
      <div ref={containerRef} className="flex flex-col items-end gap-3 mb-3">
        {[
          { src: "/icons/layout_icons/phone.svg", alt: "phone" },
          { src: "/icons/layout_icons/whatsapp.svg", alt: "whatsapp" },
          { src: "/icons/layout_icons/message.svg", alt: "message" },
        ].map(({ src, alt }) => (
          <div
            key={alt}
            className="floating-icon w-[45px] h-[45px] rounded-full backdrop-blur-[30px] flex items-center justify-center bg-foreground-light/70 opacity-0 translate-y-4"
          >
            <Image src={src} alt={alt} width={22} height={22} />
          </div>
        ))}
      </div>

      {/* Main Button */}
      <div
        onClick={(e) => {
          e.stopPropagation(); // 🔥 prevent outside click trigger
          setOpen(!open);
        }}
        className="w-[45px] h-[45px] rounded-full bg-foreground-light/60 text-white backdrop-blur-[20px] flex items-center justify-center cursor-pointer"
      >
        +
      </div>
    </div>
    </>
  );
}
   
  
