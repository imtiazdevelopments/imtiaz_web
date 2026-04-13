"use client";
 
import { useState, useEffect, useRef } from "react";
import Breadcrumb from "../../common/Breadcrumb"; 
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { moveDown, moveUp } from "../../motionVariants"; 
import { SectionHeading } from "../../animations/SectionHeading";
import { SectionDescription } from "../../animations/SectionDescription";
import CustomOutlineButton from "../../common/CustomOutlineButton";
import AuthSlider from "../../auth/AuthSlider"; 
import CareerForm from "../../auth/CareerForm";
import Image from "next/image";

type AuthView = "login" | "signup";

type jobDetail = {
  title: string;
  description: string; 
};

interface Props {
  jobDescription: jobDetail;
}

const BlogHero = ({ jobDescription }: Props) => { 

    const [authView, setAuthView] = useState<AuthView | null>(null);
  const [mounted, setMounted] = useState(false);
    // 👇 Only render portal after client mount
  useEffect(() => {
    setMounted(true);
  }, []);

  const closeAuth = () => setAuthView(null);
  return (
    <section className="w-full pt-200" data-header="dark">
      <div className="container ">
       <div className="flex flex-col    2xl:!max-w-[1322px] mx-auto">
         {/* Breadcrumb */}
        <motion.div
          variants={moveDown(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="w-fit mx-auto"
        >
          <Breadcrumb variant="black" />
        </motion.div>

       <div className="py-120 3xl:py-[130px]">
         {/* Title */}
        <SectionHeading
          title={jobDescription.title}
          className="  text-foreground   uppercase  mb-20"
        />
        <SectionDescription
          text={jobDescription.description}
          className=" max-w-[136.6ch] text-foreground-light mb-50"
        /> 
         <motion.div
          variants={moveUp(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="w-fit"
        >
        <CustomOutlineButton
                    onClick={() => setAuthView("login")}
            className="w-fit uppercase 3xl:py-[23px] 3xl:px-[45.07px]"
            text="Apply now"
            borderColor="border-primary-2"
            textColor="text-foreground-light"
            variant="dark"
          />
          </motion.div>
       </div>
       </div>

        {mounted &&
        createPortal(
          <AnimatePresence mode="wait">
            {authView && (
              <>
                <motion.div
                  key="auth-backdrop"
                  className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[1000]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={closeAuth}
                />

                <motion.div
                  className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1001] w-full h-full sm:h-[85vh] lg:h-[80vh] xl:h-full"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.2, ease: [0.25, 1, 0.5, 1] }}
                >
                  <div className="flex w-full overflow-hidden bg-white h-full">
                    <div className="relative h-full flex-shrink-0 hidden md:block md:w-[48.4%]">
                      <AuthSlider />
                    </div>

                    <div className="relative w-full md:w-[51.6%] h-full bg-white overflow-hidden pointer-events-none">
                      {/* Background decoration — behind scroll layer */}
                      <div className="absolute bottom-0 left-0 pointer-events-none">
                        <Image
                          src="/icons/layout_icons/m-icon.svg"
                          alt="Icon"
                          width={534}
                          height={704}
                        />
                      </div>

                      <AnimatePresence mode="wait">
                        <motion.div
                          key={authView}
                          className="absolute inset-0 flex items-start justify-center overflow-y-auto py-150 3xl:py-0 pointer-events-auto dark-section-2"
                          onWheel={(e) => e.stopPropagation()}
                          onTouchMove={(e) => e.stopPropagation()}
                          initial={{ opacity: 0, x: 40 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -40 }}
                          transition={{
                            duration: 0.25,
                            ease: [0.25, 1, 0.5, 1],
                          }}
                        >
                           
                            <CareerForm
                              onClose={closeAuth}
                              onSwitch={() => setAuthView("login")}
                            /> 
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>,
          document.body,
        )}
      </div>
    </section>
  );
};

export default BlogHero;
