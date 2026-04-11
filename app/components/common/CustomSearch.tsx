"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { useLenis } from "@/app/contexts/LenisContext";

interface OutlineButtonProps {
  borderColor?: string;
  px?: string;
  textColor?: string;
  onClick?: () => void;
  className?: string;
  value?: string;
  onChange?: (val: string) => void;
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
  const ref = useRef<HTMLButtonElement>(null);
  const pendingRef = useRef(false);
  const pendingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { scrollTo } = useLenis();

  useEffect(() => {
    return () => {
      if (pendingTimerRef.current) clearTimeout(pendingTimerRef.current);
      pendingRef.current = false;
    };
  }, []);

  const handlePress = () => {
    setPressed(true);
    setTimeout(() => setPressed(false), 200);
  };

  const handleFocus = () => {
    if (pendingRef.current) return;
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const inputHeight = 80;
    const willBeCutOff = rect.bottom + inputHeight > window.innerHeight;

    if (willBeCutOff) {
      pendingRef.current = true;
      const targetScrollY = window.scrollY + rect.top - window.innerHeight * 0.4;
      scrollTo(targetScrollY, { duration: 0.8 });

      pendingTimerRef.current = setTimeout(() => {
        pendingRef.current = false;
        pendingTimerRef.current = null;
        inputRef.current?.focus();
      }, 250);
    }
  };

  return (
    <button
      ref={ref}
      onClick={onClick}
      onMouseDown={handlePress}
      onTouchStart={handlePress}
      className={`cursor-pointer flex items-center min-w-[220px] min-[1700px]:w-[353px] group relative transition-all duration-300 ${className} overflow-hidden pl-20 2xl:pl-[23px] py-[14px] lg:py-4 3xl:py-[20.62px] rounded-full border ${borderColor} ${textColor} text-description leading-[100%] gap-20`}
      style={{ transform: pressed ? "scale(0.95)" : "scale(1)" }}
    >
      <Image
        src={"/icons/search.svg"}
        width={20}
        height={20}
        alt=""
        className="h-[20px] w-auto"
      />
      <span className="text-16 relative z-10 transition-colors duration-300 inline-block text-start">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          onFocus={handleFocus}
          className="outline-none w-full placeholder:text-foreground-light"
          placeholder="Search Projects"
        />
      </span>
    </button>
  );
};

export default CustomSearch;