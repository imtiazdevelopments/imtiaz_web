"use client";

import Image from "next/image";
import { awardData } from "../data";
import { SectionHeading } from "../../animations/SectionHeading";
import { motion } from "framer-motion";
import { moveUp } from "../../motionVariants";

export default function AwardSection() {
  return (
    <section
      data-header="dark"
      className="relative w-full overflow-hidden flex flex-col"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src={awardData.bgImage}
          alt="background"
          fill
          className="object-cover object-center"
        />
      </div>

      <div
        className="absolute inset-0 w-full"
        style={{
          background:
            "linear-gradient(180deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0) 18.57%)",
        }}
      />

      {/* Title block — top */}
      <div className="relative z-10 flex flex-col items-center pt-120 3xl:pt-130 mb-250 3xl:mb-[384px]">
        <SectionHeading
          title={awardData.title}
          className="max-w-[45ch] text-center mb-20"
        />

        {/* Divider line */}
        <motion.div
          variants={moveUp(0)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="w-full max-w-[527px] mx-auto"
          style={{
            height: "1px",
            background:
              "linear-gradient(90deg, rgba(23, 23, 23, 0) 0%, #171717 50%, rgba(23, 23, 23, 0) 100%)",
          }}
        />
      </div>

      {/* Description block — bottom */}
      <div
        style={{
          background:
            "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 90%)",
        }}
        className="relative z-20 w-full h-[471px] flex items-end pb-50"
      >
        <div className="mx-auto text-center container">
          <motion.div
            variants={moveUp(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="award-description mx-auto max-w-[1301px] text-description text-white/95 lg:text-white/70"
            dangerouslySetInnerHTML={{ __html: awardData.descriptions }}
          />
        </div>
      </div>
    </section>
  );
}
