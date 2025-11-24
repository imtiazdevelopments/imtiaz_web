"use client";

import Image from "next/image";

const Hero = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden flex items-center justify-center text-center">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full   object-cover h-[99.9%]"
        src="/videos/WWH_for_Website_Final.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.3)_1.12%,rgba(0,0,0,0.15)_40.24%,rgba(0,0,0,0.75)_100%)] pointer-events-none" />

      {/* Text and icon*/}
      <div className="absolute bottom-[110px] 3xl:bottom-[80px] 2xl:max-w-[125ch] 3xl:max-w-[135ch] flex flex-col gap-[40px] md:gap-[60px] 3xl:gap-[72px] items-center justify-center">
        <h1 className="text-[35px] md:text-[50px] 2xl:text-[164px] 3xl:text-[80px] font-[optima] leading-[1] uppercase text-white">
          Redefining Spaces Elevating Lives
        </h1>
        <Image src="/icons/mouse.svg" alt="Mouse" width={32} height={53} />
      </div>
    </section>
  );
};

export default Hero;
