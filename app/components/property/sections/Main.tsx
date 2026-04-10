"use client";

import { useMemo, useEffect, useState, useRef, useCallback } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import FilterDropdown from "../../common/FilterDropdown";
import CustomOutlineButton from "../../common/CustomOutlineButton";
import { properties } from "../data";
import ListMapToggle from "../../common/ListMapToggle";
import ProjectCard from "../../common/ProjectCard";
import { motion } from "framer-motion";
import ProjectList from "./ProjectList";
import { APIProvider } from "@vis.gl/react-google-maps";
import { containerStagger, moveUp, moveUpV2 } from "../../motionVariants";
import Pagination from "../../common/Pagination";
import { Plus } from "lucide-react";
import Reveal from "../../animations/RevealOneByOneAnimation";
import CustomSearch from "../../common/CustomSearch";

// ── Filter options ──────────────────────────────────────────────
type PropertyType = "Villa" | "Apartment" | "Townhouse" | "Penthouse" | "Studio" | "";
type PropertyStatus = "Available" | "Off Plan" | "Completed" | "Under Construction" | "";
type Community = "Downtown" | "Waterfront" | "Suburbs" | "Business Bay" | "Old Town" | "";

const propertyTypes: PropertyType[] = ["Villa", "Apartment", "Townhouse", "Penthouse", "Studio"];
const propertyStatuses: PropertyStatus[] = ["Available", "Off Plan", "Completed", "Under Construction"];
const communities: Community[] = ["Downtown", "Waterfront", "Suburbs", "Business Bay", "Old Town"];
// ────────────────────────────────────────────────────────────────

