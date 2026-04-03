"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "../../contexts/LenisContext";
import ProSliderComingSoonV3 from "../../components/Home/sections/ProSliderComingSoonV3";
import ProSliderV3 from "../../components/Home/sections/ProsliderV3";
import ImtiazProperties from "../../components/Home/sections/ImtiazPropsSlider";
import ConstructionProgress2 from "../../components/Home/sections/ConstructionProgress2";
import AppSectionV2 from "../../components/Home/sections/AppSection";
import CommunityNamesSlider from "../../components/Home/sections/CommunityNamesSlider";
import AboutJourneyV3 from "../../components/Home/sections/AboutJourneyV3";
import SpotlightSlider from "../../components/Home/sections/SpotlightSlider";
import HeroSection from "./sections/HeroSection";

gsap.registerPlugin(ScrollTrigger);

type HeroSlide = {
  title: string;
  video: string;
  pillFeatures: {
    title: string;
    features: { icon: string; label: string }[];
  };
};

type CommunityNamesData = {
  heading: string;
  communities: {
    id: string;
    name: string;
    bgImage: string;
    link: string;
  }[];
};

type ImtiazPropertiesData = {
  sectionTitle: string;
  properties: {
    id: number;
    title: string;
    image: string;
    link: string;
    logo: string;
  }[];
};

type ConstructionProgressData = {
  title: string;
  videoSrc: string;
  posterSrc: string;
  description: string;
  button: { label: string; link: string };
};

type AppSectionData = {
  heading: string;
  subtitle: string;
  mobileImage: string;
  leftCircles: { title: string; icon: string }[];
  rightCircles: { title: string; icon: string }[];
  download: {
    text: string;
    googlePlay: string;
    appStore: string;
  };
};

type Props = {
  heroSlides: HeroSlide[];
  heroSlidesComingSoon: HeroSlide[];
  communityNamesData: CommunityNamesData;
  imtiazPropertiesData: ImtiazPropertiesData;
  ConstructionProgressData: ConstructionProgressData;
  appSectionData: AppSectionData;
};

export default function Index({
  heroSlides,
  heroSlidesComingSoon,
  communityNamesData,
  imtiazPropertiesData,
  ConstructionProgressData,
  appSectionData,
}: Props) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const scrollRef = useRef<HTMLImageElement>(null);
  const { unlock } = useLenis();

  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);

  useEffect(() => {
    const startAnimations = () => {
      document.body.style.overflow = "";
      unlock();

      const ctx = gsap.context(() => {
        const t2 = gsap.timeline();
        t2.fromTo(
          titleRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2 },
        ).fromTo(
          scrollRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1 },
          "-=0.3",
        );

        ScrollTrigger.create({
          trigger: "#sec1",
          start: "top top",
          end: "bottom top",
          pin: true,
          pinSpacing: false,
        });
      });

      window.dispatchEvent(new Event("homeAnimationsReady"));
      setTimeout(() => ScrollTrigger.refresh(), 300);
      return () => ctx.revert();
    };

    window.addEventListener("headerAnimationComplete", startAnimations);
    
    return () => window.removeEventListener("headerAnimationComplete", startAnimations);
  }, []);

  return (
    <>
      <HeroSection titleRef={titleRef} scrollRef={scrollRef} />
      <AboutJourneyV3 />
      <ProSliderV3 slides={heroSlides} RightLabel="New Launches" />
      <ProSliderComingSoonV3 slides={heroSlidesComingSoon} RightLabel="Coming Soon" />
      <CommunityNamesSlider slides={communityNamesData} />
      <ImtiazProperties data={imtiazPropertiesData} />
      <ConstructionProgress2 data={ConstructionProgressData} />
      <SpotlightSlider />
      <AppSectionV2 data={appSectionData} />
    </>
  );
}