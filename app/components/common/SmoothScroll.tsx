// "use client";

// import { useEffect } from "react";
// import { usePathname } from "next/navigation";
// import Lenis from "lenis";

// export let lenisInstance: Lenis | null = null;

// const SmoothScroll = () => {
//   const pathname = usePathname();

//   useEffect(() => {
//     const lenis = new Lenis({
//       duration: 1.5,
//       easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
//       smoothWheel: true,
//     });

//     lenisInstance = lenis;

//     let rafId: number;

//     function raf(time: number) {
//       lenis.raf(time);
//       rafId = requestAnimationFrame(raf);
//     }

//     rafId = requestAnimationFrame(raf);

//     return () => {
//       cancelAnimationFrame(rafId);
//       lenis.destroy();
//       lenisInstance = null;
//     };
//   }, []);

//   useEffect(() => {
//     if (lenisInstance) {
//       lenisInstance.scrollTo(0, { immediate: true });
//     } else {
//       window.scrollTo(0, 0);
//     }
//   }, [pathname]);

//   return null;
// };

// export default SmoothScroll;



"use client";

import { useEffect } from "react";
import Lenis from "lenis";

const SmoothScroll = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy(); // Cleanup to prevent memory leaks
    };
  }, []);

  return null;
};

export default SmoothScroll; 