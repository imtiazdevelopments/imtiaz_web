import InnerHeroBanner from "../common/InnerHeroBanner";
import { bannerData } from "./data";
import BlogsSection from "./sections/BlogsSection";
import { Suspense } from "react";

const Index = () => {
  return (
    <div>
      <InnerHeroBanner {...bannerData} maxW="max-w-[580px]" />
      <Suspense fallback={<div>Loading...</div>}>
        <BlogsSection />
      </Suspense>
    </div>
  );
};

export default Index;
