import React from "react";
import { motion } from "framer-motion";

const MarqueeText = () => {
  return (
    <div className="w-full h-fit bottom-0 overflow-hidden flex items-center absolute z-0">
      <motion.div
        className="flex min-w-max space-x-8 opacity-50"
        animate={{ x: ["0%", "-100%"] }} // Moves seamlessly
        transition={{ repeat: Infinity, duration: 80, ease: "linear" }} // Increased duration for slower speed
      >
        {[...Array(40)].map((_, i) => (
          /*  <motion.h1
          key={i}
            className="text-[300px] font-light text-transparent bg-clip-text bg-gradient-to-r from-gray-500 via-white to-gray-500 whitespace-nowrap leading-none"
> */
          <motion.h1
            key={i}
            className="text-[60px] xl:text-[85px] 2xl:text-[130px] font-light text-white font-[optima]"
          >
            IMTIAZ .
          </motion.h1>
        ))}
      </motion.div>
    </div>
  );
};

export default MarqueeText;
