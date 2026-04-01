 
import { LandpropertyData,projectsData } from "../data"; 
import ProjectCard from "../../common/ProjectCard";

  

const LandpropertyCards = () => { 

  return (
    <section className="w-full  "  >
      <div className="container flex flex-col justify-center">
        {/* Header */}
        <div className="text-center ">
          <h2 className="text-heading leading-[1.4] mb-50 ">
            {LandpropertyData.title}
          </h2>  
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 xl:gap-x-[28px] xl:gap-y-[50px]">
        {projectsData.map((project, i) => (
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