import ConstructionBanner from "./sections/ConstructionBanner";
import { bannerData } from "./data";
import TimelineSlider from "./sections/TimeLineSlider";
import ExpertiseSlider from "./sections/ExpertiseSlider";
import ImtiazProperties from "../../components/Home/sections/ImtiazPropsSlider";
import IconSlider from "./sections/IconSlider";

const Index = ({ data }: any) => {
  console.log(data);

  const imtiazPropertiesData = {
  sectionTitle: "PROPERTIES",

  properties: data.properties.map((property:any, index:number) => ({
    id: (index + 1).toString(),
    title: property.title,
    image: property.featured_image_desktop,
    link: `/property/${property.slug}`,
    location: property.property_community,
    hoverImage: property.brand_logo,
    startingFrom:property.icon1_text,
    units:property.icon2_text
  })),
};

  return (
    <>
      <ConstructionBanner {...bannerData} />
      {/* <TimelineSlider /> */}
      <ExpertiseSlider />
      <ImtiazProperties data={imtiazPropertiesData} title={imtiazPropertiesData.sectionTitle} className="py-120 2xl:py-130"/>     
      <IconSlider />
    </>
  );
};

export default Index;
