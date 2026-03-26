// import FloatingRightIcons from "./components/common/FloatingIcons";
// import { SmoothScrollProvider } from "@/app/contexts/smoothScrollContext";
// import "./globals.css";

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <html lang="en">
//       <body className="antialiased">
//         <SmoothScrollProvider>
//           <FloatingRightIcons />
//           {children}
//         </SmoothScrollProvider>
//       </body>
//     </html>
//   );
// }


import FloatingRightIcons from "./components/common/FloatingIcons";
import { LenisProvider } from "@/app/contexts/LenisContext";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <LenisProvider>
          <FloatingRightIcons />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}