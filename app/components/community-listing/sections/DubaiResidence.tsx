 
import { communitySectionData } from "../data";
import { SectionHeading } from "../../animations/SectionHeading";
import { SectionDescription } from "../../animations/SectionDescription";

const DubaiResidence = () => {
  const { title, description, subtitle } = communitySectionData;

  return (
    <section className="w-full py-120 3xl:py-160"  >
      <div className="container flex flex-col justify-center">
        {/* Header */}
        <div className="text-center "> 
             <SectionHeading title={title} className="text-heading  text-primary-2 mb-20 max-w-[666px] mx-auto" />
                    <SectionDescription text={subtitle} className="text-25 uppercase font-[optima] mb-4 xl:mb-5 3xl:mb-10 text-foreground-light leading-[1.5] md:leading-[1.4] font-normal" />
                <SectionDescription text={description} className="text-description text-foreground-light max-w-[754px] mx-auto" />
                
        </div>

        
      </div>
    </section>
  );
};

export default DubaiResidence;