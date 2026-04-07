import { SectionDescription } from "../../animations/SectionDescription";
import { SectionHeading } from "../../animations/SectionHeading";
import { philosophyData } from "../data";

const Philosophy = () => {
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
        <SectionHeading title={philosophyData.title} className="text-white mb-20" />
        <SectionDescription
          text={philosophyData.description}
          className="text-white/80 max-w-[1220px] 3xl:max-w-[1308px] text-center whitespace-pre-line"
        />
      </div>
    </section>
  );
};

export default Philosophy;
