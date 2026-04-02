"use client";

import { pressItems } from "../../news/data";
import BlogCard from "../../blogs/sections/BlogCard";
import CustomOutlineButton from "../../common/CustomOutlineButton";
import { moveUp, moveUpV2 } from "../../motionVariants";
import Reveal from "../../animations/RevealOneByOneAnimation";
import { SectionHeading } from "../../animations/SectionHeading";
import { motion } from "framer-motion";

const OtherEvents = () => {
  return (
    <section className="pb-120 3xl:pb-160 container" data-header="dark">
      <div className="border-t border-black/10 pt-50">
        <SectionHeading
          title="Other Events"
          className="text-center uppercase"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-40 mt-50 overflow-hidden">
          {pressItems.slice(0, 2).map((item) => (
            <Reveal key={item.id} variants={moveUpV2}>
              <BlogCard blog={item} />
            </Reveal>
          ))}
        </div>
        <motion.div
          variants={moveUp(0)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex justify-center mt-50"
        >
          <CustomOutlineButton
            variant="dark"
            text="View All"
            borderColor="border-primary-2"
            textColor="text-foreground-light"
            px="px-[12px] lg:px-[20px] 3xl:px-[36.6px]"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default OtherEvents;
