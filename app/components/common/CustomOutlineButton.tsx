"use client";

import { useState } from "react";

interface OutlineButtonProps {
  text: string;
  borderColor?: string;
  px?: string;
  textColor?: string;
  onClick?: () => void;
  variant?: "light" | "dark";
  className?: string;
}

const CustomOutlineButton = ({
  className,
  text,
  borderColor = "border-white/90",
  textColor = "text-white",
  px = "px-10",
  onClick,
  variant = "light",
}: OutlineButtonProps) => {
  const fillColor = variant === "dark" ? "bg-primary-2" : "bg-white/10";
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
      className={`cursor-pointer group relative transition-all duration-300 ${className} overflow-hidden ${px} py-[14px] lg:py-5 rounded-full border ${borderColor} ${textColor} font-[avenirHeavy] text-19 leading-[100%]`}
      style={{ transform: pressed ? "scale(0.95)" : "scale(1)" }}
    >
      {/* Left fill */}
      <span
        className={`absolute inset-y-0 left-0 w-[50%] ${fillColor} transform scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100`}
      />
      {/* Right fill */}
      <span
        className={`absolute inset-y-0 right-0 w-[50.1%] ${fillColor} transform scale-x-0 origin-right transition-transform duration-300 ease-out group-hover:scale-x-100`}
      />
      <span
        className={`relative z-10 transition-colors duration-300 min-w-[98px] inline-block text-center ${variant === "dark" ? "group-hover:text-white" : ""}`}
      >
        {text}
      </span>
    </button>
  );
};

export default CustomOutlineButton;
