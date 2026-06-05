"use client";

import { useRef } from "react";
import Image from "next/image";

const VideoSection = ({ images }: { images: string[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      className="w-full bg-white md:pb-50 mt-[50px]"
      data-header="light"
    >
      <div
        ref={containerRef}
        className="relative w-full h-[396px] md:h-[680px] 2xl:h-screen overflow-hidden bg-black"
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-10">
          <Image
            src={'/images/initiative-details/video-image.png'}
            alt="Gallery image"
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{
              transform: "scale(1.15) translateY(0vh)",
              willChange: "transform",
            }}
          />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 z-20 bg-black/50 pointer-events-none" />

        {/* Play Button */}
        <div className="absolute inset-0 z-[1000] flex items-center justify-center">
          <Image
            src="/images/initiative-details/play-video.svg"
            className="cursor-pointer"
            alt="play-video"
            width={100}
            height={100}
          />
        </div>
      </div>
    </section>
  );
};

export default VideoSection;