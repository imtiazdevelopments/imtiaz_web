export interface Property {
  id: number;
  image: string;
  name: string;
  location: string;
  logo: string;
  features: { icon: string; label: string }[];
}

export const featuredProperties: Property[] = [
  {
    id: 1,
    image: "/images/home/feat-property/item1.jpg",
    name: "BEACH WALK III",
    location: "Dubai Islands",
    logo: "/images/home/feat-property/logo1.svg",
    features: [
      {
        icon: "/images/home/feat-property/icons/1.svg",
        label: "Fully Furnished",
      },
      {
        icon: "/images/home/feat-property/icons/2.svg",
        label: "20 Min from Sheikh Zyd Rd",
      },
      {
        icon: "/images/home/feat-property/icons/3.svg",
        label: "Direct Access to Park",
      },
    ],
  },
  {
    id: 2,
    image: "/images/home/feat-property/item1.jpg",
    name: "BEACH WALK III",
    location: "Dubai Islands",
    logo: "/images/home/feat-property/logo1.svg",
    features: [
      {
        icon: "/images/home/feat-property/icons/1.svg",
        label: "Fully Furnished",
      },
      {
        icon: "/images/home/feat-property/icons/2.svg",
        label: "20 Min from Sheikh Zyd Rd",
      },
      {
        icon: "/images/home/feat-property/icons/3.svg",
        label: "Direct Access to Park",
      },
    ],
  },
  {
    id: 3,
    image: "/images/home/feat-property/item1.jpg",
    name: "BEACH WALK III",
    location: "Dubai Islands",
    logo: "/images/home/feat-property/logo1.svg",
    features: [
      {
        icon: "/images/home/feat-property/icons/1.svg",
        label: "Fully Furnished",
      },
      {
        icon: "/images/home/feat-property/icons/2.svg",
        label: "20 Min from Sheikh Zyd Rd",
      },
      {
        icon: "/images/home/feat-property/icons/3.svg",
        label: "Direct Access to Park",
      },
    ],
  },
];

// secong section
export const coastalSlides = [
  {
    title: "Most sough-out community",
    image: "/images/home/vertical-slider/1.jpg",
    thumb: "/images/home/vertical-slider/1.jpg",
  },
  {
    title: "Island Life",
    image: "/images/home/vertical-slider/2.jpg",
    thumb: "/images/home/vertical-slider/2.jpg",
  },
  {
    title: "Marina-side bliss",
    image: "/images/home/vertical-slider/3.jpg",
    thumb: "/images/home/vertical-slider/3.jpg",
  },
  {
    title: "Hub for High-end shoping",
    image: "/images/home/vertical-slider/4.jpg",
    thumb: "/images/home/vertical-slider/4.jpg",
  },
];

// Sample data - replace with your actual data
export const pressSpotlights = [
  {
    id: 1,
    image: "/images/home/spotlight/1.jpg",
    category: "News category",
    title: "WHAT MAKES AN IMTIAZ HOME EXTRAORDINARY?",
  },
  {
    id: 2,
    image: "/images/home/spotlight/2.jpg",
    category: "News category",
    title: "WHAT MAKES AN IMTIAZ HOME EXTRAORDINARY?",
  },
  {
    id: 3,
    image: "/images/home/spotlight/3.jpg",
    category: "News category",
    title: "WHAT MAKES AN IMTIAZ HOME EXTRAORDINARY?",
  },
  {
    id: 4,
    image: "/images/home/spotlight/4.jpg",
    category: "News category",
    title: "WHAT MAKES AN IMTIAZ HOME EXTRAORDINARY?",
  },
  {
    id: 5,
    image: "/images/home/spotlight/1.jpg",
    category: "News category",
    title: "WHAT MAKES AN IMTIAZ HOME EXTRAORDINARY?",
  },
  {
    id: 6,
    image: "/images/home/spotlight/2.jpg",
    category: "News category",
    title: "WHAT MAKES AN IMTIAZ HOME EXTRAORDINARY?",
  },
];

