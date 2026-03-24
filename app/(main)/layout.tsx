import Header2 from "../components/common/Header2";
import FooterV2 from "../components/common/FooterV2";
import FloatingIcons from "../components/common/FloatingIcons";
import ScrollToTopReload from "../components/common/ScrollToTopReload";
import { SmoothScrollProvider } from "../contexts/smoothScrollContext";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SmoothScrollProvider>
      <ScrollToTopReload />
      <Header2 />
      <FloatingIcons />
      {children}
      <FooterV2 />
    </SmoothScrollProvider>
  );
}
