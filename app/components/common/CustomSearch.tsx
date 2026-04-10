"use client";

import Image from "next/image";
import { useState } from "react";

interface OutlineButtonProps {
  borderColor?: string;
  px?: string;
  textColor?: string;
  onClick?: () => void;
  className?: string;
  value?: string; // ✅ add
  onChange?: (val: string) => void; // ✅ add
}

const CustomSearch = ({
  className,
  borderColor = "border-white/90",
  textColor = "text-white",
  onClick,
  value,
  onChange,
}: OutlineButtonProps) => {
  const [pressed, setPressed] = useState(false);

  const handlePress = () => {
    setPressed(true);
    setTimeout(() => setPressed(false), 200); // hold scale for 200ms even on quick tap
  };

  return (
    <button
      onClick={onClick}
      onMouseDown={handlePress}
      onTouchStart={handlePress}
      className={`cursor-pointer flex items-center min-w-[220px] min-[1700px]:w-[353px]  group relative transition-all duration-300 ${className} overflow-hidden pl-20 2xl:pl-[23px] py-[14px] lg:py-4 3xl:py-[20.62px] rounded-full border ${borderColor} ${textColor} text-description leading-[100%] gap-20`}
      style={{ transform: pressed ? "scale(0.95)" : "scale(1)" }}
    >
      <Image src={"/icons/search.svg"} width={20} height={20} alt="" className="h-[20px] w-auto" />
      <span
        className={`text-16 relative z-10 transition-colors duration-300 inline-block text-start`}
      >
        <input
          type="text"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className="outline-none w-full placeholder:text-foreground-light"
          placeholder="Search Projects"
        />
      </span>
    </button>
  );
};

export default CustomSearch;
