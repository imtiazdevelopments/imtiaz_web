import InnerHeroBanner from "../common/InnerHeroBanner";
import { bannerData } from "./data";
import Main from "./sections/Main";

const Index = ({data}:any) => {
  return (
    <>
      <InnerHeroBanner
        image={data?.page_banner_desktop}
        title={data?.page_banner_title}
        description={data?.page_banner_caption}
        maxTitle="max-w-[73ch]"
        maxW="max-w-[66ch]"
      />
      <div className="py-120 3xl:pt-[100px] 3xl:pb-160">
        <Main data={data?.properties}/>
      </div>
    </>
  );
};

export default Index;