export const properties = [
  {
    id: 1,
    number: "01",
    name: "BEACH WALK GRAND 2 BY IMTIAZ",
    location: "Dubai Islands",
    image: "/images/home/imtiaz-properties/1.png",
    thumbnail: "/images/home/imtiaz-properties/1.png",
  },
  {
    id: 2,
    number: "02",
    name: "WYNWOOD HORIZON BY IMTIAZ",
    location: "Dubai Islands",
    image: "/images/home/imtiaz-properties/2.png",
    thumbnail: "/images/home/imtiaz-properties/2.png",
  },
  {
    id: 3,
    number: "03",
    name: "SUNSET BAY 4 BY IMTIAZ",
    location: "Dubai Islands",
    image: "/images/home/imtiaz-properties/3.png",
    thumbnail: "/images/home/imtiaz-properties/3.png",
  },
  {
    id: 4,
    number: "04",
    name: "COVE BOULEVARD BY IMTIAZ",
    location: "Dubai Islands",
    image: "/images/home/imtiaz-properties/4.png",
    thumbnail: "/images/home/imtiaz-properties/4.png",
  },
  {
    id: 5,
    number: "05",
    name: "BEACH WALK GRAND 2 BY IMTIAZ",
    location: "Dubai Islands",
    image: "/images/home/imtiaz-properties/5.png",
    thumbnail: "/images/home/imtiaz-properties/5.png",
  },
  {
    id: 6,
    number: "06",
    name: "SUNSET BAY 3 BY IMTIAZ",
    location: "Dubai Islands",
    image: "/images/home/imtiaz-properties/1.png",
    thumbnail: "/images/home/imtiaz-properties/1.png",
  },
];

export const aboutSectionJourney = {
  tag: "ABOUT",
  title: "A JOURNEY TO PERFECTION",
  subtitle: "CREATING DESTINATIONS OF DISTINCTION",
  description:
    "We transform visions into living, breathing destinations. At Imtiaz Developments, our legacy is built on excellence, innovation, and uncompromising quality — delivering iconic properties that inspire and endure.",
  button: {
    label: "About Imtiaz",
    link: "/home2",
  },
};

export const heroSlides = [
  {
    title: "SUNSET BAY 2 BY IMTIAZ",
    video: "/videos/sunset_bay.mp4",
    registerLink: "/register/sunset-bay",
    exploreLink: "/projects/sunset-bay",
    rightLabel: "NEW LAUNCHES",
    pillFeatures: {
      title: "/icons/pro_slider/sunset_bay.svg",
      features: [
        { icon: "/icons/pro_slider/sunset_icons/1.svg", label: "KIDS' ZONE" },
        { icon: "/icons/pro_slider/sunset_icons/2.svg", label: "club house" },
        {
          icon: "/icons/pro_slider/sunset_icons/3.svg",
          label: "FULLY EQUIPPED GYM",
        },
        {
          icon: "/icons/pro_slider/sunset_icons/4.svg",
          label: "SAUNA & STEAM",
        },
      ],
    },
  },

  {
    title: "Cotier House 2 by Imtiaz",
    video: "/videos/slidervdo-2.mp4",
    registerLink: "/register/ocean-park",
    exploreLink: "/projects/ocean-park",
    rightLabel: "Coming Soon",
    pillFeatures: {
      title: "/icons/pro_slider/cotier.svg",
      features: [
        { icon: "/icons/pro_slider/sunset_icons/1.svg", label: "KIDS' ZONE" },
        { icon: "/icons/pro_slider/sunset_icons/2.svg", label: "club house" },
        {
          icon: "/icons/pro_slider/sunset_icons/3.svg",
          label: "FULLY EQUIPPED GYM",
        },
        {
          icon: "/icons/pro_slider/sunset_icons/4.svg",
          label: "SAUNA & STEAM",
        },
      ],
    },
  },

  {
    title: "SUNSET BAY 2 BY IMTIAZ",
    video: "/videos/sunset_bay.mp4",
    registerLink: "/register/sunset-bay",
    exploreLink: "/projects/sunset-bay",
    rightLabel: "NEW LAUNCHES",
    pillFeatures: {
      title: "/icons/pro_slider/sunset_bay.svg",
      features: [
        { icon: "/icons/pro_slider/sunset_icons/1.svg", label: "KIDS' ZONE" },
        { icon: "/icons/pro_slider/sunset_icons/2.svg", label: "club house" },
        {
          icon: "/icons/pro_slider/sunset_icons/3.svg",
          label: "FULLY EQUIPPED GYM",
        },
        {
          icon: "/icons/pro_slider/sunset_icons/4.svg",
          label: "SAUNA & STEAM",
        },
      ],
    },
  },

  {
    title: "Cotier House 2 by Imtiaz",
    video: "/videos/slidervdo-2.mp4",
    registerLink: "/register/ocean-park",
    exploreLink: "/projects/ocean-park",
    rightLabel: "Coming Soon",
    pillFeatures: {
      title: "/icons/pro_slider/cotier.svg",
      features: [
        { icon: "/icons/pro_slider/sunset_icons/1.svg", label: "KIDS' ZONE" },
        { icon: "/icons/pro_slider/sunset_icons/2.svg", label: "club house" },
        {
          icon: "/icons/pro_slider/sunset_icons/3.svg",
          label: "FULLY EQUIPPED GYM",
        },
        {
          icon: "/icons/pro_slider/sunset_icons/4.svg",
          label: "SAUNA & STEAM",
        },
      ],
    },
  },
];
