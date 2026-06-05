import ConstructionBanner from "./sections/ConstructionBanner";
import { bannerData } from "./data";

const Index = () => {
  return (
    <>
      <ConstructionBanner {...bannerData} />
    </>
  );
};

export default Index;
