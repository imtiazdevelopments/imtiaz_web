"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import NavPageV3 from "../common/NavPageV3";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { usePathname } from "next/navigation";
import LoginForm from "../auth/LoginForm";
import SignupForm from "../auth/SignupForm";
import AuthSlider from "../auth/AuthSlider";

type AuthView = "login" | "signup";

const InnerHeader: React.FC = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [authView, setAuthView] = useState<AuthView | null>(null);
  const [headerTheme, setHeaderTheme] = useState<"light" | "dark">("light");

  // Scroll hide/show
  const lastScrollY = useRef(0);
  const y = useMotionValue(0);
  const springY = useSpring(y, { stiffness: 80, damping: 20, mass: 0.8 });

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const diff = currentY - lastScrollY.current;
      if (diff > 0) {
        y.set(-120);
      } else {
        y.set(0);
      }
      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [y]);

  // Section-based header theme
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("[data-header]");
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const theme = (entry.target as HTMLElement).dataset.header as
              | "light"
              | "dark";
            setHeaderTheme(theme);
          }
        });
      },
      {
        rootMargin: "0px 0px -95% 0px",
        threshold: 0,
      },
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    if (authView) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [authView]);

  const bgClass = headerTheme === "dark" ? "bg-black/60" : "bg-white/10";

  const closeAuth = () => setAuthView(null);

  return (
    <>
      {/* ========================= HEADER ========================= */}
      <motion.div
        style={{ y: springY }}
        className="fixed top-0 left-0 w-full z-[999] pt-20"
      >
        <header className="w-full">
          <div className="container">
            <div className="relative flex items-center justify-between w-full rounded-full h-[50px] md:h-[65px] lg:h-[75px] 3xl:h-[80px] py-[15px] px-20 xl:px-40">
              <div
                className={`absolute inset-0 rounded-full ${bgClass} backdrop-blur-[30px] border border-white/[0.08] z-[-1] transition-colors duration-500`}
              />

              {/* LEFT — Hamburger */}
              <div className="flex items-center w-[40%] 2xl:w-[33.33%]">
                <button
                  className="flex items-center justify-center w-[40px] h-[40px] cursor-pointer"
                  onClick={() => setIsMenuOpen(true)}
                >
                  <Image
                    src="/images/hamburger-desktop.svg"
                    alt="menu"
                    width={22}
                    height={22}
                    className="w-[22px] h-[15.13px]"
                  />
                </button>
              </div>

              {/* CENTER — Logo */}
              <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center">
                <Image
                  src="/icons/layout_icons/header-logo.svg"
                  alt="Imtiaz"
                  width={183}
                  height={50}
                  priority
                  className="w-auto xl:w-[183px] h-[26px] md:h-[30px] lg:h-[45px] 3xl:h-[50px]"
                />
              </div>

              {/* RIGHT — Icons */}
              <div className="w-[40%] 2xl:w-[33.33%] flex justify-end">
                <div className="flex items-center gap-[10px]">
                  <button
                    onClick={() => setAuthView("login")}
                    className="flex items-center justify-center w-[32px] h-[32px] bg-white/25 backdrop-blur-[30px] rounded-full cursor-pointer"
                  >
                    <Image
                      src="/images/account.svg"
                      alt="account"
                      width={14}
                      height={15}
                      className="invert"
                    />
                  </button>

                  <button className="hidden xl:flex items-center justify-center gap-[8px] h-[32px] px-[10px] bg-white/25 backdrop-blur-[30px] rounded-full cursor-pointer">
                    <Image
                      src="/images/map.svg"
                      alt="map"
                      width={24}
                      height={24}
                      className="invert w-[24px] h-[24px]"
                    />
                    <ChevronDown size={18} className="text-white" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>
      </motion.div>

      {/* ========================= AUTH MODAL ========================= */}
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

                <div className="relative w-full md:w-[51.6%] h-full bg-white overflow-hidden">
                  <div className="absolute bottom-0 left-0">
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
                      className="absolute inset-0 flex items-center justify-center overflow-y-auto"
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -40 }}
                      transition={{ duration: 0.25, ease: [0.25, 1, 0.5, 1] }}
                    >
                      {authView === "login" ? (
                        <LoginForm
                          onClose={closeAuth}
                          onSwitch={() => setAuthView("signup")}
                        />
                      ) : (
                        <SignupForm
                          onClose={closeAuth}
                          onSwitch={() => setAuthView("login")}
                        />
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ========================= NAV OVERLAY ========================= */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[998]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.div
              className="fixed inset-0 z-[999]"
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
            >
              <NavPageV3 setIsMenuOpen={setIsMenuOpen} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default InnerHeader;
