"use client";
import { SectionDescription } from "../../animations/SectionDescription";
import { SectionHeading } from "../../animations/SectionHeading";
import { introData } from "../data";
import { useGsapStagger } from "../../../hooks/useGsapStagger";

import CustomIconButton from "../../common/CustomIconButton";


// type PdfDoc = (typeof pdfdocData)[0];

interface ProjectIntroProps {
  title:string,
  description:string,
  brochure:string,
  fact_sheet:string,
  unit_layout:string
}

function ProjectIntro({ title,description,brochure,fact_sheet,unit_layout }: ProjectIntroProps) {
  
  const pdfdocData = [
  { 
    id: "brochure",
    image: brochure,
    label: "Brochure",
  },
  { 
    id: "factsheet",
    image: fact_sheet,
    label: "Fact Sheet",
  },
  { 
    id: "unitlayout",
    image: unit_layout,
    label: "Unit layout",
  }, 
];

  const gridRef = useGsapStagger({
    selector: ".selector",
    from: { opacity: 0, y: 40 },
    to: { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
    stagger: 0.15,
    start: "top 80%",
  });

  const getFileName = (path: string, label: string) => {
    const fileName = path.split('/').pop() || label.toLowerCase();
    return fileName;
  };

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
          title={title}
          className="text-white mb-20 text-center max-w-[25ch]"
        />
        <SectionDescription
          text={description}
          className="text-white/80  max-w-[87ch] text-center whitespace-pre-line"
        />
        <div
          className=" flex  flex-wrap gap-20 md:gap-[15px] justify-center items-center mt-[50px] w-full"
          ref={gridRef}
        >
          
          {pdfdocData.map((doc, index) => (
            <a 
              key={index}
              href={doc.image} 
              download={getFileName(doc.image, doc.label)}
              // className={`selector ${index === 2 ? 'col-span-2 flex justify-center md:col-span-1 md:flex-none' : ''}`}
               
              className={`selector      justify-center   `}
            >
              <CustomIconButton
                icondownload={true}
                // className={`${index === 2 ? 'min-w-[190px] md:w-fit' : 'w-full md:w-fit'} !px-5 xl:!px-[30px] 2xl:!px-[35px] 2xl:!py-[20.5px] h-[50px] md:h-[67px]`}
                 className={`icnpojectbtn w-full md:w-[210px] !px-5 xl:!px-[30px] 2xl:!px-[5px] 2xl:!py-[20.5px] h-[44px] md:h-[50px]  xl:h-[66px]`}
                text={doc.label}
                borderColor="border-white"
                textColor="text-white"
                variant="light"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProjectIntro;