import EventHero from "./sections/EventHero";
import { eventDetails } from "./data";
import EventContent from "./sections/EventContent";
import SignatureMomentsSlider from "./sections/SIgnatureMomentsSlider";
import OtherEvents from "./sections/OtherEvents";

const Index = () => {
  return (
    <>
      <EventHero event={eventDetails[0]} />
      <EventContent content={eventDetails[0].content} />
      <SignatureMomentsSlider images={eventDetails[0].signatureImages} />
      <OtherEvents />
    </>
  );
};

export default Index;
