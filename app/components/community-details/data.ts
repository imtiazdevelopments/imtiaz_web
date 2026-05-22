export interface CommunityPageResponse {
  status: string;
  language: string;
  code: number;
  message: string;
  data: CommunityPageData;
}

export interface CommunityPageData {
  meta_title: string;
  meta_description: string | null;

  page_banner_title: string;
  page_banner_desktop: string;
  page_banner_mobile: string;

  basic_title: string;
  basic_caption: string;
  basic_brief: string;

  reach_title: string;
  reach_caption: string;

  doorstep_title: string;
  doorstep_caption: string;

  properties_title: string;

  map: string | null;

  other_communities_title: string;

  faq_title: string;
  faq_caption: string;

  show_basic_section: "true" | "false";
  show_reach_section: "true" | "false";
  show_nearby_section: "true" | "false";
  show_properties_section: "true" | "false";
  show_other_communities_section: "true" | "false";
  show_faq_section: "true" | "false";

  reach: ReachItem[];
  gallery: GalleryItem[];
  near_by: NearbyItem[];
  related_property: RelatedProperty[];
  other_cummunities: OtherCommunity[];
  faq: FAQItem[];
  geofence_coordinates:{
    latitude:string;
    longitude:string;
  }[]
}

export interface ReachItem {
  title: string;
  caption: string;
  icon_url: string;
}

export interface GalleryItem {
  caption: string;
  image_url: string;
}

export interface NearbyItem {
  title: string;
  icon_url: string;
}

export interface RelatedProperty {
  slug: string;

  brand_logo: string;

  featured_image_desktop: string;
  featured_image_mobile: string;
  featured_image_alt: string;

  icon1_url: string;
  icon1_text: string;

  icon2_url: string;
  icon2_text: string;

  property_name: string;
  property_caption: string;
  property_status: string;
  property_latitude: string;
  property_longitude: string;
}

export interface OtherCommunity {
  slug: string;
  title: string | null;

  featured_image_desktop: string;
  featured_image_mobile: string;
  featured_image_alt: string;
}

export interface FAQItem {
  title: string;
  caption: string;
}


export const bannerData = {
  image: "/images/community-listing/community-listing-banner.jpg",
  title: "Dubai Land Residence Complex",
};

export const communitySectionData = {
  title: "Dubai Land Residence Complex",
  subtitle: "Spacious Community Living",
  description:
    "Dubai Land spans over 3 million sq. ft., comprising diverse districts such as Al Habtoor Polo Resort & Club, Dubailand Oasis, Layan, Majan, Falcon City of Wonders, Living Legends,\nVillanova, Rukan, Tiger Woods, and Al Waha.",
};
export const EverythingWithinData = {
  title: "Everything Within Reach",
  description:
    "Experience island life, moments from the city’s most convenient connections and amenities.",
  cards: [
    {
      id: 1,
      icon: "/images/community-listing/icon1.svg",
      iconWidth: 32,
      iconHeight: 32,
      label: "DUBAI INTERNATIONAL<br>AIRPORT",
      minutes: "20 Minutes",
    },
    {
      id: 2,
      icon: "/images/community-listing/icon2.svg",
      iconWidth: 32,
      iconHeight: 32,
      label: "GOLD SOUQ METRO<br>STATION",
      minutes: "10 Minutes",
    },
    {
      id: 3,
      icon: "/images/community-listing/icon3.svg",
      iconWidth: 34,
      iconHeight: 32,
      label: "DOWNTOWN<br>DUBAI",
      minutes: "24 Minutes",
    },
    {
      id: 4,
      icon: "/images/community-listing/icon4.svg",
      iconWidth: 38,
      iconHeight: 32,
      label: "BUSINESS<br>BAY",
      minutes: "13 Minutes",
    },
  ],
};

export const eventDetails = [
  {
    signatureImages: [
      "/images/community-listing/com-slider-1.jpg",
      "/images/events/event-detail.jpg",
      "/images/events/5.jpg",
    ],
  },
];

export const amenitiesData = {
  title: "On your doorstep",
  description:
    "Affordable homes, great connectivity, a family-friendly setting, and strong investment potential make it a smart place to live.",

  amenities: [
    // Row 1
    {
      label: "COMMUNITY\nCENTRE",
      icon: "/images/community-listing/amenities1.svg",
    },
    {
      label: "GREEN\nSPACES",
      icon: "/images/community-listing/amenities2.svg",
    },
    {
      label: "RETAIL\nOUTLETS",
      icon: "/images/community-listing/amenities3.svg",
    },
    { label: "SCHOOLS", icon: "/images/community-listing/amenities4.svg" },
    // Row 2
    {
      label: "COMMUNITY\nCENTRE",
      icon: "/images/community-listing/amenities5.svg",
    },
    {
      label: "CULTURAL\nDIVERSITY",
      icon: "/images/community-listing/amenities6.svg",
    },
    {
      label: "TRANSPORTATION\nACCESS",
      icon: "/images/community-listing/amenities7.svg",
    },
    {
      label: "SAFETY AND\nSECURITY",
      icon: "/images/community-listing/amenities8.svg",
    },
    // Row 3
    { label: "METRO\nLINE", icon: "/images/community-listing/amenities9.svg" },
    {
      label: "10 MIN SHEIKH\nZAYED ROAD",
      icon: "/images/community-listing/amenities10.svg",
    },
    {
      label: "NEAR EXPO\n2020",
      icon: "/images/community-listing/amenities11.svg",
    },
  ],
};
// export const LandpropertyData = {
//   title: "Dubai land Properties",
//      cards: [
//         {
//           id: 1,
//           icon: '/images/community-listing/icon1.svg',
//           label: "DUBAI INTERNATIONAL<br>AIRPORT",
//           minutes: "20 Minutes",
//         },
//         {
//           id: 2,
//           icon: '/images/community-listing/icon2.svg',
//           label: "GOLD SOUQ METRO<br>STATION",
//           minutes: "10 Minutes",

