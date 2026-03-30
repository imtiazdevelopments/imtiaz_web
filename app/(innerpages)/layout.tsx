// "use client";

// import { useEffect } from "react";
// import { useSmoothScrollContext } from "../contexts/smoothScrollContext";
// import InnerFooter from "../components/common/InnerFooter";

// export default function InnerLayout({ children }: { children: React.ReactNode }) {
//   const { setSmoothScrollActive } = useSmoothScrollContext();

//   useEffect(() => {
//     setSmoothScrollActive(true); // Enable Lenis on inner pages
//     return () => setSmoothScrollActive(false); // Cleanup on unmount
//   }, [setSmoothScrollActive]);

//   return (
//     <>
//       {children}
//       <InnerFooter />
//     </>
//   );
// }

"use client";

import { useEffect } from "react";
import { useLenis } from "../contexts/LenisContext";
import InnerFooter from "../components/layout/InnerFooter";
import InnerHeader from "../components/layout/InnerHeader";

export default function InnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { unlock } = useLenis();

  useEffect(() => {
    console.log("unlock called", unlock);
    unlock();
  }, [unlock]);

  return (
    <>
      <InnerHeader />
      {children}
      <InnerFooter />
    </>
  );
}
