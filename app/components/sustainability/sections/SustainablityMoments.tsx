"use client";

import { useRef } from "react";
import Image from "next/image";
import { momentsOfSustainability } from "../data";

export default function SustainablityMoments() {
  const slides = momentsOfSustainability.slides;

  return (
    <section className="w-full py-160 overflow-hidden">
      {/* Header */}
      <div className="container text-center mb-60">
        <h2 className="text-heading font-[optima] uppercase text-foreground mb-20">
          {momentsOfSustainability.title}
        </h2>
        <p className="text-16 font-[avenirHeavy] text-foreground-light leading-[1.54] max-w-[798px] mx-auto">
          {momentsOfSustainability.description}
        </p>
      </div>

      {/* Infinite scroll track */}
      <div className="relative overflow-hidden">
        <div className="flex w-max marquee-track-sustainability">
          {/* Render slides twice — second set is the seamless loop */}
          {[...slides, ...slides].map((slide, idx) => (
            <div
              key={`${slide.id}-${idx}`}
              className="flex items-end h-[615px] gap-40 pr-40 flex-shrink-0"
            >
              {/* Col A — two stacked images, full height */}
              <div className="flex flex-col flex-shrink-0 gap-40 h-[615px]">
                {slide.cols[0].images.map((img) => (
                  <div
                    key={img.src}
                    className="relative flex-shrink-0 overflow-hidden"
                    style={{ width: `${img.width}px`, height: `${img.height}px` }}
                  >
                    <Image src={img.src} alt={img.alt} fill className="object-cover object-center pointer-events-none" />
                  </div>
                ))}
              </div>

              {/* Col B — center image aligned to bottom */}
              <div className="flex flex-col justify-end flex-shrink-0 h-[615px]">
                {slide.cols[1].images.map((img) => (
                  <div
                    key={img.src}
                    className="relative flex-shrink-0 overflow-hidden"
                    style={{ width: `${img.width}px`, height: `${img.height}px` }}
                  >
                    <Image src={img.src} alt={img.alt} fill className="object-cover object-center pointer-events-none" />
                  </div>
                ))}
              </div>

              {/* Col C — two stacked images, full height */}
              <div className="flex flex-col flex-shrink-0 gap-40 h-[615px]">
                {slide.cols[2].images.map((img) => (
                  <div
                    key={img.src}
                    className="relative flex-shrink-0 overflow-hidden"
                    style={{ width: `${img.width}px`, height: `${img.height}px` }}
                  >
                    <Image src={img.src} alt={img.alt} fill className="object-cover object-center pointer-events-none" />
                  </div>
                ))}
              </div>

              {/* Col D — peek image, vertically centered */}
              <div className="flex flex-col justify-center flex-shrink-0 h-[615px]">
                <div
                  className="relative overflow-hidden"
                  style={{ width: `${slide.peekImage.width}px`, height: `${slide.peekImage.height}px` }}
                >
                  <Image src={slide.peekImage.src} alt={slide.peekImage.alt} fill className="object-cover object-center pointer-events-none" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}