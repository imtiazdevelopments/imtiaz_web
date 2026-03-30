import Image from "next/image";
import Link from "next/link";
import { PressItem } from "../data";

const EventCard = ({ item }: { item: PressItem }) => {
  const formatted = new Date(item.date)
    .toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    })
    .replace(/\//g, "-");

  return (
    <Link href={`/media-center/news/${item.slug}`} className="group block">
      {/* Image + Category Bar */}
      <div className="relative w-full h-[250px] xl:h-[333px] overflow-hidden">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
        />

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(0, 0, 0, 0) 61.41%, #000000 100%)",
          }}
        />

        {/* Category & Date Bar — pinned to bottom of image */}
        <div className="absolute bottom-0 left-0 right-0 bg-white/30 backdrop-blur-[30px] py-[12px] flex items-center justify-center">
          <span className="text-white/80 font-[avenirHeavy] text-16 leading-[1.54]">
            {item.category} - {formatted}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="bg-[#EBEBEC] p-40 flex flex-col items-center gap-20">
        <h3 className="text-25 leading-[1.4] font-[optima] font-[400] text-foreground text-center uppercase line-clamp-2">
          {item.title}
        </h3>
        <span className="text-primary-2 font-[avenirHeavy] font-[800] leading-[100%] text-19 underline underline-offset-3">
          Read More
        </span>
      </div>
    </Link>
  );
};

export default EventCard;
