 
import { LandpropertyData } from "../data"; 
import ProjectCard from "../../common/ProjectCard";

import { SectionHeading } from "../../animations/SectionHeading";
  

const LandpropertyCards = () => { 

  return (
    <section className="w-full  "  >
      <div className="container flex flex-col justify-center">
        {/* Header */}
        <div className="text-center ">
           

        <SectionHeading title={LandpropertyData.title} className="text-heading mb-50" />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 xl:gap-x-[28px] xl:gap-y-[50px]">
        {LandpropertyData.cards.map((project, i) => (
          <ProjectCard key={i} {...project} />
        ))}
      </div>
        </div>
        <div>
           
        </div>
        
      </div>
    </section>
  );
};

export default LandpropertyCards;