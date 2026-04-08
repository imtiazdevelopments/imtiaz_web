 

import Image from "next/image";
import { SectionHeading } from "../animations/SectionHeading";
import { SectionDescription } from "../animations/SectionDescription";
 type EverythingWithinData = {
  title: string;
  description: string;
  amenities: { 
    icon: string;
    label: string; 
  }[];
};

type Props = {
  data: EverythingWithinData; 
  maxTitle?: string;
};

export default function Amenities({ data, maxTitle }: Props) {
  return (
    <section className="w-full py-120 3xl:py-160 "  >
      <div className="container flex flex-col justify-center">
        {/* Header */}
        <div className="text-center "> 

                    <SectionHeading title={data.title} className="mb-20 text-foreground" />
                       <SectionDescription text={data.description} className= {`shrink-0  mx-auto text-foreground-light ${maxTitle ? maxTitle : ''}`} />

        </div>
       <div>
        <div className="flex flex-wrap md:justify-center mt-50 gap-y-5 xl:gap-y-[61px]">
  {data.amenities.map((item, i) => (
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

 