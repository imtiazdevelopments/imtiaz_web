import { SectionDescription } from "../../animations/SectionDescription";
import { SectionHeading } from "../../animations/SectionHeading";
import CustomOutlineButton from "../../common/CustomOutlineButton";
import { expertiseData } from "../data";
import Link from "next/link";
const Expertise = () => {
  return (
    <section data-header="dark" className="w-full py-120 3xl:pt-140 3xl:pb-160">
      <div className="container mx-auto flex flex-col items-center">
          <SectionHeading
            title={expertiseData.title}
            className="text-foreground mb-20"
          />
          <SectionDescription
            text={expertiseData.description}
            className="text-foreground-light max-w-[720px] text-center whitespace-pre-line mb-50"
          /> 
            <Link href="/about/expertise">
                  <CustomOutlineButton text="Learn More" borderColor="border-primary" variant="dark" textColor="text-foreground-light" px="px-[12px] sm:px-[26px] lg:px-[34px]" />
            </Link>
      </div>
    </section>
  );
};

export default Expertise;
