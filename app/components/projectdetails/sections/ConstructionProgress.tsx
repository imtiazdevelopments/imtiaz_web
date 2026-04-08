"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import CustomOutlineButton from "../../common/CustomOutlineButton";
import { SectionHeading } from "../../animations/SectionHeading";
import { SectionDescription } from "../../animations/SectionDescription";

gsap.registerPlugin(ScrollTrigger);

interface CircularProgressProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  label: string;
  isLarge?: boolean;
  animationDelay?: number;
}

function CircularProgress({
  percentage,
  size = 100,
  strokeWidth = 6,
  label,
  isLarge = false,
  animationDelay = 0,
}: CircularProgressProps) {
  const circleRef = useRef<SVGCircleElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  useEffect(() => {
    const circle = circleRef.current;
    const container = containerRef.current;
    const textEl = textRef.current;

    if (!circle || !container || !textEl) return;

    // Set initial state — fully hidden (no progress)
    gsap.set(circle, { strokeDashoffset: circumference });
    gsap.set(textEl, { textContent: "0%" });

    const counter = { value: 0 };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 85%",
        once: true,
      },
      delay: animationDelay,
    });

    tl.to(
      circle,
      {
        strokeDashoffset: offset,
        duration: 1.6,
        ease: "power3.out",
      },
      0
    ).to(
      counter,
      {
        value: percentage,
        duration: 1.6,
        ease: "power3.out",
        onUpdate: () => {
          if (textEl) {
            textEl.textContent = `${Math.round(counter.value)}%`;
          }
        },
      },
      0
    );

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars.trigger === container) st.kill();
      });
    };
  }, [circumference, offset, percentage, animationDelay]);

  return (
    <div
      ref={containerRef}
      className={`flex flex-col items-center gap-3 lg:gap-[20px] ${isLarge ? "" : ""}`}
    >
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="-rotate-90"
        >
          {/* Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#00000008"
            strokeWidth={strokeWidth}
          />
          {/* Progress */}
          <circle
            ref={circleRef}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#490905"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference}
          />
        </svg>

        {/* Percentage text centered */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            ref={textRef}
            className={`font-[optima] text-black  ${
              isLarge
                ? "text-heading leading-[1.4]"
                : "text-25  leading-[1.4] tracking-[2%]"
            }`}
             
          >
            0%
          </span>
          {isLarge && (
            <span
              className="text-description mt-[2px]  "
               
            >
              overall
            </span>
          )}
        </div>
      </div>

      {!isLarge && (
        <span
          className="text-description uppercase text-foreground-light text-center"
           
        >
          {label}
        </span>
      )}
    </div>
  );
}

export default function WynwoodProgress() {
  const sectionRef = useRef<HTMLElement>(null);

  const stats = [
    { percentage: 92, label: "Sub-Structure" },
    { percentage: 45, label: "Sub-Structure" },
    { percentage: 1, label: "MEP Works" },
    { percentage: 0, label: "Finishing Works" },
  ];
const statsData = {
  title: "construction progress",
  description: "As the project progresses, significant milestones are reached, showcasing our team's dedication and expertise. We are steadily moving closer to our completion goal, ensuring quality and safety at every step.",
};
  return (
    <>
   

      <section
        ref={sectionRef}
        className="pt-120 2xl:pt-[160px]"
      >
        <div className="text-center container "> 
         <SectionHeading title={statsData.title} className="mb-20 text-foreground" />
                               <SectionDescription text={statsData.description} className="shrink-0 max-w-[74ch] mx-auto text-foreground-light mb-50" />
        </div>
      <div className="w-full   flex flex-col lg:flex-row overflow-hidden bg-[#F0EDE8]">
          {/* LEFT — Building Image */}
        <div className="relative w-full  h-[300px] lg:h-auto    overflow-hidden">
          <Image
            src="/images/projects/progress.jpg"
            alt="Wynwood Horizon Building"
            fill
            className="object-cover object-center"
            priority
          />
          {/* Subtle right-side fade to blend into info panel */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#F0EDE8]/30 pointer-events-none" />
        </div>

        {/* RIGHT — Info Panel */}
        <div className="py-120 2xl:py-[130px] w-full px-[15px] lg:px-[40px] 2xl:px-[70px]  bg-gray flex flex-col justify-center px-10 sm:px-14 lg:px-16  gap-12 2xl:gap-[60px]">

          {/* Top — Overall Progress */}
          <div className="flex flex-col sm:flex-row items-center   gap-10 lg:gap-15 2xl:gap-[142px]">
            {/* Big circle */}
            <CircularProgress
              percentage={19}
              size={203}
              strokeWidth={15}
              label="overall"
              isLarge
              animationDelay={0}
            />

            {/* Completion date */}
            <div className="flex flex-col justify-center">
              <p
                className="text-25 leading-[1.4] font-[optima] uppercase text-foreground mb-2 lg:mb-[30px] tracking-[2%]"
                 
              >
                Estimated
                <br />
                Completion Date
              </p>
              <p className="text-heading text-black leading-[1.4]">
                Q4 - 2026
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-black/30 2xl:my-[10px]" />

          {/* Bottom — Sub-stats */}
          <div className="flex flex-wrap justify-between gap-y-8 gap-x-4">
            {stats.map((stat, i) => (
              <CircularProgress
                key={i}
                percentage={stat.percentage}
                size={108}
                strokeWidth={10}
                label={stat.label}
                isLarge={false}
                animationDelay={i * 0.12}
              />
            ))}
          </div>

          {/* CTA Button */}
          <div>
            
              <CustomOutlineButton
            className="w-fit mx-auto 2xl:!px-[57.1px] 2xl:!py-[22.5px]"
            text="Construction updates"
            borderColor="border-primary"
            textColor="text-foreground-light"
            variant="dark"
          />
          </div>
        </div>
      </div>
      </section>
    </>
  );
}
