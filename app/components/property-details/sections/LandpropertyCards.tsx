 
"use client";
import { LandpropertyData } from "../data"; 
import ProjectCard from "../../common/ProjectCard";
import CustomOutlineButton from "../../common/CustomOutlineButton";
import { SectionHeading } from "../../animations/SectionHeading";
import { useScrollFadeUp } from "../../../hooks/useScrollFadeUp";

  

const LandpropertyCards = () => { 

    const desktopBtnRef = useScrollFadeUp({ y: 40, duration: 0.7, start: "top 90%" });
  return (
    <section className="w-full   "  >
      <div className="container flex flex-col justify-center py-120 2xl:pt-[100px] border-t border-black/10">
        {/* Header */}
        <div className="text-center "> 
            <SectionHeading title={LandpropertyData.title} className="text-heading mb-50" />
               
     <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4 gap-5 xl:gap-x-[28px] xl:gap-y-[50px]">
  {LandpropertyData.cards.slice(-4).map((project, i) => (
    <div
      key={i}
      className={i === 3 ? "xl:hidden 3xl:block" : ""}
    >
      <ProjectCard {...project} />
    </div>
  ))}
</div>
  <div ref={desktopBtnRef}  style={{ opacity: 0 }}>
      <CustomOutlineButton text="View All" px="px-[12px] lg:px-[20px] 3xl:px-[36px] 3xl:py-[22.5px] mx-auto mt-50" borderColor="border-primary"
                textColor="text-foreground-light"
                variant="dark"/>
        </div>
        </div>
        <div>
           
        </div>
        
      </div>
    </section>
  );
};

export default LandpropertyCards;