import CommunityCard from "./CommunityCard";
import { communitySectionData } from "../data";

const CommunitiesSection = () => {
  const { title, description, cards } = communitySectionData;

  return (
    <section className="make-header-black w-full py-120 3xl:py-160">
      <div className="container flex flex-col justify-center">
        {/* Header */}
        <div className="text-center mb-50">
          <h2 className="text-heading text-foreground mb-20 max-w-[666px] mx-auto">
            {title}
          </h2>
          <p className="text-description text-foreground-light max-w-[736px] mx-auto">
            {description}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-30 md:gap-x-40 md:gap-y-60">
          {cards.map((card) => (
            <CommunityCard key={card.id} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommunitiesSection;