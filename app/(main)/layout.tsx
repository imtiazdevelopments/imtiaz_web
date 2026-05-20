import type { Metadata } from "next";

import "../globals.css";
import HeaderWithHamburger from "../components/common/HeaderWithHamburger";
import ScrollToTopReload from "../components/common/ScrollToTopReload";
import LenisUnlock from "../components/common/LenisUnlock";
import InnerFooter from "../components/layout/InnerFooter";

export const metadata: Metadata = {
  title: "IMTIAZ",
  description: "Imtiaz",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ScrollToTopReload />
      <LenisUnlock />
      <HeaderWithHamburger />
      {children}
      <InnerFooter />
    </>
  )
}
