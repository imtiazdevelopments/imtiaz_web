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

export const DubaiIslandData = {
  tag: "Dubai Islands",
  title: "A Coastal Paradise",
  subtitle: "A Rising Haven of Leisure & Luxury",
  description:
    "Dubai Islands features 20 km of coastline to explore, offering a unique metropolitan lifestyle surrounded by nature. The fast-growing location is set to become the premier entertainment, dining and leisure destination.",
};

export const ConstructionProgressData = {
  title: "CONSTRUCTION PROGRESS",
  videoSrc: "/images/home/work-progress/progress.mp4",
  posterSrc: "/images/home/work-progress/progress.jpg",
  description:
    "Watch our projects turn from concept to reality and witness the future of real estate unfold at every milestone.",
  button: {
    label: "Construction Updates",
    link: "/home2",
  },
};

export const imtiazPropertiesData = {
  sectionTitle: "IMTIAZ PROPERTIES",

  properties: [
    {
      id: 1,
      title: "LE BLANC BY IMTIAZ",
      image: "/images/home/imtiaz-properties/p1.jpg",
      link: "/properties/le-blanc",
      logo: "/images/home/imtiaz-properties/p1_logo.svg",
    },
    {
      id: 2,
      title: "SUNSET BAY GRAND BY IMTIAZ",
      image: "/images/home/imtiaz-properties/p2.jpg",
      link: "/properties/sunset-bay-grand",
      logo: "/images/home/imtiaz-properties/p1_logo.svg",
    },
    {
      id: 3,
      title: "WYNWOOD HORIZON BY IMTIAZ",
      image: "/images/home/imtiaz-properties/p3.jpg",
      link: "/properties/wynwood-horizon",
      logo: "/images/home/imtiaz-properties/p1_logo.svg",
    },
    {
      id: 4,
      title: "SUNSET BAY 5 BY IMTIAZ",
      image: "/images/home/imtiaz-properties/p4.jpg",
      link: "/properties/sunset-bay-5",
      logo: "/images/home/imtiaz-properties/p1_logo.svg",
    },
    {
      id: 5,
      title: "LE BLANC BY IMTIAZ",
      image: "/images/home/imtiaz-properties/p1.jpg",
      link: "/properties/le-blanc",
      logo: "/images/home/imtiaz-properties/p1_logo.svg",
    },
    {
      id: 6,
      title: "SUNSET BAY GRAND BY IMTIAZ",
      image: "/images/home/imtiaz-properties/p2.jpg",
      link: "/properties/sunset-bay-grand",
      logo: "/images/home/imtiaz-properties/p1_logo.svg",
    },
    {
      id: 7,
      title: "WYNWOOD HORIZON BY IMTIAZ",
      image: "/images/home/imtiaz-properties/p3.jpg",
      link: "/properties/wynwood-horizon",
      logo: "/images/home/imtiaz-properties/p1_logo.svg",
    },
    {
      id: 8,
      title: "SUNSET BAY 5 BY IMTIAZ",
      image: "/images/home/imtiaz-properties/p4.jpg",
      link: "/properties/sunset-bay-5",
      logo: "/images/home/imtiaz-properties/p1_logo.svg",
    },
  ],
};

export const pressSpotlightData = {
  sectionTitle: "Press Spotlight",
  items: [
    {
      id: 1,
      date: "15-10-2025",
      title: "THE IMTIAZ GROWTH STORY: REDEFINING LUXURY, ELEVATING DUBAI",
      image: "/images/home/PressSpotlight/ps1.jpg",
      link: "/#",
    },
    {
      id: 2,
      date: "02-12-2025",
      title:
        "IMTIAZ and Zaha Hadid Architects Set the Stage for Dubai’s Next Ultra-Luxury Landmark",
      image: "/images/home/PressSpotlight/1.jpg",
      link: "/#",
    },
    {
      id: 3,
      date: "01-01-2026",
      title:
        "Imtiaz Developments hands over Pearl House II in JVC three months early, reinforcing record delivery pace across Dubai",
      image: "/images/home/PressSpotlight/2a.jpg",
      link: "/#",
    },
  ],
};

export const appSectionData = {
  heading: "YOUR ALL-IN-ONE APP FOR EVERY PROPERTY NEED",
  subtitle:
    "The Imtiaz App empowers homeowners and tenants to manage their property anytime, anywhere—from their phone.",
  mobileImage: "/images/home/app/Imtiaz_Mobile_APP.png",

  leftCircles: [
    { title: "CONSTRUCTION UPDATES", icon: "/images/home/app/icons/1.svg" },
    { title: "OWNERSHIP UPDATES", icon: "/images/home/app/icons/2.svg" },
    { title: "ACCESS CARD REQUESTS", icon: "/images/home/app/icons/3.svg" },
  ],

  rightCircles: [
    {
      title: "PROPERTY-RELATED TRANSFERS",
      icon: "/images/home/app/icons/6.svg",
    },
    { title: "MOVE IN/OUT REQUESTS", icon: "/images/home/app/icons/5.svg" },
    { title: "ACCESS CARD REQUESTS", icon: "/images/home/app/icons/6.svg" },
  ],

  download: {
    text: "DOWNLOAD IMTIAZ APP",
    googlePlay: "/images/home/app/playstoreV2.svg",
    appStore: "/images/home/app/appleV2.svg",
  },
};

export const communityYardData = [
  {
    id: "s1",
    title: "A COASTAL PARADISE",
    subtitle:
      "Dubai Islands offers 20 km of coastline and a unique metropolitan lifestyle surrounded by nature—set to become the region's top entertainment, dining, and leisure hub.",
    features: [
      {
        id: "f1",
        title: "ISLAND LIFE",
        bgImage: "/images/home/community/ÔüáIsland_Life.jpg",
        link: "/features/island-life",
      },
      {
        id: "f2",
        title: "MOST SOUGHT-OUT COMMUNITY",
        bgImage: "/images/home/community/ÔüáMost_Sought-After-Community.jpg",
        link: "/features/sought-out",
      },
      {
        id: "f3",
        title: "MARINA-SIDE BLISS",
        bgImage: "/images/home/community/ÔüáMarina-Side Bliss.jpg",
        link: "/features/marina",
      },
      {
        id: "f4",
        title: "HUB FOR HIGH-END SHOPPING",
        bgImage: "/images/home/community/Hub_for_High-End_Shopping.jpg",
        link: "/features/shopping",
      },
    ],
  },
  {
    id: "s2",
    title: "WATERFRONT LUXURY LIVING",
    subtitle:
      "Experience serene waterfront views blended with modern architecture — the perfect balance of elegance, comfort, and premium living by the sea.",
    features: [
      {
        id: "f1",
        title: "BEACHFRONT RETREATS",
        bgImage: "/images/home/community/1.jpg",
        link: "/features/beachfront-retreats",
      },
      {
        id: "f2",
        title: "VIBRANT LIFESTYLE DESTINATIONS",
        bgImage: "/images/home/community/f2.jpg",
        link: "/features/lifestyle",
      },
      {
        id: "f3",
        title: "ICONIC SKYLINE VIEWS",
        bgImage: "/images/home/community/1.jpg",
        link: "/features/skyline-views",
      },
      {
        id: "f4",
        title: "FINE DINING & NIGHTLIFE",
        bgImage: "/images/home/community/f2.jpg",
        link: "/features/dining",
      },
    ],
  },
];
