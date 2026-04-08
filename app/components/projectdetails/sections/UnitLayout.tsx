"use client";

import Image from "next/image";
import { useState } from "react";

const units = [
  {
    id: "1bhk",
    label: "1 Bedroom",
    tag: "1 BHK",
    units: 94,
    area: "755 sq ft — 1100 sq ft",
    image: "/images/projects/floor.png",
  },
  {
    id: "2bhk",
    label: "2 Bedroom",
    tag: "2 BHK",
    units: 72,
    area: "1100 sq ft — 1450 sq ft",
    image: "/images/projects/floor.png",
  },
  {
    id: "3bhk",
    label: "3 Bedroom",
    tag: "3 BHK",
    units: 48,
    area: "1450 sq ft — 1900 sq ft",
    image: "/images/projects/floor.png",
  },
  {
    id: "3bhk-ph",
    label: "3 bedroom penthouse",
    tag: "3 BHK PH",
    units: 12,
    area: "2200 sq ft — 2800 sq ft",
    image: "/images/projects/floor.png",
  },
  {
    id: "3bhk-dx",
    label: "3 Bedroom Duplex",
    tag: "3 BHK DX",
    units: 20,
    area: "1900 sq ft — 2400 sq ft",
    image: "/images/projects/floor.png",
  },
  {
    id: "4bhk-dx",
    label: "4 Bedroom Duplex",
    tag: "4 BHK DX",
    units: 16,
    area: "2400 sq ft — 3200 sq ft",
    image: "/images/projects/floor.png",
  },
  {
    id: "3bhk-th",
    label: "3 bedroom town house",
    tag: "3 BHK TH",
    units: 8,
    area: "2600 sq ft — 3000 sq ft",
    image: "/images/projects/floor.png",
  },
];

type Unit = (typeof units)[0];

function FloorPlanImage({ unit }: { unit: Unit }) {
  return (
    <div className="relative w-full h-full">
      <Image
        src={unit.image}
        alt={`${unit.label} floor plan`}
        fill
        className="object-contain"
        sizes="(max-width: 454px) 90vw, 454px"
        priority
      />
    </div>
  );
}

function MobileFloorPanel({ unit }: { unit: Unit }) {
  return (
    <div className="bg-[#f5f0eb] rounded-xl p-4 border border-[#ddd8d0] shadow-sm">
      {/* Floor plan image */}
      <div className="relative w-full aspect-square max-w-[320px] mx-auto mb-6">
        <FloorPlanImage unit={unit} />
      </div>

      {/* Stats row */}
      <div className="flex flex-row justify-around border-t border-[#ddd8d0] pt-4">
        <div className="text-center">
          <p
            className="text-25 font-[optima] leading-[1.4] mb-2 text-foreground" 
          >
            UNITS
          </p>
          <p className="text-description text-foreground-light">{unit.units} units</p>
        </div>
        <div className="w-px bg-[#ddd8d0]" />
        <div className="text-center">
          <p
            className="text-25 font-[optima] leading-[1.4] mb-2 text-foreground" 
          >
            TOTAL AREA
          </p>
          <p className="text-description text-foreground-light">{unit.area}</p>
        </div>
      </div>

      {/* Download button */}
       <a
        href={unit.image}
        download={`${unit.image}`}
      >
        <div     className="w-fit mx-auto mt-50 group flex items-center justify-center gap-2 border border-[#6b1a1a] leading-[1.37] text-foreground-light rounded-full px-6 py-3 2xl:px-[42px] 2xl:py-[20px] text-description 2xl:!text-[19px] hover:bg-[#6b1a1a] hover:text-white transition-colors duration-300 mt-2"
    >
          <div className="flex items-center gap-[10px]">
          <span>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 14.6665V18.2221C20 18.6936 19.8127 19.1457 19.4793 19.4791C19.1459 19.8125 18.6937 19.9998 18.2222 19.9998H5.77778C5.30628 19.9998 4.8541 19.8125 4.5207 19.4791C4.1873 19.1457 4 18.6936 4 18.2221V14.6665" stroke="#490905" className="group-hover:stroke-white transition-colors duration-300" stroke-width="1.44" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M7.55469 10.2222L11.9991 14.6666L16.4436 10.2222" stroke="#490905" className="group-hover:stroke-white transition-colors duration-300" stroke-width="1.44" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M12 14.6667V4" stroke="#490905" className="group-hover:stroke-white transition-colors duration-300" stroke-width="1.44" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      </span>
        <span className="2xl:px-[15px]">Download Unit layout</span>
        </div>
        </div>
      </a>
    </div>
  );
}

