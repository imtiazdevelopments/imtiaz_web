import AboutJourney from "./sections/AboutJourney";
import { aboutSectionJourney } from "../Home/data";
import ProSlider from "./sections/ProSlider";
import { heroSlides } from "../Home/data";
import HeroFour from "./sections/HeroFour";

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
    </>
  );
}
