"use client";

import "./v2-globals.css";
import { useEffect } from "react";
import { useLenis } from "../contexts/LenisContext";
import InnerHeader from "../components/layout/InnerHeader";

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
      {/* <InnerHeader /> */}
      {children}
    </>
  );
}
