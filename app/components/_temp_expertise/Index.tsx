import { bannerData } from "./data";
import InnerHeroBanner from "../common/InnerHeroBanner";
import ThinkingThatDelivers from "./sections/thinking-that-delivers";
import Faq from "./sections/Faqsection";
import EnquirySection from "./sections/Enquiry";


export default function Index() {
  return (
    <>
      <InnerHeroBanner {...bannerData} maxW="max-w-[805px]" />
      <ThinkingThatDelivers />
      <Faq />
      <EnquirySection />
    </>
  );
}
