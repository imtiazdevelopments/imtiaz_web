"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface Option {
  label: string;
  value: string;
}

interface FormSelectProps {
  placeholder: string;
  options: Option[];
  value?: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
}

export default function FormSelect({
  placeholder,
  options,
  value,
  onChange,
  error,
  disabled,
}: FormSelectProps) {
  const [open, setOpen] = useState(false);
  const [openUpward, setOpenUpward] = useState(false);
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});
  const ref = useRef<HTMLDivElement>(null);

  const selectedLabel = options.find((o) => o.value === value)?.label;
  const isFilled = !!selectedLabel;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Reposition on scroll/resize so the portal stays anchored
  useEffect(() => {
    if (!open) return;
    const reposition = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const goUp = spaceBelow < 270;
      setOpenUpward(goUp);
      setDropdownStyle(
        goUp
          ? { position: "fixed", bottom: window.innerHeight - rect.top + 8, left: rect.left, width: rect.width, zIndex: 9999 }
          : { position: "fixed", top: rect.bottom - 12, left: rect.left, width: rect.width, zIndex: 9999 }
      );
    };
    reposition();
    window.addEventListener("scroll", reposition, true);
    window.addEventListener("resize", reposition);
    return () => {
      window.removeEventListener("scroll", reposition, true);
      window.removeEventListener("resize", reposition);
    };
  }, [open]);

  const handleOpen = () => {
    if (disabled) return;
    if (!open && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const goUp = spaceBelow < 270;
      setOpenUpward(goUp);
      setDropdownStyle(
        goUp
          ? { position: "fixed", bottom: window.innerHeight - rect.top + 8, left: rect.left, width: rect.width, zIndex: 9999 }
          : { position: "fixed", top: rect.bottom + 8, left: rect.left, width: rect.width, zIndex: 9999 }
      );
    }
    setOpen((p) => !p);
  };

  const dropdown = (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, clipPath: openUpward ? "inset(100% 0% 0% 0% round 16px)" : "inset(0% 0% 100% 0% round 16px)" }}
          animate={{ opacity: 1, clipPath: "inset(0% 0% 0% 0% round 16px)" }}
          exit={{ opacity: 0, clipPath: openUpward ? "inset(100% 0% 0% 0% round 16px)" : "inset(0% 0% 100% 0% round 16px)" }}
          transition={{
            duration: 0.5,
            ease: [0.76, 0, 0.24, 1],
            opacity: { duration: 0.3, ease: "easeIn" },
          }}
          style={dropdownStyle}
          className="min-w-[200px] overflow-hidden rounded-[12px] border border-white/50 bg-gray-100"
          onWheel={(e) => e.stopPropagation()}
        >
          <div className="max-h-[250px] overflow-y-auto">
            {options.length === 0 && (
              <p className="px-5 py-3 text-xs text-foreground-light">No options</p>
            )}
            {options.map((opt, i) => (
              <div key={opt.value}>
                {i !== 0 && <div className="h-px w-full bg-foreground-light/20" />}
                <button
                  type="button"
                  onClick={() => { onChange(opt.value); setOpen(false); }}
                  className={`w-full p-3 text-left text-description transition-colors duration-300 hover:bg-primary/5 ${
                    value === opt.value ? "text-primary" : "text-foreground-light"
                  }`}
                >
                  {opt.label}
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="flex flex-col w-full relative" ref={ref}>
      <div className="group flex flex-col gap-5">
        <button
          type="button"
          disabled={disabled}
          onClick={handleOpen}
          className="flex w-full items-center justify-between bg-transparent outline-none cursor-pointer"
        >
          <span
            className={`text-description transition-colors duration-200 ${
              isFilled || open ? "text-foreground-light" : "text-foreground-light/50"
            }`}
          >
            {selectedLabel ?? placeholder}
          </span>
          <Image
            src="/images/icons/down-tip-arrow.svg"
            alt="arrow-down"
            width={20}
            height={10}
            className={`shrink-0 h-[7px] w-auto transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          />
        </button>

        <div
          className={`h-px w-full transition-colors duration-300 ${
            error
              ? "bg-red-400"
              : open || isFilled
                ? "bg-foreground-light"
                : "bg-foreground-light/30"
          }`}
        />
      </div>

      {/* Portal renders outside any overflow:hidden ancestor */}
      {typeof window !== "undefined" && createPortal(dropdown, document.body)}

      <p className="mt-[2px] min-h-[16px] text-xs text-red-400">{error ?? ""}</p>
    </div>
  );
}