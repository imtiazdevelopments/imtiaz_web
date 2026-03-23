"use client";

import { useState } from "react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
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
];

const faqMeta = {
  title: "FAQ",
  subtitle:
    "Lorem Ipsum is simply dummy text of the printing and\ntypesetting industry. Lorem Ipsum has",
};

export default function Faq() {
  const [openId, setOpenId] = useState<string | null>(faqData[0].id);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="w-full bg-[#E8E6E1] spacing-y-130">
     <div className="container">
       {/* Header */}
      <div className="text-center mb-2   2xl:mb-[10px]">
        <h1 className="font-[optima]  heading-50 text-[#1a1a1a] mb-5">
          {faqMeta.title}
        </h1>
        <p className="text-16 text-[#404040] leading-[1.6] max-[52ch] mx-auto  font-[800]  ">
          {faqMeta.subtitle}
        </p>
      </div>

      {/* Accordion */}
      <div className="max-w-[973px] mx-auto">
        {faqData.map((item) => {
          const isOpen = openId === item.id;
          return (
            <div key={item.id}>
              {/* Question Row */}
              <button
                onClick={() => toggle(item.id)}
                className={`${isOpen ? '2xl:pb-[20px]' : ''} w-full flex items-start justify-between py-5 xl:py-7 2xl:py-[40px] text-left group focus:outline-none`}
                aria-expanded={isOpen}
              >
                <span className="text-[20px] 2xl:text-[25px] uppercase text-[#1a1a1a] pr-8 leading-[1.4]">
                  {item.question}
                </span>
                {/* +/- icon */}
                <span className="flex-shrink-0 mt-0.5 text-[#6B1212] text-[19px]   leading-none select-none transition-transform duration-300">
                  {isOpen ? "−" : "+"}
                </span>
              </button>

              {/* Answer — animated with max-height */}
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  isOpen ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className=" text-[#404040] text-[16px] font-[800] leading-[1.5]   pb-5 xl:pb-[30px] pr-12">
                  {item.answer}
                </p>
              </div>

              {/* Divider */}
              <div className="w-full h-px bg-[#6B1212]/30" />
            </div>
          );
        })}
      </div>
     </div>
    </section>
  );
}
