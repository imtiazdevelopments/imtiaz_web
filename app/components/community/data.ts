export const bannerData = {
    image: "/images/community/banner.jpg",
    title: "Communities",
    description: "Across Dubai, the UAE, and beyond, our properties define unique experiences within the extraordinary communities they are part of."
}

export interface CommunityTag {
  label: string;
}

export interface CommunityCard {
  id: number;
  title: string;
  image: string;
  tags: CommunityTag[];
  href: string;
}

export const communitySectionData = {
  title: "LIVING SPACES THAT SHAPE\nEXPERIENCES",
  description:
    "Each community we create is thoughtfully shaped to reflect its surroundings, culture, and lifestyle. From Dubai to the wider UAE and beyond, our developments foster connection, comfort.",
  cards: [
    {
      id: 1,
      title: "DUBAI ISLANDS",
      image: "/images/community/1.jpg",
      tags: [
        { label: "Sought After" },
        { label: "Souk Al Marsa" },
        { label: "10 Mins to Sheikh Zayed Rd" },
      ],
      href: "/communities/dubai-islands",
    },
    {
      id: 2,
      title: "DUBAI LAND RESIDENCE COMPLEX",
      image: "/images/community/2.jpg",
      tags: [
        { label: "Green Parks" },
        { label: "Cycling Track" },
        { label: "10 Mins to D26" },
      ],
      href: "/communities/dubai-land",
    },
    {
      id: 3,
      title: "AL FURJAN",
      image: "/images/community/3.jpg",
      tags: [
        { label: "Green Parks" },
        { label: "Cycling Track" },
        { label: "10 Mins to D26" },
      ],
      href: "/communities/al-furjan",
    },
    {
      id: 4,
      title: "JUMEIRAH GARDEN CITY",
      image: "/images/community/4.jpg",
      tags: [
        { label: "Built Sustainably" },
        { label: "Near Oud bin Khar" },
        { label: "Well Connected" },
      ],
      href: "/communities/jumeirah-garden-city",
    },
    {
      id: 5,
      title: "JVC",
      image: "/images/community/5.jpg",
      tags: [
        { label: "Local Childcare" },
        { label: "Circle Mall" },
        { label: "Sheikh Zayed Rd" },
      ],
      href: "/communities/jvc",
    },
  ] as CommunityCard[],
};