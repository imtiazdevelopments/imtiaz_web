"use client";

import { motion } from "framer-motion";
import { moveUp } from "../motionVariants";
import { SectionHeading } from "../animations/SectionHeading";

const decodeHtml = (html: string) => {
  if (typeof document === "undefined") {
    return html;
  }
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};

const FooterContent = ({
  content,
  title,
}: {
  content: string;
  title: string;
}) => {
  return (
    <section
      className="w-full bg-white pt-[20px] md:pt-70 pb-[20px] md:pb-70"
      data-header="dark"
    >
      <div className="container container-spacing-details-page">
        <SectionHeading
          className="text-center pb-[20px] pb-[50px]"
          title={title}
        />
        <motion.div
          variants={moveUp(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="blog-content dynamicmn"
          dangerouslySetInnerHTML={{
            __html: decodeHtml(content),
          }}
        />
      </div>
    </section>
  );
};

export default FooterContent;
