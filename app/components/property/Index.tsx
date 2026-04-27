import InnerHeroBanner from "../common/InnerHeroBanner";
import { bannerData, projectsData } from "./data";
import Main from "./sections/Main";
import { Suspense } from "react";

const Index = () => {
  return (
    <>
      <InnerHeroBanner {...bannerData} maxW="max-w-[805px]" />
      <Suspense fallback={<div className="h-screen bg-white" />}>
        <Main />
      </Suspense>
    </>
  );
};

export default Index;
