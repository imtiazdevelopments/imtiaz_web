import { pressItems } from "../../news/data";
import NewsCard from "../../news/sections/NewsCard";
import CustomOutlineButton from "../../common/CustomOutlineButton";

const RelatedNews = () => {
  return (
    <section className="pb-120 3xl:pb-160 container">
      <div className="border-t border-black/10 pt-50">
        <h2 className="text-heading text-center uppercase">Related News</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-25 mt-50">
          {pressItems.slice(0, 3).map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>
        <div className="flex justify-center mt-50">
          <CustomOutlineButton
            text="View All"
            borderColor="border-primary-2"
            textColor="foreground-light"
            px="px-[26px] lg:px-[37px]"
          />
        </div>
      </div>
    </section>
  );
};

export default RelatedNews;
