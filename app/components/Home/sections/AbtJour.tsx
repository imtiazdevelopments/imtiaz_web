"use client";

import Link from "next/link";

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
import React from "react";

const AbtJour = ({ data }: AboutSectionProps) => {
  return (
    <>
      <div className=" mx-auto text-center px-4 w-[1000px]">
        <p className="text-[25px] font-[avenir] leading-[1] font-[800] text-white mb-10 md:mb-16 2xl:mb-[120px] uppercase">
          {data.tag}
        </p>

        <h2 className="text-[40px] md:text-[50px] 2xl:text-[64px] 3xl:text-[70px] font-[400] font-[optima] text-white leading-[1] mb-[25px] uppercase">
          {data.title}
        </h2>

        <h3 className="text-[25px] font-[avenirBook] leading-[1] text-white mb-[40px] uppercase">
          {data.subtitle}
        </h3>

        <p className="text-[#FFD8E1] text-[19px] font-[avenirRoman] font-[400] leading-[1.3] mb-[50px] max-w-[75ch] mx-auto  text-center">
          {data.description}
        </p>

        <Link
          href={data.button.link}
          className="inline-block px-9 py-[19.5px] rounded-full border border-white text-white text-[17px] leading-[1] font-[avenirRoman] font-[400]"
        >
          {data.button.label}
        </Link>
      </div>
    </>
  );
};

export default AbtJour;
