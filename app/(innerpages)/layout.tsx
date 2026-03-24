import SmoothScroll from "../components/common/SmoothScroll";
import InnerFooter from "../components/common/InnerFooter";
import FloatingIcons from "../components/common/FloatingIcons";

export default function InnerLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SmoothScroll />
      <FloatingIcons />
      {children}
      <InnerFooter />
    </>
  );
}