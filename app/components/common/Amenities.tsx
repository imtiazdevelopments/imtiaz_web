"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionHeading } from "../animations/SectionHeading";
import { SectionDescription } from "../animations/SectionDescription";
type EverythingWithinData = {
  title: string;
  description: string;
  amenities: {
    icon: string;
    label: string;
  }[];
};

type Props = {
  data: EverythingWithinData;
  maxTitle?: string;
};

export default function Amenities({ data, maxTitle }: Props) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;

    const cards = gridRef.current.querySelectorAll(".amenity-card");

    gsap.set(cards, { opacity: 0, y: 50, scale: 0.95 });

    gsap.to(cards, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.6,
      ease: "power3.out",
      stagger: 0.1,
      scrollTrigger: {
        trigger: gridRef.current,
        start: "top 80%",
        once: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [data.amenities]);

  return (
    <section data-header="dark" className="w-full py-[70px] lg:py-120 3xl:py-160 ">
      <div className="container flex flex-col justify-center">
        {/* Header */}
        <div className="text-center ">
          <SectionHeading
            title={data.title}
            className="mb-20 text-foreground"
          />
          <SectionDescription
            text={data.description}
            className={`shrink-0  mx-auto text-foreground-light whitespace-pre-line ${maxTitle ? maxTitle : ""}`}
          />
        </div>
        <div>
          <div>
            <div
              ref={gridRef}
              className="flex flex-wrap md:justify-center mt-[40px] md:mt-50 gap-y-[40px] lg:gap-y-60"
            >
              {data.amenities.map((item, i) => (
                <div
                  key={i}
                  className="amenity-card group relative flex flex-col items-center justify-start gap-[10px] md:gap-4 xl:gap-[30px] p-3 md:px-6 md:py-[20px] text-center cursor-default w-1/2 sm:w-1/3 lg:w-1/4 overflow-hidden"
                >
                  {/* Left fill */}
                  {/* <span className="absolute inset-y-0 left-0 w-[50%] bg-[#EAEAEA] transform scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100" /> */}
                  {/* Right fill */}
                  {/* <span className="absolute inset-y-0 right-0 w-[50%] bg-[#EAEAEA] transform scale-x-0 origin-right transition-transform duration-300 ease-out group-hover:scale-x-100" /> */}

                  {/* Icon */}
                  <div className="relative z-10 w-10 h-10 md:w-12 md:h-12 xl:w-15 xl:h-15 flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-1">
                    <Image
                      src={item.icon}
                      alt={item.label.replace("\n", " ")}
                      width={60}
                      height={60}
                      className="object-contain"
                    />
                  </div>

                  {/* Label */}
                  <p className="relative z-10 px-2 sm:px-0 font-[optima] text-25 text-foreground leading-[1.4] uppercase transition-colors duration-300">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
