export type InvestorRelationsPageResponse = {
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

    reason_title: string;
    reason_brief: string;

    appeal_title: string;
    appeal_brief: string;
    appeal_image_desktop: string;
    appeal_image_mobile: string;
    appeal_image_alt: string;

    highlight_title_1: string;
    highlight_caption_1: string;

    highlight_title_2: string;
    highlight_caption_2: string;

    highlight_title_3: string;
    highlight_caption_3: string;

    highlight_title_4: string;
    highlight_caption_4: string;

    highlight_title_5: string;
    highlight_caption_5: string;

    communities_title: string;
    properties_title: string;

    faq_title: string;
    faq_caption: string;

    show_reasons_section: string;
    show_appeal_section: string;
    show_communities_section: string;
    show_properties_section: string;
    show_faq_section: string;

    reasons: {
      reason_title: string;
      reason_caption: string;
      icon_url: string;
    }[];

    faqs: {
      faq_question: string;
      faq_answer: string;
    }[];

    communities: {
      slug: string;
      title: string;
      featured_image_desktop: string;
      featured_image_mobile: string;
      featured_image_alt: string | null;
    }[];

    properties: {
      slug: string;
      brand_logo: string;
      title: string;
      featured_image_desktop: string;
      featured_image_mobile: string;
      featured_image_alt: string;

      icon1_url: string;
      icon1_text: string;

      icon2_url: string;
      icon2_text: string;

      property_caption: string;
      property_type: string;
      property_status: string;
    }[];
  };
};


export const bannerData = {
  title: "Investor Relations",
  description:
    "We build vibrant communities designed for lasting value. Our projects offer strong medium-to long-term investment opportunities.",
  image: "/images/investor-relations/banner.jpg",
};

//faq
export const faqData = {
  title: "FAQ",
  subtitle:
    "Lorem Ipsum is simply dummy text of the printing and\ntypesetting industry. Lorem Ipsum has",
  items: [
    {
      id: "faq-1",
      question: "What defines your luxury properties?",
      answer:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled",
    },
    {
      id: "faq-2",
      question: "What makes your brand unique?",
      answer:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled",
    },
    {
      id: "faq-3",
      question: "Who are your properties designed for?",
      answer:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled",
    },
    {
      id: "faq-4",
      question: "How do you ensure quality and longevity?",
      answer:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled",
    },
    {
      id: "faq-5",
      question: "Is sustainability part of your vision?",
      answer:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled",
    },
  ],
};

export const projectsData = {
  sectionTitle: "IMTIAZ PROPERTIES",
  properties: [
    {
      id: "1",
      image: "/images/home/feat-property/property1.jpg",
      hoverImage: "/images/community-listing/hoverimg.png",
      status: "Under Construction",
      location: "Down Town Dubai, UAE",
      title: "COVE by Imtiaz",
      subtitle: "Spacious Community Living",
      href: "/projects/cove-by-imtiaz",
      startingFrom: "AED 3.5 M",
      units: "1BR - 3BR",
    },
    {
      id: "2",
      image: "/images/home/feat-property/property2.jpg",
      hoverImage: "/images/community-listing/hoverimg.png",
      status: "Off Plan",
      location: "Down Town Dubai, UAE",
      title: "COVE by Imtiaz",
      subtitle: "Spacious Community Living",
      href: "/projects/azure-residences",
      startingFrom: "AED 3.5 M",
      units: "1BR - 3BR",
    },
    {
      id: "3",
      image: "/images/home/feat-property/property3.jpg",
      hoverImage: "/images/community-listing/hoverimg.png",
      status: "Off Plan",
      location: "Down Town Dubai, UAE",
      title: "Cove Edition I by Imtiaz",
      subtitle: "Spacious Community Living",
      href: "/projects/skyline-tower",
      startingFrom: "AED 3.5 M",
      units: "1BR - 3BR",
    },
    {
      id: "4",
      image: "/images/home/feat-property/property4.jpg",
      hoverImage: "/images/community-listing/hoverimg.png",
      status: "Completed",
      location: "Down Town Dubai, UAE",
      title: "Cove Edition 2 by Imtiaz",
      subtitle: "Spacious Community Living",
      href: "/projects/palm-villas",
    },
    {
      id: "5",
      image: "/images/home/feat-property/property2.jpg",
      hoverImage: "/images/community-listing/hoverimg.png",
      status: "Under Construction",
      location: "Down Town Dubai, UAE",
      title: "COVE by Imtiaz",
      subtitle: "Spacious Community Living",
      href: "/projects/azure-residences",
      startingFrom: "AED 3.5 M",
      units: "1BR - 3BR",
    },
  ],
};

