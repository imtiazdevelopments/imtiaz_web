import Image from "next/image";
import Breadcrumb from "../../common/Breadcrumb";
import { BlogDetail } from "../data";
import { GoShareAndroid } from "react-icons/go";

interface Props {
  blog: BlogDetail;
}

const BlogHero = ({ blog }: Props) => {
  return (
    <section className="w-full pt-200" data-header="dark">
      <div className="container flex flex-col items-center container-spacing-details-page">
        {/* Breadcrumb */}
        <Breadcrumb variant="black" />

        {/* Title */}
        <h1 className="text-heading max-w-[50ch] text-foreground text-center uppercase mt-100">
          {blog.title}
        </h1>

        {/* Meta row */}
        <div className="mt-20 flex items-center justify-between w-full">
          <div className="flex items-center gap-[10px] text-foreground-light font-[avenirHeavy] text-16">
            <div>
              <span>{blog.category}</span>
              <span> - </span>
              <span>{blog.date}</span>
            </div>
            <span>|</span>
            <div>
              <span>Reading Time: {blog.readingTime}</span>
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
            src={blog.heroImage}
            alt={blog.title}
            fill
            priority
            sizes="100vw"
          />
        </div>
      </div>
    </section>
  );
};

export default BlogHero;
