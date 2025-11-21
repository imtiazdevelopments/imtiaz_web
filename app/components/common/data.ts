// footerData
export const footerData = {
  trendingSearches: [
    { name: "Properties for sale in Dubai", link: "#" },
    { name: "Apartments for sale in Dubai", link: "#" },
    { name: "Off plan apartments in Dubai", link: "#" },
    { name: "Penthouses for sale in Dubai", link: "#" },
    { name: "High ROI properties in Dubai", link: "#" },
    { name: "Investment properties in Dubai", link: "#" },
    { name: "Waterfront apartments in Dubai", link: "#" },
    { name: "Properties for sale in Dubai Island", link: "#" },
    { name: "Ready to move apartments in Dubai", link: "#" },
    { name: "Furnished apartments for sale in Dubai", link: "#" },
    { name: "1-bedroom apartments for sale in Dubai", link: "#" },
    { name: "2-bedroom apartments for sale in Dubai", link: "#" },
    { name: "3-bedroom apartments for sale in Dubai", link: "#" },
  ],

  aboutImtiaz: [
    { name: "About US", link: "#" },
    { name: "Leadership Team", link: "#" },
    { name: "Vison & Mission", link: "#" },
    { name: "Press Releases", link: "#" },
    { name: "Careers", link: "#" },
    { name: "Contact Us", link: "#" },
  ],

  popularAreas: [
    { name: "Apartments for sale in Meydan", link: "#" },
    { name: "Apartments for sale in Dubai Island", link: "#" },
    { name: "Apartments for sale in Dubai Land", link: "#" },
    { name: "Apartments for sale in JVC", link: "#" },
  ],

  helpSupport: [
    { name: "FAQ", link: "#" },
    { name: "Terms & Conditions", link: "#" },
    { name: "Privacy Policy", link: "#" },
    { name: "Cookie Policy", link: "#" },
  ],

  mediaCenter: [
    { name: "News & Press Releases", link: "#" },
    { name: "Blog", link: "#" },
    { name: "Events", link: "#" },
  ],

  socialMedia: [
    {
      name: "Facebook",
      icon: "/icons/facebook.svg",
      link: "https://facebook.com",
    },
    {
      name: "Instagram",
      icon: "/icons/instagram.svg",
      link: "https://instagram.com",
    },
    {
      name: "LinkedIn",
      icon: "/icons/linkedin.svg",
      link: "https://linkedin.com",
    },
    {
      name: "YouTube",
      icon: "/icons/youtube.svg",
      link: "https://youtube.com",
    },
  ],
  appLinks: {
    appStore: "https://apps.apple.com",
    playStore: "https://play.google.com",
  },
};

type FooterV2Column = {
  heading: string;
  items: string[];
};

type FooterV2Data = {
  top: {
    bgImage: string;
    logo: string;
    placeholderEmail: string;
    sendText: string;
  };
  columns: FooterV2Column[];
  bottom: {
    left: string[];
    center: string;
    icons: string[];
  };
};

// data.ts
export const footerV2Data: FooterV2Data = {
  top: {
    bgImage: "/images/footer-bg.jpg",
    logo: "/images/sample-logo.svg",
    placeholderEmail: "Enter your email address",
    sendText: "Send",
  },

  columns: [
    {
      heading: "COMMUNITIES",
      items: [
        "Dubai Islands",
        "Meydan Horizon Community",
        "JVC Community",
        "Al Furjan Community",
        "Jumeirah Garden City",
        "Dubai Land Residence Complex",
      ],
    },
    {
      heading: "NEW LAUNCHES",
      items: [
        "Cove Edition 6",
        "Wynwood",
        "Cove Edition 5",
        "Cove Grand",
        "Sunset Bay 4",
        "Beach Walk 4",
      ],
    },
    {
      heading: "COMING SOON",
      items: [
        "Le Blanc",
        "Sunset Bay Grand",
        "Wynwood Horizon",
        "Sunset Bay 5",
        "Pearl House 4",
        "Beach Walk Grand 2",
      ],
    },
    {
      heading: "WORLD OF IMTIAZ",
      items: ["About", "Leadership", "Vision Mission", "Careers", "Contact"],
    },
    {
      heading: "MEDIA CENTER",
      items: ["News & Press Releases", "Blogs", "Events"],
    },
  ],

  bottom: {
    left: ["Privacy Policy", "Terms & Conditions", "Cookie Policy"],
    center: "©2025 Imtiaz Development. All Rights Reserved",
    icons: [
      "/icons/instagram.svg",
      "/icons/facebook.svg",
      "/icons/linkedin.svg",
      "/icons/youtube.svg",
    ],
  },
};
