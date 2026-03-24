export const bannerData = {
    image: "/images/events/banner.jpg",
    title: "Events",
    description: "Browse upcoming events with key dates and details all in one place."
}

export type PressCategory = "News" | "Press Release" | "Event";
export type PressYear = "2026" | "2025" | "2024";
export type PressMonth =
  | "January" | "February" | "March" | "April"
  | "May" | "June" | "July" | "August"
  | "September" | "October" | "November" | "December";

export interface PressItem {
  id: number;
  title: string;
  image: string;
  category: PressCategory;
  date: string; // ISO: "2026-03-15"
  slug: string;
  tag?: string; // e.g. "UPCOMING SESSION"
  topic?: string;
}

export const pressItems: PressItem[] = [
  {
    id: 1,
    title: "Imtiaz Launches Sea Cliff, Adding One More Landmark to Its Growing Portfolio at Dubai Islands",
    image: "/images/events/1.jpg",
    category: "Press Release",
    date: "2026-03-20",
    slug: "imtiaz-launches-sea-cliff-dubai-islands",
  },
  {
    id: 2,
    title: "Imtiaz Developments Takes Center Stage as Platinum Partner at PropTech Connect 2026",
    image: "/images/events/2.jpg",
    category: "Event",
    date: "2026-03-18",
    slug: "imtiaz-platinum-partner-proptech-connect-2026",
    tag: "UPCOMING SESSION",
  },
  {
    id: 3,
    title: "A Magical Ground-Breaking of The Symphony by Imtiaz",
    image: "/images/events/3.jpg",
    category: "Event",
    date: "2026-03-10",
    slug: "ground-breaking-symphony-imtiaz",
  },
  {
    id: 4,
    title: "Aligning Vision, Focus, and Accountability: Imtiaz Developments' Strategy Meet 2026",
    image: "/images/events/4.jpg",
    category: "Event",
    date: "2026-03-05",
    slug: "imtiaz-strategy-meet-2026",
  },
  {
    id: 5,
    title: "Imtiaz Unveils The Symphony, A Landmark Designed by Zaha Hadid Architects",
    image: "/images/events/5.jpg",
    category: "News",
    date: "2026-02-28",
    slug: "imtiaz-unveils-symphony-zaha-hadid",
  },
  {
    id: 6,
    title: "Imtiaz Launches Sunset Bay Grand, an Upcoming Residence in Dubai Islands",
    image: "/images/events/6.jpg",
    category: "Press Release",
    date: "2026-02-20",
    slug: "imtiaz-launches-sunset-bay-grand-dubai-islands",
  },
];

export const pressYears: PressYear[] = ["2026", "2025", "2024"];
export const pressMonths: PressMonth[] = [
  "January", "February", "March", "April",
  "May", "June", "July", "August",
  "September", "October", "November", "December",
];
export const pressCategories: PressCategory[] = ["News", "Press Release", "Event"];