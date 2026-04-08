import { SectionDescription } from "../../animations/SectionDescription";
import { SectionHeading } from "../../animations/SectionHeading";
import { introData } from "../data";

const ProjectIntro = () => {
  return (
    <section
      data-header="dark"
      style={{
        background:
          "radial-gradient(50% 50% at 50% 50%, #61120D 0%, #490905 100%)",
      }}
      className="w-full py-120 3xl:py-130"
    >
      <div className="container mx-auto flex flex-col items-center">
        <SectionHeading title={introData.title} className="text-white mb-20 text-center" />
        <SectionDescription
          text={introData.description}
          className="text-white/80 max-w-[1220px] 3xl:max-w-[1308px] text-center whitespace-pre-line"
        />
        <div className="flex flex-wrap gap-[15px] justify-center items-center mt-50">
          <a href="#" >
          <div className="cursor-pointer w-fit mx-auto group flex items-center justify-center gap-2 border border-white leading-[1.37] text-white rounded-full px-6 py-3 2xl:px-[35px] 2xl:py-[20px] text-description 2xl:!text-[19px] hover:bg-[#6b1a1a] hover:text-white transition-colors duration-300 mt-2">
            <div className="flex items-center gap-[10px] uppercase">
              <span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 14.6665V18.2221C20 18.6936 19.8127 19.1457 19.4793 19.4791C19.1459 19.8125 18.6937 19.9998 18.2222 19.9998H5.77778C5.30628 19.9998 4.8541 19.8125 4.5207 19.4791C4.1873 19.1457 4 18.6936 4 18.2221V14.6665" stroke="white" className="group-hover:stroke-white transition-colors duration-300" stroke-width="1.44" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M7.55469 10.2222L11.9991 14.6666L16.4436 10.2222" stroke="white" className="group-hover:stroke-white transition-colors duration-300" stroke-width="1.44" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M12 14.6667V4" stroke="white" className="group-hover:stroke-white transition-colors duration-300" stroke-width="1.44" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </span>
              <span>Brochure</span>
            </div>
          </div>
        </a>
          <a href="#" >
          <div className="cursor-pointer w-fit mx-auto group flex items-center justify-center gap-2 border border-white leading-[1.37] text-white rounded-full px-6 py-3 2xl:px-[35px] 2xl:py-[20px] text-description 2xl:!text-[19px] hover:bg-[#6b1a1a] hover:text-white transition-colors duration-300 mt-2">
            <div className="flex items-center gap-[10px] uppercase">
              <span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 14.6665V18.2221C20 18.6936 19.8127 19.1457 19.4793 19.4791C19.1459 19.8125 18.6937 19.9998 18.2222 19.9998H5.77778C5.30628 19.9998 4.8541 19.8125 4.5207 19.4791C4.1873 19.1457 4 18.6936 4 18.2221V14.6665" stroke="white" className="group-hover:stroke-white transition-colors duration-300" stroke-width="1.44" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M7.55469 10.2222L11.9991 14.6666L16.4436 10.2222" stroke="white" className="group-hover:stroke-white transition-colors duration-300" stroke-width="1.44" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M12 14.6667V4" stroke="white" className="group-hover:stroke-white transition-colors duration-300" stroke-width="1.44" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </span>
              <span>Fact Sheet</span>
            </div>
          </div>
        </a>
          <a href="#" >
          <div className="cursor-pointer w-fit mx-auto group flex items-center justify-center gap-2 border border-white leading-[1.37] text-white rounded-full px-6 py-3 2xl:px-[35px] 2xl:py-[20px] text-description 2xl:!text-[19px] hover:bg-[#6b1a1a] hover:text-white transition-colors duration-300 mt-2">
            <div className="flex items-center gap-[10px] uppercase">
              <span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 14.6665V18.2221C20 18.6936 19.8127 19.1457 19.4793 19.4791C19.1459 19.8125 18.6937 19.9998 18.2222 19.9998H5.77778C5.30628 19.9998 4.8541 19.8125 4.5207 19.4791C4.1873 19.1457 4 18.6936 4 18.2221V14.6665" stroke="white" className="group-hover:stroke-white transition-colors duration-300" stroke-width="1.44" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M7.55469 10.2222L11.9991 14.6666L16.4436 10.2222" stroke="white" className="group-hover:stroke-white transition-colors duration-300" stroke-width="1.44" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M12 14.6667V4" stroke="white" className="group-hover:stroke-white transition-colors duration-300" stroke-width="1.44" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </span>
              <span>Unit layout</span>
            </div>
          </div>
        </a>
        </div>
      </div>
    </section>
  );
};

export default ProjectIntro;
