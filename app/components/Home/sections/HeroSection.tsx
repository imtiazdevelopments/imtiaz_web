// "use client";
// import Image from "next/image";

// type Props = {
//   titleRef: React.RefObject<HTMLHeadingElement | null>;
//   scrollRef: React.RefObject<HTMLImageElement | null>;
// };

// export default function HeroSection({ titleRef, scrollRef }: Props) {
//   return (
//     <section
//       id="sec1"
//       className="h-screen bg-black text-white flex items-center justify-center relative text-center"
//     >
//       <div className="relative w-full h-screen overflow-hidden flex items-center justify-center text-center">
//         <video
//           className="absolute top-0 left-0 w-full object-cover h-[99.9%]"
//           src="/videos/BNR01.mp4"
//           poster="/videos/banner-vid.jpg"
//           autoPlay
//           loop
//           muted
//           playsInline
//         />
//         <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.3)_1.12%,rgba(0,0,0,0.15)_40.24%,rgba(0,0,0,0.75)_100%)] pointer-events-none" />
//         <div className="absolute bottom-[90px] 3xl:bottom-[90px] max-w-[135ch] flex flex-col gap-[40px] md:gap-[60px] 3xl:gap-[72px] items-center justify-center">
//           <div className="relative overflow-hidden">
//             <h1
//               ref={titleRef}
//               className="text-70 font-[optima] leading-[1.143] uppercase text-white opacity-0"
//             >
//               Redefining Spaces <br />
//               Elevating Lives
//             </h1>
//           </div>
//           <div className="overflow-hidden">
//             <Image
//               ref={scrollRef}
//               className="opacity-0 w-[30px]"
//               alt=""
//               src="/icons/mouse.svg"
//               width={50}
//               height={50}
//             />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";
import Image from "next/image";

type Props = {
  titleRef: React.RefObject<HTMLHeadingElement | null>;
  scrollRef: React.RefObject<HTMLImageElement | null>;
};

export default function HeroSection({ titleRef, scrollRef }: Props) {
  return (
    <section
      id="sec1"
      className="h-screen bg-black text-white flex items-center justify-center relative text-center sticky top-0 z-0"
    >
      <div className="relative w-full h-screen overflow-hidden flex items-center justify-center text-center">
        {/* Portrait video — mobile only */}
        <video
          className="absolute top-0 left-0 w-full object-cover h-[99.9%] block md:hidden"
          src="/videos/hero_new_mob.mp4"
          poster="/videos/banner-vid.jpg"
          autoPlay
          loop
          muted
          playsInline
        />
        {/* Landscape video — tablet and above */}
        <video
          className="absolute top-0 left-0 w-full object-cover h-[99.9%] hidden md:block"
          src="/videos/hero_new_desk.mp4"
          poster="/videos/banner-vid.jpg"
          autoPlay
          loop
          muted
          playsInline
        />

        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.3)_1.12%,rgba(0,0,0,0.15)_40.24%,rgba(0,0,0,0.75)_100%)] pointer-events-none" />
        <div className="absolute bottom-[90px] 3xl:bottom-[90px] max-w-[135ch] flex flex-col gap-[72px] items-center justify-center">
          <div className="relative overflow-hidden">
            <h1
              ref={titleRef}
              className="text-heading uppercase text-white opacity-0"
            >
              Redefining Spaces <br />
              Elevating Lives
            </h1>
          </div>
          <div className="overflow-hidden">
            <Image
              ref={scrollRef}
              className="opacity-0 w-[30px]"
              alt=""
              src="/icons/mouse.svg"
              width={50}
              height={50}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
