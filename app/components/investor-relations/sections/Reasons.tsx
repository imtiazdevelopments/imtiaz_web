"use client";

import Image from "next/image";
import { investReasonsData } from "../data";
import { SectionHeading } from "../../animations/SectionHeading";
import { SectionDescription } from "../../animations/SectionDescription";
import Reveal from "../../animations/RevealOneByOneAnimation";
import { moveUp, moveUpV2 } from "../../motionVariants";
import { motion } from "framer-motion";

export default function Reasons() {
  const { sectionTitle, sectionDescription, reasons } = investReasonsData;

  return (
    <section className="w-full bg-gray">
      <div className="container py-120 3xl:py-130">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16 xl:mb-20">
          <SectionHeading title={sectionTitle} className="uppercase mb-20" />
          <SectionDescription
            text={sectionDescription}
            className="max-w-[750px] mx-auto text-foreground-light whitespace-pre-line"
          />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason, index) => {
            const col = index % 4;
            const row = Math.floor(index / 4);
            const totalRows = Math.ceil(reasons.length / 4);
            const isLastRow = row === totalRows - 1;
            const isFirstCol = col === 0;
            const isLastCol = col === 3 || index === reasons.length - 1;

            // Build padding classes per column position
            const paddingClass = isFirstCol
              ? "px-50 2xl:pl-0 2xl:pr-50 3xl:pl-0 3xl:pr-[54px]"
              : isLastCol
                ? "px-50 2xl:pl-50 2xl:pr-0 3xl:pl-[54px] 3xl:pr-0"
                : "px-50 2xl:px-50 3xl:px-[54px]";

            // Vertical separator — right side of cell, hidden on last col
            const showVertical = !isLastCol;
            // Horizontal separator — bottom of cell, hidden on last row
            const showHorizontal = !isLastRow;

            return (
              <Reveal key={reason.id} variants={moveUpV2}>
                <div className="relative group">
                  {/* Cell Content */}
                  <div
                    className={`flex flex-col items-center pb-40 pt-40 3xl:pt-[43px] 3xl:pb-[46px] ${paddingClass}`}
                  >
                    {/* Icon wrapper */}
                    <motion.div
                    variants={moveUp(0)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                      className="flex items-center justify-center mb-20
                               w-[64px] h-[64px] xl:w-[72px] xl:h-[72px] 3xl:w-[80px] 3xl:h-[80px]
                               rounded-full bg-[#4909050D] backdrop-blur-[30px]"
                    >
                      <Image
                        src={reason.icon}
                        alt={reason.title}
                        width={50}
                        height={50}
                        className={`object-contain ${index == 0 ? "h-[22px]" : "h-8"} w-auto`}
                      />
                    </motion.div>

                    {/* Title */}
                    <motion.h3
                    variants={moveUp(0.1)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                     className="font-[optima] uppercase text-25 leading-[1.4] mb-20 tracking-[2%] text-foreground">
                      {reason.title}
                    </motion.h3>

                    {/* Description */}
                    <motion.p
                    variants={moveUp(0.15)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                     className="text-description max-w-[335px] text-center text-foreground-light">
                      {reason.description}
                    </motion.p>
                  </div>

                  {/* Vertical gradient separator (right border) */}
                  {showVertical && (
                    <div
                      className="absolute top-1/2 right-0 bottom-0 -translate-y-1/2  w-[1px] h-[87%] hidden lg:block"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(73,9,5,0) 0%, #490905 50%, rgba(73,9,5,0) 100%)",
                      }}
                    />
                  )}

                  {/* Horizontal gradient separator (bottom border) */}
                  {showHorizontal && (
                    <div
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[1px] w-[87%]"
                      style={{
                        background:
                          "linear-gradient(90deg, rgba(73,9,5,0) 0%, #490905 50%, rgba(73,9,5,0) 100%)",
                      }}
                    />
                  )}

                  {/* Mobile/tablet vertical separator between 2-col pairs */}
                  {col % 2 === 0 && (
                    <div
                      className="absolute top-0 right-0 w-[1px] h-full block lg:hidden sm:block hidden"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(73,9,5,0) 0%, #490905 50%, rgba(73,9,5,0) 100%)",
                      }}
                    />
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
