"use client";

import { createContext, useContext, useEffect, useRef } from "react";
import Lenis from "lenis";

type LenisContextType = {
  lock: () => void;
  unlock: () => void;
};

const LenisContext = createContext<LenisContextType>({
  lock: () => {},
  unlock: () => {},
});

export const useLenis = () => useContext(LenisContext);

export const LenisProvider = ({ children }: { children: React.ReactNode }) => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenisRef.current = lenis;
    lenis.stop();

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    window.dispatchEvent(new Event("lenisReady"));

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  const lock = () => lenisRef.current?.stop();

  const unlock = () => {
    if (lenisRef.current) {
      lenisRef.current.start();
    } else {
      window.addEventListener("lenisReady", () => lenisRef.current?.start(), { once: true });
    }
  };

  return (
    <LenisContext.Provider value={{ lock, unlock }}>
      {children}
    </LenisContext.Provider>
  );
};