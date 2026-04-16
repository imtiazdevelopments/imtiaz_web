"use client";

import { useCallback, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import Breadcrumb from "../../common/Breadcrumb"; 
import BannerDetails from "./BannerDetails";

interface InnerHeroProps {
  image: string;
  title: string;
  description?: string;
  maxW?: string;
  maxTitle?: string;
}

const ZOOM_OUT_DURATION = 2.2;
const ZOOM_IN_DURATION = 10;
const ZOOM_OUT_START = 1.4;
const ZOOM_OUT_END = 1.0;
const ZOOM_IN_END = 1.06;


const BREADCRUMB_DELAY = ZOOM_OUT_DURATION - 1.6;
const BANNER_DETAILS_DELAY = BREADCRUMB_DELAY + 0.17;

const InnerHeroBanner = ({
  image,
}: InnerHeroProps) => {
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const breadcrumbRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);
  const bannerDetailsRef = useRef<HTMLDivElement>(null);

  const handleImageLoad = useCallback(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    gsap.context(() => {
      // Zoom-out → slow Ken-Burns creep
      gsap.fromTo(
        imageWrapperRef.current,
        { scale: ZOOM_OUT_START, transformOrigin: "center center" },
        {
          scale: ZOOM_OUT_END,
          duration: ZOOM_OUT_DURATION,
          ease: "expo.out",
          onComplete: () => {
            // 👉 Then start infinite subtle loop
            gsap
              .timeline({ repeat: -1 })
              .to(imageWrapperRef.current, {
                scale: ZOOM_IN_END,
                duration: ZOOM_IN_DURATION,
                ease: "sine.inOut",
              })
              .to(imageWrapperRef.current, {
                scale: ZOOM_OUT_END,
                duration: ZOOM_IN_DURATION,
                ease: "sine.inOut",
              });
          },
        },
      );


      // Breadcrumb — subtle slide up
      if (breadcrumbRef.current) {
        gsap.fromTo(
          breadcrumbRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            ease: "power3.out",
            delay: BREADCRUMB_DELAY,
          },
        );
      }

      if (bannerDetailsRef.current) {
        gsap.fromTo(
          bannerDetailsRef.current,
          { y: 200 },
          {
            y: 0,
            duration: 1,
            ease: "power3.out",
            delay: BANNER_DETAILS_DELAY,
          },
        );
      }
    });
  }, []);

  return (
    <section
      className="relative w-full h-[82vh] 2xl:h-screen overflow-hidden"
      data-header="light"
    >
      <div
        ref={imageWrapperRef}
        className="absolute inset-0 will-change-transform"
        style={{ transformOrigin: "center center" }}
      >
        <Image
          src={image}
          alt={"title"}
          fill
          sizes="100vw"
          className="object-cover object-center 2xl:object-bottom"
          priority
          onLoad={handleImageLoad}
        />
      </div>

      {/* Static overlay */}
      <div className="absolute inset-0 bg-black/54" />
      <div className="absolute bottom-0   left-0 right-0 ">
        <div ref={breadcrumbRef} style={{ opacity: 0 }}>
          <div className="flex justify-center mb-2 sm:mb-5 lg:mb-60 3xl:mb-[63px] ">
            <Breadcrumb />
          </div>
        </div>

        <div ref={bannerDetailsRef} style={{ transform: "translateY(200px)" }}>
          <BannerDetails />
        </div>
      </div>
    </section>
  );
};

export default InnerHeroBanner;
