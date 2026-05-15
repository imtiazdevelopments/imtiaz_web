// "use client";

// import Image from "next/image";
// import { SectionHeading } from "../animations/SectionHeading";
// import { SectionDescription } from "../animations/SectionDescription";
// import { useGsapStagger } from "../../hooks/useGsapStagger";
// import { useEffect, useState } from "react";
// // ── Types ──────────────────────────────────────────────
// type EverythingWithinData = {
//   title: string;
//   description: string;
//   cards: {
//     id: number;
//     icon: string;
//     label: string;
//     minutes: string;
//     iconWidth?: number;
//     iconHeight?: number;
//   }[];
// };

// type Props = {
//   data: EverythingWithinData;
//   bgClass?: string;
// };

// // ── Component ──────────────────────────────────────────
// export default function IconGrid({ data, bgClass }: Props) {
//   const [isXL, setIsXL] = useState(false);

//   useEffect(() => {
//     const check = () => setIsXL(window.innerWidth >= 1280);
//     check();
//     window.addEventListener("resize", check);
//     return () => window.removeEventListener("resize", check);
//   }, []);
//   const gridRef = useGsapStagger({
//     selector: ".location-card",
//     from: { opacity: 0, y: 40 },
//     to: { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
//     stagger: 0.15,
//     start: "top 80%",
//   });

//   return (
//     <section
//       data-header="dark"
//       className={`w-full py-[70px] lg:py-120 3xl:py-130 ${bgClass ? bgClass : ""}`}
//     >
//       <div className="container flex flex-col justify-center">
//         {/* Header */}
//         <div className="text-center">
//           <SectionHeading
//             title={data.title}
//             className="text-heading leading-[1.4] mb-20"
//           />
//           <SectionDescription
//             text={data.description}
//             className="text-description text-foreground-light max-w-[43ch] mx-auto"
//           />
//         </div>

//         {/* Cards */}
//         <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-[50px] lg:mt-60">
//           {data.cards.map((loc, i) => (
//             <div
//               key={loc.id}
//               className="location-card relative flex flex-col items-center justify-start p-2 md:px-4 sm:px-8 md:py-5 text-center"
//             >
//               {/* Desktop divider */}
//               {i !== 0 && (
//                 <div
//                   className="absolute left-0 top-0 w-px h-full hidden lg:block"
//                   style={{
//                     background:
//                       "linear-gradient(rgba(73, 9, 5, 0) 0%, rgb(73 9 5 / 70%) 50%, rgba(73, 9, 5, 0) 100%)",
//                   }}
//                 />
//               )}

//               {/* Mobile divider */}
//               {(i === 1 || i === 3) && (
//                 <div
//                   className="absolute left-0 top-0 w-px h-full hidden md:block lg:hidden"
//                   style={{
//                     background:
//                       "linear-gradient(rgba(73, 9, 5, 0) 0%, rgb(73 9 5 / 70%) 50%, rgba(73, 9, 5, 0) 100%)",
//                   }}
//                 />
//               )}

//               {/* Icon */}
//               <div className="w-[50px] h-[50px] md:w-[60px] md:h-[60px] lg:w-[70px] mb-20 lg:h-[70px] xl:w-[80px] xl:h-[80px] rounded-full flex items-center justify-center bg-primary/5">
//                 <Image
//                   src={loc.icon}
//                   alt={loc.label}
//                   width={isXL ? loc.iconWidth : 20}
//                   height={isXL ? loc.iconWidth : 20}
//                 />
//               </div>

//               {/* Label */}
//               <p
//                 className="text-foreground font-[optima] text-25 leading-[1.4] uppercase mb-2"
//                 dangerouslySetInnerHTML={{ __html: loc.label }}
//               />

//               {/* Minutes */}
//               <p className="text-description text-foreground-light">
//                 {loc.minutes}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }


"use client";

