export type InnovationPageResponse = {
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

    impact_title: string;

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

    moments_title: string;
    spotlight_title: string;

    show_reasons_section: string;
    show_appeal_section: string;
    show_communities_section: string;

    moments: {
      moment_caption: string;
      moment_url: string;
    }[];
  };
};

export const bannerData = {
  title: "Sustainability",
  description:
    "Imtiaz Developments is taking a bold step towards balancing luxury real estate with ecological responsibility. Part of our core values as a business is to inspire a greener and more sustainable future.",
  image: "/images/sustainability/banner.jpg",
};

export const impactAreas = {
  title: "Impact Areas",
  items: [
    {
      id: "tree-planting",
      title: "Tree-Planting",
      description:
        "As part of our commitment to responsible development, we pledge to plant a tree for every apartment built.",
      image: "/images/sustainability/impact1.jpg",
    },
    {
      id: "csr-awareness",
      title: "CSR Awareness",
      description:
        "We actively promote corporate social responsibility across our communities, fostering a culture of care and conscious living.",
      image: "/images/expertise/banner.jpg",
    },
    {
      id: "sustainable-development",
      title: "Sustainable Development",
      description:
        "Every project we build is designed with sustainability at its core — reducing impact while elevating quality of life.",
      image: "/images/sustainability/banner.jpg",
    },
  ],
};


export const momentsOfSustainability = {
  title: "Moments of Sustainability",
  description:
    'Explore how thoughtful planning and green solutions come together to build spaces that care for both people and the planet. Discover projects built on sustainable principles that create value \n today while protecting tomorrow.',
  slides: [
    {
      id: "slide-1",
      cols: [
        {
          id: "col-a",
          images: [
            { src: "/images/sustainability/imageCorousal/2.jpg", alt: "Rooftop garden terrace", width: 425, height: 344 },
            { src: "/images/sustainability/imageCorousal/3.jpg", alt: "Aerial site map", width: 425, height: 231 },
          ],
        },
        {
          id: "col-b",
          images: [
            { src: "/images/sustainability/imageCorousal/1.jpg", alt: "Partnership ceremony", width: 599, height: 555, center: true },
          ],
        },
        {
          id: "col-c",
          images: [
            { src: "/images/sustainability/imageCorousal/4.jpg", alt: "Aerial tower view", width: 425, height: 220 },
            { src: "/images/sustainability/imageCorousal/5.jpg", alt: "Curved facade", width: 425, height: 355 },
          ],
        },
      ],
      peekImage: { src: "/images/sustainability/imageCorousal/6.jpg", alt: "Coastal development", width: 599, height: 452 },
    },
    {
      id: "slide-2",
      cols: [
        {
          id: "col-a2",
          images: [
            { src: "/images/sustainability/imageCorousal/2.jpg", alt: "Coastal development", width: 425, height: 344 },
            { src: "/images/sustainability/imageCorousal/3.jpg", alt: "Rooftop garden", width: 425, height: 231 },
          ],
        },
        {
          id: "col-b2",
          images: [
            { src: "/images/sustainability/imageCorousal/1.jpg", alt: "Site overview", width: 599, height: 555, center: true },
          ],
        },
        {
          id: "col-c2",
          images: [
            { src: "/images/sustainability/imageCorousal/4.jpg", alt: "Ceremony", width: 425, height: 231 },
            { src: "/images/sustainability/imageCorousal/5.jpg", alt: "Tower aerial", width: 425, height: 344 },
          ],
        },
      ],
      peekImage: { src: "/images/sustainability/imageCorousal/6.jpg", alt: "Facade detail", width: 599, height: 452 },
    },
  ],
};


export const sustainabilitySpotlight = {
  title: "Sustainability Spotlight",
  viewAllHref: "/sustainability",
  slides: [
    {
      id: "spotlight-1",
      date: "15-10-2025",
      title: "Imtiaz Developments Launches Green Initiative With Emirates",
      href: "/sustainability/green-initiative",
      image: "/images/sustainability/spotlight/1.jpg",
      alt: "Imtiaz and EEG partnership ceremony",
    },
    {
      id: "spotlight-2",
      date: "22-11-2025",
      title: "Imtiaz Pledges Net Zero Carbon Across All New Developments",
      href: "/sustainability/net-zero",
      image: "/images/sustainability/imageCorousal/4.jpg",
      alt: "Net zero sustainability event",
    },
    {
      id: "spotlight-3",
      date: "05-01-2026",
      title: "Community Green Spaces Initiative Reaches 10,000 Trees Planted",
      href: "/sustainability/tree-planting",
      image: "/images/sustainability/imageCorousal/5.jpg",
      alt: "Tree planting community event",
    },
  ],
};