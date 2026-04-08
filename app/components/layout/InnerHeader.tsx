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
import Link from "next/link";

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
    const check = () => {
      const headerEl = document.getElementById("inner-header");
      if (headerEl) headerEl.style.pointerEvents = "none";

      const el = document.elementFromPoint(window.innerWidth / 2, 80);

      if (headerEl) headerEl.style.pointerEvents = "";

      let node = el as HTMLElement | null;
      let theme: "light" | "dark" = "light";

      while (node && node !== document.body) {
        if (node.dataset.header) {
          theme = node.dataset.header as "light" | "dark";
          break;
        }
        node = node.parentElement;
      }

      setHeaderTheme(theme);
    };

    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    setTimeout(check, 100);

    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, [pathname]);

  useEffect(() => {
    if (!authView) return;

    const scrollY = window.scrollY;
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.paddingRight = "";
      window.scrollTo(0, scrollY);
    };
  }, [authView]);

  const closeAuth = () => setAuthView(null);

  return (
    <>
      {/* ========================= HEADER ========================= */}
      <motion.div
        id="inner-header"
        style={{ y: springY }}
        className="fixed top-0 left-0 w-full z-[999] pt-[20px]"
      >
        <header className="w-full">
          <div className="container">
            <div className="relative flex items-center justify-between w-full rounded-full h-[50px] md:h-[65px] lg:h-[75px] 3xl:h-[80px] py-[15px] px-20 xl:pl-40 xl:pr-30">
              <div
                className={`absolute inset-0 rounded-full backdrop-blur-[30px] z-[-1] transition-colors duration-500 ${
                  headerTheme === "dark" ? "bg-black/60" : "bg-white/10"
                }`}
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
                    className="w-[22px] h-[14px] sm:h-[15.13px]"
                  />
                </button>
              </div>

              {/* CENTER — Logo */}
              <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center">
                <Link href="/">
                  <Image
                    src="/icons/layout_icons/header-logo.svg"
                    alt="Imtiaz"
                    width={183}
                    height={50}
                    priority
                    className="w-auto xl:w-[183px] h-[26px] md:h-[30px] lg:h-[45px] 3xl:h-[50px]"
                  />
                </Link>
              </div>

              {/* RIGHT — Icons */}
              <div className="w-[40%] 2xl:w-[33.33%] flex justify-end">
                <div className="flex items-center gap-[5px] sm:gap-[10px]">
                  <button
                    onClick={() => setAuthView("login")}
                    className="flex items-center justify-center w-[32px] h-[32px] sm:bg-white/25 sm:backdrop-blur-[30px] sm:rounded-full cursor-pointer"
                  >
                    <Image
                      src="/images/account.svg"
                      alt="account"
                      width={14}
                      height={15}
                      className="invert h-[17px] md:h-[15.16px] w-auto"
                    />
                  </button>

                  <button className="flex items-center justify-center gap-[8px] h-[32px] w-[32px] md:w-auto sm:px-[6px] sm:bg-white/25 sm:backdrop-blur-[30px] sm:rounded-full cursor-pointer">
                    <Image
                      src="/images/map.svg"
                      alt="map"
                      width={24}
                      height={24}
                      className="invert h-[17px] md:h-[24px] w-auto"
                    />
                    <div className="hidden md:block">
                      <ChevronDown size={18} className="text-white" />
                    </div>
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
