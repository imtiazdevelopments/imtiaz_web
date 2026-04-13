"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { MdOutlineKeyboardDoubleArrowDown } from "react-icons/md";
import { useLenis } from "@/app/contexts/LenisContext";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface FilterDropdownProps {
  placeholder: string;
  options: string[];
  variant?: "primary" | "secondary";
  value: string;
  onChange: (val: string) => void;
  className?: string;
}

const FilterDropdown = ({
  placeholder,
  options,
  variant = "primary",
  value,
  onChange,
  className,
}: FilterDropdownProps) => {
  const [open, setOpen] = useState(false);
  const [hasScroll, setHasScroll] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const pendingRef = useRef(false);
  const pendingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { scrollTo } = useLenis();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (open && listRef.current) {
      const el = listRef.current;
      const scrollable = el.scrollHeight > el.clientHeight;
      setHasScroll(scrollable);
      setIsAtBottom(false);
    }
  }, [open]);

  useEffect(() => {
    return () => {
      if (pendingTimerRef.current) clearTimeout(pendingTimerRef.current);
      pendingRef.current = false;
    };
  }, []);

  const handleScroll = () => {
    if (!listRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = listRef.current;
    setIsAtBottom(scrollTop + clientHeight >= scrollHeight - 4);
  };

  const handleToggle = () => {
    if (pendingRef.current) {
      if (pendingTimerRef.current) clearTimeout(pendingTimerRef.current);
      pendingRef.current = false;
      setOpen(true);
      return;
    }

    if (!open && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const dropdownHeight = 220;
      const willBeCutOff = rect.bottom + dropdownHeight > window.innerHeight;

      if (willBeCutOff) {
        pendingRef.current = true;
        const targetScrollY =
          window.scrollY + rect.top - window.innerHeight * 0.4;
        scrollTo(targetScrollY, { duration: 0.8 });

        pendingTimerRef.current = setTimeout(() => {
          setOpen(true);
          pendingRef.current = false;
          pendingTimerRef.current = null;
        }, 250);
      } else {
        setOpen(true);
      }
    } else {
      setOpen(false);
    }
  };

  return (
    <div
      ref={ref}
      className={`relative w-full min-w-[220px] 3xl:w-[253px] ${className ?? ""}`}
    >
      {/* Trigger */}
      <button
        onClick={handleToggle}
        className={`w-full h-[50px] lg:h-[66px] flex items-center justify-between px-[26.5px] rounded-full ${variant === "primary" ? "bg-[#EBEBEC]" : "bg-transparent border border-primary"} font-[avenirHeavy] text-16 text-foreground-light cursor-pointer`}
      >
        <span className={value ? "text-foreground" : "text-foreground-light"}>
          {value || placeholder}
        </span>
        <Image
          src="/icons/arrow-down-tip.svg"
          alt="arrow-down-tip"
          width={20}
          height={20}
          className={`w-auto h-[7.4px] transition-transform duration-300 shrink-0 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
              clipPath: "inset(0% 0% 100% 0% round 16px)",
            }}
            animate={{ opacity: 1, clipPath: "inset(0% 0% 0% 0% round 16px)" }}
            exit={{ opacity: 0, clipPath: "inset(0% 0% 100% 0% round 16px)" }}
            transition={{
              duration: 0.5,
              ease: [0.76, 0, 0.24, 1],
              opacity: { duration: 0.3, ease: "easeIn" },
            }}
            style={{ transformOrigin: "top" }}
            className="absolute top-[calc(100%+8px)] left-0 w-full bg-white border border-black/10 rounded-2xl shadow-lg z-50 overflow-hidden"
          >
            {/* Scrollable list */}
            <div
              ref={listRef}
              className="max-h-[200px] overflow-y-auto scrollbar-hide"
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
              onScroll={handleScroll}
            >
              <button
                onClick={() => {
                  onChange("");
                  setOpen(false);
                }}
                className="w-full text-left px-5 py-3 text-[13px] font-[avenirRoman] text-black/40 hover:bg-black/5 transition-colors duration-150"
              >
                {placeholder}
              </button>

              <div className="w-full h-px bg-black/5" />

              {options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => {
                    onChange(opt);
                    setOpen(false);
                  }}
                  className={`w-full text-left px-5 py-3 text-[14px] xl:text-[15px] font-[avenirRoman] transition-colors duration-150 hover:bg-black/5 ${
                    value === opt
                      ? "text-primary font-[avenirHeavy]"
                      : "text-foreground-light"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>

            {/* Scroll hint */}
            {hasScroll && !isAtBottom && (
              <div className="absolute bottom-0 left-0 w-full pointer-events-none rounded-b-2xl overflow-hidden">
                <div className="w-full py-2 flex items-center justify-center bg-gradient-to-t from-white/90 to-transparent">
                  <MdOutlineKeyboardDoubleArrowDown
                    size={18}
                    className="text-foreground-light/70"
                  />
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FilterDropdown;