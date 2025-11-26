import type { Metadata } from "next";

import "../globals.css";
// import Header from "./components/common/Header";
import HeaderWithHamburger from "../components/common/HeaderWithHamburger";
// import Footer from "./components/common/Footer";
/* import SmoothScroll from "./components/common/SmoothScroll"; */
import FooterV2 from "../components/common/FooterV2";
import { SmoothScrollProvider } from "../contexts/smoothScrollContext";
import FloatingIcons from "../components/common/FloatingIcons";
import ScrollToTopReload from "../components/common/ScrollToTopReload";

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
        {/*         <SmoothScroll /> */}
        {/* <Header /> */}
        <ScrollToTopReload />
        <SmoothScrollProvider>
          <HeaderWithHamburger />
          <FloatingIcons />
          {children}
          {/* <Footer /> */}
          <FooterV2 />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
