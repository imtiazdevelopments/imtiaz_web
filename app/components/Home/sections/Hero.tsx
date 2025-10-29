"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  useEffect(() => {
    ScrollTrigger.create({
      trigger: contentRef.current,
      start: "bottom top",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        // when overlay is more than 50% visible, switch to dark header
        if (self.progress > 0.3) {
          window.dispatchEvent(
            new CustomEvent("headerThemeChange", { detail: "dark" })
          );
        } else {
          window.dispatchEvent(
            new CustomEvent("headerThemeChange", { detail: "light" })
          );
        }
      },
    });
  }, []);

  const sectionRef = useRef(null);
  const logoRef = useRef(null);
  const overlayRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(logoRef.current, { opacity: 0, scale: 1, y: 1200 });
      gsap.set(overlayRef.current, { opacity: 0 });
      gsap.set(contentRef.current, { opacity: 0, y: 50 });

      // ScrollTrigger animation timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
          pin: true,
        },
      });

      // Sequence
      tl.to(logoRef.current, {
        opacity: 0.7,
        y: 200,
        scale: 0.7,
        duration: 0.8,
        ease: "power3.out",
      });
      tl.to(logoRef.current, {
        opacity: 0.7,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
      })
        .to(logoRef.current, {
          scale: 1.5,
          opacity: 0.7,
          duration: 0.8,
          ease: "power3.out",
        })
        .to(logoRef.current, {
          scale: 6,
          opacity: 0,
          duration: 1.3,
          y: -1200,
          ease: "power3.out",
        })
        .to(
          overlayRef.current,
          {
            opacity: 1,
            duration: 1.2,
            ease: "power2.out",
          },
          "-=1.2"
        )
        .to(
          contentRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
          },
          "-=0.8"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden flex items-center justify-center text-center"
    >
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
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-white/100 pointer-events-none opacity-0"
      ></div>

      {/* Logo Animation */}
      <div
        ref={logoRef}
        className="lgoicon absolute inset-0 flex items-center justify-center opacity-0 "
      >
        <Image
          src="/images/m-logo.svg"
          alt="logo-icon"
          width={1500}
          height={1500}
          className="w-[1400px] h-auto object-contain"
        />
      </div>

      {/* Text Content */}
      <div
        ref={contentRef}
        className="contsnt relative z-10 container px-6 text-black opacity-0 pt-[80px]"
      >
        <h2 className="font-[optima] text-primary text-[50px] leading-none mb-[20px]">
          A JOURNEY <br /> TO PERFECTION
        </h2>
        <h3 className="font-[optima] text-[32px] leading-none mb-[20px]">
          CREATING DESTINATIONS OF DISTINCTION
        </h3>
        <p className="font-[avenir] font-[200] leading-relaxed text-[20px]">
          We transform simple landscapes into extraordinary spaces. At Imtiaz
          Developments, our legacy is built on <br /> design, innovation, and
          attention to detail — bringing iconic communities, resorts, and
          residences to life.
        </p>
      </div>
    </section>
  );
};

export default Hero;
