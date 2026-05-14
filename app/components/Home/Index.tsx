"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "../../contexts/LenisContext";
import ProSliderComingSoonV3 from "../../components/Home/sections/ProSliderComingSoonV3";
import FpfSection from "../../components/Home/sections/FpfSection";
import ProSliderV3 from "../../components/Home/sections/ProsliderV3";
import ImtiazProperties from "../../components/Home/sections/ImtiazPropsSlider";
import ConstructionProgress2 from "../../components/Home/sections/ConstructionProgress2";
import AppSectionV2 from "../../components/Home/sections/AppSection";
import CommunityNamesSlider from "../../components/Home/sections/CommunityNamesSlider";
import AboutJourneyV3 from "../../components/Home/sections/AboutJourneyV3";
import SpotlightSlider from "../../components/Home/sections/SpotlightSlider";
import HeroSection from "./sections/HeroSection";
import { HomePageResponse } from "./data";
import { promotion } from "./data";

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
  promotion: HeroSlide[];
  communityNamesData: CommunityNamesData;
  imtiazPropertiesData: ImtiazPropertiesData;
  ConstructionProgressData: ConstructionProgressData;
  appSectionData: AppSectionData;
  data:HomePageResponse['data']
};

export default function Index({
  heroSlides,
  heroSlidesComingSoon,
  ConstructionProgressData,
  appSectionData,
  data
}: Props) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const scrollRef = useRef<HTMLImageElement>(null);
  const searchRef = useRef<HTMLImageElement>(null);
  const mobsearchRef = useRef<HTMLImageElement>(null);
  
  
  const { unlock } = useLenis();

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

useEffect(() => {
  let ctx: gsap.Context | null = null;

  const startAnimations = () => {
    if (ctx) return;
    document.body.style.overflow = "";
    unlock();

    ctx = gsap.context(() => {
      const t2 = gsap.timeline();
      t2.fromTo(
        titleRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2 },
      ).fromTo(
        searchRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        "-=0.3",
      ).fromTo(
        scrollRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        "-=0.3",
      ).fromTo(
        mobsearchRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        "-=0.3",
      );
    });

    window.dispatchEvent(new Event("homeAnimationsReady"));
    setTimeout(() => ScrollTrigger.refresh(), 300);
  };

  window.addEventListener("headerAnimationComplete", startAnimations);

  return () => {
    window.removeEventListener("headerAnimationComplete", startAnimations);
    ctx?.revert();
    ctx = null;
  };
}, []);


const communityNamesData = {
  heading: "IMTIAZ COMMUNITIES",
  communities: data.communities.map((community, index) => ({
    id: (index + 1).toString(),
    name: community.title,
    bgImage: community.featured_image_desktop,
    link: `/community/${community.slug}`,
  })),
};

const imtiazPropertiesData = {
  sectionTitle: "OFF-PLAN PROPERTIES",

  properties: data.properties.map((property, index) => ({
    id: (index + 1).toString(),
    title: property.title,
    image: property.featured_image_desktop,
    link: `/property/${property.slug}`,
    location: property.property_community,
    hoverImage: property.brand_logo,
    startingFrom:property.icon1_text,
    units:property.icon2_text
  })),
};

const spotlight = {
  title: "Press Spotlight",
  viewAllHref: "/news",
  slides: data.news.map((item, index) => ({
    id: `spotlight-${index + 1}`,
    date: item.post_date,
    title: item.title,
    href: `/news/${item.slug}`,
    image: item.featured_image_desktop,
    alt: item.featured_image_alt,
  })),
};

  return (
    <>
      <HeroSection titleRef={titleRef} scrollRef={scrollRef} searchRef={searchRef} mobsearchRef={mobsearchRef}/>
      <AboutJourneyV3 />
      <ProSliderV3 slides={heroSlides} RightLabel="New Launches" />
      <ProSliderComingSoonV3
        slides={heroSlidesComingSoon}
        RightLabel="Coming Soon"
      />
      <FpfSection />
      <CommunityNamesSlider slides={communityNamesData} />
      <ImtiazProperties data={imtiazPropertiesData} />
      <ConstructionProgress2 data={ConstructionProgressData} />
      <SpotlightSlider data={spotlight}/>
      <AppSectionV2 data={appSectionData} />
    </>
  );
}
