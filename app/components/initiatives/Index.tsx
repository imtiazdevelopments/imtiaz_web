import React, { Suspense } from "react";
import InnerHeroBanner from "../common/InnerHeroBanner";
import { bannerData } from "./data";
import InitiativeSection from "./sections/InitiativeSection";

const Index = () => {
  return (
    <>
      <InnerHeroBanner {...bannerData} maxW="max-w-[81ch]" />
      <Suspense fallback={<div>Loading...</div>}>
        <InitiativeSection />
      </Suspense>
    </>
  );
};

export default Index;
