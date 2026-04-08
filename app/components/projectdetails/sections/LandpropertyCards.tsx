 
import { LandpropertyData } from "../data"; 
import ProjectCard from "../../common/ProjectCard";
import CustomOutlineButton from "../../common/CustomOutlineButton";

  

const LandpropertyCards = () => { 

  return (
    <section className="w-full   "  >
      <div className="container flex flex-col justify-center py-120 2xl:pt-[100px] border-t border-black/10">
        {/* Header */}
        <div className="text-center ">
          <h2 className="text-heading mb-50 ">
            {LandpropertyData.title}
          </h2>  
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 xl:gap-x-[28px] xl:gap-y-[50px]">
      {LandpropertyData.cards.slice(-4).map((project, i) => (
          <ProjectCard key={i} {...project} />
        ))}
      </div>
      <CustomOutlineButton text="View All" px="px-[12px] lg:px-[20px] 3xl:px-[36.6px] mx-auto mt-50" borderColor="border-primary"
                textColor="text-foreground-light"
                variant="dark"/>
        </div>
        <div>
           
        </div>
        
      </div>
    </section>
  );
};

export default LandpropertyCards;