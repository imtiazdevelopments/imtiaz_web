"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import rawCountries from "world-countries";

export const allCountries = rawCountries
  .map((c) => ({ name: c.name.common, flag: c.flag }))
  .sort((a, b) => a.name.localeCompare(b.name));

type DropdownItem = { name: string; flag?: string };

export function SearchableDropdown({
  items,
  value,
  onChange,
  placeholder,
  label,
}: {
  items: DropdownItem[];
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  label?: string;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  const filtered = items.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()),
  );

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

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      {/* Entire trigger area — label + field row — is one clickable block */}
      <div className="cursor-pointer" onClick={() => setOpen((o) => !o)}>
        {label && (
          <span className="block text-description mt-25 text-foreground-light/50 transition-colors group-focus-within:text-foreground-light select-none">
            {label}
          </span>
        )}
        <div
          className={[
            "w-full flex items-center justify-between border-b mt-40 pb-1 text-description bg-transparent outline-none transition-colors p-0",
            "border-foreground-light/50",
            value ? "text-foreground-light" : "text-foreground-light/30",
          ].join(" ")}
        >
          <span className="truncate">{value || ""}</span>
        </div>
      </div>

      {open && (
        <div
          className="absolute top-[calc(100%+8px)] left-0 w-[300px] bg-white border border-black/10 rounded-2xl shadow-lg overflow-hidden z-50"
          onWheel={(e) => e.stopPropagation()}
        >
          <div className="px-3 py-2 border-b border-black/5">
            <input
              type="text"
              placeholder={`Search ${placeholder ?? ""}...`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full text-description text-foreground-light bg-transparent outline-none p-0 placeholder:text-foreground-light/30"
            />
          </div>

          <div className="max-h-[220px] overflow-y-auto">
            {filtered.length === 0 && (
              <p className="px-5 py-3 text-description text-foreground-light/40">
                No results
              </p>
            )}
            {filtered.map((c, i) => (
              <div key={`${c.name}-${i}`}>
                {i !== 0 && <div className="w-full h-px bg-black/5" />}
                <button
                  type="button"
                  onClick={() => {
                    onChange(c.name);
                    setOpen(false);
                    setSearch("");
                  }}
                  className={`w-full text-left px-5 py-3 text-description transition-colors duration-150 hover:bg-black/5 flex items-center gap-2 ${
                    value === c.name
                      ? "text-primary-2 font-[avenirHeavy]"
                      : "text-foreground-light"
                  }`}
                >
                  {c.flag && <span>{c.flag}</span>}
                  <span className="truncate">{c.name}</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
