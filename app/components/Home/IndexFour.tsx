import AboutJourney from "./sections/AboutJourney";
import {
  aboutSectionJourney,
  DubaiIslandData,
  ConstructionProgressData,
  imtiazPropertiesData,
} from "../Home/data";
import ProSlider from "./sections/ProSlider";
import { heroSlides } from "../Home/data";
import HeroFour from "./sections/HeroFour";
import DubaiIsland from "./sections/DubaiIsland";
import ImtiazProperties from "./sections/ImtiazPropsSlider";
import ConstructionProgress2 from "./sections/ConstructionProgress2";

export default function Home() {
  return (
    <>
      <HeroFour />
      <AboutJourney data={aboutSectionJourney} />
      <ProSlider slides={heroSlides} RightLabel="New Launches" />
      <ProSlider
        slides={heroSlides.slice().reverse()}
        RightLabel="Coming Soon"
      />
      <DubaiIsland data={DubaiIslandData} />
      <ImtiazProperties data={imtiazPropertiesData} />
      <ConstructionProgress2 data={ConstructionProgressData} />
    </>
  );
}