//         },
//         {
//           id: 3,
//          icon: '/images/community-listing/icon3.svg',
//           label: "DOWNTOWN<br>DUBAI",
//           minutes: "24 Minutes",

//         },
//         {
//           id: 4,
//           icon: '/images/community-listing/icon4.svg',
//           label: "BUSINESS<br>BAY",
//           minutes: "13 Minutes",

//         },
//       ] ,

// };

export const LandpropertyData = {
  title: "Dubai land Properties",
  cards: [
    {
      id: "1",
      image: "/images/community-listing/card1.jpg",
      hoverImage: "/images/community-listing/hoverimg.png",
      status: "Completed",
      location: "Down Town Dubai, UAE",
      title: "COVE by Imtiaz",
      subtitle: "Spacious Community Living",
      href: "/projects/cove-by-imtiaz",
      startingFrom: "AED 3.5 M",
      units: "1BR - 3BR",
    },
    {
      id: "2",
      image: "/images/community-listing/card2.jpg",
      hoverImage: "/images/community-listing/hoverimg.png",
      status: "Ongoing",
      location: "Dubai Marina, UAE",
      title: "AZURE RESIDENCES by Imtiaz",
      subtitle: "Waterfront Luxury Living",
      href: "/projects/azure-residences",
      startingFrom: "AED 3.5 M",
      units: "1BR - 3BR",
    },
    {
      id: "3",
      image: "/images/community-listing/card3.jpg",
      hoverImage: "/images/community-listing/hoverimg.png",
      status: "Upcoming",
      location: "Business Bay, UAE",
      title: "Cove Edition I by Imtiaz",
      subtitle: "Urban Living Redefined",
      href: "/projects/skyline-tower",
      startingFrom: "AED 3.5 M",
      units: "1BR - 3BR",
    },
    {
      id: "4",
      image: "/images/community-listing/card4.jpg",
      hoverImage: "/images/community-listing/hoverimg.png",
      status: "Completed",
      location: "Palm Jumeirah, UAE",
      title: "Cove Edition 2 by Imtiaz",
      subtitle: "Exclusive Island Retreat",
      href: "/projects/palm-villas", 
      startingFrom: "AED 3.5 M",
      units: "1BR - 3BR",
    },
    {
      id: "5",
      image: "/images/community-listing/card5.jpg",
      hoverImage: "/images/community-listing/hoverimg.png",
      status: "Completed",
      location: "Palm Jumeirah, UAE",
      title: "Cove Edition III by Imtiaz",
      subtitle: "Exclusive Island Retreat",
      href: "/projects/palm-villas", 
      startingFrom: "AED 3.5 M",
      units: "1BR - 3BR",
    },
    {
      id: "6",
      image: "/images/community-listing/card6.jpg",
      hoverImage: "/images/community-listing/hoverimg.png",
      status: "Upcoming",
      location: "DIFC, UAE",
      title: "Cove Edition 4 by Imtiaz",
      subtitle: "Premium City Residences",
      href: "/projects/district-one",
      startingFrom: "AED 3.5 M",
      units: "1BR - 3BR",
    },
    {
      id: "7",
      image: "/images/community-listing/card7.jpg",
      hoverImage: "/images/community-listing/hoverimg.png",
      status: "Upcoming",
      location: "DIFC, UAE",
      title: "Cove Boulevard by Imtiaz",
      subtitle: "Premium City Residences",
      href: "/projects/district-one",
      startingFrom: "AED 3.5 M",
      units: "1BR - 3BR",
    },
    {
      id: "8",
      image: "/images/community-listing/card8.jpg",
      hoverImage: "/images/community-listing/hoverimg.png",
      status: "Upcoming",
      location: "DIFC, UAE",
      title: "Cove Edition 5 by Imtiaz",
      subtitle: "Premium City Residences",
      href: "/projects/district-one",
      startingFrom: "AED 3.5 M",
      units: "1BR - 3BR",
    },
    {
      id: "9",
      image: "/images/community-listing/card9.jpg",
      hoverImage: "/images/community-listing/hoverimg.png",
      status: "Upcoming",
      location: "DIFC, UAE",
      title: "Le Blanc by Imtiaz",
      subtitle: "Premium City Residences",
      href: "/projects/district-one",
      startingFrom: "AED 3.5 M",
      units: "1BR - 3BR",
    },
  ],
};

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
