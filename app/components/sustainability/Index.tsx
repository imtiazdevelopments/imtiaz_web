import { bannerData, impactAreas } from "./data";
import InnerHeroBanner from "../common/InnerHeroBanner";
import ImpactAreas from "./sections/ImpactAreas";
import SustainablityMoments from "./sections/SustainablityMoments";
import PressSpotlight from "./sections/SustainabilitySpotlight";


export default function Index() {
  return (
    <>
      <InnerHeroBanner {...bannerData} maxW="max-w-[816px]" />
      <ImpactAreas data={impactAreas} />
      <SustainablityMoments />
      <PressSpotlight />
    </>
  );
}