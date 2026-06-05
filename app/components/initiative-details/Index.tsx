import { details, images, relatedItems } from "./sections/data";
import Hero from "./sections/Hero";
import VideoSection from "./sections/VideoSection";
import Content from "./sections/Content";
import ImageSlider from "./sections/ImageSlider";
import RelatedInitiative from "./sections/RelatedInitiative";

const Index = () => {
  return (
    <>
      <Hero blog={details[0]}/>
      <VideoSection images={images[0].signatureImages}/>
      <Content content={details[0].content} />
      <ImageSlider images={images[0].signatureImages}/>
      <RelatedInitiative data={relatedItems}/>
    </>
  );
};

export default Index;
