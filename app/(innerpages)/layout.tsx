"use client";

import { useEffect } from "react";
import { useLenis } from "../contexts/LenisContext";
import InnerHeader from "../components/layout/InnerHeader";
import InnerFooter from "../components/layout/InnerFooter";

export default function InnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { unlock } = useLenis();

  useEffect(() => {
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
