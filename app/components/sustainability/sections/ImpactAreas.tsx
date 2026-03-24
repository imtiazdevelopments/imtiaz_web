"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { impactAreas } from "../data";

export default function ImpactAreas() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const fadeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    impactAreas.items.forEach((item) => {
      const img = new window.Image();
      img.src = item.image;
    });
  }, []);

  const handleEnter = (index: number) => {
    if (index === activeIndex) return;
    if (fadeTimer.current) clearTimeout(fadeTimer.current);
    setCurrentIndex(index);
    setActiveIndex(index);
  };

  return (
    <section className="relative w-full h-[95vh] 3xl:h-[907px] overflow-hidden">
      {/* Persistent dark base */}
      <div className="absolute inset-0 bg-[#0a0a0a] z-0" />

      {/* Framer bg image crossfade — slower, more cinematic */}
      <AnimatePresence mode="sync">
        <motion.div
          key={currentIndex}
          className="absolute inset-0 z-[1]"
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{
            duration: 1.4,
            ease: [0.62, 0.05, 0.01, 0.99],
          }}
        >
          <Image
            src={impactAreas.items[currentIndex].image}
            alt=""
            fill
            className="object-cover object-center"
            priority
          />
        </motion.div>
      </AnimatePresence>

      {/* Global overlay */}
      <div className="absolute inset-0 bg-black/50 z-10" />

      {/* Section title */}
      <h2 className="absolute top-130 left-1/2 -translate-x-1/2 z-20 text-white text-heading text-center pointer-events-none whitespace-nowrap">
        {impactAreas.title}
      </h2>

      {/* Columns */}
      <div className="absolute left-0 bottom-0 right-0 z-20 flex">
        {impactAreas.items.map((item, i) => {
          const isActive = activeIndex === i;

          return (
            <div
              key={item.id}
              className="flex-1 relative flex items-center justify-center cursor-default min-h-[368px]"
              onMouseEnter={() => handleEnter(i)}
            >
              {/* Vertical divider */}
{i !== 0 && (
  <div
    className="absolute left-0 top-0 h-full w-px"
    style={{
      background: "linear-gradient(180deg, rgba(255,255,255,0) 0%, #FFFFFF 100%)",
    }}
  />
)}

              {/* Col bottom gradient */}
              <motion.div
                className="absolute inset-0"
                animate={{ opacity: isActive ? 1 : 0 }}
                transition={{ duration: 0.9, ease: [0.62, 0.05, 0.01, 0.99] }}
                style={{
                  background:
                    "linear-gradient(180deg, rgba(0,0,0,0) 7.68%, rgba(0,0,0,0.94) 100%)",
                }}
              />

              {/* Content */}
              <div className="relative flex flex-col items-center justify-center text-center">
                {/* Title */}
                <h3
                  className={`text-white font-[optima] uppercase max-w-[201px] text-25 transition-transform duration-700 ease-[cubic-bezier(0.62,0.05,0.01,0.99)] ${
                    isActive ? "-translate-y-[10px]" : "-translate-y-0"
                  }`}
                >
                  {item.title}
                </h3>

                {/* Description */}
                <div
                  className={`overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.62,0.05,0.01,0.99)] ${
                    isActive
                      ? "max-h-[200px] opacity-100 translate-y-0"
                      : "max-h-0 opacity-0 translate-y-3"
                  }`}
                >
                  <div className="pt-5">
                    <p className="text-white/80 text-16 font-[avenirHeavy] leading-[1.54] max-w-[507px] mx-auto">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
