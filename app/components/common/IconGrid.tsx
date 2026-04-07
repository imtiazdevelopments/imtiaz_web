 "use client";

import Image from "next/image";

// ── Types ──────────────────────────────────────────────
type EverythingWithinData = {
  title: string;
  description: string;
  cards: {
    id: number;
    icon: string;
    label: string;
    minutes: string;
  }[];
};

type Props = {
  data: EverythingWithinData;
  bgClass?: string;
};

// ── Component ──────────────────────────────────────────
export default function IconGrid({ data,bgClass }: Props) {
  return (
    <section className={`w-full py-120 3xl:py-130 ${bgClass ? bgClass : ''}`}>
      <div className="container flex flex-col justify-center">

        {/* Header */}
        <div className="text-center">
          <h2 className="text-heading leading-[1.4] mb-20">
            {data.title}
          </h2>

          <p className="text-description text-foreground-light max-w-[43ch] mx-auto">
            {data.description}
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 mt-5 2xl:mt-[60px]">
          {data.cards.map((loc, i) => (
            <div
              key={loc.id} // ✅ FIX (use id, not index)
              className="relative flex flex-col items-center justify-start gap-[15px] px-4 sm:px-8 py-5 text-center"
            >
              {/* Desktop divider */}
              {i !== 0 && (
                <div
                  className="absolute left-0 top-0 w-px h-full hidden lg:block"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(73,9,5,0) 0%, #490905 50%, rgba(73,9,5,0) 100%)",
                  }}
                />
              )}

              {/* Mobile divider */}
              {(i === 1 || i === 3) && (
                <div
                  className="absolute left-0 top-0 w-px h-full block lg:hidden"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(73,9,5,0) 0%, #490905 50%, rgba(73,9,5,0) 100%)",
                  }}
                />
              )}

              {/* Icon */}
              <div className="w-[80px] h-[80px] rounded-full flex items-center justify-center bg-[#4909050D]">
                <Image
                  src={loc.icon}
                  alt={loc.label}
                  width={32}
                  height={32}
                />
              </div>

              {/* Label */}
              <p
                className="text-foreground font-[optima] text-25 leading-[1.4] uppercase"
                dangerouslySetInnerHTML={{ __html: loc.label }}
              />

              {/* Minutes */}
              <p className="text-description text-foreground-light">
                {loc.minutes}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}