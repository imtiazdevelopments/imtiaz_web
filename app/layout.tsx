import FloatingRightIcons from "./components/common/FloatingIcons";
import { LenisProvider } from "@/app/contexts/LenisContext";
import "./globals.css";
import InnerFooter from "./components/layout/InnerFooter";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <LenisProvider>
          <FloatingRightIcons />
          {children}
          {/* <InnerFooter /> */}
        </LenisProvider>
      </body>
    </html>
  );
}