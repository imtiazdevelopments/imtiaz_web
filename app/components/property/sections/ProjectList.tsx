"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Map,
  MapCameraChangedEvent,
  Marker,
  useMap,
} from "@vis.gl/react-google-maps";
import { useContainerInset } from "@/app/hooks/useContainerInset"; 
import { moveUp, moveUpV2 } from "../../motionVariants";
import { useLenis } from "@/app/contexts/LenisContext";
import ProjectCard from "../../common/ProjectCard";
import Reveal from "../../animations/RevealOneByOneAnimation";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";
import PropertyCard from "./PropertyCard"; 
import SliderArrowButton from "../../common/SliderNavigationButton"; 

export interface Project {
  id: string;
  image: string;
  hoverImage: string;
  status: string;
  location: string;
  title: string;
  subtitle: string;
  href: string;
  startingFrom: string;
  units: string;
  date: string;
  propertyType: string;
  community: string;
  latitude: string;
  longitude: string;
}

const EmptyState = () => (
  <motion.div
    initial="hidden"
    whileInView="show"
    viewport={{ once: true }}
    className="mb-10 lg:mb-0"
  >
    <motion.p
      initial="hidden"
      whileInView="show"
      variants={moveUp(0)}
      viewport={{ once: true }}
      className="text-2xl"
    >
      No results in this area
    </motion.p>
    <motion.p
      variants={moveUp(0.1)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      Try zooming out, moving the map, or changing your filters.
    </motion.p>
  </motion.div>
);

export default function FeaturedProjects({
  projects,
}: {
  projects: Project[];
}) {
  const [activeProject, setActiveProject] = useState<string>("");
  const swiperRef = useRef<SwiperType | null>(null);
      const [activeIndex, setActiveIndex] = useState(0); 
  useEffect(() => {
    setVisibleProjects([]);
    setHighlighted([]);
    setActiveProject(projects[0]?.id || "");
  }, [projects]);

  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const containerRef = useRef(null);
  const leftSpacing = useContainerInset(containerRef);

  const [visibleProjects, setVisibleProjects] = useState<Project[]>([]);

  const [highlighted, setHighlighted] = useState<string[]>([]);
  const map = useMap();

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const { lock, unlock, scrollTo } = useLenis();

  const handleCameraChanged = (event: MapCameraChangedEvent) => {
    const { bounds } = event.detail || {};
    if (!bounds) return;

    // Filter only from already filtered projects
    const visibleProjectsInBounds = projects.filter(
      (p) =>
        parseFloat(p.latitude) >= bounds.south &&
        parseFloat(p.latitude) <= bounds.north &&
        parseFloat(p.longitude) >= bounds.west &&
        parseFloat(p.longitude) <= bounds.east,
    );

    const visibleIds = visibleProjectsInBounds.map((p) => p.id);

    setVisibleProjects(visibleProjectsInBounds);
    setHighlighted(visibleIds);

    if (visibleProjectsInBounds.length > 0) {
      if (!visibleIds.includes(activeProject)) {
        setActiveProject(visibleProjectsInBounds[0].id);
      }
    } else {
      setActiveProject("");
    }
  };

  useEffect(() => {
    if (!map || projects.length === 0) return;

    const firstProject = projects[0];
    const newCenter = {
      lat: parseFloat(firstProject.latitude),
      lng: parseFloat(firstProject.longitude),
    };

    const currentCenter = map.getCenter();
    if (
      !currentCenter ||
      currentCenter.lat() !== newCenter.lat ||
      currentCenter.lng() !== newCenter.lng
    ) {
      // Smooth pan (Google handles the animation)
      map.panTo(newCenter);
    }

    // Only reset zoom if it’s not already correct
    if (map.getZoom() !== 11) {
      map.setZoom(11);
    }
  }, [projects]);

  const handleEnter = () => {
    if (window.innerWidth >= 1024) lock();
  };
  const handleLeave = () => {
    if (window.innerWidth >= 1024) unlock();
  };
  useEffect(() => {
    const el = mapContainerRef.current;
    if (!el) return;
    el.addEventListener("mouseenter", handleEnter);
    el.addEventListener("mouseleave", handleLeave);
    return () => {
      el.removeEventListener("mouseenter", handleEnter);
      el.removeEventListener("mouseleave", handleLeave);
      unlock();
    };
  }, [lock, unlock]);

  return (
    <section className={`mx-auto ${isDesktop ? "" : "container"}`}>
      {/* <ContainerAnchor ref={containerRef} /> */}
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex flex-col-reverse lg:grid lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 3xl:grid-cols-[749px_1fr] gap-[30px] md:gap-20"
        >
          {/* Left Column */}
          <div className="overflow-hidden">
            {/* Projects List */}
            <div className="relative grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-y-20 gap-x-20 hidden   2xl:hidden">
              {visibleProjects.length > 0 ? (
                visibleProjects?.map((project, index) => (
                  <Reveal
                    variants={moveUpV2}
                    key={project.id}
                    delayRange={index * 0.11}
                  >
                    <ProjectCard {...project} />
                  </Reveal>
                ))
              ) : (
                <EmptyState />
              )}
            </div>

           {visibleProjects.length > 0 ? (
              <>
                {/* ── Mobile: Swiper (< md) ── */}
                <div className="lg:hidden ">
                  <Swiper
                    slidesPerView={1}
                    spaceBetween={10}
                    grabCursor={true}
                    breakpoints={{
                        0: { slidesPerView: 1 }, 
                        768: { slidesPerView: 2 }, 
                      }}
                    modules={[Autoplay]}
                      effect="fade"
                      fadeEffect={{ crossFade: true }}
                        autoplay={{ delay: 5000, disableOnInteraction: false }}
                      loop
                      onSwiper={(swiper) => (swiperRef.current = swiper)}
                      onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}

                    className="!overflow-visible w-full"
                  >
                    {visibleProjects.map((project, index) => (
                      <SwiperSlide key={project.id}>
                        <PropertyCard
                          id={project.id}
                          image={project.image}
                          status={project.status}
                          location={project.location}
                          title={project.title}
                          subtitle={project.subtitle}
                          startingFrom={project.startingFrom}
                          units={project.units}
                          hoverImage={project.hoverImage}
                          setActiveProject={setActiveProject}
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  <div className="flex items-center gap-[15px] justify-center mt-5">
                        <SliderArrowButton
              direction="prev"
              variant="dark"
              onClick={() => swiperRef.current?.slidePrev()}
            />
            <SliderArrowButton
              direction="next"
              variant="dark"
              onClick={() => swiperRef.current?.slideNext()}
            />
                        </div>
                </div>

                {/* ── md+: original grid ── */}
                <div className="hidden lg:grid relative grid-cols-1 gap-y-20 2xl:grid">
                  {visibleProjects.map((project, index) => (
                    <Reveal
                      variants={moveUpV2}
                      key={project.id}
                      delayRange={index * 0.11}
                    >
                      <PropertyCard
                        id={project.id}
                        image={project.image}
                        status={project.status}
                        location={project.location}
                        title={project.title}
                        subtitle={project.subtitle}
                        startingFrom={project.startingFrom}
                        units={project.units}
                        hoverImage={project.hoverImage}
                        setActiveProject={setActiveProject}
                      />
                    </Reveal>
                  ))}
                </div>
              </>
            ) : (
              <EmptyState />
            )}
          </div>

          {/* Right Column Map for Desktop */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="lg:sticky top-[10px] h-[371px] md:h-[70vh] lg:h-[calc(100vh-20px)] z-10"
          >
            {/* Grayscale overlay - affects tiles only, not markers */}
            <div ref={mapContainerRef} className="w-full h-full relative">
              <Map
                defaultCenter={{
                  lat: parseFloat(projects[0]?.latitude),
                  lng: parseFloat(projects[0]?.longitude),
                }}
                defaultZoom={15}
                className="w-full h-full"
                gestureHandling="greedy"
                onCameraChanged={handleCameraChanged}
                disableDefaultUI={true}
                styles={[
                  { elementType: "geometry", stylers: [{ saturation: -100 }] },
                  {
                    elementType: "labels.icon",
                    stylers: [{ saturation: -100 }],
                  },
                  {
                    elementType: "labels.text.fill",
                    stylers: [{ saturation: -100 }],
                  },
                  {
                    elementType: "labels.text.stroke",
                    stylers: [{ saturation: -100 }],
                  },
                  {
                    featureType: "road",
                    elementType: "geometry",
                    stylers: [{ saturation: -100 }],
                  },
                  {
                    featureType: "water",
                    elementType: "geometry",
                    stylers: [{ saturation: -100 }],
                  },
                  {
                    featureType: "poi",
                    elementType: "geometry",
                    stylers: [{ saturation: -100 }],
                  },
                ]}
              >
                {projects?.map((project) => {
                  const isHovered = activeProject === project.id;
                  const isHighlighted = highlighted.includes(project.id);
                  if (!isHovered && !isHighlighted) return null;
                  return (
                    <Marker
                      key={project.id}
                      position={{
                        lat: parseFloat(project.latitude),
                        lng: parseFloat(project.longitude),
                      }}
                      title={project.title}
                      icon={{
                        url: isHovered
                          ? "/active-icon.svg"
                          : "/inactive-icon.svg",
                      }}
                      onClick={() => {
                        setVisibleProjects((prev) => {
                          const newArr = prev.filter(
                            (p) => p.id !== project.id,
                          );
                          return [project, ...newArr];
                        });
                        setActiveProject(project.id);
                        scrollTo(700, { duration: 1.2 });
                      }}
                    />
                  );
                })}
              </Map>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
