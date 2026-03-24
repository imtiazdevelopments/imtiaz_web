"use client";

import { thinkingThatDelivers } from "../data";

export default function ThinkingThatDelivers() {
  return (
    <section className="w-full py-160 ">
      <div className="container">
        <div className="relative grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-[auto_882px] 2xl:grid-cols-[auto_1082px] gap-3 2xl:gap-[84px]">
          {/* Left: Text Block */}
          <div className="pt-180">
            <h1 className="text-heading text-foreground max-w-[15ch] uppercase mb-20">
              {thinkingThatDelivers.heading}
            </h1>
            <p className="text-16 text-foreground-light leading-[1.54] font-[avenirHeavy] max-w-[53ch]">
              {thinkingThatDelivers.description}
            </p>
          </div>

          {/* Right: First service image + dark panel — flush right */}
          <div>
            {thinkingThatDelivers.services.map((service) => (
              <div key={service.id} className="relative flex mb-50 last:mb-0">
                {/* Left: black spacer aligned with hero left column */}
                <div className=" bg-black" />

                {/* Right: image + light panel */}
                <div className="flex flex-1 group">
                  {/* Image */}
                  <div className="relative w-[42.7%] overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.alt}
                      className="w-full h-full object-cover"
                      style={{ minHeight: "320px" }}
                    />
                  </div>

                  {/* Light content panel */}
                  <div className="flex-1 bg-[#F0EDE8] flex flex-col justify-between p-50 group-hover:bg-primary-2 transition-colors duration-300">
                    <span className="text-heading text-primary-2 group-hover:text-white ">
                      {service.number}
                    </span>
                    <div>
                      <h2 className="text-25 font-[optima] uppercase text-primary-2 group-hover:text-white mb-20 max-w-[424px]">
                        {service.title}
                      </h2>
                      <p className="text-16 text-foreground-light group-hover:text-white leading-[1.5] font-[avenirHeavy]">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
