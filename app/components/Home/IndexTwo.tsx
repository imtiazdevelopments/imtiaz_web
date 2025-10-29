import FeaturedProperty from "./sections/FeaturedProperty";
import VerticalSlider from "./sections/VerticalSlider";
import ConstructionProgress from "./sections/ConstructionProgress";
import SpotlightsSlider from "./sections/SpotlightsSlider";
import AppSection from "./sections/AppSection";
import ImtiazProperties from "./sections/ImtiazProperties";
import HeroTwo from "./sections/HeroTwo";

export default function IndexTwo() {
  return (
    <>
      <HeroTwo />
      <FeaturedProperty />
      <VerticalSlider />
      <ImtiazProperties />
      <ConstructionProgress />
      <SpotlightsSlider />
      <AppSection />
    </>
  );
}