const Main = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const selectedPropertyType = (searchParams.get("propertyType") as PropertyType) || "";
  const selectedStatus = (searchParams.get("status") as PropertyStatus) || "";
  const selectedCommunity = (searchParams.get("community") as Community) || "";
  const currentPage = Number(searchParams.get("page") || "1");
  const [searchQuery, setSearchQuery] = useState("");
  const [view, setView] = useState<"list" | "map">("list");

  const [itemsPerPage, setItemsPerPage] = useState(6);

  useEffect(() => {
    const update = () => {
      setItemsPerPage(window.innerWidth >= 1600 ? 8 : 6);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (!params.get("page")) {
      params.set("page", "1");
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
  }, [pathname]);

  const updateParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) params.set(key, value);
      else params.delete(key);
      params.set("page", "1");
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [searchParams, pathname, router],
  );

  const clearFilters = useCallback(() => {
    setSearchQuery("");
    router.replace(`${pathname}?page=1`, { scroll: false });
  }, [pathname, router]);

  const handlePageChange = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", String(page));
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [searchParams, pathname, router],
  );

  const hasFilter = selectedPropertyType || selectedStatus || selectedCommunity || searchQuery;

  const sorted = useMemo(
    () =>
      [...properties].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      ),
    [],
  );

  const filtered = useMemo(() => {
    return sorted.filter((item) => {
      if (selectedPropertyType && item.propertyType !== selectedPropertyType) return false;
      if (selectedStatus && item.status !== selectedStatus) return false;
      if (selectedCommunity && item.community !== selectedCommunity) return false;

      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matches =
          item.title.toLowerCase().includes(q) ||
          item.community.toLowerCase().includes(q) ||
          item.propertyType.toLowerCase().includes(q);
        if (!matches) return false;
      }

      return true;
    });
  }, [selectedPropertyType, selectedStatus, selectedCommunity, searchQuery, sorted]);

  const totalPages = useMemo(
    () => Math.ceil(filtered.length / itemsPerPage),
    [filtered.length, itemsPerPage],
  );

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filtered.slice(start, start + itemsPerPage);
  }, [filtered, currentPage, itemsPerPage]);

  return (
    <section className="w-full bg-white pt-70" data-header="dark">
      <div className="w-full container">

        {/* ── Mobile: collapsible filter (below lg) ── */}
        <div className="lg:hidden mb-70">
          <motion.div
            variants={moveUp(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <button
              onClick={() => setFiltersOpen((prev) => !prev)}
              className="flex items-center justify-between w-full px-6 py-4 rounded-full border border-primary-2 text-foreground-light text-description uppercase cursor-pointer"
            >
              <span>Filters</span>
              <span
                className="transition-transform duration-300 ease-in-out"
                style={{
                  transform: filtersOpen ? "rotate(45deg)" : "rotate(0deg)",
                }}
              >
                <Plus size={20} />
              </span>
            </button>
            <div
              ref={contentRef}
              className="transition-all duration-400 ease-in-out"
              style={{
                maxHeight: filtersOpen ? "600px" : "0px",
                opacity: filtersOpen ? 1 : 0,
              }}
            >
              <div className="flex flex-col gap-3 pt-4">
                {/* Search inside mobile collapsible */}
                <CustomSearch
                  className="!py-[17px] md:!py-5 h-[50px] lg:h-[66px]"
                  borderColor="border-primary-2"
                  textColor="text-foreground-light"
                  value={searchQuery}
                  onChange={setSearchQuery}
                />
                <FilterDropdown
                  placeholder="Properties Type"
                  options={propertyTypes}
                  value={selectedPropertyType}
                  onChange={(val) => updateParam("propertyType", val)}
                />
                <FilterDropdown
                  placeholder="Status"
                  options={propertyStatuses}
                  value={selectedStatus}
                  onChange={(val) => updateParam("status", val)}
                />
                <FilterDropdown
                  placeholder="Community"
                  options={communities}
                  value={selectedCommunity}
                  onChange={(val) => updateParam("community", val)}
                />
                {hasFilter && (
                  <CustomOutlineButton
                    text="Clear Filter"
                    onClick={clearFilters}
                    variant="dark"
                    px="px-60"
                    borderColor="border-primary-2"
                    textColor="text-foreground-light"
                    className="w-full md:w-auto !py-[17px] md:!py-5 h-[50px] lg:h-[66px] uppercase"
                  />
                )}
              </div>
            </div>
          </motion.div>
          <motion.div
            variants={moveUp(0.17)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex lg:hidden justify-center mt-40"
          >
            <ListMapToggle view={view} setView={setView} />
          </motion.div>
        </div>

        {/* ── Desktop: filter bar (lg+) ── */}
        <div className="hidden lg:block mb-70">
          <motion.div
            variants={containerStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex flex-col xl:flex-row xl:items-center justify-between gap-40"
          >
            {/* Left: search + filter dropdowns */}
            <motion.div
              variants={containerStagger}
              className="flex items-center gap-20 3xl:gap-40"
            >
              {/* Search — replaces first filter slot */}
              <motion.div variants={moveUp(0)} className="w-full">
                <CustomSearch
                  className="!py-[17px] md:!py-5 h-[50px] lg:h-[66px]"
                  borderColor="border-primary-2"
                  textColor="text-foreground-light"
                  value={searchQuery}
                  onChange={setSearchQuery}
                />
              </motion.div>

              <motion.div variants={moveUp(0.1)} className="w-full">
                <FilterDropdown
                  placeholder="Properties Type"
                  options={propertyTypes}
                  value={selectedPropertyType}
                  onChange={(val) => updateParam("propertyType", val)}
                />
              </motion.div>

              <motion.div variants={moveUp(0.15)} className="w-full">
                <FilterDropdown
                  placeholder="Status"
                  options={propertyStatuses}
                  value={selectedStatus}
                  onChange={(val) => updateParam("status", val)}
                />
              </motion.div>

              <motion.div variants={moveUp(0.2)} className="w-full">
                <FilterDropdown
                  placeholder="Community"
                  options={communities}
                  value={selectedCommunity}
                  onChange={(val) => updateParam("community", val)}
                />
              </motion.div>
            </motion.div>

            {/* Right: Clear Filter + toggle */}
            <div className="flex items-center justify-end xl:justify-between gap-20 3xl:gap-50">
              {hasFilter && (
                <motion.div
                  className="w-full md:w-auto"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 50 }}
                  transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <CustomOutlineButton
                    text="Clear Filter"
                    onClick={clearFilters}
                    variant="dark"
                    px="px-60"
                    borderColor="border-primary-2"
                    textColor="text-foreground-light"
                    className="w-full md:w-auto !py-[17px] md:!py-5 h-[50px] lg:h-[66px] uppercase"
                  />
                </motion.div>
              )}
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={moveUp(0.15)}
                className={`flex ${hasFilter ? "xl:hidden min-[1800px]:block" : ""}`}
              >
                <ListMapToggle view={view} setView={setView} />
              </motion.div>
            </div>
          </motion.div>

          {/* List/Map toggle — only between xl and 2xl when filter active */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={moveUp(0.15)}
            className={`hidden ${hasFilter ? "xl:flex min-[1800px]:hidden" : ""} justify-end mt-20`}
          >
            <ListMapToggle view={view} setView={setView} />
          </motion.div>
        </div>

        {/* ── Divider ── */}
        <div className="w-full mb-50">
          <div className="relative w-full h-px overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-black/10 origin-center"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />
          </div>
        </div>
      </div>

      {/* ── Cards / Map ── */}
      <section className="w-full mb-120 3xl:mb-160" id="properties-list">
        {view === "list" ? (
          <div className="flex flex-col justify-center container">
            <div className="text-center">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-4 gap-y-50 gap-x-30 xl:gap-x-[28px]">
                {paginated.map((project, i) => (
                  <Reveal variants={moveUpV2} key={i} delayRange={i * 0.11}>
                    <ProjectCard {...project} />
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={moveUp(0.1)}
            className="w-full h-full"
          >
            <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API as string}>
              <ProjectList projects={filtered} />
            </APIProvider>
          </motion.div>
        )}

        {/* ── Pagination ── */}
        {view === "list" && totalPages > 1 && (
          <motion.div
            variants={moveUp(0.15)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="w-full flex justify-center"
          >
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
              scrollToId="properties-list"
            />
          </motion.div>
        )}
      </section>
    </section>
  );
};

export default Main;