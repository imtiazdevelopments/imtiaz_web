import InfiniteCarousel from "./InifiniteCorousal";
// import { whatToExpectData } from "../data";
import { SectionHeading } from "../../animations/SectionHeading";
import { SectionDescription } from "../../animations/SectionDescription";

type WhatToExpectData = {
  heading: string;

  description: string;

  carousalImages: {
    src: string;
    alt: string;
  }[];
};

export default function WhatToExpect({data}:{data:WhatToExpectData}) {
  return (
    <section data-header="dark" className="w-full py-120 3xl:py-160 bg-white overflow-hidden">
      <div className="container mx-auto mb-50">
        <SectionHeading title={data.heading} className="mb-20 text-center" />
        <SectionDescription text={data.description} className="text-center max-w-[1017px] mx-auto text-foreground-light" />
      </div>

      <InfiniteCarousel data={data.carousalImages}/>
    </section>
  );
}
 