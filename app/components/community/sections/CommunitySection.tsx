import CommunityCard from "./CommunityCard";
// import { communitySectionData } from "../data";
import { SectionHeading } from "../../animations/SectionHeading";
import { SectionDescription } from "../../animations/SectionDescription";
import Reveal from "../../animations/RevealOneByOneAnimation";
import { moveUpV2 } from "../../motionVariants";

const CommunitiesSection = ({title,description,items}:{title:string,description:string,items:[]}) => {
  // const { title, description, cards } = communitySectionData;

  return (
    <section className="w-full py-[70px] lg:py-120 3xl:py-160" data-header="dark">
      <div className="container flex flex-col justify-center">
        {/* Header */}
        <div className="text-center mb-50">
          <SectionHeading
            title={title}
            as="h2"
            className="text-foreground mb-[20px] max-w-[685px] mx-auto"
          />

          <SectionDescription
            text={description}
            className="text-foreground-light max-w-[736px] mx-auto"
          />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-30 md:gap-x-40 md:gap-y-60">
          {items.map((card,index) => (
            <Reveal key={index} variants={moveUpV2}>
              <CommunityCard card={card} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommunitiesSection;
