import InnerHeroBanner from "../common/InnerHeroBanner";
import { bannerData } from "./data";
import ExploreSpaces from "./sections/ExploreSpaces";
 
const Index = () => {
  return (
    <>
      <InnerHeroBanner {...bannerData} maxTitle="max-w-[73ch]" maxW="max-w-[38ch]" /> 
      <ExploreSpaces />
    </>
  );
};

export default Index;



