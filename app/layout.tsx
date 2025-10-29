import type { Metadata } from "next";

import "./globals.css";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import SmoothScroll from "./components/common/SmoothScroll";

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
              <SmoothScroll/>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
