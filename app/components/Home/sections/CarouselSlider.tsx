"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";

export interface feats {
  icon: string;
  label: string;
}

type CarouselSliderProps = {
  features: feats[];
  activeIndex: number;
};

const SPEED = 0.7;

const CarouselSlider = ({ features, activeIndex }: CarouselSliderProps) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const offsetRef = useRef(0);

  const looped = [...features,...features,...features, ...features];

  // Reset offset when slide changes
  useEffect(() => {
    offsetRef.current = 0;
  }, [activeIndex]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const animate = () => {
      const singleWidth = track.scrollWidth / 2;
      offsetRef.current += SPEED;
      if (offsetRef.current >= singleWidth) offsetRef.current -= singleWidth;
      track.style.transform = `translateX(${-offsetRef.current}px)`;
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [features]);

  return (
    <div className="overflow-hidden w-full">
      <div
        ref={trackRef}
        className="flex items-center gap-7 will-change-transform whitespace-nowrap w-max"
      >
        {looped.map((f, idx) => (
          <div key={idx} className="flex items-center gap-3 flex-shrink-0">
            <Image src={f.icon} width={20} height={20} alt={f.label} />
            <span className="text-white text-description uppercase ">
              {f.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarouselSlider;
