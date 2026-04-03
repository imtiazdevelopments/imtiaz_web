"use client";

import { useState, useRef, useEffect } from "react";
import rawCountries from "world-countries";
import { motion, AnimatePresence } from "framer-motion";

export const allCountries = rawCountries
  .map((c) => ({ name: c.name.common, iso: c.cca2.toLowerCase() }))
  .sort((a, b) => a.name.localeCompare(b.name));

type DropdownItem = { name: string; iso?: string };

export function SearchableDropdown({
  items,
  value,
  onChange,
  required,
  placeholder,
  label,
  variant = "dark",
  hasError,
}: {
  items: DropdownItem[];
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  label?: string;
  variant?: "light" | "dark";
  required?: boolean;
  hasError?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  const filtered = items.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()),
  );

  const isLight = variant === "light";

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <div className="cursor-pointer" onClick={() => setOpen((o) => !o)}>
        {label && (
          <span
            className={`block text-description mt-25 select-none transition-colors duration-300 ${
              open
                ? isLight
                  ? "text-white"
                  : "text-foreground-light"
                : isLight
                  ? "text-white/50"
                  : "text-foreground-light/50"
            }`}
          >
            {label}
          </span>
        )}
        <div
          className={`w-full mt-20 text-description p-0 pb-[5px] truncate ${
            value
              ? isLight
                ? "text-white"
                : "text-foreground-light"
              : "text-transparent"
          }`}
        >
          {value || "‎"}
        </div>

        {/* Animated field line */}
        <div
          className={`relative h-px w-full overflow-hidden ${isLight ? "bg-white/30" : "bg-foreground-light/50"}`}
        >
          <div
            className={`absolute inset-0 origin-left transition-transform duration-[420ms] ease-out ${
              hasError
                ? "bg-[#c0392b] scale-x-100"
                : open
                  ? `${isLight ? "bg-white" : "bg-foreground-light"} scale-x-100`
                  : "scale-x-0"
            }`}
          />
        </div>
      </div>

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
            className={`absolute top-[calc(100%+8px)] h-[250px] left-0 min-w-[250px] w-full backdrop-blur-md border rounded-2xl shadow-lg overflow-hidden z-50 ${
              isLight
                ? "bg-white border-white/50"
                : "bg-white/50 border-black/10"
            }`}
            onWheel={(e) => e.stopPropagation()}
          >
            {/* Search */}
            <div
              className={`px-3 py-2 border-b ${isLight ? "border-foreground/10" : "border-black/5"}`}
            >
              <input
                type="text"
                placeholder={`Search ${placeholder ?? ""}...`}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={`w-full text-description bg-transparent outline-none p-0 ${
                  isLight
                    ? "text-foreground placeholder:text-foreground/30"
                    : "text-foreground-light placeholder:text-foreground-light/30"
                }`}
              />
            </div>
            {/* List */}
            <div className="max-h-[220px] overflow-y-auto scrollbar-hide">
              {filtered.length === 0 && (
                <p
                  className={`px-5 py-3 text-description ${isLight ? "text-foreground/40" : "text-foreground-light/40"}`}
                >
                  No results
                </p>
              )}
              {filtered.map((c, i) => (
                <div key={`${c.name}-${i}`}>
                  {i !== 0 && (
                    <div
                      className={`w-full h-px ${isLight ? "bg-foreground/5" : "bg-black/5"}`}
                    />
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      onChange(c.name);
                      setOpen(false);
                      setSearch("");
                    }}
                    className={`w-full text-left px-5 py-3 text-description transition-colors duration-150 flex items-center gap-2 ${
                      value === c.name
                        ? "text-primary-2 font-[avenirHeavy]"
                        : isLight
                          ? "text-foreground hover:bg-foreground/5"
                          : "text-foreground-light hover:bg-black/5"
                    }`}
                  >
                    {c.iso && (
                      <span
                        className={`fi fi-${c.iso.toLowerCase()} mb-1`}
                        style={{ width: "22px", fontSize: "22px" }}
                      />
                    )}
                    <span
                      className={`truncate text-[13px] ${isLight ? "text-foreground" : "text-foreground-light"}`}
                    >
                      {c.name}
                    </span>
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
