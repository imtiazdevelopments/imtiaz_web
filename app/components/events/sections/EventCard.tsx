import Image from "next/image";
import Link from "next/link";
import { EventItem } from "../data";
import CustomOutlineButton from "../../common/CustomOutlineButton";

const EventCard = ({ item }: { item: EventItem }) => {

  return (
    <Link href={`/media-center/events/${item.slug}`} className="group block">
      <div className="relative w-full h-[400px] lg:h-[522px] overflow-hidden">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(182.34deg, rgba(0, 0, 0, 0) 29.48%, #000000 98.07%)" }}
        />
        <div className="absolute inset-0 flex flex-col justify-end items-center py-40 px-50">
          <h3 className="text-white uppercase text-25 font-[optima] tracking-[2%] leading-[1.4] mb-40 text-center line-clamp-2">
            {item.title}
          </h3>
          <CustomOutlineButton text="Read More" px="px-[26px] lg:px-[37px]" />
        </div>
      </div>
    </Link>
  );
};

export default EventCard;