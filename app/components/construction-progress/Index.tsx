import EventHero from "./sections/EventHero";
import ConstructionProgress from "./sections/ConstructionProgress";

const Index = ({data}:{data:any}) => {

const transformedData = Object.entries(data?.gallery || {})
  .sort(([a], [b]) => Number(b) - Number(a)) // newest year first
  .map(([year, months]) => ({
    year,
    months: Object.entries(months as Record<string, any[]>).map(
      ([month, images]) => ({
        month,
        date: `${month.toUpperCase()} ${year}`,
        location: data.page_banner_title,
        images: images.map((img) => ({
          src: img.image_url,
          alt: img.caption || `${month} ${year}`,
        })),
      })
    ),
  }));

  return (
    <>
      <EventHero title={data?.page_banner_title}/>
      <ConstructionProgress data={transformedData}/>
    </>
  );
};

export default Index;
