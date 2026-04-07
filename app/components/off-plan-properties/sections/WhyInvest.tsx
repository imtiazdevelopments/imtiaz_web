"use client";

import { SectionHeading } from "../../animations/SectionHeading";
import { whyInvestData } from "../data";

export default function WhyInvest() {
  const { title, description } = whyInvestData;

  return (
    <section className="w-full bg-gray">
      <div className="container py-120 3xl:py-130">
        <div className="flex flex-col items-center text-center mx-auto">

          {/* Title */}
          <SectionHeading title={title} className="mb-20 text-center uppercase max-w-[30ch]" />

          {/* Description — rendered as HTML from rich text editor */}
          <div
            className="text-description text-foreground-light award-description max-w-[1237px]"
            dangerouslySetInnerHTML={{ __html: description }}
          />

        </div>
      </div>
    </section>
  );
}