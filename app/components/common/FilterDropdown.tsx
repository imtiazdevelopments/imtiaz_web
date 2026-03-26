"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface FilterDropdownProps {
  placeholder: string;
  options: string[];
  value: string;
  onChange: (val: string) => void;
}

const FilterDropdown = ({ placeholder, options, value, onChange }: FilterDropdownProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      {/* Trigger */}
      <button
        onClick={() => setOpen(!open)}
        style={{ width: "253px", height: "66px" }}
        className="flex items-center justify-between px-[26.5px] rounded-full bg-[#EBEBEC] font-[avenirHeavy] text-16 text-foreground-light cursor-pointer"
      >
        <span className={value ? "text-foreground" : "text-foreground-light"}>
          {value || placeholder}
        </span>
        <ChevronDown
          size={22}
          className={`text-foreground-light transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute top-[calc(100%+8px)] left-0 w-full bg-white border border-black/10 rounded-2xl shadow-lg overflow-hidden z-50">
          {/* Clear option */}
          <button
            onClick={() => { onChange(""); setOpen(false); }}
            className="w-full text-left px-5 py-3 text-[13px] font-[avenirRoman] text-black/40 hover:bg-black/5 transition-colors duration-150"
          >
            {placeholder}
          </button>

          <div className="w-full h-px bg-black/5" />

          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => { onChange(opt); setOpen(false); }}
              className={`w-full text-left px-5 py-3 text-[14px] font-[avenirRoman] transition-colors duration-150 hover:bg-black/5 ${
                value === opt ? "text-[#490905] font-[avenirHeavy]" : "text-foreground-light"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;