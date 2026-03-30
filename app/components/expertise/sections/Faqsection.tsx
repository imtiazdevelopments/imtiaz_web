"use client";

import { useState } from "react";
import { faqData } from "../data";

export default function Faq() {
  const [openId, setOpenId] = useState<string | null>(faqData.items[0].id);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="w-full bg-[#EBEBEC] py-130" data-header="dark">
      <div className="container">
        {/* Header */}
        <div className="w-full flex flex-col items-center text-center mb-[10px]">
          <h1 className="text-heading mb-20 text-foreground">
            {faqData.title}
          </h1>
          <p className="text-16 font-[avenirHeavy] max-w-[407px] text-foreground-light">
            {faqData.subtitle}
          </p>
        </div>

        {/* Accordion */}
        <div className="max-w-[973px] mx-auto">
          {faqData.items.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div key={item.id}>
                {/* Question Row */}
                <button
                  onClick={() => toggle(item.id)}
                  className={`${isOpen ? "2xl:pb-[20px]" : ""} w-full flex items-start justify-between py-40 text-left group focus:outline-none`}
                  aria-expanded={isOpen}
                >
                  <span className="text-25 uppercase text-foreground pr-2 leading-[1.4] font-[optima] font-[400]">
                    {item.question}
                  </span>
                  {/* +/- icon */}
                  <span className="flex-shrink-0 mt-0.5 text-primary-2 text-[30px]   leading-none select-none transition-transform duration-300">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                {/* Answer — animated with max-height */}
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    isOpen ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-description text-foreground-light max-w-[846px] pb-30">
                    {item.answer}
                  </p>
                </div>

                {/* Divider */}
                <div className={`${isOpen ? "bg-primary-2" : "bg-black/10"} h-px w-full`} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
