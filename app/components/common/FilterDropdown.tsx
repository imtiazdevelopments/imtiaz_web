"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { MdOutlineKeyboardDoubleArrowDown } from "react-icons/md";

interface FilterDropdownProps {
  placeholder: string;
  options: string[];
  value: string;
  onChange: (val: string) => void;
  className?: string;
}

const FilterDropdown = ({
  placeholder,
  options,
  value,
  onChange,
  className,
}: FilterDropdownProps) => {
  const [open, setOpen] = useState(false);
  const [hasScroll, setHasScroll] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Check if scrollable after open
  useEffect(() => {
    if (open && listRef.current) {
      const el = listRef.current;
      const scrollable = el.scrollHeight > el.clientHeight;
      setHasScroll(scrollable);
      setIsAtBottom(false);
    }
  }, [open]);

  const handleScroll = () => {
    if (!listRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = listRef.current;
    setIsAtBottom(scrollTop + clientHeight >= scrollHeight - 4);
  };

  return (
    <div
      ref={ref}
      className={`relative w-full min-w-[220px] xl:w-[253px] ${className ?? ""}`}
    >
      {/* Trigger */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full h-[50px] lg:h-[66px] flex items-center justify-between px-[26.5px] rounded-full bg-[#EBEBEC] font-[avenirHeavy] text-16 text-foreground-light cursor-pointer"
      >
        <span className={value ? "text-foreground" : "text-foreground-light"}>
          {value || placeholder}
        </span>
        <ChevronDown
          size={22}
          className={`text-foreground-light size-[18px] lg:size-[22px] transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute top-[calc(100%+8px)] left-0 w-full bg-white border border-black/10 rounded-2xl shadow-lg z-50 overflow-hidden">
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
                    ? "text-primary-2 font-[avenirHeavy]"
                    : "text-foreground-light"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>

          {/* Scroll hint — fades out when at bottom or no scroll needed */}
          {hasScroll && !isAtBottom && (
            <div className="absolute bottom-0 left-0 w-full pointer-events-none rounded-b-2xl overflow-hidden">
              <div className="w-full py-2 flex items-center justify-center bg-gradient-to-t from-white/90 to-transparent">
                <MdOutlineKeyboardDoubleArrowDown
                  size={18}
                  className="text-foreground-light/70 "
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
