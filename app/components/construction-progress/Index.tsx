import EventHero from "./sections/EventHero";
import ConstructionProgress from "./sections/ConstructionProgress";

const Index = ({data}:{data:any}) => {
  console.log(data)

  const transformedData = Object.entries(data.gallery).map(
  ([year, monthsObj]) => ({
    year,
    months: Object.entries(monthsObj as Record<string, any[]>).map(
      ([monthName, images]) => ({
        month: monthName,
        date: `${monthName.toUpperCase()} ${year}`,
        location: data.page_banner_title,
        images: images.map((img) => ({
          src: img.image_url,
          alt: img.caption || `${monthName} ${year}`,
        })),
      })
    ),
  })
);

  return (
    <>
      <EventHero title={data?.page_banner_title}/>
      <ConstructionProgress data={transformedData}/>
    </>
  );
};

export default Index;
