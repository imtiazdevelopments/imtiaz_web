"use client";

import { useEffect } from "react";
import { useLenis } from "../contexts/LenisContext";

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { lock } = useLenis();

  useEffect(() => {
    lock();
  }, [lock]);

  return <>{children}</>;
}