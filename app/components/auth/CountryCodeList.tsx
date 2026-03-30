"use client";

import { useState, useRef, useEffect } from "react";
import countryCodes from "country-codes-list";
import Image from "next/image";

const countries = countryCodes.customArray({
  code: "+{countryCallingCode}",
  iso: "{countryCode}",
  name: "{countryNameEn}",
});

const unique = Array.from(
  new Map(countries.map((c) => [c.code, c])).values()
);

type Props = {
  value: string;
  onChange: (val: string) => void;
};

export default function CountryCodeSelect({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  const selected = unique.find((c) => c.code === value) ?? unique[0];

  const filtered = unique.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.code.includes(search)
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
    <div ref={ref} className="relative flex-shrink-0">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 text-description text-foreground-light bg-transparent -mb-[1px] border-b border-foreground-light cursor-pointer"
      >
        <img
          src={`https://flagcdn.com/w20/${selected.iso.toLowerCase()}.png`}
          alt={selected.name}
          width={20}
          height={15}
          className="w-auto h-[13px] object-contain flex-shrink-0 mb-[5px]"
        />
        <span>{selected.code}</span>
        <Image
          src="/images/icons/down-tip-arrow.svg"
          alt="arrow-down"
          width={10}
          height={10}
          className="h-[5px] w-auto mb-[6px]"
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="absolute top-[calc(100%+8px)] left-0 w-[300px] bg-white border border-black/10 rounded-2xl shadow-lg overflow-hidden z-50"
          onWheel={(e) => e.stopPropagation()}
        >
          {/* Search */}
          <div className="px-3 py-2 border-b border-black/5">
            <input
              type="text"
              placeholder="Search country..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full text-description text-foreground-light bg-transparent outline-none p-0 placeholder:text-foreground-light/30"
            />
          </div>

          {/* List */}
          <div className="max-h-[220px] overflow-y-auto">
            {filtered.length === 0 && (
              <p className="px-5 py-3 text-description text-foreground-light/40">No results</p>
            )}
            {filtered.map((c, i) => (
              <div key={`${c.code}-${i}`}>
                {i !== 0 && <div className="w-full h-px bg-black/5" />}
                <button
                  type="button"
                  onClick={() => { onChange(c.code); setOpen(false); setSearch(""); }}
                  className={`w-full text-left px-5 py-3 text-description transition-colors duration-150 hover:bg-black/5 flex items-center gap-2 ${
                    value === c.code ? "text-primary-2 font-[avenirHeavy]" : "text-foreground-light"
                  }`}
                >
                  <img
                    src={`https://flagcdn.com/w20/${c.iso.toLowerCase()}.png`}
                    alt={c.name}
                    width={20}
                    height={15}
                    className="w-[20px] h-auto object-contain flex-shrink-0"
                  />
                  <span>{c.code}</span>
                  <span className="text-foreground-light/50 text-[11px] truncate">{c.name}</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}