"use client";

import Image from "next/image";
import { visionSectionData } from "../data";
import { SectionHeading } from "../../animations/SectionHeading";
import { SectionDescription } from "../../animations/SectionDescription";
import Reveal from "../../animations/RevealOneByOneAnimation";
import { moveUp, moveUpV2 } from "../../motionVariants";
import { motion } from "framer-motion";

export default function VisionSection() {
  const { title, description, bgImage, bgImageMobile, stats } = visionSectionData;

  return (
    <section data-header="dark" className="make   ">
      <div className="pt-[70px] pb-[40px] md:hidden">
        <div className="container text-center">
          <SectionHeading
            title={title}
            className="uppercase text-foreground mb-20"
          />
          <SectionDescription
            text={description}
            className="max-w-[870px] mx-auto text-foreground-light whitespace-pre-line"
          />
        </div>
      </div>
      <div className="relative w-full overflow-hidden text-white h-[316px] md:h-[88vh] xl:h-[95vh]">
        {/* Background Image */}
        <div className="hidden sm:block absolute inset-0 overflow-hidden">
          <Image
            src={bgImage}
            alt={title}
            width={1920}
            height={1080}
            priority
            className="object-cover object-top h-full w-full absolute"
          />
        </div>

        <div className="sm:hidden absolute inset-0 overflow-hidden">
          <Image
            src={bgImageMobile}
            alt={title}
            width={520}
            height={580}
            priority
            className="object-cover object-bottom h-full w-full"
          />
        </div>

        {/* Gradient Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(0, 0, 0, 0) 52.32%, #000000 105.74%)",
          }}
        />

        {/* Content */}
        <div className="relative z-10 pt-120 3xl:pt-130 pb-4 3xl:pb-50 text-center flex flex-col justify-end md:justify-between items-center h-full container">
          {/* Title and Description */}
          <div className="hidden md:block md:-mt-10 lg:-mt-8 2xl:-mt-5">
            <div>
              <SectionHeading
                title={title}
                className="uppercase text-foreground mb-20"
              />
              <SectionDescription
                text={description}
                className="max-w-[870px] mx-auto text-foreground-light whitespace-pre-line"
              />
            </div>
          </div>

          {/* Stats */}
          <div className="flex justify-center items-stretch absolute bottom-0 md:relative">
            {stats.map((item, index) => (
              <Reveal variants={moveUpV2} key={index}>
                <div className="flex items-stretch">
                  {/* Column */}
                  <div className="  ps-0 pe-5 md:px-[75px] last:pe-0 last:ps-5 last:md:px-[76px] text-center flex flex-col justify-center">
                    <motion.h3
                      viewport={{ once: true }}
                      className="text-heading text-white mb-[5px] md:mb-[10px] max-sm:text-30"
                    >
                      {item.value}
                    </motion.h3>
                    <motion.p
                      viewport={{ once: true }}
                      className="text-[18px] md:text-25 3xl:text-[24px] leading-[1.4] uppercase font-[optima] tracking-[2%] max-sm:text-[16px]"
                    >
                      {item.label}
                    </motion.p>
                  </div>

                  {/* Separator */}
                  {index !== stats.length - 1 && (
                    <div
                      className="w-px self-stretch"
                      style={{
                        borderLeft: "1px solid",
                        borderImageSource:
                          "linear-gradient(180deg, rgba(255,255,255,0) 0%, #FFFFFF 50%, rgba(255,255,255,0) 100%)",
                        borderImageSlice: 1,
                      }}
                    />
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
