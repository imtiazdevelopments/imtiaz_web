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
      className="w-full py-[70px] lg:py-120 3xl:py-130"
    >
      <div className="container flex flex-col items-center">
        <SectionHeading
          title={introData.title}
          className="text-white mb-20 text-center max-w-[25ch]"
        />
        <SectionDescription
          text={introData.description}
          className="text-white/80  max-w-[87ch] text-center whitespace-pre-line"
        />
        <div
          className="grid grid-cols-2 md:flex md:flex-wrap gap-20 md:gap-[15px] justify-center items-center mt-[50px] w-full"
          ref={gridRef}
        >
          <a href="#" className="selector">
            <CustomIconButton
              icondownload={true}
              className="w-full md:w-fit !px-5 xl:!px-[30px] 3xl:!px-[35px] 2xl:!py-[20.5px] h-[50px] md:h-[67px]"
              text="Brochure"
              borderColor="border-white"
              textColor="text-white"
              variant="light"
            />
          </a>
          <a href="#" className="selector">
            <CustomIconButton
              icondownload={true}
              className="w-full md:w-fit !px-5 xl:!px-[30px] 2xl:!px-[35px] 2xl:!py-[20.5px] h-[50px] md:h-[67px]"
              text="Fact Sheet"
              borderColor="border-white"
              textColor="text-white"
              variant="light"
            />
          </a>
          <a
            href="#"
            className="selector col-span-2 flex justify-center md:col-span-1 md:flex-none"
          >
            <CustomIconButton
              icondownload={true}
              className="min-w-[190px] md:w-fit !px-5 xl:!px-[30px] 2xl:!px-[35px] 2xl:!py-[20.5px] h-[50px] md:h-[67px]"
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
