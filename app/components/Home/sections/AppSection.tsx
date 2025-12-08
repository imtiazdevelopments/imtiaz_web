"use client";

import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { fadeUp } from "../../motionVariants";
import { motion } from "framer-motion";

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
      className="make-header-black w-full py-12 md:py-15 xl:py-20 2xl:py-25 3xl:py-[141px] bg-[#F4F2F2]"
    >
      <div
        className="container"
        ref={textRef}
        style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
      >
        {/* ----- MAIN LAYOUT ----- */}
        <div className="flex justify-center items-center gap-20">
          {/* PHONE - ALWAYS CENTERED */}
          <div className="flex justify-center">
            <div className="relative w-[394px] h-[761px] overflow-hidden phone-wrapper z-[100]">
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

          <div className="flex flex-col h-full justify-center items-center">
            <div className="overflow-hidden">
              <motion.h2
                variants={fadeUp}
                custom={0.5}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="text-[36px] md:text-[58px]  lg:text-[60px] 2xl:text-[70px] mb-[20px] font-[optima] uppercase text-primary leading-[1.2]"
              >
                Download Imtiaz App
              </motion.h2>
            </div>

            <div className="overflow-hidden">
              <motion.p
                variants={fadeUp}
                custom={0.6}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="text-[20px] font-[avenirHeavy] text-[#404040] mb-[60px] max-w-[58ch] leading-[110%] text-center"
              >
                Imtiaz Developments delivers a total solution to all kinds of
                Real Estate projects, from initial concept through completion
                and handover to after sale maintenance and support.
              </motion.p>
            </div>

            <div className="flex gap-[14px]">
              <motion.div
                variants={fadeUp}
                custom={0.7}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                <a className="inline-block bg-black rounded-[11px] h-[65px] w-[194px] hover:-translate-y-[3px] transition-all duration-300 cursor-pointer">
                  <Image
                    src="/images/home/app/plv3.svg"
                    alt="Download on App Store"
                    width={194}
                    height={65}
                  />
                </a>
              </motion.div>

              <motion.div
                variants={fadeUp}
                custom={0.8}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                <a className="inline-block bg-black rounded-[11px] h-[65px] w-[194px] hover:-translate-y-[3px] transition-all duration-300 cursor-pointer">
                  <Image
                    src="/images/home/app/asv3.svg"
                    alt="Get it on Google Play"
                    width={194}
                    height={65}
                  />
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppSection;
