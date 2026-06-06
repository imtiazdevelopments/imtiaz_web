export const bannerData = {
    video: "/videos/construction_banner.mp4",
    title: "Design. Build. Deliver. Anywhere",
    description: "Venco Imtiaz Contracting Co. (VICC) is a global construction and engineering company delivering complex infrastructure, turnkey construction, and mission-critical projects across the \n Middle East, South Asia, Africa, and North America.",
    features: [
        {
            key: "30+",
            value: "Years of Industry Experience",
        },
        {
            key: "Locations",
            value: "UAE, USA, Africa & South Asia",
        },
        {
            key: "4,500+",
            value: "Global Workforce",
        },
    ],
};


export interface TimelineSlide {
  year: number;
  title: string;
  image: string;
}

export interface TimelineSectionData {
  title: string;
  description: string;
  slides: TimelineSlide[];
}

export const timelineSectionData: TimelineSectionData = {
  title: "Built on Experience, Driven by Innovation",
  description:
    "Established in 1993, VICC has evolved into a multinational construction and engineering corporation known for delivering projects in some of \n the world's most demanding environments. From infrastructure development and turnkey construction to logistics and mission support \n services, VICC combines technical expertise, operational excellence, and an expeditionary mindset to consistently deliver \n reliable results. With a strong commitment to safety, sustainability, integrity, and quality, VICC continues to \n shape communities and infrastructure across global markets.",
  slides: [
    {
      year: 1993,
      title: "Company Founded",
      image: "/images/construction/time-line-slider/3.jpg",
    },
    {
      year: 2004,
      title: "Regional Expansion",
      image: "/images/construction/time-line-slider/2.jpg",
    },
    {
      year: 2007,
      title: "Dubai Headquarters Established",
      image: "/images/construction/time-line-slider/1.jpg",
    },
    {
      year: 2015,
      title: "International Projects Milestone",
      image: "/images/construction/time-line-slider/1.jpg",
    },
    {
      year: 2021,
      title: "Global Operations Launch",
      image: "/images/construction/time-line-slider/2.jpg",
    },
    {
      year: 2022,
      title: "Global Operations Launch",
      image: "/images/construction/time-line-slider/3.jpg",
    },
    {
      year: 2023,
      title: "Global Operations Launch",
      image: "/images/construction/time-line-slider/1.jpg",
    },
    {
      year: 2024,
      title: "Global Operations Launch",
      image: "/images/construction/time-line-slider/2.jpg",
    },
    {
      year: 2025,
      title: "Global Operations Launch",
      image: "/images/construction/time-line-slider/3.jpg",
    },
  ],
};



export interface ExpertiseSlide {
  image: string;
  title: string;
  description: string;
}

export const coreExpertiseData = {
  title: "Mastering the Build: Our Core Construction Expertise",
  slides: [
    {
      image: "/images/construction/expertise/1.jpg",
      title: "Construction",
      description:
        "Delivering high-quality construction projects with precision craftsmanship, strict timelines, and a commitment to safety across residential, commercial, and industrial sectors.",
    },
    {
      image: "/images/construction/expertise/2.jpg",
      title: "Infrastructure",
      description:
        "Developing critical infrastructure projects including transportation networks, utilities, public facilities, and urban development initiatives that support long-term economic growth.",
    },
    {
      image: "/images/construction/expertise/3.jpg",
      title: "Engineering & Design",
      description:
        "Providing innovative engineering solutions and thoughtful design that balance structural integrity, aesthetic appeal, and functional performance for every project.",
    },
    {
      image: "/images/construction/expertise/4.jpg",
      title: "Project Management",
      description:
        "Overseeing every phase of the build process with expert coordination, resource planning, and risk management to ensure projects are delivered on time and within budget.",
    },
    {
      image: "/images/construction/expertise/5.jpg",
      title: "Renovation",
      description:
        "Transforming existing spaces through meticulous renovation work that modernizes structures while preserving their core character and extending their operational lifespan.",
    },
    {
      image: "/images/construction/expertise/6.jpg",
      title: "Consulting",
      description:
        "Offering strategic construction consulting services that help clients navigate complex regulatory environments, optimize costs, and make informed decisions at every stage.",
    },
  ] satisfies ExpertiseSlide[],
};



export const commitmentSection = {
  title: "COMMITMENT TO SAFETY, SUSTAINABILITY, AND OPERATIONAL EXCELLENCE",
  description:
    "At VICC, quality and reliability are embedded into every stage of project execution. Through ISO-certified management systems, advanced engineering methodologies, rigorous safety standards, and sustainable construction practices, VICC consistently delivers projects that meet international benchmarks. Our commitment to innovation and operational excellence enables us to successfully execute complex projects in challenging environments worldwide.",
};

export const commitmentSlides = [
  {
    icon_url: "/images/construction/commitments/1.svg",
    title: "ISO CERTIFIED MANAGEMENT SYSTEMS",
  },
  {
    icon_url: "/images/construction/commitments/2.svg",
    title: "SUSTAINABLE & SAFETY-DRIVEN OPERATIONS",
  },
  {
    icon_url: "/images/construction/commitments/3.svg",
    title: "GLOBAL ENGINEERING & CONSTRUCTION EXPERTISE",
  },
  {
    icon_url: "/images/construction/commitments/4.svg",
    title: "ADVANCED PROJECT LOGISTICS INTEGRATION",
  },
  {
    icon_url: "/images/construction/commitments/5.svg",
    title: "RIGOROUS QUALITY CONTROL STANDARDS",
  },
];