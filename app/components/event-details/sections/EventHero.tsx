import Image from "next/image";
import Breadcrumb from "../../common/Breadcrumb";
import { EventDetail } from "../data";
import { GoCalendar } from "react-icons/go";
import { GoLocation } from "react-icons/go";

interface Props {
  event: EventDetail;
}

const EventHero = ({ event }: Props) => {
  const formattedDate = event.date.replace(/-/g, " - ");

  return (
    <section className="w-full pt-200" data-header="dark">
      <div className="container flex flex-col items-center container-spacing-details-page">
        {/* Breadcrumb */}
        <Breadcrumb variant="black" />

        {/* Title */}
        <h1 className="text-heading max-w-[50ch] text-foreground text-center uppercase mt-100">
          {event.title}
        </h1>

        {/* Image with overlay and meta bar */}
        <div className="w-full h-[300px] md:h-[500px] lg:h-[500px] 2xl:h-[560px] 3xl:h-[722px] mt-50 relative">
          <Image
            src={event.heroImage}
            alt={event.title}
            fill
            priority
            sizes="100vw"
          />

          {/* Gradient overlay */}
          <div
            className="hidden lg:block absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(0, 0, 0, 0) 75.44%, #000000 100%)",
            }}
          />

                    <div
            className="lg:hidden absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(0, 0, 0, 0) 60.44%, #000000 100%)",
            }}
          />

          {/* Meta bar */}
          <div className="absolute bottom-0 left-0 right-0 flex py-[10px] md:py-20 items-end justify-center bg-white/20 backdrop-blur-[30px]">
            <div className="flex items-center gap-x-50">
              {/* Date */}
              <div className="flex flex-col items-center gap-1 lg:gap-[6px]">
                <div className="flex items-center gap-[10px]">
                  <Image
                    src="/images/icons/date.svg"
                    alt="calendar"
                    width={26}
                    height={26}
                    className="h-[15px] w-auto mb-1"
                  />
                  <span className="text-white text-description leading-[1.54] uppercase">
                    Date
                  </span>
                </div>
                <span className="text-white/80 text-description leading-[1.54]">
                  {formattedDate}
                </span>
              </div>

              {/* Divider */}
              <div
                className="w-px h-[50px] lg:h-[72px]"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 50%, rgba(255, 255, 255, 0) 100%)",
                }}
              />

              {/* Location */}
              <div className="flex flex-col items-center gap-1 lg:gap-[6px]">
                <div className="flex items-center gap-[10px]">
                  <Image
                    src="/images/icons/map.svg"
                    alt="map"
                    width={26}
                    height={26}
                    className="h-[15px] w-auto mb-1"
                  />
                  <span className="text-white text-description leading-[1.54] uppercase">
                    Location
                  </span>
                </div>
                <span className="text-white/80 text-description leading-[1.54]">
                  {event.location}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventHero;
