import FeaturedProperty from "./sections/FeaturedProperty";
import VerticalSlider from "./sections/VerticalSlider";
import ConstructionProgress from "./sections/ConstructionProgress";
import SpotlightsSlider from "./sections/SpotlightsSlider";
// import AppSection from "./sections/AppSection";
import ImtiazProperties from "./sections/ImtiazProperties";
import HeroThree from "./sections/HeroThree";

export default function IndexThree() {
  return (
    <>
      <HeroThree />
      <FeaturedProperty />
      <VerticalSlider />
      <ImtiazProperties />
      <ConstructionProgress />
      <SpotlightsSlider />
      {/* <AppSection /> */}
    </>
  );
}
