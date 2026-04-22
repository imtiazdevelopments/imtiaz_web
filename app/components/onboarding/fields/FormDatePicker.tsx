"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface FormDatePickerProps {
  placeholder: string;
  value?: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
}

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function FormDatePicker({
  placeholder,
  value,
  onChange,
  error,
  disabled,
}: FormDatePickerProps) {
  const [open, setOpen] = useState(false);
  const [openUpward, setOpenUpward] = useState(false);
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});
  const ref = useRef<HTMLDivElement>(null);

  const today = new Date();
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [viewYear, setViewYear] = useState(today.getFullYear());

  const parsed = value ? new Date(value) : null;
  const displayValue = parsed
    ? `${String(parsed.getDate()).padStart(2, "0")} ${MONTHS[parsed.getMonth()]} ${parsed.getFullYear()}`
    : null;

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
      const goUp = spaceBelow < 320;
      setOpenUpward(goUp);
      setDropdownStyle(
        goUp
          ? {
              position: "fixed",
              bottom: window.innerHeight - rect.top,
              left: rect.left,
              width: rect.width,
              zIndex: 9999,
            }
          : {
              position: "fixed",
              top: rect.bottom - 12,
              left: rect.left,
              width: rect.width,
              zIndex: 9999,
            },
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
      const goUp = spaceBelow < 320;
      setOpenUpward(goUp);
      setDropdownStyle(
        goUp
          ? {
              position: "fixed",
              bottom: window.innerHeight - rect.top + 8,
              left: rect.left,
              width: rect.width,
              zIndex: 9999,
            }
          : {
              position: "fixed",
              top: rect.bottom + 8,
              left: rect.left,
              width: rect.width,
              zIndex: 9999,
            },
      );
      if (parsed) {
        setViewMonth(parsed.getMonth());
        setViewYear(parsed.getFullYear());
      }
    }
    setOpen((p) => !p);
  };

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else setViewMonth((m) => m - 1);
  };

  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else setViewMonth((m) => m + 1);
  };

  const selectDay = (day: number) => {
    const d = new Date(viewYear, viewMonth, day);
    const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    onChange(iso);
    setOpen(false);
  };

  const isToday = (day: number) =>
    today.getDate() === day &&
    today.getMonth() === viewMonth &&
    today.getFullYear() === viewYear;

  const firstDow = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const cells: (number | null)[] = [
    ...Array(firstDow).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  const isSelected = (day: number) =>
    parsed &&
    parsed.getDate() === day &&
    parsed.getMonth() === viewMonth &&
    parsed.getFullYear() === viewYear;

  const dropdown = (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{
            opacity: 0,
            clipPath: openUpward
              ? "inset(100% 0% 0% 0% round 16px)"
              : "inset(0% 0% 100% 0% round 16px)",
          }}
          animate={{ opacity: 1, clipPath: "inset(0% 0% 0% 0% round 16px)" }}
          exit={{
            opacity: 0,
            clipPath: openUpward
              ? "inset(100% 0% 0% 0% round 16px)"
              : "inset(0% 0% 100% 0% round 16px)",
          }}
          transition={{
            duration: 0.5,
            ease: [0.76, 0, 0.24, 1],
            opacity: { duration: 0.3, ease: "easeIn" },
          }}
          style={dropdownStyle}
          className="min-w-[280px] max-w-[300px] overflow-hidden rounded-[12px] border border-white/50 bg-gray-100 p-3"
          onWheel={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-3">
            <button
              type="button"
              onClick={prevMonth}
              className="p-2 rounded-full hover:bg-gray-300 transition-colors cursor-pointer"
            >
              <Image
                src="/images/icons/down-tip-arrow.svg"
                alt="prev"
                width={14}
                height={14}
                className="rotate-90 h-[7px] w-auto"
              />
            </button>
            <span className="text-description text-foreground-light">
              {MONTHS[viewMonth]} {viewYear}
            </span>
            <button
              type="button"
              onClick={nextMonth}
              className="p-2 rounded-full hover:bg-gray-300 transition-colors cursor-pointer"
            >
              <Image
                src="/images/icons/down-tip-arrow.svg"
                alt="next"
                width={14}
                height={14}
                className="-rotate-90 h-[7px] w-auto"
              />
            </button>
          </div>

          <div className="grid grid-cols-7 mb-1">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
              <div
                key={d}
                className="text-center text-xs text-[#404040]/40 py-1"
              >
                {d}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-y-1">
            {cells.map((day, i) => (
              <div key={i} className="flex items-center justify-center">
                {day ? (
                  <button
                    type="button"
                    onClick={() => selectDay(day)}
                    className={`w-6 h-6 rounded-full text-[12px] transition-colors leading-none pt-[3px] pr-[1px] not-first:duration-150 ${
                      isSelected(day)
                        ? "bg-primary text-white"
                        : isToday(day)
                          ? "ring-1 ring-primary text-foreground-light hover:bg-foreground-light/5"
                          : "text-foreground-light hover:bg-foreground-light/5"
                    }`}
                  >
                    {day}
                  </button>
                ) : null}
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
            className={`text-description transition-colors duration-300 ${
              displayValue || open
                ? "text-foreground-light"
                : "text-foreground-light/50"
            }`}
          >
            {displayValue ?? placeholder}
          </span>
          <Image
            src="/icons/calender.svg"
            alt="calendar"
            width={25}
            height={25}
            className="shrink-0 h-[17px] w-auto"
          />
        </button>

        <div
          className={`h-px w-full transition-colors duration-200 ${
            error
              ? "bg-red-400"
              : open || displayValue
                ? "bg-[#404040]"
                : "bg-[#404040]/30"
          }`}
        />
      </div>

      {/* Portal renders outside any overflow:hidden ancestor */}
      {typeof window !== "undefined" && createPortal(dropdown, document.body)}

      <p className="mt-[2px] min-h-[16px] text-[12px] text-red-400">
        {error ?? ""}
      </p>
    </div>
  );
}
