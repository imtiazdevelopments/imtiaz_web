import FloatingRightIcons from "./components/common/FloatingIcons";
import { LenisProvider } from "@/app/contexts/LenisContext";
import "./globals.css";
import InnerFooter from "./components/layout/InnerFooter";
import Script from "next/script";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      
      <body className="antialiased">
        <LenisProvider>
          <FloatingRightIcons />
          {children}
          {/* <InnerFooter /> */}
          
          
        </LenisProvider>
        
        <Script
        id="wotnot-chat"
          src="https://app.wotnot.io/chat-widget/6oLSHVYKARyW052813950292EguttAVa.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}