"use client";
import Main from "../sections/Main";
import { SectionHeading } from "../../animations/SectionHeading";
import { SectionDescription } from "../../animations/SectionDescription";
const ExploreSpaces = () => {
  return (
    <section className=" py-120 3xl:py-160  " data-header="dark">
      <div className="container">
        <div className="flex flex-col justify-center items-center mb-50">
          <SectionHeading
            title={"Explore Spaces with Confidence"}
            className="text-heading  text-foreground mb-20 text-center  "
          />
          <SectionDescription
            text={
              "Enjoy seamless 360° walkthroughs that reveal every angle, helping you truly understand the space and layout."
            }
            className="text-description max-w-[78ch] text-center uppercase font-[optima] text-foreground-light leading-[1.5] md:leading-[1.57] font-normal"
          />
        </div>
      </div>
      <Main />
    </section>
  );
};
export default ExploreSpaces;
