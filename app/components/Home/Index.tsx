import Hero from "./sections/Hero";
import FeaturedProperty from "./sections/FeaturedProperty";
import VerticalSlider from "./sections/VerticalSlider";
import ConstructionProgress from "./sections/ConstructionProgress";
import SpotlightsSlider from "./sections/SpotlightsSlider";
// import AppSection from "./sections/AppSection";
import ImtiazProperties from "./sections/ImtiazProperties";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProperty />
      <VerticalSlider />
      <ImtiazProperties />
      <ConstructionProgress />
      <SpotlightsSlider />
      {/* <AppSection /> */}
    </>
  );
}
