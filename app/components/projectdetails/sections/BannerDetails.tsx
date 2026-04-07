import Image from "next/image";

interface PropertyStatProps {
  label: string;
  value: string;
  icon: string;
  delay: string;
}

function PropertyStat({ label, value, icon, delay }: PropertyStatProps) {
  return (
    <div
      className="
        flex flex-col items-center gap-[10px]
        animate-fadeUp
      "
      style={{ animationDelay: delay, animationFillMode: "both" }}
    >
      {/* Label */}
      <span className="
        text-white/50    text-description uppercase 
      ">
        {label}
      </span>

      {/* Icon + Value */}
      <div className="flex items-center gap-2 lg:gap-5">
       <Image src={icon} alt={label} width={24} height={24} />
        <span className="
          text-white text-25 font-[optima] tracking-[2%] uppercase leading-[1.4]  whitespace-nowrap
        ">
          {value}
        </span>
      </div>
    </div>
  );
}

export default function BannerDetails() {
  const stats = [
    {
      label: "Location",
      value: "Dubai Island",
      icon: '/images/projects/mark1.svg',
      delay: "0ms",
    },
    {
      label: "Payment Plan",
      value: "Flexible Over 5 Years",
      icon: '/images/projects/mark2.svg',
      delay: "100ms",
    },
    {
      label: "Starting At",
      value: "$150,000",
      icon: '/images/projects/mark3.svg',
      delay: "200ms",
    },
    {
      label: "Delivery Date",
      value: "Delivery Date",
      icon: '/images/projects/mark4.svg',
      delay: "300ms",
    },
  ];

  return (
    <div className="
      w-full
      bg-white/10
      backdrop-blur-[15px]
      border-t border-white/10
      px-6 md:px-10 lg:px-16
      py-5 md:py-6 lg:py-7 2xl:pt-[49px] 2xl:pb-[46px]
    ">
      {/* Desktop & Tablet — single row */}
      <div className="
        hidden sm:grid
        grid-cols-2 md:grid-cols-4
        gap-y-6 gap-x-4
        
      ">
        {stats.map((stat) => (
          <div key={stat.label} className="flex justify-center">
            <PropertyStat {...stat} />
          </div>
        ))}
      </div>

      {/* Mobile — 2x2 grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-2 sm:hidden">
        {stats.map((stat) => (
          <div key={stat.label} className="flex justify-center">
            <PropertyStat {...stat} />
          </div>
        ))}
      </div>
    </div>
  );
}