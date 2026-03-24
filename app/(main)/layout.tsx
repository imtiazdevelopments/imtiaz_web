// import Header2 from "../components/common/Header2";
// import FooterV2 from "../components/common/FooterV2";
// import ScrollToTopReload from "../components/common/ScrollToTopReload";

// export default function MainLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <>
//       <ScrollToTopReload />
//       <Header2 />
//       {children}
//       <FooterV2 />
//     </>
//   );
// }



import Header2 from "../components/common/Header2";
import FooterV2 from "../components/common/FooterV2";
import ScrollToTopReload from "../components/common/ScrollToTopReload";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ScrollToTopReload />
      <Header2 />
      {children}
      <FooterV2 />
    </>
  );
}