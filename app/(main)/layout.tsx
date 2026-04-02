import HeaderWithHamburger from "../components/common/HeaderWithHamburger";
import ScrollToTopReload from "../components/common/ScrollToTopReload";
import InnerFooter from "../components/layout/InnerFooter";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ScrollToTopReload />
      <HeaderWithHamburger />
      {children}
      <InnerFooter />
    </>
  );
}