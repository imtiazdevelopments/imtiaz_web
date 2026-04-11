"use client";
import { communitySectionData } from "../data";
import CustomOutlineButton from "../../common/CustomOutlineButton";
import { SectionHeading } from "../../animations/SectionHeading";
import { SectionDescription } from "../../animations/SectionDescription";
import { useScrollFadeUp } from "../../../hooks/useScrollFadeUp";

const MeydanHorizon = () => {
  const { title, description, subtitle } = communitySectionData;
  const desktopBtnRef = useScrollFadeUp({
    y: 40,
    duration: 0.7,
    start: "top 90%",
  });

  return (
    <section className="w-full py-120 3xl:py-160">
      <div className="container flex flex-col justify-center">
        {/* Header */}
        <div className="text-center ">
          <SectionHeading
            title={title}
            className="text-heading  text-foreground mb-20 max-w-[666px] mx-auto"
          />

          <SectionDescription
            text={subtitle}
            className="text-25 uppercase font-[optima] mb-40 text-foreground-light leading-[1.5] md:leading-[1.4] font-normal"
          />
          <SectionDescription
            text={description}
            className="text-description text-foreground-light max-w-[754px] mx-auto"
          />

          <div ref={desktopBtnRef} style={{ opacity: 0 }}>
            <CustomOutlineButton
              text="View Community"
              px="px-[12px] lg:px-[20px] 3xl:px-[39.54px] mx-auto mt-50"
              borderColor="border-primary"
              className="3xl:h-[67px]"
              textColor="text-foreground-light"
              variant="dark"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MeydanHorizon;
