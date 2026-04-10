"use client";

import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";
import CustomOutlineButton from "../../common/CustomOutlineButton";
import { SectionHeading } from "../../animations/SectionHeading";
 
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger"; 
// ── Types ──────────────────────────────────────────────
interface Slide {
  id: number;
  image: string;
  title: string;
  featured: boolean;
}

// ── Breakpoint hook ────────────────────────────────────
function useBreakpoint() {
  const [bp, setBp] = useState<"mobile"   | "desktop">("desktop");
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 768) setBp("mobile"); 
      else setBp("desktop");
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return bp;
}

// ── Data ───────────────────────────────────────────────
const slides: Slide[] = [
   { id: 2, image: "/images/community-listing/slide2.jpg", title: "DUBAI LAND RESIDENCE COMPLEX", featured: true },
 
  { id: 1, image: "/images/community-listing/slide1.jpg", title: "DUBAI ISLANDS", featured: false },
  { id: 3, image: "/images/community-listing/slide3.jpg", title: "JUMEIRAH GARDEN CITY", featured: false }, 
];

const TOTAL = slides.length;
function mod(n: number, m: number) { return ((n % m) + m) % m; }

// ── Slider ─────────────────────────────────────────────
export default function CommunitySlider() {
  const [active,  setActive]  = useState(0);
  const [hovered, setHovered] = useState<"left" | "center" | "right" | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const bp = useBreakpoint();

  const goTo = useCallback((i: number) => setActive(mod(i, TOTAL)), []);
  const next = useCallback(() => goTo(active + 1), [active, goTo]);
  const prev = useCallback(() => goTo(active - 1), [active, goTo]);

   

  type PanelPos = "left" | "center" | "right";

  // ── Panel config per breakpoint ──────────────────────
  const panels: { pos: PanelPos; idx: number }[] =
    bp === "mobile" 
      ? [{ pos: "center", idx: active }]
      : [
          { pos: "left",   idx: mod(active - 1, TOTAL) },
          { pos: "center", idx: active },
          { pos: "right",  idx: mod(active + 1, TOTAL) },
        ];

  // ── Width ────────────────────────────────────────────
  const getWidth = (pos: PanelPos): string => {
    if (bp !== "desktop") return "100%";
    if (!hovered)            return pos === "center" ? "45.4%" : "27.25%";
    if (hovered === pos)     return "45.4%";
    return "27.25%";
  };

  // ── Which panel shows the "active" style ─────────────
  // Rule: only the hovered panel shows active style.
  // If nothing is hovered → center shows active style.
  // If a SIDE is hovered  → ONLY that side shows active style (center reverts).
  const showActive = (pos: PanelPos): boolean => {
    if (!hovered) return pos === "center";
    return hovered === pos;
  };
const btnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!btnRef.current) return;

    gsap.fromTo(
      btnRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: btnRef.current,
          start: "top 90%",
          once: true,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section data-header="dark" >
      <div className="container flex flex-col justify-center">

    {/* Header */}
    <div className="text-center">
      <SectionHeading
        title="OUR OTHER COMMUNITIES"
        className="text-heading mb-20"
      /> 

        <div ref={btnRef} className="mb-50 hidden md:block">
          <CustomOutlineButton
            className="w-fit mx-auto 2xl:!px-[35.5px] 2xl:!py-[22.5px]"
            text="View All"
            borderColor="border-primary-2"
            textColor="text-foreground-light"
            variant="dark"
          />
        </div>
    </div>

    {/* 📱 MOBILE: LIST VIEW */}
    {bp === "mobile" && (
      <div className="flex flex-col gap-6">

        {slides.map((slide, i) => (
          <div key={slide.id} className="relative h-[300px] overflow-hidden">

            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black" />

            <div className="absolute inset-0 flex flex-col items-center justify-end mb-7 text-white text-center px-4">
              <h2 className="mb-6">{slide.title}</h2>
 <div ref={btnRef} >
              <CustomOutlineButton
                className="px-6 py-2"
                text="View Community"
                borderColor="border-white/80"
                textColor="text-white"
                variant="dark"
              />
            </div>
            </div>
          </div>
        ))}
 
        <div ref={btnRef} className="mt-3">
          <CustomOutlineButton
            className="w-fit mx-auto"
            text="View All"
            borderColor="border-primary-2"
            textColor="text-foreground-light"
            variant="dark"
          />
        </div>
      </div>
    )}

  </div>

  {/* 💻 DESKTOP: KEEP YOUR SLIDER */}
  {bp !== "mobile" && (
      <div className="relative w-full h-[420px] md:h-[520px] lg:h-[620px] overflow-hidden ">
        <div className="flex w-full h-full justify-between bg-black">
        {panels.map(({ pos, idx }) => {
          const slide   = slides[idx];
          const active_ = showActive(pos);

          return (
            <div
              key={`${pos}-${idx}`}
              onMouseEnter={() => setHovered(pos)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => {
                if (pos === "left")  prev();
                if (pos === "right") next();
              }}
              style={{
                width: getWidth(pos),
                transition: "width 600ms cubic-bezier(0.4, 0, 0.2, 1)",
                flexShrink: 0,
              }}
              className={`
                relative h-full overflow-hidden
                ${pos !== "center" ? "cursor-pointer" : "cursor-default"}
              `}
            >
              {/* Background Image */}
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className={`
                  object-cover transition-transform duration-700 ease-in-out sc105
                  ${active_ ? "scale-105" : "scale-100"}
                `}
              />

              {/* Default gradient — bottom fade, hidden when active */}
              <div
                className={`
                  absolute inset-0
                  bg-[linear-gradient(180deg,rgba(0,0,0,0)_50.09%,#000000_100%)]
                  transition-opacity duration-500 goop0
                  ${active_ ? "opacity-0" : "opacity-100"}
                `}
              />

              {/* Active full overlay */}
              <div
                className={`
                  absolute inset-0
                  bg-[linear-gradient(180deg,rgb(0_0_0/25%)_35.92%,#00000000_100%),linear-gradient(0deg,rgb(0_0_0/95%),rgba(0,0,0,0.5))]
                  transition-opacity duration-500 goop1
                  ${active_ ? "opacity-100" : "opacity-0"}
                `}
              />

              {/* Featured overlay — only on inactive non-hovered */}
              {slide.featured && !active_ && (
                <div className="absolute inset-0 bg-black/40 transition-all duration-500" />
              )}

              {/* Inactive title — bottom, hidden when active */}
              <div
                className={`
                  absolute left-0 right-0 px-6 bottom-6 text-center
                  transition-all duration-500 ease-in-out goop0
                  ${active_
                    ? "opacity-0 translate-y-2 pointer-events-none"
                    : "opacity-100 translate-y-0"
                  }
                `}
              >
                <h2 className="text-white font-light tracking-[2%] uppercase text-25 font-[optima] transition-all duration-500">
                  {slide.title}
                </h2>
              </div>

              {/* Active content — title + button */}
              <div
                className={`
                  absolute inset-0 flex flex-col items-center justify-center
                  transition-all duration-500 ease-in-out goop1 gotr0
                  ${active_
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 translate-y-4 pointer-events-none"
                  }
                `}
              >
                <h2
                  className={`
                    text-white font-light tracking-[2%] uppercase
                    text-25 font-[optima] text-center px-4
                    transition-all duration-700 mb-10 xl:mb-[120px] gotr0
                    ${active_ ? "translate-y-0" : "translate-y-6"}
                  `}
                >
                  {slide.title}
                </h2>
 
                 <CustomOutlineButton
        className="2xl:!px-[41px] 2xl:!py-[22.5px]  "
        text="View Community"
        borderColor="border-white/80"
        textColor="text-white" 
      />
              </div>

             
            </div>
          );
        })}
      </div>

     
      </div>
  )}

     
     
    </section>
  );
}