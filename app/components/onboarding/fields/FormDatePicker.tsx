"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

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
  const ref = useRef<HTMLDivElement>(null);

  const today = new Date();
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [viewYear, setViewYear] = useState(today.getFullYear());

  const parsed = value ? new Date(value) : null;

  const displayValue = parsed
    ? `${String(parsed.getDate()).padStart(2, "0")} ${MONTHS[parsed.getMonth()]} ${parsed.getFullYear()}`
    : null;

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Open: sync view to selected date
  const handleOpen = () => {
    if (disabled) return;
    if (parsed) {
      setViewMonth(parsed.getMonth());
      setViewYear(parsed.getFullYear());
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

  // Build calendar grid
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

  return (
    <div className="flex flex-col w-full relative" ref={ref}>
      <div className="group flex flex-col gap-5">
        {/* Trigger row */}
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

        {/* Bottom line */}
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

      {/* Dropdown calendar */}
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
            className="absolute top-[calc(80%)] left-0 z-50 w-full min-w-[280px] max-w-[300px] overflow-hidden rounded-[12px] border border-white/50 bg-gray-100 p-3"
            onWheel={(e) => e.stopPropagation()}
          >
            {/* Month/Year navigation */}
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

            {/* Day headers */}
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

            {/* Day cells */}
            <div className="grid grid-cols-7 gap-y-1">
              {cells.map((day, i) => (
                <div key={i} className="flex items-center justify-center">
                  {day ? (
                    <button
                      type="button"
                      onClick={() => selectDay(day)}
                      className={`w-8 h-8 rounded-full text-[12px] transition-colors duration-150 ${
                        isSelected(day)
                          ? "bg-primary text-white"
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

      {/* Reserved error space */}
      <p className="mt-[2px] min-h-[16px] text-[12px] text-red-400">
        {error ?? ""}
      </p>
    </div>
  );
}
