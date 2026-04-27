import InnerHeroBanner from "../common/InnerHeroBanner";
import { bannerData } from "./data";
import Main from "./sections/Main";

const Index = () => {
  return (
    <>
      <InnerHeroBanner
        {...bannerData}
        maxTitle="max-w-[73ch]"
        maxW="max-w-[66ch]"
      />
      <div className="py-120 3xl:pt-[100px] 3xl:pb-160">
        <Main />
      </div>
    </>
  );
};

export default Index;