function SideInfo({ unit }: { unit: Unit }) {
  return (
    <div
      className="flex flex-col gap-6 2xl:gap-[30px]" 
    >
      <div>
        <p className="text-25 font-[optima] leading-[1.4] mb-2 text-foreground">UNITS</p>
        <div className="border-b border-[#ccc8c0] pb-30">
          <p className="text-description text-foreground-light">{unit.units} units</p>
        </div>
      </div>

      <div>
        <p className="text-25 font-[optima] leading-[1.4] mb-2 text-foreground">
          TOTAL AREA
        </p>
        <div className=" pb-[10px]">
          <p className="text-description text-foreground-light">{unit.area}</p>
        </div>
      </div>

      <a
        href={unit.image}
        download={`${unit.image}`}
      >
        <div     className="w-fit mt-50 group flex items-center justify-center gap-2 border border-[#6b1a1a] leading-[1.37] text-foreground-light rounded-full px-6 py-3 2xl:px-[42px] 2xl:py-[20px] text-description 2xl:!text-[19px] hover:bg-[#6b1a1a] hover:text-white transition-colors duration-300 mt-2"
    >
          <div className="flex items-center gap-[10px]">
          <span>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 14.6665V18.2221C20 18.6936 19.8127 19.1457 19.4793 19.4791C19.1459 19.8125 18.6937 19.9998 18.2222 19.9998H5.77778C5.30628 19.9998 4.8541 19.8125 4.5207 19.4791C4.1873 19.1457 4 18.6936 4 18.2221V14.6665" stroke="#490905" className="group-hover:stroke-white transition-colors duration-300" stroke-width="1.44" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M7.55469 10.2222L11.9991 14.6666L16.4436 10.2222" stroke="#490905" className="group-hover:stroke-white transition-colors duration-300" stroke-width="1.44" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M12 14.6667V4" stroke="#490905" className="group-hover:stroke-white transition-colors duration-300" stroke-width="1.44" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      </span>
        <span className="2xl:px-[15px]">Download Unit layout</span>
        </div>
        </div>
      </a>
    </div>
  );
}

export default function UnitLayout() {
  const [activeId, setActiveId] = useState<string | null>("1bhk");
  const activeUnit = units.find((u) => u.id === activeId);

  return (
    <section className="bg-gray py-120 2xl:py-130">
      {/* Title */}
      <h1
        className="text-center text-heading mb-50" 
      >
        UNIT LAYOUT
      </h1>

      <div className="container 3xl:!max-w-[1605px] flex flex-col lg:flex-row gap-8 lg:gap-12">

        {/* LEFT: Accordion buttons */}
        <div className="  w-full lg:w-64 xl:w-[305px] flex-shrink-0">
           <div className="flex flex-col gap-2 lg:gap-[18px]">
            {units.map((unit) => {
              const isActive = activeId === unit.id;
              return (
                <div key={unit.id}>
                  {/* Button */}
                  <button
                    onClick={() => setActiveId(isActive ? null : unit.id)}
                    className={`w-full text-center py-4 px-6 rounded-full text-description   transition-all duration-300 cursor-pointer
                      ${
                        isActive
                          ? "bg-primary text-white shadow-md"
                          : "bg-white text-foreground-light hover:bg-primary hover:text-white  "
                      }`} 
                  >
                    {unit.label}
                  </button>

                  {/* Mobile: inline accordion panel */}
                  {isActive && (
                    <div className="block lg:hidden mt-3 mb-1">
                      <MobileFloorPanel unit={unit} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* CENTER: Floor plan image — desktop only */}
        <div className="hidden lg:flex flex-1 items-center justify-center">
          {activeUnit ? (
            <div className="relative w-full max-w-[454px] aspect-square     ">
              <FloorPlanImage unit={activeUnit} />
            </div>
          ) : (
            <div className="flex items-center justify-center flex-1 text-[#999] text-sm tracking-widest" >
              SELECT A UNIT TYPE
            </div>
          )}
        </div>

        {/* RIGHT: Stats + download — desktop only */}
        {activeUnit && (
          <div className="hidden lg:flex flex-col justify-center gap-6 min-w-[300px] 3xl:min-w-[358px]">
            <SideInfo unit={activeUnit} />
          </div>
        )}
      </div>
    </section>
  );
}
