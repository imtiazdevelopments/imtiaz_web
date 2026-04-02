"use client";

import Image from "next/image";
import { thinkingThatDelivers } from "../data";
import { useEffect, useRef } from "react";
import { SectionHeading } from "../../animations/SectionHeading";
import { SectionDescription } from "../../animations/SectionDescription";

export default function ThinkingThatDelivers() {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const activeCardRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
const imgRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Parallax
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = (vh / 2 - (rect.top + rect.height / 2)) / vh;
      const y = progress * 6;
      imgRefs.current.forEach((wrapper) => {
        if (wrapper) wrapper.style.transform = `translateY(${y}vh)`;
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection observer for active card
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (
              activeCardRef.current &&
              activeCardRef.current !== entry.target
            ) {
              activeCardRef.current.classList.remove("is-active");
            }
            entry.target.classList.add("is-active");
            activeCardRef.current = entry.target as HTMLDivElement;
          } else {
            entry.target.classList.remove("is-active");
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: "-10% 0px -10% 0px",
      },
    );

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="thinking-delivers w-full py-120 3xl:py-160"
      data-header="dark"
    >
      <div className="container">
        <div className="relative grid w-full grid-cols-1 lg:grid-cols-[30%_minmax(0,70%)] 2xl:grid-cols-[auto_minmax(0,882px)] 3xl:grid-cols-[auto_minmax(0,1082px)] gap-40 lg:gap-80 3xl:gap-[84px]">
          {/* Left: Text Block — sticky */}
          <div className="self-start lg:sticky lg:top-0 lg:pt-190">
            <SectionHeading
              title={thinkingThatDelivers.heading}
              className="text-foreground max-w-[16ch] uppercase mb-20"
            />
            <SectionDescription
              text={thinkingThatDelivers.description}
              className="text-foreground-light max-w-[53ch]"
            />
          </div>

          {/* Right: services */}
          <div className="min-w-0 overflow-hidden">
            {thinkingThatDelivers.services.map((service, index) => (
              <div key={service.id} className="relative flex mb-50 last:mb-0">
                <div className="bg-black" />
                <div
                  ref={(el) => {
                    cardsRef.current[index] = el;
                  }}
                  className="service-card flex flex-col md:flex-row flex-1"
                >
                  {/* Image */}
                  <div className="relative w-full md:w-[42.7%] overflow-hidden shrink-0 self-stretch min-h-[260px] lg:min-h-[320px]">
                    {/* This div gets scaled — image fills it completely */}
                    <div
                      ref={(el) => {
                        imgRefs.current[index] = el;
                      }}
                      className="absolute"
                      style={{
                        inset: "-15%",
                        transform: "translateY(0vh)",
                      }}
                    >
                      <Image
                        src={service.image}
                        alt={service.alt}
                        fill
                        className="object-cover object-center"
                      />
                    </div>
                  </div>

                  {/* Content panel */}
                  <div className="service-panel flex-1 min-w-0 flex flex-col p-30 lg:p-50 justify-between transition-colors duration-400">
                    <span className="service-number text-heading text-primary-2 mb-50 transition-colors duration-400 3xl:h-70 flex items-center">
                      {service.number}
                    </span>
                    <div>
                      <h2 className="service-title text-25 font-[optima] leading-[1.4] uppercase text-foreground transition-colors duration-400 mb-20 max-w-[424px]">
                        {service.title}
                      </h2>
                      <p className="service-desc text-foreground-light transition-colors duration-400 text-description">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
