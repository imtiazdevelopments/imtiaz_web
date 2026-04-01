 
import { amenitiesData } from "../data";
import Image from "next/image";
const Amenities = () => { 

  return (
    <section className="w-full py-120 3xl:py-160 "  >
      <div className="container flex flex-col justify-center">
        {/* Header */}
        <div className="text-center ">
          <h2 className="text-heading  mb-20 ">
            {amenitiesData.title}
          </h2> 
          <p className="text-description text-foreground-light max-w-[74ch] mx-auto">
            {amenitiesData.description}
          </p>
        </div>
       <div>
        <div className="flex flex-wrap md:justify-center mt-50 gap-y-5 xl:gap-y-[61px]">
  {amenitiesData.amenities.map((item, i) => (
    <div
      key={i}
      className={`
        group relative flex flex-col items-center justify-start
        gap-4 xl:gap-[30px] px-6 py-[20px] text-center cursor-default
        transition-all duration-300
        hover:bg-[#EAEAEA]
        w-1/2 sm:w-1/3 lg:w-1/4
         
      `}
    >
      {/* Icon */}
      <div className="w-12 h-12 xl:w-15 xl:h-15 flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-1">
        <Image
          src={item.icon}
          alt={item.label.replace("\n", " ")}
          width={52}
          height={52}
          className="object-contain"
        />
      </div>

      {/* Label */}
      <p
        className="
          font-[optima] text-25
          text-foreground leading-[1.4] uppercase 
          transition-colors duration-300  
        "
      >
        {item.label}
      </p>

      
    </div>
  ))}
</div>
       </div>
        
      </div>
    </section>
  );
};

export default Amenities;