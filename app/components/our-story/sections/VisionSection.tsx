"use client";

import Image from "next/image";
import { visionSectionData } from "../data";
import { SectionHeading } from "../../animations/SectionHeading";
import { SectionDescription } from "../../animations/SectionDescription";
import Reveal from "../../animations/RevealOneByOneAnimation";
import { moveUp, moveUpV2 } from "../../motionVariants";
import { motion } from "framer-motion";
import { useParallax } from "@/app/hooks/useParallax";

export default function VisionSection() {
  const { title, description, bgImage, stats } = visionSectionData;
  const { ref, parallaxY } = useParallax(15);

  return (
    <section
      data-header="dark"
      className="make relative w-full overflow-hidden text-white h-[88vh] xl:h-[95vh]"
    >
      {/* Background Image */}
      <div ref={ref} className="absolute inset-0 overflow-hidden">
        <Image
          src={bgImage}
          alt={title}
          width={1920}
          height={1080}
          priority
                    style={{
            transform: `scale(${1.15}) translateY(${parallaxY}vh)`,
          }}
          className="object-cover object-top h-full w-full absolute"
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
      <div className="relative z-10 pt-120 3xl:pt-130 pb-60 text-center flex flex-col justify-between items-center h-full container">
        {/* Title and Description */}
        <div>
          <SectionHeading
            title={title}
            className="uppercase text-foreground mb-20"
          />
          <SectionDescription
            text={description}
            className="max-w-[870px] mx-auto text-foreground-light"
          />
        </div>

        {/* Stats */}
        <div className="flex justify-center items-stretch">
          {stats.map((item, index) => (
            <Reveal variants={moveUpV2} key={index}>
              <div className="flex items-stretch">
                {/* Column */}
                <div className="py-35 px-30 text-center flex flex-col justify-center">
                  <motion.h3
                    variants={moveUp(0)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="text-heading text-white mb-[10px]"
                  >
                    {item.value}
                  </motion.h3>
                  <motion.p
                    variants={moveUp(0.12)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="text-25 leading-[1.4] uppercase font-[optima] tracking-[2%]"
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
    </section>
  );
}
