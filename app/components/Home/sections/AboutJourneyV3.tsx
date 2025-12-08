"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AboutJourneyV3 = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const initGSAP = () => {
    const section = sectionRef.current;
    const video = videoRef.current;
    const textBox = textRef.current;

    if (!section || !video || !textBox) return;

    const items = textBox.querySelectorAll(".anim-item");

    const ctx = gsap.context(() => {
      /* --- PARALLAX VIDEO --- */
      gsap.fromTo(
        video,
        { y: "25vh" },
        {
          y: "-25vh",
          ease: "none",
          scrollTrigger: {
            trigger: section,
            scrub: true,
            start: "top bottom",
            end: "bottom top",
          },
        }
      );

      /* --- TEXT FADE IN --- */
      gsap.fromTo(
        items,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.35,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top center",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    ScrollTrigger.refresh();
    return () => ctx.revert();
  };

  // MATCH WORKING COMPONENT BEHAVIOR (CRITICAL)
  useEffect(() => {
    const listener = () => initGSAP();
    window.addEventListener("homeAnimationsReady", listener);

    return () => window.removeEventListener("homeAnimationsReady", listener);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden flex justify-center items-center"
      // Added bottom padding like working component so section actually scrolls
    >
      {/* VIDEO */}
      <video
        ref={videoRef}
        src="/videos/Construction_Update.mp4"
        poster="/images/home/work-progress/progress.jpg"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover scale-[1.5]"
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* CONTENT */}
      <div
        ref={textRef}
        className="relative z-10 container mx-auto text-center px-4"
      >
        <div className="overflow-hidden">
          <h2 className="anim-item text-[40px] md:text-[50px] lg:text-[60px] text-white font-[optima] leading-[1] mb-[25px] uppercase">
            A JOURNEY TO PERFECTION
          </h2>
        </div>

        <div className="overflow-hidden">
          <h3 className="anim-item text-[25px] text-white font-[avenirHeavy] leading-[1] mb-[40px] uppercase">
            CREATING DESTINATIONS OF DISTINCTION
          </h3>
        </div>

        <div className="overflow-hidden">
          <p className="anim-item text-white text-[19px] leading-[1.3] max-w-[75ch] mx-auto mb-[50px]">
            We transform visions into living, breathing destinations. At Imtiaz
            Developments, our legacy is built on excellence, innovation, and
            uncompromising quality — delivering iconic properties that inspire
            and endure.
          </p>
        </div>

        <div className="overflow-hidden">
          <button className="anim-item px-9 py-[19.5px] rounded-full border border-white text-white text-[17px]">
            About Imtiaz
          </button>
        </div>
      </div>
    </section>
  );
};

export default AboutJourneyV3;
