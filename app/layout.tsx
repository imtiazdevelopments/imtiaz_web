import type { Metadata } from "next";

import "./globals.css";
// import Header from "./components/common/Header";
import Header2 from "./components/common/Header2";
// import Footer from "./components/common/Footer";
/* import SmoothScroll from "./components/common/SmoothScroll"; */
import FooterV2 from "./components/common/FooterV2";

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
        <Header2 />
        {children}
        {/* <Footer /> */}
        <FooterV2 />
      </body>
    </html>
  );
}
