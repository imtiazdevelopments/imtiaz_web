import { useAnimation } from "framer-motion";
import { useRef, useEffect } from "react";

export const useAutoReveal = () => {
  const controls = useAnimation();

  // array of refs for multiple DOM elements
  const refs = useRef<Element[]>([]);

  const addRef = (el: Element | null) => {
    if (el && !refs.current.includes(el)) {
      refs.current.push(el);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            controls.start("show");
          } else {
            // optional reset on scroll-up
            controls.start("hidden");
          }
        });
      },
      {
        root: null,
        rootMargin: "-10% 0px -10% 0px",
        threshold: 0.2,
      }
    );

    refs.current.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [controls]);

  return { addRef, controls };
};
