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
    <section className="relative w-full h-[89vh] overflow-hidden">
      <Image
        src={image}
        alt={title}
        fill
        sizes="100vw"
        className="object-cover object-center"
        priority
      />

      <div className="absolute inset-0 bg-black/50" />

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="max-w-[887px] w-full px-6 text-center">
          <h1 className="text-white text-heading mb-20">
            {title}
          </h1>
          {description && (
            <p className={`text-white/80 text-description ${maxW} mx-auto`}>
              {description}
            </p>
          )}
        </div>
      </div>

      {/* Breadcrumb — bottom-60 */}
      <div className="absolute bottom-[60px] left-0 right-0 flex justify-center">
        <Breadcrumb />
      </div>
    </section>
  );
};

export default InnerHeroBanner;