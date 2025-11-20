"use client";
import Link from "next/link";

interface ConstructionProgressProps {
  data: {
    title: string;
    videoSrc: string;
    posterSrc: string;
    description: string;
    button: {
      label: string;
      link: string;
    };
  };
}

import React, { useRef, useEffect } from "react";

const ConstructionProgress: React.FC<ConstructionProgressProps> = ({
  data,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoEl.play().catch(() => {});
          } else {
            videoEl.pause();
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(videoEl);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative w-full overflow-hidden pb-[200px] md:pb-[250px] lg:pb-[300px] xl:pb-[350px] 3xl:pb-[432px] flex justify-center pt-10 xl:pt-[140px] 2xl:pt-[160px] 3xl:pt-[196px] h-screen">
      {/* ================= BACKGROUND VIDEO ================= */}
      <video
        ref={videoRef}
        src={data.videoSrc}
        poster={data.posterSrc}
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-[1]"
      />

      {/* ================= DARK GRADIENT OVERLAY ================= */}
      <div className="absolute inset-0 z-[2] bg-black/50" />

      {/* ================= CONTENT ON VIDEO ================= */}
      <div className="relative z-[5] text-center px-6 max-w-[900px]">
        {/* Heading */}
        <h2 className="text-white text-[40px] md:text-[55px] 2xl:text-[64px] 3xl:text-[70px] font-[optima] font-[400] leading-[110%] mb-5 max-w-[20ch] uppercase">
          {data.title}
        </h2>

        {/* Subtitle */}
        <p className="text-white text-[19px] font-[avenirRoman] font-[400] leading-[1.3] max-w-[60ch] mx-auto mb-[50px]">
          {data.description}
        </p>

        {/* Button */}
        <Link href={data.button.link}>
          <button className="px-[36px] py-[19.5px] text-[17px] rounded-full border border-white text-white font-[avenirRoman] font-[400] capitalize transition-all cursor-pointer">
            {data.button.label}
          </button>
        </Link>
      </div>
    </section>
  );
};

export default ConstructionProgress;
