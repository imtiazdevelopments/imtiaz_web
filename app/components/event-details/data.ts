export interface EventDetailData {
  meta_title: string;
  meta_description: string | null;
  page_banner_title: string;
  post_date: string | null;
  page_banner_desktop: string;
  page_banner_mobile: string;
  description: string;
  event_location: string | null;
  related_events: any[] | null;
}

export interface EventDetailResponse {
  status: string;
  language: string;
  code: number;
  message: string;
  data: EventDetailData;
}

export interface EventDetail {
  id: number;
  title: string;
  date: string;
  location: string;
  heroImage: string;
  content: string;
  signatureImages: string[];
}

export const eventDetails: EventDetail[] = [
  {
    id: 1,
    title: "Imtiaz Hands Over Hyde Walk in Jumeirah Garden City",
    date: "2025-05-13",
    location: "21 Beach, Sakhbab",
    heroImage: "/images/events/event-detail.jpg",
    content: `<p>While the benefits of buying property in Dubai are compelling, it's equally important to understand the challenges that come with investing in a fast-moving market:</p>
<p>Sea Cliff by Imtiaz was unveiled at 21 Beach, Sakhbab, amidst a select crowd on an afternoon filled with vibrant music, exquisite cuisine, and engaging presentations.</p>
<p>Designed for a dynamic waterfront lifestyle, this exclusive launch offered guests an immersive experience of the project inspired by the rhythm and serenity of the sea. Attendees explored the intricate details of the project and discovered the exciting opportunities that Sea Cliff promises to deliver.</p>`,
    signatureImages: [
      "/images/events/signature/1.jpg",
      "/images/events/event-detail.jpg",
      "/images/events/5.jpg",
    ],
  },
];
