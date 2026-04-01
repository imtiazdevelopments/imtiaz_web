import Image from "next/image";
import Breadcrumb from "./Breadcrumb";
import { AnimatedHeading } from "../animations/AnimateHeading";

interface InnerHeroProps {
  image: string;
  title: string;
  description?: string;
  maxW?: string;
  maxTitle?: string;
}

const InnerHeroBanner = ({ image, title, description, maxW, maxTitle }: InnerHeroProps) => {
  return (
    <section className="relative w-full h-[70vh] 2xl:h-[89.5dvh] overflow-hidden" data-header="light">
      <Image
        src={image}
        alt={title}
        fill
        sizes="100vw"
        className="object-cover object-center 2xl:object-bottom"
        priority
      />

      <div className="absolute inset-0 bg-black/54" />

      <div className="container absolute inset-0 flex items-center justify-center">
        <div className="w-full text-center">
          <div className={`${maxTitle} mx-auto`}>
            <AnimatedHeading title={title} className="mb-20" mode="blade"/>
          </div>
          {description && (
            <p className={`text-white/80 text-description ${maxW} mx-auto 3xl:h-[54px] text-center flex items-center justify-center px-30 xl:px-0`}>
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