"use client";
import { SectionDescription } from "../../animations/SectionDescription";
import { SectionHeading } from "../../animations/SectionHeading";
import { introData } from "../data";
import { useGsapStagger } from "../../../hooks/useGsapStagger";

import CustomIconButton from "../../common/CustomIconButton";
const ProjectIntro = () => {
  const gridRef = useGsapStagger({
    selector: ".selector",
    from: { opacity: 0, y: 40 },
    to: { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
    stagger: 0.15,
    start: "top 80%",
  });
  return (
    <section
      data-header="dark"
      style={{
        background:
          "radial-gradient(50% 50% at 50% 50%, rgba(97, 18, 13, 0.95) 0%, rgba(73, 9, 5, 0.95) 100%)",
      }}
      className="w-full py-120 3xl:py-130"
    >
      <div className="container mx-auto flex flex-col items-center">
        <SectionHeading
          title={introData.title}
          className="text-white mb-20 text-center max-w-[25ch]"
        />
        <SectionDescription
          text={introData.description}
          className="text-white/80  max-w-[87ch] text-center whitespace-pre-line"
        />
        <div
          className="flex flex-wrap gap-[15px] justify-center items-center mt-50"
          ref={gridRef}
        >
          <a href="#" className="selector">
            <CustomIconButton
              icondownload={true}
              className="w-fit !px-5 xl:!px-[30px] 3xl:!px-[35px] 2xl:!py-[20.5px]"
              text="Brochure"
              borderColor="border-white"
              textColor="text-white"
              variant="light"
            />
          </a>
          <a href="#" className="selector">
            <CustomIconButton
              icondownload={true}
              className="w-fit !px-5 xl:!px-[30px] 2xl:!px-[35px] 2xl:!py-[20.5px]"
              text="Fact Sheet"
              borderColor="border-white"
              textColor="text-white"
              variant="light"
            />
          </a>
          <a href="#" className="selector">
            <CustomIconButton
              icondownload={true}
              className="w-fit !px-5 xl:!px-[30px] 2xl:!px-[35px] 2xl:!py-[20.5px]"
              text="Unit layout"
              borderColor="border-white"
              textColor="text-white"
              variant="light"
            />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProjectIntro;
