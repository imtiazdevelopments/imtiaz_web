import InnerHeroBanner from "../common/InnerHeroBanner";
import { bannerData, chairmanMessageData, ceoMessageData } from "./data";
import MessageSection from "./sections/MessageSection";
import VisionSection from "./sections/VisionSection";
import Philosophy from "./sections/Philosophy";
import HistorySection from "./sections/HistorySlider";
import AwardSection from "./sections/Award";
import Expertise from "./sections/Expertise";
import OtherPageSlider from "./sections/OtherPageSlider";

const Index = () => {
  return (
    <>
      <InnerHeroBanner {...bannerData} maxW="max-w-[904px]" />
      <VisionSection />
      <MessageSection data={chairmanMessageData} />
      <MessageSection data={ceoMessageData} />
      <Philosophy />
      <HistorySection />
      <AwardSection />
      <Expertise />
      <OtherPageSlider />
    </>
  );
};

export default Index;
