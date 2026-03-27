import Image from "next/image";
import Breadcrumb from "./Breadcrumb";

interface InnerHeroProps {
  image: string;
  title: string;
  description?: string;
  maxW?: string;
}

const InnerHeroBanner = ({ image, title, description, maxW }: InnerHeroProps) => {
  return (
    <section className="relative w-full h-[70vh] 2xl:h-[89.5dvh] overflow-hidden">
      <Image
        src={image}
        alt={title}
        fill
        sizes="100vw"
        className="object-cover object-center  2xl:object-bottom"
        priority
      />

      <div className="absolute inset-0 bg-black/54" />

      <div className="container absolute inset-0 flex items-center justify-center">
        <div className="w-full text-center">
          <h1 className="text-white text-heading mb-20">
            {title}
          </h1>
          {description && (
            <p className={`text-white/80 text-description ${maxW} mx-auto 3xl:h-[54px] text-center flex items-center justify-center`}>
              {description}
            </p>
          )}
        </div>
      </div>

      {/* Breadcrumb — bottom-60 */}
      <div className="absolute bottom-60 3xl:bottom-[63px] left-0 right-0 flex justify-center">
        <Breadcrumb />
      </div>
    </section>
  );
};

export default InnerHeroBanner;