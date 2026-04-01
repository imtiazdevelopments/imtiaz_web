 
import { communitySectionData } from "../data";

const DubaiResidence = () => {
  const { title, description, subtitle } = communitySectionData;

  return (
    <section className="w-full py-120 3xl:py-160"  >
      <div className="container flex flex-col justify-center">
        {/* Header */}
        <div className="text-center ">
          <h2 className="text-heading  text-primary-2 mb-20 max-w-[666px] mx-auto">
            {title}
          </h2>
          <p className="text-25 uppercase font-[optima] mb-4 xl:mb-5 3xl:mb-10 text-foreground-light leading-[1.5] md:leading-[1.4] font-normal">
            {subtitle}
          </p>
          <p className="text-description text-foreground-light max-w-[754px] mx-auto">
            {description}
          </p>
        </div>

        
      </div>
    </section>
  );
};

export default DubaiResidence;