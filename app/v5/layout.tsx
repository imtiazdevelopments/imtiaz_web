import type { Metadata } from "next";

import "../globals.css";
import FooterV2 from "../components/common/FooterV2";
import { SmoothScrollProvider } from "../contexts/smoothScrollContext";
import FloatingIcons from "../components/common/FloatingIcons";
import ScrollToTopReload from "../components/common/ScrollToTopReload";
import HeaderV5 from "../components/common/HeaderV5";

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
    <html lang="en">
      <body className={`antialiased`}>
        <ScrollToTopReload />
        <SmoothScrollProvider>
          <HeaderV5 />
          <FloatingIcons />
          {children}
          <FooterV2 />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
