import Image from "next/image";
import Link from "next/link"; 

import type { ProjectCardType } from "@/types/card";
 
export default function ProjectCard({
  image,
  status,
  location,
  title,
  subtitle,
  href = "#",
}: ProjectCardType) {
  return (
    <Link href={href} className="group block w-full">
      <div className="relative w-full aspect-[8.48/13] overflow-hidden ">

        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />

        <div
          className="absolute inset-0 z-10"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.05) 35%, rgba(0,0,0,0.7) 70%, rgba(0,0,0,0.88) 100%)",
          }}
        />

        {/* Status pill */}
        <div className="absolute top-10 left-0 right-0 z-20">
          <div className="  flex items-center justify-center px-4">
            <span className="bg-white/20 backdrop-blur-sm text-white text-[11px] font-semibold tracking-[0.14em] uppercase px-4 py-1.5 rounded-full border border-white/30">
              {status}
            </span>
          </div>

          {/* Location */}
          <div className="mt-5  flex items-center justify-center gap-1.5 px-4">
            <svg
              className="w-3.5 h-3.5 text-white shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <circle cx="12" cy="10" r="3" />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
              />
            </svg>
            <span className="text-white text-[12px] font-light tracking-wide">
              {location}
            </span>
          </div>
        </div>

        {/* Bottom content */}
        <div className="absolute bottom-0 left-0 right-0 z-20 px-5 pb-6">
          <h3 className="font-[optima] text-white text-[22px] sm:text-[24px] leading-[1.25] tracking-[0.04em] uppercase text-center mb-3 whitespace-pre-line">
            {title}
          </h3>
          <div className="w-full h-px bg-white/30 mb-3" />
          <p className="text-white/80 text-[12px] sm:text-[13px] font-light tracking-[0.08em] text-center">
            {subtitle}
          </p>
        </div>
      </div>
    </Link>
  );
}