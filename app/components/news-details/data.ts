export type NewsDetailResponse = {
  status: string;
  language: string;
  code: number;
  message: string;
  data: {
    meta_title: string;
    meta_description: string | null;
    page_banner_title: string;
    post_date: string | null;
    page_banner_desktop: string;
    page_banner_mobile: string;
    description: string;
    related_news: RelatedNews[] | null;
  };
};

export type RelatedNews = {
  slug: string;
  title: string;
  featured_image_desktop: string;
  featured_image_mobile: string;
  featured_image_alt: string;
  post_date: string;
  category_name: string;
};


export interface NewsDetail {
  title: string;
  date: string;
  readingTime: string;
  category: string;
  image: string;
  content: string; // HTML content
}

export const newsDetails: NewsDetail[] = [
  {
    title:
      "Imtiaz delivers fifth project of the year with the handover of Hyde Walk in Jumeirah Garden City",

    date: "02-06-2024",
    readingTime: "8 mins",
    category: "News",
    image: "/images/news/news-detail.jpg",

    content: `
      <p>Imtiaz Developments, the award-winning Dubai-based developer, has successfully completed the handover of Hyde Walk by Imtiaz in Jumeirah Garden City, marking its fifth project delivery of the year and reinforcing its reputation for consistent, on-time execution in Dubai’s highly competitive real estate market.</p>
      <p><br></p>
      <p>The handover of Hyde Walk follows the successful delivery of Westwood Grande I, Westwood Grande II, Pearl House I, and Pearl House II, reflecting a strong year of completions for the developer. Imtiaz Developments currently has over 40 active projects across development and sales portfolios exceeding AED 10 billion, spanning several of Dubai’s most strategic locations.</p>
      <p><br></p>
      <p>Located in the heart of Jumeirah Garden City, Hyde Walk by Imtiaz is a contemporary residential development offering well-designed studios and one-bedroom apartments. The project benefits from excellent connectivity and proximity to key landmarks including the Museum of the Future, Downtown Dubai, Burj Khalifa, Dubai Mall, and Jumeirah Beach, providing residents with a vibrant and well-connected urban lifestyle.</p>
      <p><br></p>
      <p><strong>Commenting on the milestone, Masih Imtiaz, CEO of Imtiaz Developments, said:</strong> “Delivering five projects within a single year is a significant achievement and a clear reflection of the strength of our execution, planning, and team commitment. Hyde Walk is another example of our focus on delivering quality homes on schedule while contributing meaningfully to Dubai’s evolving urban landscape.”</p>
      <p><br></p>
      <p>The latest handover comes shortly after Imtiaz Developments announced The Symphony, a landmark AED 1 billion mixed-use development in Meydan, designed in collaboration with Zaha Hadid Architects. The project marks the company’s strategic expansion into architecturally distinctive, large-scale developments and reinforces its ambition to create design-led destinations that set new benchmarks in the market.</p>
      <p><br></p>
      <p>With multiple project handovers scheduled for 2025, Imtiaz Developments continues to align timely delivery with Dubai’s long-term growth vision—strengthening investor confidence, enhancing end-user trust, and reinforcing its position as a reliable, execution-driven developer in the emirate.</p>
      <p><br></p>
      <p class="text-center"><a href="#" target="_blank" rel="nofollow noopener noreferrer"><strong>Source</a></strong> 
      </p>
    `,
  },
];