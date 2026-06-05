"use client";

  import { useState, useEffect } from "react";
import Image from "next/image";
import Breadcrumb from "../../common/Breadcrumb";
// import { BlogDetail, BlogDetailData, BlogListingItem } from "../data";
import { GoShareAndroid } from "react-icons/go";
import { SectionHeading } from "../../animations/SectionHeading";
import { motion } from "framer-motion";
import { moveDown, moveUp } from "../../motionVariants";
import { useParallax } from "@/app/hooks/useParallax";


const BlogHero = ({ blog }: {blog:any}) => {
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

console.log(blog)

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
        <div className="mt-[40px] md:mt-20 flex items-center justify-end w-full">


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
      </div>
    </section>
  );
};

export default BlogHero;
