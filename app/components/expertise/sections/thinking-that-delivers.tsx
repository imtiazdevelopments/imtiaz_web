"use client";

import Image from "next/image";
import { thinkingThatDelivers } from "../data";
import { useEffect, useRef } from "react";

export default function ThinkingThatDelivers() {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const activeCardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Deactivate previous
            if (
              activeCardRef.current &&
              activeCardRef.current !== entry.target
            ) {
              activeCardRef.current.classList.remove("is-active");
            }
            // Activate current
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
      className="thinking-delivers w-full py-120 3xl:py-160"
      data-header="dark"
    >
      <div className="container">
        <div className="relative grid w-full grid-cols-1 lg:grid-cols-[30%_minmax(0,70%)] 2xl:grid-cols-[auto_minmax(0,882px)] 3xl:grid-cols-[auto_minmax(0,1082px)] gap-40 lg:gap-80 3xl:gap-[84px]">
          {/* Left: Text Block — sticky */}
          <div className="self-start lg:sticky lg:top-0 lg:pt-190">
            <h1 className="text-heading text-foreground max-w-[15ch] uppercase mb-20">
              {thinkingThatDelivers.heading}
            </h1>
            <p className="text-description text-foreground-light max-w-[53ch]">
              {thinkingThatDelivers.description}
            </p>
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
                  <div className="relative w-full md:w-[42.7%] overflow-hidden shrink-0">
                    <Image
                      src={service.image}
                      alt={service.alt}
                      width={500}
                      height={500}
                      className="w-full object-cover h-[220px] md:h-full lg:min-h-[320px]"
                    />
                  </div>

                  {/* Content panel */}
                  <div className="service-panel flex-1 min-w-0 flex flex-col p-30 lg:p-50 justify-between transition-colors duration-400">
                    <span className="service-number text-heading text-primary-2 transition-colors duration-400 3xl:h-70 flex items-center">
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
