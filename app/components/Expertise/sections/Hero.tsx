// import Index from "./components/Home/Index";

// export default function Home() {
//   return (
//     <>
//       <Index />
//     </>
//   );
// }

"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
 
import { useSmoothScrollContext } from "../../../contexts/smoothScrollContext";
// import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {   
  const breadcrumbRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const scrollRef = useRef<HTMLImageElement>(null); 

  const { setSmoothScrollActive } = useSmoothScrollContext();

  useEffect(() => {
    // window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";
  }, []);

  useEffect(() => {
  const startAnimations = () => {

    // DISABLE scroll initially (if intro animation)
    document.body.style.overflow = "hidden";
    setSmoothScrollActive(true);

    const ctx = gsap.context(() => {

      const t2 = gsap.timeline({ delay: 6 });    

      t2.fromTo(
        titleRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2 }
      ).fromTo(
        scrollRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        "-=0.3"
      );
      t2.fromTo(
        subtitleRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 }
      ).fromTo(
        scrollRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        "-=0.3"
      ); 

      t2.fromTo(
        breadcrumbRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 }
      ).fromTo(
        scrollRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        "-=0.3"
      ); 
breadcrumbRef
    });

    return () => ctx.revert();   // ⭐ very important cleanup
  };

  startAnimations();

}, []);
 

  return (
   <section
         id="sec1"
         className="h-screen bg-black text-white flex items-center justify-center relative text-center"
       >
         <div className="relative w-full h-screen overflow-hidden flex items-center justify-center text-center">
           
              <Image
                       className="absolute top-0 left-0 w-full object-cover h-[99.9%]"
                       src="/images/expertise/banner.jpg"
                       alt=""
                       width={2500}
                       height={1000}
                     />
 
           <div className="absolute inset-0 bg-black/50 pointer-events-none" />
 
           <div className="absolute inset-0 m-auto bottom-0  flex flex-col gap-[40px] md:gap-[60px] 3xl:gap-[72px] items-center justify-center">
             <div className="relative overflow-hidden">
               <h1
                 ref={titleRef}
                 className="heading-50  uppercase text-white opacity-0 mb-5"
               >
                 Expertise
               </h1>
               <p 
                 ref={subtitleRef} className="text-[16px] max-w-[82ch] font-[optima] leading-[1.2] text-white opacity-0">
                 With top talent, global reach, and strong capital, we deliver fully integrated projects that set benchmarks in quality, value, and cost efficiency.
               </p>
             </div>
             <div className="absolute bottom-[63px] " 
                 ref={breadcrumbRef} >
               <ul className="flex gap-[10px] list-breadcrumb">
                <li>Home</li>
                <li>About</li>
                <li>Expertise</li>
               </ul>
             </div>
 
             
           </div>
         </div>
 
       
       </section>
  );
};

export default Hero;
