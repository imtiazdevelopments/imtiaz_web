 
import { communitySectionData } from "../data";
import CustomOutlineButton from "../../common/CustomOutlineButton";

const MeydanHorizon = () => {
  const { title, description, subtitle } = communitySectionData;

  return (
    <section className="w-full py-120 3xl:py-160"  >
      <div className="container flex flex-col justify-center">
        {/* Header */}
        <div className="text-center ">
          <h2 className="text-heading  text-foreground mb-20 max-w-[666px] mx-auto">
            {title}
          </h2>
          <p className="text-25 uppercase font-[optima] mb-40 text-foreground-light leading-[1.5] md:leading-[1.4] font-normal">
            {subtitle}
          </p>
          <p className="text-description text-foreground-light max-w-[754px] mx-auto">
            {description}
          </p>

          <CustomOutlineButton text="View Community" px="px-[12px] lg:px-[20px] 3xl:px-[36.6px] mx-auto mt-50"
            
                borderColor="border-primary"
                textColor="text-foreground-light"
                variant="dark"/>
        </div>

        
      </div>
    </section>
  );
};

export default MeydanHorizon;