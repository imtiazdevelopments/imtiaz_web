"use client";

import Image from "next/image";
import type { messageData } from "../data";
import { SectionHeading } from "../../animations/SectionHeading";
import { SectionDescription } from "../../animations/SectionDescription";
import { motion } from "framer-motion";
import { moveUp } from "../../motionVariants";
import { useParallax } from "@/app/hooks/useParallax";

type Props = {
  data: messageData;
};

export default function MessageSection({ data }: Props) {
  const { ref, parallaxY } = useParallax(15);
  return (
    <section
      data-header="dark"
      className="relative min-h-screen w-full overflow-hidden flex flex-col"
    >
      {/* Background Image */}
      <div ref={ref} className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src={data.bgImage}
          alt="background"
          fill
          className="object-cover"
          style={{
            transform: `scale(${1.15}) translateY(${parallaxY}vh)`,
          }}
        />
      </div>

      {/* Title */}
      <div className="relative z-10 w-fit mx-auto">
        <div className="w-full text-center pt-120 3xl:pt-130 mb-20">
          <SectionHeading title={data.title} className="uppercase" />
        </div>
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

      {/* Main content area */}
      <div className="relative z-10 flex flex-1 items-end">
        <div className="w-full container">
          {/* 3-col grid: col 1 & 3 equal (1fr), col 2 fixed 489px */}
          <div className="grid grid-cols-[1fr_auto_1fr]">
            {/* Col 1 — Left Content */}
            <div className="h-full flex flex-col justify-between pb-130 ml-[12%] 3xl:ml-[27.6%]">
              {/* Quote icon */}
              <div>
                <motion.div
                  variants={moveUp(0)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="mb-20"
                >
                  <Image
                    src="/icons/quote.svg"
                    alt="quote"
                    width={68}
                    height={52}
                    className="object-contain w-auto h-[45px]  3xl:w-[68px] 3xl:h-[52px]"
                    priority
                  />
                </motion.div>
                {/* Quote text */}
                <motion.p
                  variants={moveUp(0.12)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="text-25 font-[optima] uppercase tracking-[2%] text-primary max-w-[385px]"
                >
                  {data.quote}
                </motion.p>
              </div>

              {/* Name & Designation */}
              <div>
                <motion.p
                  variants={moveUp(0)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="text-25 font-[optima] leading-[1.4] uppercase tracking-[2%] text-primary mb-[10px]"
                >
                  {data.name}
                </motion.p>
                <motion.p
                  variants={moveUp(0.12)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="text-description text-foreground-light"
                >
                  {data.designation}
                </motion.p>
              </div>
            </div>

            {/* Col 2 — Person Image (center, bottom-aligned) */}
            <motion.div
              variants={moveUp(0.12)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="flex items-end justify-center"
            >
              <Image
                src={data.personImage}
                alt={data.name}
                width={0}
                height={689}
                sizes="100%"
                className="w-auto object-contain object-bottom h-[500px] 3xl:h-[689px]"
                priority
              />
            </motion.div>

            {/* Col 3 — Right Content */}
            <div className="pb-130 pt-90 3xl:pt-[96px] justify-self-end ml-[15%] 3xl:ml-0 3xl:pr-[27px]">
              <SectionDescription
                text={data.description}
                className="text-description text-foreground-light max-w-[561px] whitespace-pre-line"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
