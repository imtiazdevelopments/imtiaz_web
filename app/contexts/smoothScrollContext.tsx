// context/SearchContext.tsx
"use client";

import React, { createContext, useContext, useState } from "react";
import SmoothScroll from "../components/common/SmoothScroll";

const SmoothScrollContext = createContext<{
  smoothScrollActive: boolean;
  setSmoothScrollActive: (value: boolean) => void;
}>({
  smoothScrollActive: false,
  setSmoothScrollActive: () => {},
});



export const useSmoothScrollContext = () => useContext(SmoothScrollContext);

export const SmoothScrollProvider = ({ children }: { children: React.ReactNode }) => {
  const [smoothScrollActive, setSmoothScrollActive] = useState(false);

  return (
    <SmoothScrollContext.Provider value={{ smoothScrollActive, setSmoothScrollActive }}>
        {smoothScrollActive && <SmoothScroll/>}
      {children}
    </SmoothScrollContext.Provider>
  );
};
