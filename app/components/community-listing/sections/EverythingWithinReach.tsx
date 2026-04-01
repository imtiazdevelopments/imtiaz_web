 
import { EverythingWithinData } from "../data";
import Image from "next/image";
const EverythingWithinReach = () => {
  const { title, description,cards  } = EverythingWithinData;

  return (
    <section className="w-full py-120 3xl:py-130 bg-gray"  >
      <div className="container flex flex-col justify-center">
        {/* Header */}
        <div className="text-center ">
          <h2 className="text-heading leading-[1.4] mb-20 ">
            {title}
          </h2> 
          <p className="text-description text-foreground-light max-w-[43ch] mx-auto">
            {description}
          </p>
        </div>
        <div>
          <div className="grid grid-cols-2 lg:grid-cols-4 mt-5 2xl:mt-[60px]">
            {cards.map((loc, i) => (
              <div
                key={i}
                className="relative flex flex-col items-center justify-start gap-[15px] px-4 sm:px-8 py-5 text-center"
              >
                {/* Gradient divider */}
                {i !== 0 && (
                  <div
                    className="absolute left-0 top-0 w-px h-full lg:block hidden"
                    style={{
                      background: "linear-gradient(180deg, rgba(73,9,5,0) 0%, #490905 50%, rgba(73,9,5,0) 100%)",
                    }}
                  />
                )}

                {/* Mobile: only between col 1→2 (i=1) and col 3→4 (i=3) */}
                {(i === 1 || i === 3) && (
                  <div
                    className="absolute left-0 top-0 w-px h-full lg:hidden block"
                    style={{
                      background: "linear-gradient(180deg, rgba(73,9,5,0) 0%, #490905 50%, rgba(73,9,5,0) 100%)",
                    }}
                  />
                )}

                {/* Icon circle */}
                <div className="w-[80px] h-[80px] rounded-full flex items-center justify-center bg-[#4909050D]">
                  <Image src={loc.icon} alt={loc.label} width={32} height={32} />
                </div>

                {/* Label */}
                <p
                  className="text-foreground font-[optima] text-25 leading-[1.4] uppercase"
                  dangerouslySetInnerHTML={{ __html: loc.label }}
                />

                {/* Minutes */}
                <p className="text-description text-foreground-light">
                  {loc.minutes}
                </p>
              </div>
            ))}
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default EverythingWithinReach;