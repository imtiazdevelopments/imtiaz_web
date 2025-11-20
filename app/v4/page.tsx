"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftBgRef = useRef<HTMLDivElement>(null);
  const rightBgRef = useRef<HTMLDivElement>(null);
  const leftTextRef = useRef<HTMLDivElement>(null);
  const rightTextRef = useRef<HTMLDivElement>(null);

 useEffect(() => {
  const ctx = gsap.context(() => {

    const bar = document.getElementById("bar");
    const img1 = document.querySelector(".img1-1");
    const img2 = document.querySelector(".img1-2");
    const img3 = document.querySelector(".img1-3");

    if (!bar || !img1 || !img2 || !img3) return; // <-- PREVENT ERROR

    gsap.set(bar, { height: 0, width: "0%" });
    gsap.set([img1, img2, img3], { scale: 0 });

    const tlSec1 = gsap.timeline({
      scrollTrigger: {
        trigger: "#sec1",
        start: "end top",
        end: "+=150%",
        pin: true,
        scrub: 1,
      },
    });

    tlSec1
      .to(bar, { height: 20 })
      .to(bar, { width: "100%" })
      .to(bar, { height: "100vh" })
      .to(img1, { scale: 1 }, "-=0.2")
      .to(img2, { scale: 1 }, "-=0.3")
      .to(img3, { scale: 1 }, "-=0.3")
      .to(".split-section", {
    scale: 1,
    ease: "power3.out",
    duration: 1,
  });
  });

  return () => ctx.revert();  // cleanup on route change
}, []);




 useEffect(() => {
  const section = sectionRef.current!;
  const leftBg = leftBgRef.current!;
  const rightBg = rightBgRef.current!;
  const leftText = leftTextRef.current!;
  const rightText = rightTextRef.current!;

  gsap.set([leftBg, leftText], { x: 0 });
  gsap.set([rightBg, rightText], { x: 0 });

  const tlSec2 = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: "+=120%",
      scrub: 1,
      pin: true,
    },
  });

  tlSec2.to([leftBg, leftText], {
    x: "-100%",
    duration: 1.2,
  });

  tlSec2.to(
    [rightBg, rightText],
    {
      x: "100%",
      duration: 1.2,
    },
    "<"
  );
}, []);


  return (
    <>
      {/* SECTION 1 */}
 <section
  id="sec1"
  className="h-screen bg-black text-white flex items-center justify-center relative text-center"
>
  <h1 className="text-5xl z-20">SECTION 1</h1>

  {/* ANIMATED BAR */}
  <div
    id="bar"
    className="bg-[#6F0F0A] absolute left-0 right-0 mx-auto"
  ></div>

    <div className="img1-1 absolute w-full h-full z-20 inset-0 scale-[0]">
    <Image className="w-full h-full object-cover object-center absolute" src="/images/home/imtiaz-properties/1.png" alt="" width={1500} height={100}/>
    </div>
    <div className="img1-2 absolute w-full h-full z-30 inset-0 scale-[0]">
    <Image className="w-full h-full object-cover object-center absolute" src="/images/home/imtiaz-properties/3.png" alt="" width={1500} height={100}/>
    </div>
    <div className="img1-3 absolute w-full h-full z-40 inset-0 scale-[0]">
    <Image className="w-full h-full object-cover object-center absolute" src="/images/home/imtiaz-properties/2.png" alt="" width={1500} height={100}/>
    </div>
   {/*  <Image className="img2 scale-0" src="/images/home/imtiaz-properties/3.png" alt="" width={1500} height={100}/> */}
   {/*  <Image className="img2 scale-0" src="/images/home/imtiaz-properties/3.png" alt="" width={1500} height={100}/> */}

</section>
      {/* SPLIT SECTION */}
      <section
        ref={sectionRef}
        className="split-section h-screen bg-[#fff] overflow-hidden flex items-center justify-center absolute z-50 scale-0"
      >
        {/* LEFT BG */}
        <div
          ref={leftBgRef}
          className="absolute left-0 top-0 w-1/2 h-full bg-[#6F0F0A] z-10"
        />

        {/* RIGHT BG */}
        <div
          ref={rightBgRef}
          className="absolute right-0 top-0 w-1/2 h-full bg-[#6F0F0A] z-10"
        />

        {/* TEXT SPLIT → LEFT */}
        <div
          ref={leftTextRef}
          className="absolute left-0 top-1/2 -translate-y-1/2 w-1/2 h-auto overflow-hidden flex justify-end pr-4 z-20"
        >
          <h1 className="text-[60px] font-bold leading-tight whitespace-nowrap text-black text-right">
            WE SELL REAL ESTATE THAT
          </h1>
        </div>

        {/* TEXT SPLIT → RIGHT */}
        <div
          ref={rightTextRef}
          className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-auto overflow-hidden flex justify-start pl-4 z-20"
        >
          <h1 className="text-[60px] font-bold leading-tight whitespace-nowrap text-black text-left">
            EVOKES EMOTIONS. WE GIVE A NEW SENSE OF SELF
          </h1>
        </div>
      </section>

      {/* SECTION 3 */}
      <section className="h-screen bg-gray-900 text-white flex items-center justify-center">
        <h1 className="text-5xl">SECTION 3</h1>
      </section>
    </>
  );
}
