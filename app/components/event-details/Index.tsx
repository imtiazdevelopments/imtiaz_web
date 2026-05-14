import EventHero from "./sections/EventHero";
import { EventDetailData, eventDetails } from "./data";
import EventContent from "./sections/EventContent";
import SignatureMomentsSlider from "./sections/SIgnatureMomentsSlider";
import OtherEvents from "./sections/OtherEvents";
import { EventListingData } from "../events/data";

const Index = ({data,allEventsData}:{data:EventDetailData,allEventsData:EventListingData}) => {
  return (
    <>
      <EventHero event={data} />
      <EventContent content={data.description} />
      <SignatureMomentsSlider images={eventDetails[0].signatureImages} />
      <OtherEvents data={allEventsData}/>
    </>
  );
};

export default Index;