export const communityNamesData = {
  heading: "IMTIAZ COMMUNITIES",
  communities: [
    {
      id: "f1",
      name: "JVC",
      bgImage: "/images/home/community/JVC.jpg",
      link: "#",
    },
    {
      id: "f2",
      name: "Al Furjan",
      bgImage: "/images/home/community/alfj.jpg",
      link: "#",
    },
    {
      id: "f3",
      name: "Jumeirah Garden City",
      bgImage: "/images/home/community/jumeirah-garden-city.jpg",
      link: "#",
    },
    {
      id: "f4",
      name: "Dubai Land Residence Complex",
      bgImage: "/images/home/community/dubai-land-residence.jpg",
      link: "#",
    },
    {
      id: "f5",
      name: "Dubai Islands",
      bgImage: "/images/home/community/dubai-islands.jpg",
      link: "#",
    },
    {
      id: "f6",
      name: "Meydan Horizon",
      bgImage: "/images/home/community/meydan.jpg",
      link: "#",
    },
  ],
};


export const investReasonsData = {
  sectionTitle: "Reasons to Invest in Dubai",
  sectionDescription:
    "Dubai offers a tax-friendly environment, strong economic growth, and world-class infrastructure. With strategic global connectivity and investor-focused policies, it provides stable returns \n and long-term investment potential.",
  reasons: [
    {
      id: 1,
      icon: "/images/investor-relations/reasons/1.svg",
      title: "0% Income Tax",
      description:
        "No personal income tax or capital gains tax, making Dubai highly attractive.",
    },
    {
      id: 2,
      icon: "/images/investor-relations/reasons/2.svg",
      title: "High Rental Yields",
      description:
        "Average rental yields range from 5–8%, with some areas offering even higher returns.",
    },
    {
      id: 3,
      icon: "/images/investor-relations/reasons/3.svg",
      title: "Growing Economy",
      description:
        "Dubai's GDP continues to grow, driven by sectors such as tourism.",
    },
    {
      id: 4,
      icon: "/images/investor-relations/reasons/4.svg",
      title: "Real Estate Appreciation",
      description:
        "Dubai property prices have shown long-term appreciation.",
    },
    {
      id: 5,
      icon: "/images/investor-relations/reasons/5.svg",
      title: "Friendly Regulations",
      description:
        "Dubai property prices have shown long-term appreciation.",
    },
    {
      id: 6,
      icon: "/images/investor-relations/reasons/6.svg",
      title: "Stable Currency",
      description:
        "The UAE Dirham is pegged to the US Dollar, providing stability.",
    },
    {
      id: 7,
      icon: "/images/investor-relations/reasons/7.svg",
      title: "Strategic Location",
      description:
        "Positioned as a global hub between Europe, Asia, and Africa.",
    },
    {
      id: 8,
      icon: "/images/investor-relations/reasons/8.svg",
      title: "Premium Infrastructure",
      description:
        "Dubai is known for its advanced infrastructure, attracting both.",
    },
  ],
};


export const investmentAppealData = {
  sectionTitle: "The Investment Appeal of Dubai",
  sectionDescription:
    "The emirate presents a tax-efficient environment, robust economic expansion, and exceptional infrastructure. Supported by its strategic global connectivity and investor-friendly \n regulations, the city ensures secure returns and strong long-term investment.",
  image: {
    src: "/images/investor-relations/investment.jpg",
  },
  stats: [
    { id: 1, value: "30 +", label: "Years of Expertise" },
    { id: 2, value: "IN-HOUSE", label: "Construction" },
    { id: 3, value: "10 +", label: "Years in Dubai" },
    { id: 4, value: "18 +", label: "Projects Completed" },
    { id: 5, value: "STRATEGIC", label: "Locations" },
  ],
};