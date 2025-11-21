"use client";

interface DubaiIslandProps {
  data: {
    tag: string;
    title: string;
    subtitle: string;
    description: string;
  };
}

const DubaiIsland = ({ data }: DubaiIslandProps) => {
  return (
    <section
      className={`bg-primary py-24 md:py-32 2xl:py-[190px] 3xl:py-[258px] xl:h-[100vh] overflow-hidden `}
    >
      <div className="container mx-auto text-center px-4">
        <p className="text-[25px] font-[avenir] leading-[1] font-[800] text-white mb-10 md:mb-16 2xl:mb-[120px] uppercase">
          {data.tag}
        </p>

        <h2 className="text-[40px] md:text-[50px] 2xl:text-[64px] 3xl:text-[70px] font-[400] font-[optima] text-white leading-[1] mb-[25px] uppercase">
          {data.title}
        </h2>

        <h3 className="text-[25px] font-[avenirHeavy] leading-[1] text-white mb-[40px] uppercase">
          {data.subtitle}
        </h3>

        <p className="text-[#FFD8E1] text-[19px] font-[avenirRoman] font-[400] leading-[1.3] mb-[50px] max-w-[75ch] mx-auto  text-center">
          {data.description}
        </p>
      </div>
    </section>
  );
};

export default DubaiIsland;
