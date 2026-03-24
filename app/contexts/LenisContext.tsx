"use client";

import { createContext, useContext, useEffect, useRef } from "react";
import Lenis from "lenis";

type LenisContextType = {
  lock: () => void;
  unlock: () => void;
  scrollTo: (target: number, options?: { duration?: number }) => void;
};

const LenisContext = createContext<LenisContextType>({
  lock: () => {},
  unlock: () => {},
  scrollTo: () => {},
});

export const useLenis = () => useContext(LenisContext);

export const LenisProvider = ({ children }: { children: React.ReactNode }) => {
  const lenisRef = useRef<Lenis | null>(null);
  const pendingRef = useRef<(() => void)[]>([]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenisRef.current = lenis;
    lenis.stop();

    pendingRef.current.forEach((fn) => fn());
    pendingRef.current = [];

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

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
      pendingRef.current.push(() => lenisRef.current?.start());
    }
  };

  const scrollTo = (target: number, options?: { duration?: number }) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, options);
    }
  };

  return (
    <LenisContext.Provider value={{ lock, unlock, scrollTo }}>
      {children}
    </LenisContext.Provider>
  );
};