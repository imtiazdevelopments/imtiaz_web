"use client";

import { useState, useRef, useEffect } from "react";
import rawCountries from "world-countries";

export const allCountries = rawCountries
  .map((c) => ({ name: c.name.common, iso: c.cca2.toLowerCase() }))
  .sort((a, b) => a.name.localeCompare(b.name));

type DropdownItem = { name: string; iso?: string };

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


  return (
    <div ref={ref} className="relative">
      <div className="cursor-pointer" onClick={() => setOpen((o) => !o)}>
        {label && (
          <span className="block text-description mt-25 text-foreground-light/50 select-none">
            {label}
          </span>
        )}
        <div
          className={`w-full mt-20 text-description p-0 truncate ${value ? "text-foreground-light" : "text-transparent"}`}
        >
          {value || "‎"}
        </div>
        <div className="h-px w-full bg-foreground-light/50" />
      </div>

      {open && (
        <div
          className="absolute top-[calc(100%+8px)] h-[250px] left-0 min-w-[250px] w-full bg-white/50 backdrop-blur-md border border-black/10 rounded-2xl shadow-lg overflow-hidden z-50"
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

          <div className="max-h-[220px] overflow-y-auto scrollbar-hide">
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
                  {c.iso && (
                    <span
                      className={`fi fi-${c.iso.toLowerCase()} mb-1`}
                      style={{ width: "22px", fontSize: "22px" }}
                    />
                  )}
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
