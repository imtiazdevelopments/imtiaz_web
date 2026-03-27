import Image from "next/image";
import Breadcrumb from "../../common/Breadcrumb";
import { NewsDetail } from "../data";
import { GoShareAndroid } from "react-icons/go";

interface Props {
  news: NewsDetail;
}

const NewsHero = ({ news }: Props) => {
  return (
    <section className="w-full pt-200">
      <div className="container flex flex-col items-center container-spacing-details-page">
        {/* Breadcrumb */}
        <Breadcrumb variant="black" />

        {/* Title */}
        <h1 className="text-heading max-w-[50ch] text-foreground text-center uppercase mt-100">
          {news.title}
        </h1>

        {/* Meta row */}
        <div className="mt-20 flex items-center justify-between w-full">
          <div className="flex items-center gap-[10px] text-foreground-light font-[avenirHeavy] text-16">
            <div>
              <span>{news.category}</span>
              <span> - </span>
              <span>{news.date}</span>
            </div>
            <span>|</span>
            <div>
              <span>Reading Time: {news.readingTime}</span>
            </div>
          </div>

          {/* Share button */}
          <button
            className="text-foreground-light cursor-pointer hover:scale-110 transition-all duration-300"
            aria-label="Share"
          >
            <GoShareAndroid size={32} />
          </button>
        </div>
        {/* Full-width Hero Image */}
        <div className="w-full h-[300px] md:h-[500px] lg:h-[500px] 2xl:h-[560px] 3xl:h-[722px] mt-50 relative">
          <Image
            src={news.image}
            alt={news.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default NewsHero;
