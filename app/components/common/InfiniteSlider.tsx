import React from "react";
import { motion } from "framer-motion";

const MarqueeText = () => {
  return (
    <div className="z-10 w-full h-fit bottom-0 overflow-hidden flex items-center absolute">
      <motion.div
        className="flex min-w-max space-x-10"
        animate={{ x: ["0%", "-100%"] }} // Moves seamlessly
        transition={{ repeat: Infinity, duration: 80, ease: "linear" }} // Increased duration for slower speed
      >
        {[...Array(10)].map((_, i) => (
          /*  <motion.h1
          key={i}
            className="text-[300px] font-light text-transparent bg-clip-text bg-gradient-to-r from-gray-500 via-white to-gray-500 whitespace-nowrap leading-none"
> */
          <motion.h1
            key={i}
            className="text-[130px] font-light text-white font-[optima]"
          >
            IMTIAZ .
          </motion.h1>
        ))}
      </motion.div>
    </div>
  );
};

export default MarqueeText;
