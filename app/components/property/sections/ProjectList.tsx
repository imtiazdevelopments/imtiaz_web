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
import ContainerAnchor from "../../layout/ContainerAnchor";
import ProjectCardMap from "./ProjectCardMap";
import { moveUp, moveUpV2 } from "../../motionVariants";
import { useLenis } from "@/app/contexts/LenisContext";
import ProjectCard from "../../common/ProjectCard";
import Reveal from "../../animations/RevealOneByOneAnimation";

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
      <ContainerAnchor ref={containerRef} />
      <div>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex flex-col-reverse lg:grid lg:grid-cols-[420px_1fr] xl:grid-cols-[450px_1fr]  2xl:grid-cols-[650px_1fr] 3xl:grid-cols-[749px_1fr] gap-20"
        >
          {/* Left Column */}
          <div
            className="lg:border-r dark:border-white/20 max-md:z-20 relative bg-light-white"
            style={{ paddingLeft: isDesktop ? leftSpacing : "" }}
          >
            {/* Projects List */}
            <div className="relative grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-y-20 gap-x-20 hidden sm:grid 2xl:hidden">
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

            <div className="relative grid grid-cols-1 sm:hidden gap-y-20 2xl:grid">
              {visibleProjects.length > 0 ? (
                visibleProjects?.map((project, index) => (
                  <Reveal
                    variants={moveUpV2}
                    key={project.id}
                    delayRange={index * 0.11}
                  >
                    <ProjectCardMap
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
                ))
              ) : (
                <EmptyState />
              )}
            </div>
          </div>

          {/* Right Column Map for Desktop */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="lg:sticky top-[10px] h-[70vh] lg:h-[calc(100vh-20px)] z-10"
          >
            <div ref={mapContainerRef} className="w-full h-full">
              <Map
                defaultCenter={{
                  lat: parseFloat(projects[0]?.latitude),
                  lng: parseFloat(projects[0]?.longitude),
                }}
                defaultZoom={15}
                mapId="2567b86b459988d06657407f"
                className="w-full h-full "
                gestureHandling="greedy"
                onCameraChanged={handleCameraChanged}
                disableDefaultUI={true}
              >
                {projects?.map((project) => {
                  // Only show markers that are either hovered or inside bounds
                  const isHovered = activeProject === project.id;
                  const isHighlighted = highlighted.includes(project.id);
                  if (!isHovered && !isHighlighted) return null; // Don't render
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
                          ? "/active-icon.svg" // Hovered project
                          : "/inactive-icon.svg", // Project in bounds
                      }}
                      onClick={() => {
                        // Move clicked project to the start of visibleProjects
                        setVisibleProjects((prev) => {
                          const newArr = prev.filter(
                            (p) => p.id !== project.id,
                          ); // remove clicked project
                          return [project, ...newArr]; // add it to the start
                        });
                        setActiveProject(project.id); // set as active
                        // window.scrollTo({ top: 700, behavior: "smooth" }); // scroll to top
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
