import AboutJourney from "./sections/AboutJourney";
import {
  aboutSectionJourney,
  DubaiIslandData,
  ConstructionProgressData,
  imtiazPropertiesData,
  pressSpotlightData,
  appSectionData,
  communityYardData,
} from "../Home/data";
import CommunitySlider from "./sections/CommunitySlider";
// import ProSlider from "./sections/ProSlider";
import ProSliderV2 from "./sections/ProSliderV2";
import { heroSlides } from "../Home/data";
import HeroFour from "./sections/HeroFour";
import DubaiIsland from "./sections/DubaiIsland";
import ImtiazProperties from "./sections/ImtiazPropsSlider";
import ConstructionProgress2 from "./sections/ConstructionProgress2";
import PressSpotlight from "./sections/PressSpotlight";
import AppSection from "./sections/AppSectionV2";

export default function Home() {
  return (
    <>
      <HeroFour />
      <AboutJourney data={aboutSectionJourney} />
      {/* <ProSlider slides={heroSlides} RightLabel="New Launches" /> */}
      {/* <ProSlider
        slides={heroSlides.slice().reverse()}
        RightLabel="Coming Soon"
      /> */}
      <ProSliderV2 slides={heroSlides} RightLabel="New Launches" />
      <ProSliderV2
        slides={heroSlides.slice().reverse()}
        RightLabel="Coming Soon"
      />
      <DubaiIsland data={DubaiIslandData} />
      <CommunitySlider slides={communityYardData} />
      <ImtiazProperties data={imtiazPropertiesData} />
      <ConstructionProgress2 data={ConstructionProgressData} />
      <PressSpotlight data={pressSpotlightData} />
      <AppSection data={appSectionData} />
    </>
  );
}
