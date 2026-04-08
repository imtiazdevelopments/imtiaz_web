"use client";

import Image from "next/image";
import { useState } from "react";

interface OutlineButtonProps {
    text: string;
    borderColor?: string;
    px?: string;
    textColor?: string;
    onClick?: () => void;
    variant?: "light" | "dark";
    className?: string;
    minWidth?: boolean;
    value?: string;              // ✅ add
    onChange?: (val: string) => void; // ✅ add
}

const CustomSearch = ({
    className,
    text,
    borderColor = "border-white/90",
    textColor = "text-white",
    px = "px-10",
    onClick,
    variant = "light",
    minWidth = true,
    value,
    onChange
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
            className={`pl-[24px] pr-[50px] 3xl:pr-[151px] cursor-pointer flex items-center  group relative transition-all duration-300 ${className} overflow-hidden ${px} py-[14px] lg:py-4 3xl:py-[20.62px] rounded-full border ${borderColor} ${textColor} font-[avenirHeavy] text-19 leading-[100%] gap-[20px]`}
            style={{ transform: pressed ? "scale(0.95)" : "scale(1)" }}
        >
            {/* Left fill */}
            {/* <span
                className={`absolute inset-y-0 left-0 w-[50%] ${fillColor} transform scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100`}
            /> */}
            {/* Right fill */}
            {/* <span
                className={`absolute inset-y-0 right-0 w-[50%] ${fillColor} transform scale-x-0 origin-right transition-transform duration-300 ease-out group-hover:scale-x-100`}
            /> */}
            <Image src={'/icons/search.svg'} width={20} height={20} alt="" />
            <span
                className={`text-16 relative z-10 transition-colors duration-300 w-full xl:w-[139px]  ${minWidth ? "min-w-[90px]" : ""} inline-block text-start`}
            >
                <input
    type="text"
    value={value}
    onChange={(e) => onChange?.(e.target.value)}
    className="outline-none w-full xl:w-[120%] 2xl:w-[170%]"
    placeholder="Search Projects"
/>
                {/* {text} */}
            </span>
        </button>
    );
};

export default CustomSearch;
