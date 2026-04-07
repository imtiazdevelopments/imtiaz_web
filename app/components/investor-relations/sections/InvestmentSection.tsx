"use client";

import Image from "next/image";
import { investmentAppealData } from "../data";
import { SectionHeading } from "../../animations/SectionHeading";
import { SectionDescription } from "../../animations/SectionDescription";
import { useParallax } from "@/app/hooks/useParallax";

export default function InvestmentSection() {
  const { ref, parallaxY } = useParallax(15);
  return (
    <section className="w-full bg-white">
      {/* Top white header */}
      <div className="container text-center pt-120 3xl:pt-160">
        <SectionHeading
          title={investmentAppealData.sectionTitle}
          className="uppercase mb-20"
        />
        <SectionDescription
          text={investmentAppealData.sectionDescription}
          className="max-w-[754px] mx-auto mb-50 text-foreground-light whitespace-pre-line"
        />
      </div>

      {/* Image section */}
      <div className="relative w-full h-[96vh]">
        {/* Full-width image */}
        <div ref={ref} className="relative w-full h-full overflow-hidden">
          <Image
            src={investmentAppealData.image.src}
            alt="bg-image-investment"
            fill
            className="object-cover"
            priority
            style={{
              transform: `translateY(${parallaxY}vh)`,
            }}
          />
        </div>

        {/* Overlay gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(0, 0, 0, 0) 47.08%, #000000 106.98%)",
          }}
        />

        {/* Stats grid — pinned to bottom */}
        <div className="absolute bottom-0 left-0 right-0 pb-60">
          <div className="container">
            <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
              {investmentAppealData.stats.map((stat, index) => {
                const isLast = index === investmentAppealData.stats.length - 1;

                return (
                  <div
                    key={index}
                    className="relative flex flex-col items-center justify-center py-40"
                  >
                    {/* Value */}
                    <span className="text-heading text-white mb-[10px]">
                      {stat.value}
                    </span>

                    {/* Label */}
                    <span className="text-description text-white">
                      {stat.label}
                    </span>

                    {/* Vertical separator */}
                    {!isLast && (
                      <div
                        className="absolute top-0 right-0 w-px h-full"
                        style={{
                          borderRight: "1px solid",
                          borderImageSource:
                            "linear-gradient(180deg, rgba(255, 255, 255, 0) -6.9%, #FFFFFF 46.55%, rgba(255, 255, 255, 0) 100%)",
                          borderImageSlice: 1,
                        }}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
