import NewsContent from "./sections/NewsContent";
import NewsHero from "./sections/NewsHero";
import { newsDetails } from "./data";
import RelatedNews from "./sections/RelatedNews";

const Index = () => {
  return (
    <>
      <NewsHero news={newsDetails[0]} />
      <NewsContent content={newsDetails[0].content} />
      <RelatedNews />
    </>
  );
};

export default Index;
