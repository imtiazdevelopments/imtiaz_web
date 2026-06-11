export interface Property {
  slug: string;
  brand_logo: string;
  title: string;
  featured_image_desktop: string;
  featured_image_mobile: string;
  featured_image_alt: string;
  property_caption: string;
  property_location: string;
  property_latitude: string;
  property_longitude: string;
}

export interface ConstructionProgressData {
  meta_title: string;
  meta_description: string | null;
  page_banner_title: string;
  page_banner_caption: string;
  page_banner_desktop: string;
  page_banner_mobile: string;
  page_title: string;
  page_caption: string;
  listing: Property[];
}

export interface ConstructionProgressListingResponse {
  status: string;
  language: string;
  code: number;
  message: string;
  data: ConstructionProgressData;
}


export const bannerData = {
  image: "/images/construction-progress/bannerprogress.jpg",
  title: "construction progress",
  description: "Track the latest construction updates with real-time insights, milestone highlights, and transparent progress reports—all in one place.",
};
export const offPlanProperties = [
    {
        id: "1",
        image: "/images/property/1.jpg",
        hoverImage: "/images/community-listing/hoverimg.png",
        
        title: "WYNWOOD HORIZON BY IMTIAZ",
        subtitle: "Luxury Urban Living",
         
        href: "/projects/wynwood-horizon",
        startingFrom: "AED 3.5 M",
        units: "1BR - 3BR",
        date: "2024-08-02",
        propertyType: "Apartment",
        community: "Downtown",
        latitude: "25.1972",
        longitude: "55.2744",
    },
    {
        id: "2",
        image: "/images/property/2.jpg",
        hoverImage: "/images/community-listing/hoverimg.png",
        
        title: "SUNSET BAY 5 BY IMTIAZ",
        subtitle: "Waterfront Living In Dubai",
         
        href: "/projects/sunset-bay-5",
        startingFrom: "AED 3.5 M",
        units: "1BR - 2BR",
        date: "2024-08-01",
        propertyType: "Apartment",
        community: "Waterfront",
        latitude: "25.1955",
        longitude: "55.2760",
    },
    {
        id: "3",
        image: "/images/property/3.jpg",
        hoverImage: "/images/community-listing/hoverimg.png",
        
        title: "COVE BY IMTIAZ",
        subtitle: "Spacious Community Living",
         
        href: "/projects/cove-by-imtiaz",
        startingFrom: "AED 3.5 M",
        units: "1BR - 3BR",
        date: "2024-07-30",
        propertyType: "Villa",
        community: "Downtown",
        latitude: "25.1972",
        longitude: "55.2750",
    },
    {
        id: "4",
        image: "/images/property/4.jpg",
        hoverImage: "/images/community-listing/hoverimg.png",
         
        title: "PEARL HOUSE BY IMTIAZ",
        subtitle: "Family-Friendly Community",
         
        href: "/projects/pearl-house",
        startingFrom: "AED 2.8 M",
        units: "1BR - 4BR",
        date: "2024-07-28",
        propertyType: "Townhouse",
        community: "Downtown",
        latitude: "25.1960",
        longitude: "55.2730",
    },
    {
        id: "5",
        image: "/images/property/5.jpg",
        hoverImage: "/images/community-listing/hoverimg.png",
        
        title: "BEACH WALK GRAND 2 BY IMTIAZ",
        subtitle: "Waterfront Living In Dubai",
         
        href: "/projects/beach-walk-grand-2",
        startingFrom: "AED 4.0 M",
        units: "2BR - 4BR",
        date: "2024-07-25",
        propertyType: "Apartment",
        community: "Waterfront",
        latitude: "25.0800",
        longitude: "55.1400",
    },
    {
        id: "6",
        image: "/images/property/6.jpg",
        hoverImage: "/images/community-listing/hoverimg.png",
         
        title: "WYNWOOD HORIZON BY IMTIAZ",
        subtitle: "Luxury Urban Living",
         
        href: "/projects/wynwood-horizon-2",
        startingFrom: "AED 3.5 M",
        units: "1BR - 3BR",
        date: "2024-07-22",
        propertyType: "Apartment",
        community: "Downtown",
        latitude: "25.1850",
        longitude: "55.2600",
    },
    {
        id: "7",
        image: "/images/property/7.jpg",
        hoverImage: "/images/community-listing/hoverimg.png",
        
        title: "WYNWOOD HORIZON BY IMTIAZ",
        subtitle: "Luxury Urban Living",
         
        href: "/projects/wynwood-horizon-3",
        startingFrom: "AED 3.5 M",
        units: "1BR - 3BR",
        date: "2024-07-20",
        propertyType: "Apartment",
        community: "Downtown",
        latitude: "25.1124",
        longitude: "55.1386",
    },
    {
        id: "8",
        image: "/images/property/8.jpg",
        hoverImage: "/images/community-listing/hoverimg.png",
         
        title: "COVE EDITION BY IMTIAZ",
        subtitle: "Spacious Community Living",
         
        href: "/projects/cove-edition",
        startingFrom: "AED 3.5 M",
        units: "1BR - 3BR",
        date: "2024-07-18",
        propertyType: "Villa",
        community: "Downtown",
        latitude: "25.2048",
        longitude: "55.2708",
    },
    {
        id: "9",
        image: "/images/property/9.jpg",
        hoverImage: "/images/community-listing/hoverimg.png",
        
        title: "SUNSET BAY 4 BY IMTIAZ",
        subtitle: "Waterfront Living In Dubai",
         
        href: "/projects/sunset-bay-4",
        startingFrom: "AED 3.2 M",
        units: "1BR - 2BR",
        date: "2024-07-15",
        propertyType: "Apartment",
        community: "Waterfront",
        latitude: "25.2136",
        longitude: "55.2796",
    },
];