import InnerHeroBanner from "../common/InnerHeroBanner";
import { bannerData, eventDetails } from "./data";
import DubaiResidence from "./sections/DubaiResidence";
import IconGrid from "../common/IconGrid";
import CommunitySlider from "./sections/CommunitySlider";
import Amenities from "../common/Amenities";
import LandpropertyCards from "./sections/LandpropertyCards";
import Map from "./sections/Map";
import OtherCommunitySlider from "./sections/OtherCommunitySlider";
import Faqsection from "./sections/Faqsection";
import RegisterYourInterest from "./sections/RegisterYourInterest";

import { EverythingWithinData, amenitiesData } from "./data";
const Index = () => {
  return (
    <>
      <InnerHeroBanner {...bannerData} maxTitle="max-w-[73ch]" />
      <DubaiResidence />
      <IconGrid data={EverythingWithinData} bgClass="bg-gray" />
      <CommunitySlider images={eventDetails[0].signatureImages} />

      <Amenities data={amenitiesData} maxTitle="max-w-[74ch]" />
      <LandpropertyCards />
      <Map />
      <OtherCommunitySlider />
      <Faqsection />
      <RegisterYourInterest />
    </>
  );
};

export default Index;
