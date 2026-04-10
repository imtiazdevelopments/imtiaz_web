import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface PropertyStatProps {
  label: string;
  value: string;
  icon: string;
}

function PropertyStat({ label, value, icon }: PropertyStatProps) {
  return (
    <div
      className="
        flex flex-col items-left sm:items-center gap-1 md:gap-[10px]
      "
    >
      {/* Label */}
      <span className="
        text-white/50 !leading-[1.563] text-[12px] font-[avenirHeavy] sm:text-description uppercase 
      ">
        {label}
      </span>

      {/* Icon + Value */}
      <div className="flex items-center gap-2 lg:gap-3 xl:gap-5">
        <Image 
          src={icon} 
          alt={label} 
          width={24} 
          height={24} 
          className="w-4 h-4 md:w-[24px] md:h-[24px]" 
        />
        <span className="
          text-white text-25 lg:text-[20px] xl:text-25 font-[optima] tracking-[2%] uppercase leading-[1.4] whitespace-nowrap
        ">
          {value}
        </span>
      </div>
    </div>
  );
}

export default function BannerDetails() {
  const containerRef = useRef<HTMLDivElement>(null);
useEffect(() => {
  if (!containerRef.current) return;

  const statItems = containerRef.current.querySelectorAll(".stat-item");
  if (!statItems.length) return;

  // Kill previous tweens
  gsap.killTweensOf(statItems);

  // Initial state
  gsap.set(statItems, {
    opacity: 0,
    y: 30,
  });

  // Timeline WITHOUT ScrollTrigger
  const tl = gsap.timeline({
    delay: 1.5,
  });

  // Stagger animation
  tl.to(statItems, {
    opacity: 1,
    y: 0,
    duration: 0.6,
    ease: "power2.out",
    stagger: 0.15, // ✅ cleaner than loop
  });

  return () => {
    tl.kill();
  };
}, []);

  const stats = [
    {
      label: "Location",
      value: "Dubai Island",
      icon: '/images/projects/mark1.svg',
    },
    {
      label: "Payment Plan",
      value: "Flexible Over 5 Years",
      icon: '/images/projects/mark2.svg',
    },
    {
      label: "Starting At",
      value: "$150,000",
      icon: '/images/projects/mark3.svg',
    },
    {
      label: "Delivery Date",
      value: "Delivery Date",
      icon: '/images/projects/mark4.svg',
    },
  ];

  return (
    <div
      ref={containerRef}
      className="w-full bg-white/10 backdrop-blur-[15px] border-t border-white/10 px-5 sm:px-6 md:px-10 lg:px-16 py-1 sm:py-5 md:py-6 lg:py-7 2xl:pt-[49px] 2xl:pb-[46px]"
    >
      {/* Desktop & Tablet — single row */}
      <div className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-y-6 gap-x-4">
        {stats.map((stat) => (
          <div key={stat.label} className="flex justify-center stat-item">
            <PropertyStat {...stat} />
          </div>
        ))}
      </div>

      {/* Mobile — 2x2 grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-2 sm:hidden">
        {stats.map((stat, i) => (
          <div key={stat.label} className="flex flex-col stat-item">
            <div className="flex justify-left py-3">
              <PropertyStat {...stat} />
            </div>

            {/* Horizontal gradient divider — hidden after last row */}
            {i < stats.length - 1 && (
              <div
                className="w-full h-px"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(73,9,5,0) 0%, #b6afafff 50%, rgba(73,9,5,0) 100%)",
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}