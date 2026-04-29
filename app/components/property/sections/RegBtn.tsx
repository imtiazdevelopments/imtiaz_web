"use client";

import {  useEffect, useState, useRef } from "react"; 
import CustomOutlineButton from "../../common/CustomOutlineButton"; 
import { createPortal } from "react-dom";
import RegisterInterestForm from "@/app/components/Home/sections/RegisterInterestForm";
import gsap from "gsap";
 

 

const RegBtn = () => { 
 
    const [enquiryOpen, setEnquiryOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [atBottom, setAtBottom] = useState(false);
    const [enquiryVisible, setEnquiryVisible] = useState(false);
 
      const backdropRef = useRef<HTMLDivElement>(null);
      const modalRef = useRef<HTMLDivElement>(null); 

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
  const handleScroll = () => {
    const scrolledToBottom =
      window.innerHeight + window.scrollY >= document.body.scrollHeight - 50; // 50px threshold
    setAtBottom(scrolledToBottom);
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
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
  return (
    <>
  
    <div className="flex lg:hidden fixed bottom-5 left-1/2 -translate-x-1/2 z-40 transition-all duration-500">
          <div  >
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
                      className="fixed inset-0 z-[1000] bg-black/80 backdrop-blur-[6px] opacity-100"
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
                </>
  );
};

export default RegBtn;
