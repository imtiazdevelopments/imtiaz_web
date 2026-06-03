import { desc } from "framer-motion/client";
import { BlogCategory } from "../blogs/data";

export type CareerDetailsResponse = {
  status: string;
  language: string;
  code: number;
  message: string;
  data: {
    meta_title: string;
    meta_description: string | null;
    job_title: string;
    job_overview: string | null;
    job_location: string;
    job_caption: string;
    job_brief: string;
    job_responsibility: string | null;
    job_qualification: string | null;
    job_id: string;
    job_category: string;
    job_type: string;
    department: string;
    job_overview_title:string;
  };
};

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

export const jobDescription={
  title:"Design & Architecture",
  description:"The Junior Architect supports the design and development of architectural projects by assisting with drafting, planning, and coordinating tasks under the guidance of senior architects. This role involves working on various stages of projects, from conceptual design to construction documentation, and requires strong technical skills, creativity, and attention to detail."
}
export const jobSpecifications={
  title:"Job Specifications",
specs:[
  {
    key:"Job Title",
    value:"Design & Architecture"
  },
  {
    key:"Department",
    value:"Design"
  },
  {
    key:"Location",
    value:"Dubai"
  },
  {
    key:"Employment Type",
    value:"Full Time"
  },
]
}
export const aboutJob={
  title:"About Job",
  description:"<p>We are looking for passionate and detail-oriented professionals to join our Design & Architecture team. In this role, you will be responsible for shaping innovative, functional, and visually compelling spaces across our real estate developments. You will collaborate with cross-functional teams including engineering, construction, and project management to bring concepts to life—from initial sketches to final execution. This role requires a strong balance of creativity, technical expertise, and a deep understanding of modern design principles. As part of our team, you will contribute to high-end residential and commercial projects, ensuring that every design reflects quality, efficiency,</p><p>We are looking for passionate and detail-oriented professionals to join our Design & Architecture team. In this role, you will be responsible for shaping innovative, functional, and visually compelling spaces across our real estate developments. You will collaborate with cross-functional teams including engineering, construction, and project management to bring concepts to life—from initial sketches to final execution. This role requires a strong balance of creativity, technical expertise, and a deep understanding of modern design principles. As part of our team, you will contribute to high-end residential and commercial projects, ensuring that every design reflects quality, efficiency,</p>",
 title2:'Key Responsibilities',
  keyResponsibilities: [
    {
      id: 1,
      title: "Drafting and Design",
      tasks: [
        "Assist in creating architectural designs, plans, and drawings for various projects using CAD software and other design tools",
        "Develop detailed construction documents including floor plans, elevations, sections, and details",
        "Support senior architects in conceptualizing and visualizing design ideas"
      ]
    },
    {
      id: 2,
      title: "Project Coordination",
      tasks: [
        "Collaborate with project teams, including architects, engineers, and contractors, to ensure project goals and requirements are met",
        "Prepare and update project documentation, including specifications and schedules",
        "Assist in coordinating with clients and stakeholders to gather project requirements and feedback"
      ]
    },
    {
      id: 3,
      title: "Research and Analysis",
      tasks: [
        "Conduct research on building codes, zoning regulations, and other relevant standards to ensure compliance",
        "Analyse site conditions, existing structures, and other factors that may impact the design and development process"
      ]
    }
  ],
  title3:'Key Qualifications',
  qualifications:[ 
        "Bachelor’s degree in Architecture (B.Arch.) or a Master of Architecture (M.Arch.)",
  "Minimum 7 years of experience in architectural drafting, with a strong portfolio of completed projects.",
  "Proficiency in architectural design software (e.g., AutoCAD, BIM, Revit, SketchUp) and graphic design tools (e.g., Adobe Creative Suite).",
  "Strong understanding of architectural principles, building codes, and construction methods.",
  "Excellent drafting and design skills, with a keen eye for detail.",
  "Ability to manage multiple tasks and meet deadlines in a fast-paced environment.",
  "Immediate joiner is preferred"
  
   
  ]
 
}
export const blogDetails: BlogDetail[] = [
  {
    id: 1,
    title:
      "Imtiaz Delivers Fifth Project of the Year with the Handover of Hyde Walk in Jumeirah Garden City",
    category: "News",
    date: "03-10-2024",
    readingTime: "6 mins",
    slug: "imtiaz-delivers-hyde-walk-jumeirah-garden-city",
    heroImage: "/images/blogs/blog-detail-1.jpg",
    content: `<p>Dubai real estate market continues to thrive, attracting investors and homebuyers seeking high returns and exclusive living experiences. Offplan projects in Dubai remain a popular choice due to our competitive pricing, flexible payment plans, and significant appreciation potential. Whether you're looking for a smart investment or a dream home, exploring new offplan projects in Dubai is essential.</p>
    <p><br></p>
<p>In this guide, we'll highlight some of the most exciting upcoming projects, focusing on Imtiaz Developments, a trusted name in Dubai real estate, known for delivering excellence, innovation, and long-term value.</p>
<p><br></p>
<h2>Why Invest in Off-Plan Projects in Dubai?</h2>
<p>Before diving into the top listings, here's why offplan projects in Dubai are a lucrative opportunity.</p>
<h3>Competitive Pricing &amp; Capital Appreciation</h3>
<ul>
<li>Offplan projects in Dubai are priced lower than ready properties, allowing investors to enter the market affordably.</li>
<li>Property values tend to rise as construction progresses, leading to potential capital gains before handover.</li>
</ul>
<h3>Flexible Payment Plans</h3>
<ul>
<li>Developers offer attractive post-handover and installment-based payment structures, making real estate investment more accessible.</li>
</ul>
<h3>High ROI &amp; Rental Yields</h3>
<ul>
<li>Developers offer attractive post-handover and installment-based payment structures, making real estate investment more accessible.</li>
</ul>
<h3>Modern Amenities &amp; Smart Living</h3>
<ul>
<li>New developments integrate cutting-edge designs, smart home technology, and sustainable features for an enhanced lifestyle.</li>
</ul>
<p><br></p>
<h2><span class="underline underline-offset-4">Sunset Bay by Imtiaz</span> — The Ultimate Waterfront Experience</h2>
<ul>
<li>Location: Dubai Islands — Expected Completion: Q4 2026</li>
<li>Expected Completion: Q1 2027</li>
</ul>
<p><br></p>
<figure><img src="/images/blogs/blog-detail-2.jpg" alt="Sunset Bay by Imtiaz"></figure>
<p><br></p>
<p>Dubai's offplan property market continues to grow, offering endless opportunities for investors and homeowners. With a strong regulatory framework, high rental yields, and world-class infrastructure, Dubai remains one of the best cities globally to invest in real estate.</p>
<p><br></p>
<p>For those seeking premium offplan projects in Dubai, Imtiaz Developments stands as a beacon of trust, innovation, and excellence. Whether you're looking for a beachfront home, a vibrant urban apartment, or a high-growth investment, Imtiaz has the perfect project for you.</p>`,
  },
];
