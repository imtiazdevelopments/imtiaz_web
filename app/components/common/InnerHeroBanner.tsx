"use client";

import { useCallback, useRef, useState,useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import Breadcrumb from "./Breadcrumb";
import { AnimatedHeading } from "../animations/AnimateHeading";
import CustomOutlineButton from "./CustomOutlineButton";
import { createPortal } from "react-dom";
import RegisterInterestForm from "@/app/components/Home/sections/RegisterInterestForm";

interface InnerHeroProps {
  image: string;
  title: string;
  description?: string;
  maxW?: string;
  maxTitle?: string;
}

const ZOOM_OUT_DURATION = 2.2;
const ZOOM_IN_DURATION = 10;
const ZOOM_OUT_START = 1.45;
const ZOOM_OUT_END = 1.0;
const ZOOM_IN_END = 1.06;

const HEADING_DELAY = ZOOM_OUT_DURATION - 1.6;
const DESC_DELAY = HEADING_DELAY + 0.55;
const BREADCRUMB_DELAY = DESC_DELAY + 0.35;
const BTN_DELAY = DESC_DELAY + 0.15;

const InnerHeroBanner = ({
  image,
  title,
  description,
  maxW,
  maxTitle,
}: InnerHeroProps) => {
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const breadcrumbRef = useRef<HTMLDivElement>(null);
  const regbtnRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);
    const [mounted, setMounted] = useState(false);
    const [enquiryOpen, setEnquiryOpen] = useState(false);
    const [enquiryVisible, setEnquiryVisible] = useState(false);
      const backdropRef = useRef<HTMLDivElement>(null);
      const modalRef = useRef<HTMLDivElement>(null);
 const [atBottom, setAtBottom] = useState(false);

useEffect(() => {
  const handleScroll = () => {
    const scrolledToBottom =
      window.innerHeight + window.scrollY >= document.body.scrollHeight - 50; // 50px threshold
    setAtBottom(scrolledToBottom);
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);
 useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!enquiryOpen) return;
    setEnquiryVisible(true);
requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    if (!backdropRef.current || !modalRef.current) return;
    gsap.fromTo(
      backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: "power2.out" },
      );
      gsap.fromTo(
        modalRef.current,
        {
          opacity: 0,
          scale: 1.08,
          filter: "blur(8px)",
          transformOrigin: "center center",
        },
        {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.55,
          ease: "power3.out",
        },
      );
    });
    });
  }, [enquiryOpen]);

  const closeModal = () => {
    if (!backdropRef.current || !modalRef.current) return;
    gsap.to(backdropRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
    });
    gsap.to(modalRef.current, {
      opacity: 0,
      scale: 1.06,
      filter: "blur(16px)",
      duration: 0.5,
      ease: "power3.out",
      onComplete: () => {
        setEnquiryVisible(false);
        setEnquiryOpen(false);
      },
    });
  };
  const handleImageLoad = useCallback(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    gsap.context(() => {
      // Zoom-out → slow Ken-Burns creep
      // 👉 First: run intro ONCE
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

      // Description
      if (descRef.current) {
        gsap.fromTo(
          descRef.current,
          { opacity: 0, y: 16, filter: "blur(4px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.0,
            ease: "power3.out",
            delay: DESC_DELAY,
          },
        );
      }

      // Breadcrumb — subtle slide up
      if (breadcrumbRef.current) {
        gsap.fromTo(
          breadcrumbRef.current,
          { opacity: 0, y: 10 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            ease: "power3.out",
            delay: BREADCRUMB_DELAY,
          },
        );
      }

      if (regbtnRef.current) {
        gsap.fromTo(
          regbtnRef.current,
          { y: 100 },
          { 
            y: 0,
            duration: 0.65,
            ease: "power3.out",
            delay: BTN_DELAY,
          },
        );
      }
      
    });
  }, []);

  return (
    <section
      className="relative w-full h-screen lg:h-[82vh] 2xl:h-[89.5dvh] overflow-hidden"
      data-header="light"
    >
      <div
        ref={imageWrapperRef}
        className="absolute inset-0 will-change-transform"
        style={{ transformOrigin: "center center" }}
      >
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover object-center 2xl:object-bottom"
          priority
          onLoad={handleImageLoad}
        />
      </div>

      {/* Static overlay */}
      <div className="absolute inset-0 bg-black/54" />

      <div className="container absolute inset-0 flex items-center justify-center">
        <div className="w-full text-center">
          {/* delay prop fires blade animation after zoom-out nearly finishes */}
          <div className={`${maxTitle} mx-auto`}>
            <AnimatedHeading
              title={title}
              className="mb-[8px] md:mb-20 text-white"
              mode="blade"
              delay={HEADING_DELAY}
            />
          </div>
          {description && (
            <p
              ref={descRef}
              style={{ opacity: 0 }}
              className={`text-white/80 text-description ${maxW} mx-auto text-center flex items-center justify-center px-[13px] md:px-30 xl:px-0 whitespace-pre-line`}
            >
              {description}
            </p>
          )}
        </div>
      </div>

      <div
        ref={breadcrumbRef}
        style={{ opacity: 0 }}
        className="absolute flex flex-col justify-center   items-center gap-5 bottom-[90px] lg:bottom-60 3xl:bottom-[63px] left-0 right-0 flex justify-center"
      >
        <Breadcrumb />
        
      </div>
      <div className="flex lg:hidden fixed bottom-5 left-1/2 -translate-x-1/2 z-40 transition-all duration-500">
  <div ref={regbtnRef}>
    <CustomOutlineButton
      onClick={() => setEnquiryOpen(true)}
      px={`px-5 h-[44px] bg-primary/80 backdrop-blur-[30px] transition-all duration-500 ${
        atBottom ? "translate-y-[70px]" : ""
      }`}
      text="Register Now"
      borderColor="border-white/30"
      textColor="text-white"
      variant="light"
    />
  </div>
</div>
         {mounted &&
                enquiryVisible &&
                createPortal(
                  <>
                    <div
                      ref={backdropRef}
                      className="fixed inset-0 z-[1000] bg-black/80 backdrop-blur-[6px] opacity-0"
                      onClick={closeModal}
                    />
                    <div
                      onClick={closeModal}
                      ref={modalRef}
                      className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1001] w-full h-screen"
                    >
                      <div className="h-full">
                        <div className="relative w-full h-full overflow-hidden pointer-events-none">
                          <div
                            className="absolute inset-0 overflow-y-auto pointer-events-auto"
                            onWheel={(e) => e.stopPropagation()}
                            onTouchMove={(e) => e.stopPropagation()}
                          >
                            <div className="min-h-full flex items-center justify-center py-10">
                              <RegisterInterestForm onClose={closeModal} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>,
                  document.body,
                )}
    </section>
  );
};

export default InnerHeroBanner;
