"use client";
 

interface Service {
  id: string;
  number: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  dark?: boolean;
}

const services: Service[] = [
  {
    id: "project-development",
    number: "01",
    title: "Project Development Consultancy",
    description:
      "We offer strategic consultancy for developments of any size, providing guidance and support at every stage. With extensive experience across leading residential, commercial, and industrial projects in the UAE, we specialise",
    image: "../../../images/expertise/th1.jpg",
    alt: "Modern luxury residential tower with curved white balconies",
    dark: true,
  },
  {
    id: "asset-management",
    number: "02",
    title: "Asset Management and Hospitality",
    description:
      "We offer innovative investment solutions tailored for rapid growth in emerging industries. Our focus is to provide investors with the education, guidance, and support needed to maximise short-and-long-term returns.",
    image: "../../../images/expertise/th2.jpg",
    alt: "Elegant luxury bedroom interior with marble walls",
    dark: false,
  },
  {
    id: "engineering-construction",
    number: "03",
    title: "Engineering and Construction",
    description:
      "We offer strategic consultancy for developments of any size, providing guidance and support at every stage. With extensive experience across leading residential, commercial, and industrial projects in the UAE, we specialise",
    image: "../../../images/expertise/th3.jpg",
    alt: "Imtiaz construction site with crane and signage",
    dark: false,
  },
  {
    id: "project-management",
    number: "04",
    title: "Project Management",
    description:
      "We offer strategic consultancy for developments of any size, providing guidance and support at every stage. With extensive experience across leading residential, commercial, and industrial projects in the UAE, we specialise",
    image: "../../../images/expertise/th4.jpg",
    alt: "Aerial view of luxury coastal resort development",
    dark: false,
  },
];

export default function ThinkingThatDelivers() {
  return (
    <section className="w-full spacing-y-160 ">
     <div className="container">
         <div className="relative grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-[auto_882px] 2xl:grid-cols-[auto_1082px] gap-3 2xl:gap-[84px]">
                {/* Left: Text Block */}
                <div className="   pt-5 xl:pt-10 2xl:pt-[183px]">
                <h1 className="heading-50  text-[#171717] uppercase mb-4">
                    Thinking
                    <br />
                    That Delivers
                </h1>
                <p className="text-[16px] text-[#171717] leading-[1.5] max-w-[53ch] font-[800]  ">
                    We combine industry insight with hands-on experience to solve
                    complex challenges.
                </p>
                </div>

                {/* Right: First service image + dark panel — flush right */}
            <div>
                {services.map((service) => (
                <div key={service.id} className="relative flex mb-3 xl:mb-8 2xl:mb-12 last:mb-0 xl:last:mb-0 2xl:last:mb-0">
                {/* Left: black spacer aligned with hero left column */}
                <div className=" bg-black" />

                {/* Right: image + light panel */}
                <div className="flex flex-1 group">
                    {/* Image */}
                    <div className="relative w-[42.7%] overflow-hidden">
                    <img
                        src={service.image}
                        alt={service.alt}
                        className="w-full h-full object-cover"
                        style={{ minHeight: "320px" }}
                    />
                    </div>

                    {/* Light content panel */}
                    <div className="flex-1 bg-[#F0EDE8] flex flex-col justify-between p-6 xl:p-8 2xl:p-[50px] group-hover:bg-[#490905] transition-colors duration-300">
                    <span className="heading-50 text-[#EBEBEC]  ">
                        {service.number}
                    </span>
                    <div>
                        <h2 className="text-[25px] font-[optima] uppercase text-[#490905] group-hover:text-white mb-3 2xl:mb-5">
                       {service.title.split(" ").slice(0, -1).join(" ")}
                            <br />
                            {service.title.split(" ").slice(-1)}
                        </h2>
                        <p className="text-[16px]   text-[#404040] group-hover:text-white leading-[1.5] font-[800]">
                        {service.description}
                        </p>
                    </div>
                    </div>
                </div>
                </div>
            ))}
            </div>
            </div>
     </div>
      
    </section>
  );
}
