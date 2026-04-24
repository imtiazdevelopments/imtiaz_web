import InfiniteCarousel from "./InifiniteCorousal";
import { whatToExpectData } from "../data";
import { SectionHeading } from "../../animations/SectionHeading";
import { SectionDescription } from "../../animations/SectionDescription";


export default function WhatToExpect() {
  return (
    <section className="w-full py-120 3xl:py-160 bg-white overflow-hidden">
      <div className="container mx-auto mb-[40px] md:mb-50">
        <SectionHeading title={whatToExpectData.heading} className="mb-20 text-center" />
        <SectionDescription text={whatToExpectData.description} className="text-center max-w-[1017px] mx-auto text-foreground-light" />
      </div>

      <InfiniteCarousel />
    </section>
  );
}
 