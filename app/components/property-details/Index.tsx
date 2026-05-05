import InnerHeroBanner from "./sections/InnerHeroBanner";
import { bannerData, eventDetails } from "./data";
import MeydanHorizon from "./sections/MeydanHorizon";
import IconGrid from "../common/IconGrid";
import Amenities from "../common/Amenities";
import LandpropertyCards from "./sections/LandpropertyCards";
import Map from "./sections/Map";
import Faqsection from "./sections/Faqsection";
import ConstructionProgress from "./sections/ConstructionProgress";
import { EverythingWithinData, amenitiesData } from "./data";
import GallerySlider from "./sections/GallerySlider";
import UnitLayout from "./sections/UnitLayout";
import ProjectIntro from "./sections/ProjectIntro";
import RegBtn from "./sections/RegBtn";
const Index = () => {
  return (
    <>
      <InnerHeroBanner {...bannerData} maxTitle="max-w-[73ch]"  />
      <ProjectIntro />
      <ConstructionProgress />
      <IconGrid data={EverythingWithinData} />
      <GallerySlider />
      <Amenities data={amenitiesData} maxTitle="max-w-[90ch]" />
      <UnitLayout />
      <MeydanHorizon />
      <Map />
      <Faqsection />
      <LandpropertyCards />
      <RegBtn />
    </>
  );
};

export default Index;