import Image from "next/image";
import { SectionHeading } from "../animations/SectionHeading";
import { SectionDescription } from "../animations/SectionDescription";
import { useGsapStagger } from "../../hooks/useGsapStagger";
import { useEffect, useState } from "react";

type EverythingWithinData = {
  title: string;
  description: string;
  cards: {
    title:string;
    caption:string;
    icon_url:string;
  }[];
};

type Props = {
  data: EverythingWithinData;
  bgClass?: string;
};

export default function IconGrid({ data, bgClass }: Props) {
  const [isXL, setIsXL] = useState(false);

  useEffect(() => {
    const check = () => setIsXL(window.innerWidth >= 1280);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const gridRef = useGsapStagger({
    selector: ".location-card",
    from: { opacity: 0, y: 40 },
    to: { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
    stagger: 0.15,
    start: "top 80%",
  });

  return (
    <section
      data-header="dark"
      className={`w-full py-[70px] lg:py-120 3xl:py-130 ${bgClass ? bgClass : ""}`}
    >
      <div className="container flex flex-col justify-center">
        {/* Header */}
        <div className="text-center">
          <SectionHeading
            title={data.title}
            className="text-heading leading-[1.4] mb-20 max-w-[45ch] mx-auto"
          />
          <SectionDescription
            text={data.description}
            className="text-description text-foreground-light max-w-[60ch] mx-auto"
          />
        </div>

        {/* Cards */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-[50px] lg:mt-60"
        >
          {data.cards.map((loc, i) => (
            <div
              key={i}
              className="location-card relative flex flex-col items-center justify-start pb-20 pt-20 first:pt-0 last:pb-0 md:px-4 sm:px-8 text-center"
            >
              {/* Desktop divider */}
              {i !== 0 && (
                <div
                  className="absolute left-0 top-0 w-px h-full hidden lg:block"
                  style={{
                    background:
                      "linear-gradient(rgba(73, 9, 5, 0) 0%, rgb(73 9 5 / 70%) 50%, rgba(73, 9, 5, 0) 100%)",
                  }}
                />
              )}

              {/* Tablet vertical divider */}
              {(i === 1 || i === 3) && (
                <div
                  className="absolute left-0 top-0 w-px h-full hidden sm:block lg:hidden"
                  style={{
                    background:
                      "linear-gradient(rgba(73, 9, 5, 0) 0%, rgb(73 9 5 / 70%) 50%, rgba(73, 9, 5, 0) 100%)",
                  }}
                />
              )}

{/* Mobile (< sm) */}
{i < data.cards.length - 1 && (
  <div
    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px block sm:hidden"
    style={{
      background:
        "linear-gradient(90deg, rgba(73, 9, 5, 0) 0%, rgb(73 9 5 / 70%) 50%, rgba(73, 9, 5, 0) 100%)",
    }}
  />
)}

{/* Tablet (≥ md, < lg) */}
{i < data.cards.length - 2 && (
  <div
    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px hidden sm:block lg:hidden"
    style={{
      background:
        "linear-gradient(90deg, rgba(73, 9, 5, 0) 0%, rgb(73 9 5 / 70%) 50%, rgba(73, 9, 5, 0) 100%)",
    }}
  />
)}

              {/* Icon */}
              <div className="w-[50px] h-[50px] md:w-[60px] md:h-[60px] lg:w-[70px] mb-20 lg:h-[70px] xl:w-[80px] xl:h-[80px] rounded-full flex items-center justify-center bg-primary/5">
                <Image
                  src={loc.icon_url}
                  alt={loc.caption}
                  width={isXL ? 34 : 20}
                  height={isXL ? 34 : 20}
                />
              </div>

              {/* Label */}
              <p
                className="text-foreground font-[optima] text-25 leading-[1.4] uppercase mb-2"
                dangerouslySetInnerHTML={{ __html: loc.title }}
              />

              {/* Minutes */}
              <p className="text-description text-foreground-light">
                {loc.caption}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}