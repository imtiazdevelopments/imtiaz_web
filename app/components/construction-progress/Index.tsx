import InnerHeroBanner from "../common/InnerHeroBanner";
import { bannerData } from "./data";
import Main from "./sections/Main";
 
const Index = () => {
  return (
    <>
      <InnerHeroBanner {...bannerData} maxTitle="max-w-[73ch]" /> 
    {/* <Main /> */}
    </>
  );
};

export default Index;
