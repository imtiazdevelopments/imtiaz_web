export type CareersPageResponse = {
  status: string;
  language: string;
  code: number;
  message: string;

  data: {
    meta_title: string;
    meta_description: string;

    page_banner_title: string;
    page_banner_caption: string;
    page_banner_desktop: string;
    page_banner_mobile: string;
    page_banner_alt: string;

    join_title: string;
    join_brief: string;

    highlight_title_1: string;
    highlight_caption_1: string;
    highlight_image_alt_1: string;
    highlight_image_desktop_1: string;
    highlight_image_mobile_1: string;

    highlight_title_2: string;
    highlight_caption_2: string;
    highlight_image_alt_2: string;
    highlight_image_desktop_2: string;
    highlight_image_mobile_2: string;

    highlight_title_3: string;
    highlight_caption_3: string;
    highlight_image_alt_3: string;
    highlight_image_desktop_3: string;
    highlight_image_mobile_3: string;

    expectation_title: string;
    expectation_caption: string;

    vacancy_title: string;
    vacancy_brief: string;

    show_reasons_section: string;
    show_appeal_section: string;
    show_communities_section: string;

    gallery: {
      moment_caption: string | null;
      moment_url: string;
    }[];

    vacancies: {
      location: string;
      job_title: string;
      caption: string;
      slug: string;
      department: string;
      job_type: string;
      job_category: string;
    }[];
  };
};

export const bannerData = {
    image: "/images/careers/banner.jpg",
    title: "career at imtiaz",
    description: "Welcome to Imtiaz Developments, where excellence meets opportunity."
}

export const careerImpactAreas = {
  title: "Join Imtiaz Developments",
  description: "Be part of our team of visionaries, innovators, and creative minds. We believe in nurturing talent, fostering creativity, and providing a platform for growth. If you are driven by excellence, thrive in a dynamic environment, \n and seek to transform dreams into reality",
  items: [
    {
      id: "Competitive salaries",
      title: "Competitive salaries",
      description:
        "We offer competitive salaries and benefits to attract and retain top talent.",
      image: "/images/careers/car-slide-1.jpg",
    },
    {
      id: "key Benefits",
      title: "Key Benefits",
      description:
        "We actively promote corporate social responsibility across our communities, fostering a culture of care and conscious living.",
      image: "/images/expertise/banner.jpg",
    },
    {
      id: "Collective culture",
      title: "Collective culture",
      description:
        "At Imtiaz Developments, we foster a collaborative and inclusive environment where every team member’s contribution is valued. We believe that our collective strength drives our success.",
      image: "/images/sustainability/banner.jpg",
    },
  ],
};



export const careersData = [
  {
    id: "1",
    title: "Marketing Lead",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
    location: "Dubai",
    jobType: "Full Time",
    department: "Marketing",
  },
  {
    id: "2",
    title: "Design & Architecture",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
    location: "Dubai",
    jobType: "Full Time",
    department: "Design & Architecture",
  },
  {
    id: "3",
    title: "Property Sales Executive",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
    location: "Dubai",
    jobType: "Full Time",
    department: "Sales",
  },
  {
    id: "4",
    title: "Channel Sales Manager",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
    location: "Dubai",
    jobType: "Full Time",
    department: "Sales",
  },
  {
    id: "5",
    title: "Real Estate Advisor",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
    location: "Dubai",
    jobType: "Full Time",
    department: "Real Estate",
  },
  {
    id: "6",
    title: "Leasing Consultant",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
    location: "Dubai",
    jobType: "Full Time",
    department: "Leasing",
  },
];

export const vacanciesConfig = {
  section: {
    title: "Vacancies",
    description:
      "Browse our open vacancies below. Use filters to refine search by role, discipline, and location, making it easier to find the perfect fit for your skills.",
  },
filters: {
  department: ["Marketing", "Design & Architecture", "Sales", "Real Estate", "Leasing", "Operations"],
  jobType: ["Full Time", "Part Time", "Contract", "Remote"],
},
};



export const whatToExpectData = {
  heading: "What To Expect",
  description:
    "Our company culture is rooted in innovation, collaboration, and a deep commitment to our team members' growth and wellbeing. We foster a working environment that values open communication, mutual respect, and continuous learning. We celebrate diversity and believe that our collective strength lies in our varied backgrounds, experiences, and perspectives. At Imtaz, you are part of a community committed to excellence and success.",
  carousalImages: [
    { src: "/images/careers/carousal/1.jpg"},
    { src: "/images/careers/carousal/2.jpg"},
    { src: "/images/careers/carousal/3.jpg"},
    { src: "/images/careers/carousal/4.jpg"},
    { src: "/images/careers/carousal/5.jpg"},
  ],
};