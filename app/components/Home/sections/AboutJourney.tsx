"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { moveUp } from "../../motionVariants";

interface AboutSectionProps {
  data: {
    tag: string;
    title: string;
    subtitle: string;
    description: string;
    button: {
      link: string;
      label: string;
    };
  };
}

const AboutSection = ({ data }: AboutSectionProps) => {
  return (
    <section className="bg-primary py-24 md:py-32 2xl:py-[170px] 3xl:py-[207px] overflow-hidden flex items-center justify-center">
      <div className="container mx-auto text-center px-4">
        {/* Tag */}
        <motion.p
          variants={moveUp(0.13)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="text-[25px] font-[avenir] leading-[1] font-[800] text-white mb-10 md:mb-16 2xl:mb-[120px] uppercase"
        >
          {data.tag}
        </motion.p>

        {/* Title */}
        <motion.h2
          variants={moveUp(0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="text-[40px] md:text-[50px] 2xl:text-[64px] 3xl:text-[70px] font-[400] font-[optima] text-white leading-[1] mb-[25px] uppercase"
        >
          {data.title}
        </motion.h2>

        {/* Subtitle */}
        <motion.h3
          variants={moveUp(0.3)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="text-[25px] font-[avenirBook] leading-[1] text-white mb-[40px] uppercase"
        >
          {data.subtitle}
        </motion.h3>

        {/* Description */}
        <motion.p
          variants={moveUp(0.4)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="text-[#FFD8E1] text-[19px] font-[avenirRoman] font-[400] leading-[1.3] mb-[50px] max-w-[75ch] mx-auto text-center"
        >
          {data.description}
        </motion.p>

        {/* Button */}
        <motion.div
          variants={moveUp(0.45)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <Link
            href={data.button.link}
            className="inline-block px-9 py-[19.5px] rounded-full border border-white text-white text-[17px] leading-[1] font-[avenirRoman] font-[400]"
          >
            {data.button.label}
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
