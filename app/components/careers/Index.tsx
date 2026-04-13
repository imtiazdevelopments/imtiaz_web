import InnerHeroBanner from "../common/InnerHeroBanner";
import ImpactAreas from "../sustainability/sections/ImpactAreas";
import { bannerData, careerImpactAreas } from "./data";
import VacanciesSection from "./sections/CareerSection";
import WhatToExpect from "./sections/WhatToExpect";

const Index = () => {
  return (
    <div>
      <InnerHeroBanner {...bannerData} maxW="max-w-[392px]" />
      <ImpactAreas data={careerImpactAreas} />
      <WhatToExpect />
      <VacanciesSection />
    </div>
  );
};

export default Index;
