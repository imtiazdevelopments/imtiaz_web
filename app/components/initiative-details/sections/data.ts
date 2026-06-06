export interface BlogListingItem {
  slug: string;
  title: string;
  description: string | null;
  featured_image_desktop: string;
  featured_image_mobile: string;
  featured_image_alt: string;
  post_date: string;
  topic_name: string;
  category_name: string;
}

export interface BlogDetailData {
  meta_title: string;
  meta_description: string | null;
  page_banner_title: string;
  post_date: string | null;
  page_banner_desktop: string;
  page_banner_mobile: string;
  description: string;
  related_blogs: BlogListingItem[] | null;
}

export interface BlogDetailResponse {
  status: string;
  language: string;
  code: number;
  message: string;
  data: BlogDetailData;
}

import { BlogCategory } from "../../blogs/data";

export interface BlogDetail {
  id: number;
  title: string;
  category: BlogCategory;
  date: string;
  readingTime: string;
  slug: string;
  heroImage: string;
  content: string;
}

export const details = [
  {
    id: 1,
    title:
      "Imtiaz Developments to Plant 10,000 Flame Trees across its projects in several residential areas in Collaboration with Dubai Municipality",
    content: `<p>In collaboration with Dubai Municipality, the initiative supports Dubai's green vision and the citywide flame tree campaign launched under the directives of HH Sheikh Hamdan bin Mohammed bin Rashid Al Maktoum.</p>
    <p><br></p>
<p>Dubai, UAE - In alignment with Dubai’s growing urban greening movement and as part of supporting strategic partnerships with the private sector, alongside the recent citywide flame tree initiative launched under the directives of HH Sheikh Hamdan bin Mohammed bin Rashid Al Maktoum, Crown Prince of Dubai, Deputy Prime Minister and Minister of Defence, and Chairman of The Executive Council of Dubai, Imtiaz Developments has announced a sustainability initiative to plant 10,000 flame trees within its projects across several areas, in collaboration with Dubai Municipality.</p>
<p><br></p>
<p>The initiative will focus on various residential areas across Dubai where the company is developing its residential projects, in line with the Dubai 2040 Urban Master Plan. Through the planting of 10,000 flame trees across the emirate, Imtiaz Developments will contribute to enhancing Dubai’s urban landscape and building more sustainable residential environments.</p>
<p><br></p>
<p>The initiative aims to support Dubai’s vision of creating greener, more liveable communities, while enhancing public spaces with the iconic Delonix regia, commonly known as the flame tree - renowned for its vibrant orange-red blossoms and wide, shade-giving canopy.</p>
<p><br></p>
<p>This announcement comes as part of a broader emirate-wide campaign led by Dubai Municipality to expand the presence of flame trees across streets, parks, residential neighbourhoods, and recreational areas.</p>
<p><br></p>
<p>Masih Imtiaz, CEO of Imtiaz Developments, commented: “Urban development today goes beyond construction,” he said. “As cities evolve, the focus must shift toward sustainability and quality of life. This initiative is a step towards creating greener, more resilient communities across Dubai.”</p>
<p><br></p>
<p>The flame tree has become one of Dubai’s most recognizable seasonal features, blooming between May and July and transforming streetscapes with striking colour. The species is particularly suited to Dubai’s climate due to its drought tolerance, rapid growth, and ability to reduce surrounding ground temperatures through its expansive canopy.</p>
<p><br></p>
<p>As part of the initiative, Imtiaz Developments will plant flame trees that will contribute to long-term environmental sustainability and support Dubai’s efforts to expand green cover across residential communities.</p>
<p><br></p>
<p>According to recent figures, more than 50,000 flame trees have already been planted across Dubai as part of the emirate’s wider sustainability and urban beautification strategy.</p>
<p><br></p>
<p>Imtiaz Developments’ initiative to plant 10,000 trees will support key streets and community areas within its residential projects, helping increase green cover, improve pedestrian environments, and reduce urban heat.</p>
<p><br></p>
<p>This initiative further reinforces the developer’s commitment to integrating sustainability, wellness, and long-term environmental value into Dubai’s evolving urban landscape.</p>
<p><br></p>
`,
  },
];

export const images = [
  {
    signatureImages: [
      "/images/initiative-details/img-1.jpg",
      "/images/events/event-detail.jpg",
      "/images/events/5.jpg",
    ],
  },
];

export const relatedItems = [
  {
    id: 1,
    title: "SEA CLIFF OPEN HOUSE. AN EXCEPTIONAL EVENT. A REWARDING...",
    image: "/images/initiative-details/related-1.jpg",
    category: "News",
    date: "2024-08-02",
    slug: "imtiaz-delivers-hyde-walk-jumeirah-garden-city",
  },
  {
    id: 2,
    title: "IMTIAZ DEVELOPMENTS HOSTED THE IMTIAZ CHAMPIONS LEAGUE, AN...",
    image: "/images/initiative-details/related-2.jpg",
    category: "News",
    date: "2024-08-02",
    slug: "imtiaz-developments-launches-symphony",
  },
  {
    id: 3,
    title: "IMTIAZ Developments Launches The Symphony, a Dh1 Billion...",
    image: "/images/initiative-details/related-3.jpg",
    category: "News",
    date: "2024-08-02",
    slug: "imtiaz-growth-story-redefining-luxury",
  },
];
