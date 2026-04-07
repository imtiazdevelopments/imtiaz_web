"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { historyData, sectionDescription, sectionTitle } from "../data";
import Image from "next/image";
import { SectionHeading } from "../../animations/SectionHeading";
import { SectionDescription } from "../../animations/SectionDescription";

/* ─────────────────────────── constants ────────────────────────── */

const CARD_GAP = 50;
const AUTO_INTERVAL = 2500;

/* ──────────────────────────── types ───────────────────────────── */

interface CardData {
  id: string;
  year: number;
  title: string;
  description: string;
  image: string;
}

/* ═══════════════════════════════════════════════════════════════
   HistorySection
═══════════════════════════════════════════════════════════════ */

export default function HistorySection() {
  const allCards: CardData[] = historyData.flatMap((y) => y.cards);
  const years = historyData.map((y) => y.year);

  const [activeCardIdx, setActiveCardIdx] = useState(0);

  const cardSwiperRef = useRef<SwiperType | null>(null);
  const yearSwiperRef = useRef<SwiperType | null>(null);

  const activeYear = allCards[activeCardIdx]?.year ?? years[0];
  const activeYearData = historyData.find((y) => y.year === activeYear)!;
  const activeYearIdx = years.indexOf(activeYear);

  const cardsInYear = activeYearData?.cards ?? [];
  const cardIdxInYear = cardsInYear.findIndex(
    (c) => c.id === allCards[activeCardIdx]?.id,
  );

  const progressPct =
    cardsInYear.length > 1
      ? (cardIdxInYear / (cardsInYear.length - 1)) * 100
      : 100;

  // When card changes → sync year swiper to matching year (no animation jump)
  useEffect(() => {
    const ys = yearSwiperRef.current;
    if (!ys) return;

    // When looping back to year index 0, snap the timeline to start instantly
    if (activeYearIdx === 0) {
      // Small delay so the dot re-render fires first
      setTimeout(() => {
        ys.translateTo(0, 0);
      }, 0);
    }
  }, [activeYearIdx]);

  const goToCard = useCallback((realIdx: number) => {
    const cs = cardSwiperRef.current;
    if (cs && cs.realIndex !== realIdx) {
      cs.slideToLoop(realIdx, 700);
    }
    setActiveCardIdx(realIdx);
  }, []);

  const goToYear = useCallback(
    (year: number) => {
      const firstIdx = allCards.findIndex((c) => c.year === year);
      if (firstIdx !== -1) goToCard(firstIdx);
    },
    [allCards, goToCard],
  );

  return (
    <section data-header="dark" className="w-full bg-white py-120 3xl:pt-130 3xl:pb-180 overflow-hidden">
      {/* ── Header ── */}
      <div className="container mx-auto px-6 text-center mb-150 lg:mb-50">
        <SectionHeading title={sectionTitle} className="mb-20 uppercase" />
        <SectionDescription text={sectionDescription} className="max-w-[870px] text-foreground-light mx-auto text-center" />
      </div>

      {/* ── Cards Slider ── */}
      <CardsSlider
        allCards={allCards}
        activeCardIdx={activeCardIdx}
        swiperRef={cardSwiperRef}
        onCardChange={(realIdx) => setActiveCardIdx(realIdx)}
      />

      {/* ── Year Timeline ── */}
      <YearTimeline
        years={years}
        activeYearIdx={activeYearIdx}
        activeCardIdx={activeCardIdx}
        progressPct={progressPct}
        swiperRef={yearSwiperRef}
        onYearClick={goToYear}
      />
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CardsSlider
═══════════════════════════════════════════════════════════════ */

function CardsSlider({
  allCards,
  activeCardIdx,
  swiperRef,
  onCardChange,
}: {
  allCards: CardData[];
  activeCardIdx: number;
  swiperRef: React.MutableRefObject<SwiperType | null>;
  onCardChange: (realIdx: number) => void;
}) {
  return (
    <div className="relative w-full">
    <div style={{background: "linear-gradient(270deg, rgba(235, 235, 236, 0) 0%, #EBEBEC 100%)"}} className="hidden lg:block absolute w-[200px] left-0 top-0 h-full z-10" />
    <div style={{background: "linear-gradient(90deg, rgba(235, 235, 236, 0) 0%, #EBEBEC 100%)"}} className="hidden lg:block absolute w-[200px] right-0 top-0 h-full z-10" />
      <Swiper
        modules={[Navigation, Autoplay]}
        loop={true}
        centeredSlides={true}
        autoplay={{
          delay: AUTO_INTERVAL,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        slidesPerView="auto"
        spaceBetween={CARD_GAP}
        speed={700}
        grabCursor={true}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => onCardChange(swiper.realIndex)}
        className="w-full !overflow-visible !h-full"
      >
        {allCards.map((card, idx) => (
          <SwiperSlide
            key={card.id}
            className="!w-[calc(100%-20px)] lg:!w-[849px] !h-full"
          >
            <HistoryCard card={card} isActive={idx === activeCardIdx} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* ── Prev btn ── */}
      <div className="absolute left-[15px] -top-[55px] lg:top-1/2 lg:-translate-y-1/2 z-30">
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="relative lg:w-[50px] lg:h-[50px] 3xl:w-[62px] 3xl:h-[62px] w-[45px] h-[45px]
            group border border-foreground rounded-full
            flex items-center justify-center overflow-hidden transition-all duration-300"
        >
          <span className="absolute left-0 top-0 h-full w-0 bg-primary transition-all duration-300 group-hover:w-full z-0" />
          <Image
            width={28}
            height={28}
            src="/icons/left_arrow_slider_primary.svg"
            alt="Previous"
            className="relative z-10 object-contain group-hover:invert group-hover:brightness-0
              3xl:w-[28px] 3xl:h-[28px] lg:w-[22px] lg:h-[22px] w-[20px] h-[20px] transition-all duration-300"
          />
        </button>
      </div>

      {/* ── Next btn ── */}
      <div className="absolute right-[15px] -top-[55px] lg:top-1/2 lg:-translate-y-1/2 z-30">
        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="relative lg:w-[50px] lg:h-[50px] 3xl:w-[62px] 3xl:h-[62px] w-[45px] h-[45px]
            group border border-foreground rounded-full
            flex items-center justify-center overflow-hidden transition-all duration-300"
        >
          <span className="absolute left-0 top-0 h-full w-0 bg-primary transition-all duration-300 group-hover:w-full z-0" />
          <Image
            src="/icons/left_arrow_slider_primary.svg"
            width={28}
            height={28}
            alt="Next"
            className="relative rotate-180 z-10 object-contain
              3xl:w-[28px] 3xl:h-[28px] lg:w-[22px] lg:h-[22px] w-[20px] h-[20px]
              group-hover:invert group-hover:brightness-0 transition-all duration-300"
          />
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   HistoryCard
═══════════════════════════════════════════════════════════════ */

function HistoryCard({
  card,
  isActive,
}: {
  card: CardData;
  isActive: boolean;
}) {
  return (
    <div className="flex flex-col lg:flex-row items-stretch rounded-[10px] overflow-hidden lg:h-[371px]">
      
      {/* Image */}
      <div className="flex-shrink-0 w-full lg:w-[51.84%] h-[200px] sm:h-[250px] md:h-[300px] lg:h-full">
        <Image
          width={800}
          height={800}
          src={card.image}
          alt={card.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between p-30 flex-1 h-full bg-gray">
        <span className="text-heading text-primary mb-50">
          {card.year}
        </span>

        <div className="mb-[10px]">
          <h3 className="text-25 font-[optima] text-foreground-light uppercase mb-[10px]">
            {card.title}
          </h3>
          <p className="text-description">
            {card.description}
          </p>
        </div>
      </div>

    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   YearTimeline  — scrolls active dot rightward, resets on loop
═══════════════════════════════════════════════════════════════ */

function YearTimeline({
  years,
  activeYearIdx,
  activeCardIdx,
  progressPct,
  swiperRef,
  onYearClick,
}: {
  years: number[];
  activeYearIdx: number;
  activeCardIdx: number;
  progressPct: number;
  swiperRef: React.MutableRefObject<SwiperType | null>;
  onYearClick: (year: number) => void;
}) {
  // Ghost first year appended so last year always has a connecting line
  const loopedYears = [...years, years[0]];
  const scrollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevYearIdxRef = useRef(activeYearIdx);

  useEffect(() => {
    const swiper = swiperRef.current;
    if (!swiper) return;

    const isLoopingBack =
      prevYearIdxRef.current === years.length - 1 && activeYearIdx === 0;

    prevYearIdxRef.current = activeYearIdx;

    if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);

    scrollTimerRef.current = setTimeout(() => {
      const slides = swiper.slides as HTMLElement[];
      const wrapperEl = swiper.el as HTMLElement;
      if (!slides?.length || !wrapperEl) return;

      // On loop-back: instantly snap to start with no animation
      if (isLoopingBack) {
        swiper.translateTo(0, 0);
        return;
      }

      const wRect = wrapperEl.getBoundingClientRect();
      const BUFFER = 24;

      // Check active dot
      const activeSlide = slides[activeYearIdx];
      // Check next dot (could be ghost dot at loopedYears length)
      const nextSlide = slides[activeYearIdx + 1] ?? slides[activeYearIdx];

      if (!activeSlide) return;

      const aRect = activeSlide.getBoundingClientRect();
      const nRect = nextSlide.getBoundingClientRect();

      const activeFits =
        aRect.left >= wRect.left + BUFFER &&
        aRect.right <= wRect.right - BUFFER;
      const nextFits =
        nRect.left >= wRect.left + BUFFER &&
        nRect.right <= wRect.right - BUFFER;

      if (activeFits && nextFits) return; // both visible — do nothing

      if (nRect.right > wRect.right - BUFFER) {
        // Scroll left to reveal next
        const scrollBy = nRect.right - wRect.right + BUFFER;
        swiper.translateTo(swiper.getTranslate() - scrollBy, 400);
      } else if (aRect.left < wRect.left + BUFFER) {
        // Scroll right to reveal active (going backwards)
        const scrollBy = wRect.left - aRect.left + BUFFER;
        swiper.translateTo(swiper.getTranslate() + scrollBy, 400);
      }
    }, 50);

    return () => {
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
    };
  }, [activeYearIdx, activeCardIdx, years.length, swiperRef]);

  return (
    <div className="w-full mt-50 select-none">
      <div className="overflow-x-hidden overflow-y-visible pt-50 pb-2 px-40">
        <Swiper
          loop={false}
          slidesPerView="auto"
          spaceBetween={0}
          speed={400}
          allowTouchMove={true}
          freeMode={false}
          onSwiper={(s) => {
            swiperRef.current = s;
          }}
          className="!overflow-visible"
        >
          {loopedYears.map((year, idx) => {
            const isActive = idx === activeYearIdx;
            const isNextActive = idx + 1 === activeYearIdx;
            const hasLine = idx < loopedYears.length - 1;
            const isGhost = idx === loopedYears.length - 1;

            return (
              <SwiperSlide
                key={`${year}-${idx}`}
                style={{ width: "auto" }}
                className="!flex !items-center !overflow-visible"
              >
                <button
                  onClick={() => !isGhost && onYearClick(year)}
                  disabled={isGhost}
                  className="relative flex-shrink-0 flex items-center justify-center w-[10px] h-[10px] outline-none z-10 disabled:cursor-default"
                >
                  {/* Year label */}
                  <span
                    className={`
                      absolute whitespace-nowrap text-25 font-[optima] tracking-[2%] pointer-events-none
                      bottom-[calc(100%+10px)] left-1/2 -translate-x-1/2
                      transition-colors duration-300
                      ${isActive ? "text-primary" : "text-foreground"}
                    `}
                  >
                    {year}
                  </span>

                  {/* Active ring */}
                  {isActive && (
                    <span className="absolute inset-[-5px] rounded-full ring-2 ring-primary transition-all duration-300" />
                  )}

                  {/* Core dot */}
                  <span
                    className={`block w-[10px] h-[10px] rounded-full bg-primary transition-opacity duration-300 ${
                      isGhost ? "opacity-40" : ""
                    }`}
                  />
                </button>

                {/* ── Line after dot ── */}
                {hasLine && (
                  <div
                    className="relative h-[1.5px] flex-shrink-0 self-center"
                    style={{
                      width: "clamp(120px, 10vw, 255px)",
                      marginLeft: isActive ? 16 : 10,
            marginRight: isNextActive ? 16 : 10,
                    }}
                  >
                    {!isActive && (
                      <div className="absolute inset-0 bg-black/50" />
                    )}
                    {isActive && (
                      <>
<div
  className="absolute inset-0 w-full"
  style={{
    backgroundImage:
      "repeating-linear-gradient(90deg, #5B1A1A 0px, #5B1A1A 6px, transparent 6px, transparent 10px)",
    backgroundSize: "100% 2px",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  }}
/>
                        <div
                          className="absolute -top-[1px] left-0 h-[3px] bg-primary transition-[width] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
                          style={{ width: `${progressPct}%` }}
                        />
                      </>
                    )}
                  </div>
                )}
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}
