"use client";

import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export type AppSectionData = {
  heading: string;
  subtitle: string;
  mobileImage: string; // the phone mockup svg
  download: {
    text: string;
    googlePlay: string;
    appStore: string;
  };
};

const AppSection = ({ data }: { data: AppSectionData }) => {
  const imageRef = useRef<HTMLDivElement>(null);
  const section5Ref = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const initGSAP = () => {
    const image = imageRef.current;
    const section = section5Ref.current;
    const textBox = textRef.current;

    if (!image || !section || !textBox) return;

    const items = textBox.querySelectorAll(".anim-item");

    const ctx = gsap.context(() => {
      /* --- PARALLAX --- */
      gsap.fromTo(
        image,
        { y: "12vh" },
        {
          y: "-35vh",
          ease: "none",
          scrollTrigger: {
            trigger: section,
            scrub: true,
            start: "top bottom",
            end: "bottom top",
          },
        }
      );
    });

    return () => ctx.revert();
  };

  useEffect(() => {
    const listener = () => initGSAP();
    window.addEventListener("homeAnimationsReady", listener);

    return () => window.removeEventListener("homeAnimationsReady", listener);
  }, []);

  const d = data;

  return (
    <section
      ref={section5Ref}
      className="make-header-black w-full py-12 md:py-15 xl:py-20 2xl:py-25 3xl:pb-[150px] 3xl:pt-[136px] bg-[#F4F2F2]"
    >
      <div
        className="container"
        ref={textRef}
        style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
      >
        {/* ----- MAIN LAYOUT ----- */}
        <div className="flex justify-between items-center">
          {/* PHONE - ALWAYS CENTERED */}
          <div className="flex justify-center w-1/3">
            <div className="relative w-[350px] h-[650px] overflow-hidden phone-wrapper z-[100]">
              <Image
                className="absolute z-10 h-full w-full"
                src={"/images/home/app/phone.png"}
                alt="phone"
                width={900}
                height={900}
              />
              <div className="left-[25px] right-[25px] absolute" ref={imageRef}>
                <Image
                  src={d.mobileImage}
                  alt="mobile"
                  width={1500}
                  height={2000}
                  className=" absolute w-full"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col h-full justify-center w-2/3 pl-20 ">
            <h2 className="text-[36px] md:text-[58px]  lg:text-[60px] 2xl:text-[70px] mb-[24px] font-[optima] uppercase text-primary leading-[1.2]">
              Download Imtiaz App
            </h2>

            <p className="text-[20px] font-[avenir] text-black/80 mb-[24px] max-w-[55ch] leading-[110%]">
              Imtiaz Developments delivers a total solution to all kinds of Real
              Estate projects, from initial concept through completion and
              handover to after sale maintenance and support.
            </p>

            <div className="flex gap-[25px]">
              <a className="bg-black rounded-[11px] h-[65px] w-[194px] hover:-translate-y-[3px] transition-all duration-300">
                <Image
                  src="/images/icons/appstore.svg"
                  alt="Download on App Store"
                  width={194}
                  height={65}
                />
              </a>

              <a className="bg-black rounded-[11px] h-[65px] w-[194px] hover:-translate-y-[3px] transition-all duration-300">
                <Image
                  src="/images/icons/playstore.svg"
                  alt="Get it on Google Play"
                  width={194}
                  height={65}
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppSection;
