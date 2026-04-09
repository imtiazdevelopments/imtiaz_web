import OffPlanBanner from "./sections/OffPlanBanner";
import { offPlanBannerData } from "./data";
import OffplanFaq from "./sections/OffplanFaq";
import WhyInvest from "./sections/WhyInvest";
import Main from "./sections/Main";
import { Suspense } from "react";

const Index = () => {
  return (
    <>
      <OffPlanBanner {...offPlanBannerData} maxW="max-w-[352px]" />
      <Suspense fallback={<div className="h-screen bg-white" />}>
        <Main />
      </Suspense>
      <WhyInvest />
      <OffplanFaq />
    </>
  );
};

export default Index;
