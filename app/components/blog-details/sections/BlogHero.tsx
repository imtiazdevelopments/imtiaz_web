"use client";

  import { useState, useEffect } from "react";
import Image from "next/image";
import Breadcrumb from "../../common/Breadcrumb";
import { BlogDetail } from "../data";
import { GoShareAndroid } from "react-icons/go";
import { SectionHeading } from "../../animations/SectionHeading";
import { motion } from "framer-motion";
import { moveDown, moveUp } from "../../motionVariants";
import { useParallax } from "@/app/hooks/useParallax";

interface Props {
  blog: BlogDetail;
}

const BlogHero = ({ blog }: Props) => {
  const { ref, parallaxY } = useParallax(15);

const [size, setSize] = useState(32);

useEffect(() => {
  const handleResize = () => {
    setSize(window.innerWidth < 768 ? 20 : 32);
  };

  handleResize();
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);
  return (
    <section className="w-full pt-[174px] md:pt-200" data-header="dark">
      <div className="container flex flex-col items-center container-spacing-details-page">
        {/* Breadcrumb */}
        <motion.div
          variants={moveDown(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <Breadcrumb variant="black" />
        </motion.div>

        {/* Title */}
        <SectionHeading
          title={blog.title}
          className="max-w-[50ch] text-foreground text-center uppercase mt-[40px] md:mt-100"
        />

        {/* Meta row */}
        <div className="mt-[40px] md:mt-20 flex items-center justify-between w-full">
          <motion.div
            variants={moveUp(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex items-center gap-[10px] text-foreground-light font-[avenirBook] text-[14px] md:text-16"
          >
            <div>
              <span>{blog.category}</span>
              <span> - </span>
              <span>{blog.date}</span>
            </div>
            {/* <span>|</span>
            <div>
              <span>Reading Time: {blog.readingTime}</span>
            </div> */}
          </motion.div>

          {/* Share button */}
          <motion.button
            variants={moveUp(0.15)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-foreground-light cursor-pointer hover:scale-110 transition-colors duration-300"
            aria-label="Share"
          >
<GoShareAndroid size={size} />
          </motion.button>
        </div>
        {/* Full-width Hero Image */}
        <div
          ref={ref}
          className="w-full h-[352px] md:h-[500px] lg:h-[500px] 2xl:h-[560px] 3xl:h-[722px] mt-5 md:mt-50 relative overflow-hidden"
        >
          <Image
            src={blog.heroImage}
            alt={blog.title}
            fill
            priority
            sizes="100vw"
            style={{
              transform: `scale(${1.15}) translateY(${parallaxY}vh)`,
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default BlogHero;
