import InnerHeroBanner from "../common/InnerHeroBanner";
import { bannerData } from "./data";
import Map from "./sections/Map"; 
import Enquiry from "./sections/Enquiry";
 
const Index = () => {
  return (
    <>
      <InnerHeroBanner {...bannerData} maxTitle="max-w-[73ch]" maxW="max-w-[40ch]"/> 
      <Enquiry />
      <Map /> 
    </>
  );
};

export default Index;
