import InnerHeroBanner from "./sections/InnerHeroBanner";
import { bannerData, eventDetails, PropertyDetailsData } from "./data";
import MeydanHorizon from "./sections/MeydanHorizon";
import IconGrid from "../common/IconGrid";
import Amenities from "../common/Amenities";
import LandpropertyCards from "./sections/LandpropertyCards";
import Map from "./sections/Map";
import Faqsection from "./sections/Faqsection";
import ConstructionProgress from "./sections/ConstructionProgress";
// import { EverythingWithinData, amenitiesData } from "./data";
import GallerySlider from "./sections/GallerySlider";
import UnitLayout from "./sections/UnitLayout";
import ProjectIntro from "./sections/ProjectIntro";
import RegBtn from "./sections/RegBtn";
import { PropertiesPageData } from "../property/data";

const Index = ({ data,allPropertyData }: {data:PropertyDetailsData,allPropertyData:PropertiesPageData}) => {

  const everythingWithinData = {
    title: data?.reach_title,
    description: data?.reach_caption,
    cards: data?.reach
  }

  const amenetiesData = {
  title: data?.amenities_title,
  description: data?.amenities_brief,
  amenities: data?.amenities?.map((item) => ({
    icon: item.icon_url,
    label: item.title,
  })),
};


  return (
    <>
      <InnerHeroBanner
      video={data?.page_banner_video_desktop}
        image={data?.page_banner_desktop}
        title={data?.page_banner_title}
        description=""
        maxTitle="max-w-[73ch]"
        location={data?.location}
        payment_plan={data?.payment_plan}
        starting_price={data?.starting_price}
        delivery_date={data?.delivery_date}
      />
      <ProjectIntro
        title={data?.basic_title}
        description={data?.basic_brief}
        brochure={data?.brochure}
        fact_sheet={data?.fact_sheet}
        unit_layout={data?.unit_layout}
      />
      <ConstructionProgress
        title={data?.construction_title}
        description={data?.construction_brief}
        estimated_completion={data?.estimated_completion}
        percent_overall={data?.percent_overall}
        percent1={data?.percent1}
        percent1_label={data?.percent1_label}
        percent2={data?.percent2}
        percent2_label={data?.percent2_label}
        percent3={data?.percent3}
        percent3_label={data?.percent3_label}
        percent4={data?.percent4}
        percent4_label={data?.percent4_label}
        construction_button_text={data?.construction_button_text}
        construction_button_url={data?.construction_button_url}
      />
      <IconGrid data={everythingWithinData} />
      <GallerySlider data={data?.gallery}/>
      <Amenities data={amenetiesData} maxTitle="max-w-[90ch]" />
      <UnitLayout data={data?.unit_layouts}/>
      <MeydanHorizon 
      title={data?.community_name} 
      description={data?.community_basic_brief}
      subTitle={data?.community_basic_title}
      />
      <Map />
      <Faqsection 
      title={data?.faq_title} 
      description={data?.faq_caption}
      data={data?.faq}
      />
      <LandpropertyCards data={allPropertyData?.listing} community={data?.community_name}/>
      <RegBtn />
    </>
  );
};

export default Index;
