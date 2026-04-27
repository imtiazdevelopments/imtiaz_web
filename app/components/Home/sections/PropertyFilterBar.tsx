"use client";

import { useState, useRef, useEffect } from "react";
import CustomOutlineButton from "../../common/CustomOutlineButton";
import { motion } from "framer-motion";
import { moveUp } from "../../motionVariants";
// ── Types ─────────────────────────────────────────────────────────────────────
interface FilterOption {
  label: string;
  value: string;
}

interface FilterItem {
  id: string;
  label: string;
  options: FilterOption[];
}

// ── Filter Data ───────────────────────────────────────────────────────────────
const filters: FilterItem[] = [
  {
    id: "propertyType",
    label: "PROPERTY TYPE",
    options: [
      { label: "All Types", value: "" },
      { label: "Apartment", value: "apartment" },
      { label: "Villa", value: "villa" },
      { label: "Townhouse", value: "townhouse" },
      { label: "Penthouse", value: "penthouse" }, 
      
    ],
  },
  {
    id: "status",
    label: "STATUS",
    options: [
      { label: "Available", value: "ava" },
      { label: "Off Plan", value: "offplan" },
      { label: "Completed", value: "completed" },
      { label: "Under Construction", value: "uc" },
    ],
  },  

  {
    id: "community",
    label: "COMMUNITY",
    options: [
      { label: "All Communities", value: "" },
      { label: "Downtown Dubai", value: "downtown" },
      { label: "Waterfront", value: "Waterfront" },
      { label: "Suburbs", value: "Suburbs" },
      { label: "Business Bay", value: "business-bay" },
      { label: "Old Town", value: "OldTown" },
    ], 
  },
];

// ── Chevron Icon ──────────────────────────────────────────────────────────────
const ChevronDown = ({ open }: { open: boolean }) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
  >
    <path
      d="M3 5l4 4 4-4"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// ── Dropdown ──────────────────────────────────────────────────────────────────
interface DropdownProps {
  filter: FilterItem;
  selected: string;
  onSelect: (value: string) => void;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  isLast?: boolean;
}

const Dropdown = ({
  filter,
  selected,
  onSelect,
  isOpen,
  onToggle,
  onClose,
  isLast,
}: DropdownProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [dropUp, setDropUp] = useState(false);

  const selectedLabel =
    filter.options.find((o) => o.value === selected)?.label || filter.label;

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };
    if (isOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen, onClose]);

  const handleToggle = () => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceNeeded = 260; // approx dropdown height
      setDropUp(spaceBelow < spaceNeeded);
    }
    onToggle();
  };

  return (
    <div ref={ref} className="relative flex-1 pt-5 py-0 lg:py-5 last:pb-5 ">
      {/* Trigger */}
      <button
        onClick={handleToggle}
        className="w-full flex items-center justify-center gap-2 px-4 lg:px-10 text-xs font-semibold tracking-widest text-white whitespace-nowrap  cursor-pointer transition-colors duration-150"
      >
        <span>{selected ? selectedLabel.toUpperCase() : filter.label}</span>
        <ChevronDown open={isOpen} />
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div
          className={`absolute bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 min-w-[180px] ${
            dropUp
              ? "bottom-[calc(100%+12px)]"
              : "top-[calc(100%+12px)]"
          } ${
            isLast ? "right-0" : "left-1/2 -translate-x-1/2"
          }`}
        >
          {filter.options.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onSelect(option.value);
                onClose();
              }}
              className={`w-full text-left px-5 py-2.5 text-sm transition-colors duration-150 ${
                selected === option.value
                  ? "text-black font-semibold bg-gray-50"
                  : "text-gray-600 hover:bg-gray-50 hover:text-black"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// ── Main Component ────────────────────────────────────────────────────────────
const PropertySearchBar = () => {
  const [openId, setOpenId] = useState<string | null>(null);
  const [selected, setSelected] = useState<Record<string, string>>({});

  const handleToggle = (id: string) =>
    setOpenId((prev) => (prev === id ? null : id));

  const handleSelect = (id: string, value: string) =>
    setSelected((prev) => ({ ...prev, [id]: value }));

  

  return (
    <div className="flex flex-col lg:flex-row items-center bg-white/20 backdrop-blur-[30px] rounded-sm lg:rounded-full shadow-lg overflow-visible pb-4      s lg:pb-0 px-2 lg:gap-5">
      {filters.map((filter, i) => (
        <div key={filter.id} className="flex items-center flex-1">
          <Dropdown
            filter={filter}
            selected={selected[filter.id] || ""}
            onSelect={(val) => handleSelect(filter.id, val)}
            isOpen={openId === filter.id}
            onToggle={() => handleToggle(filter.id)}
            onClose={() => setOpenId(null)}
            isLast={i === filters.length - 1}
          />
          {/* Divider */}
          {i < filters.length - 1 && (
            <div className="w-px h-6 bg-gray-300 flex-shrink-0 hidden lg:block " />
          )}
        </div>
      ))}

      {/* Search Button */}
      
      <motion.div
              variants={moveUp(0.01)}
              initial="hidden"
              whileInView="show"
            >
              {/* <button 
        className="ml-2 bg-black text-white text-xs font-semibold tracking-widest px-6 py-4 rounded-full hover:bg-gray-900 active:scale-95 transition-all duration-200 whitespace-nowrap flex-shrink-0"
      >
        SEARCH PROPERTIES
      </button>  */}
              <CustomOutlineButton
                className="w-fit "
                px="!px-4 !py-3 !text-sm bg-primary-2"
                text="SEARCH PROPERTIES"
                borderColor="border-primary-2"
                textColor="text-white"
                variant="light"
              />
            </motion.div>
    </div>
  );
};

export default PropertySearchBar;
