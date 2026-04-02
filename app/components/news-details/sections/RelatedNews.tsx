"use client";

import { pressItems } from "../../news/data";
import NewsCard from "../../news/sections/NewsCard";
import CustomOutlineButton from "../../common/CustomOutlineButton";
import { moveUp, moveUpV2 } from "../../motionVariants";
import Reveal from "../../animations/RevealOneByOneAnimation";
import { SectionHeading } from "../../animations/SectionHeading";
import { motion } from "framer-motion";

const RelatedNews = () => {
  return (
    <section className="pb-120 3xl:pb-160 container" data-header="dark">
      <div className="border-t border-black/10 pt-50">
        <SectionHeading
          title="Related News"
          className="text-center uppercase"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-25 mt-50">
          {pressItems.slice(0, 3).map((item) => (
            <Reveal variants={moveUpV2} key={item.id}>
              <NewsCard key={item.id} item={item} />
            </Reveal>
          ))}
        </div>
        <motion.div
          variants={moveUp(0.2)}
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

export default RelatedNews;
