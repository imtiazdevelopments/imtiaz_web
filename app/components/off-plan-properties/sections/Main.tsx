"use client";

import { useMemo, useEffect, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import FilterDropdown from "../../common/FilterDropdown";
import { SlidersHorizontal } from "lucide-react";
import CustomOutlineButton from "../../common/CustomOutlineButton";
import { offPlanProperties } from "../data";
import ListMapToggle from "../../common/ListMapToggle";
import ProjectCard from "../../common/ProjectCard";
import { motion } from "framer-motion";
import ProjectList from "../../property/sections/ProjectList";
import { APIProvider } from "@vis.gl/react-google-maps";
import { SectionHeading } from "../../animations/SectionHeading";
import { SectionDescription } from "../../animations/SectionDescription";
import { moveUp } from "../../motionVariants";
import Pagination from "../../common/Pagination";
import Image from "next/image";

const NEWS_PER_PAGE = 6;

type PropertyType = "Villa" | "Apartment" | "Townhouse" | "Penthouse" | "Studio" | "";
type PriceRange = "Under AED 1M" | "AED 1M - 3M" | "AED 3M - 5M" | "Above AED 5M" | "";
type Bedroom = "1" | "2" | "3" | "4" | "5+" | "";

const propertyTypes: PropertyType[] = ["Villa", "Apartment", "Townhouse", "Penthouse", "Studio"];
const priceRanges: PriceRange[] = ["Under AED 1M", "AED 1M - 3M", "AED 3M - 5M", "Above AED 5M"];
const bedrooms: Bedroom[] = ["1", "2", "3", "4", "5+"];

const parsePrice = (raw: string): number => {
  const match = raw?.replace(/,/g, "").match(/[\d.]+/);
  return match ? parseFloat(match[0]) : 0;
};

const priceInRange = (raw: string, range: PriceRange): boolean => {
  const price = parsePrice(raw);
  if (range === "Under AED 1M") return price < 1;
  if (range === "AED 1M - 3M") return price >= 1 && price <= 3;
  if (range === "AED 3M - 5M") return price > 3 && price <= 5;
  if (range === "Above AED 5M") return price > 5;
  return true;
};

const Main = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedPropertyType = (searchParams.get("propertyType") as PropertyType) || "";
  const selectedPriceRange = (searchParams.get("priceRange") as PriceRange) || "";
  const selectedBedroom = (searchParams.get("bedroom") as Bedroom) || "";
  const currentPage = Number(searchParams.get("page") || "1");
  const [view, setView] = useState<"list" | "map">("list");

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (!params.get("page")) {
      params.set("page", "1");
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
  }, [pathname]);

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const clearFilters = () => {
    router.replace(`${pathname}?page=1`, { scroll: false });
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const hasFilter = selectedPropertyType || selectedPriceRange || selectedBedroom;

  const sorted = useMemo(
    () => [...offPlanProperties].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    [],
  );

  const filtered = useMemo(() => {
    return sorted.filter((item) => {
      if (selectedPropertyType && item.propertyType !== selectedPropertyType) return false;
      if (selectedPriceRange && !priceInRange(item.startingFrom, selectedPriceRange)) return false;
      if (selectedBedroom) {
        const match = item.units?.match(/(\d+)BR\s*-\s*(\d+)BR/);
        if (match) {
          const min = parseInt(match[1]);
          const max = parseInt(match[2]);
          const bed = selectedBedroom === "5+" ? 5 : parseInt(selectedBedroom);
          if (bed < min || bed > max) return false;
        }
      }
      return true;
    });
  }, [selectedPropertyType, selectedPriceRange, selectedBedroom, sorted]);

  const totalPages = Math.ceil(filtered.length / NEWS_PER_PAGE);

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * NEWS_PER_PAGE;
    return filtered.slice(start, start + NEWS_PER_PAGE);
  }, [filtered, currentPage]);

  return (
    <section className="w-full bg-white pt-70" data-header="dark">
      {/* ── Filter Bar ── */}
      <div className="w-full container">
<div className="mb-70">
  <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-20">
    {/* Left: filter dropdowns */}
    <div className="flex items-center gap-20 3xl:gap-40">
      <FilterDropdown
        placeholder="All Bedrooms"
        options={bedrooms}
        value={selectedBedroom}
        onChange={(val) => updateParam("bedroom", val)}
      />
      <FilterDropdown
        placeholder="Price Range"
        options={priceRanges}
        value={selectedPriceRange}
        onChange={(val) => updateParam("priceRange", val)}
      />
      <FilterDropdown
        placeholder="Property Type"
        options={propertyTypes}
        value={selectedPropertyType}
        onChange={(val) => updateParam("propertyType", val)}
      />
      {/* More Filters — dummy */}
      <button className="min-w-[220px] 3xl:w-[253px] h-[50px] lg:h-[66px] flex items-center justify-between px-[26.5px] rounded-full bg-[#EBEBEC] font-[avenirHeavy] text-16 text-foreground-light">
        <span>More Filters</span>
        <Image src="/icons/filter.svg" alt="filter" width={30} height={30} className="h-[20px] w-auto" />
      </button>
    </div>

    {/* Right: Clear Filter — no toggle here */}
    <div className="flex items-center justify-end xl:justify-between gap-20 3xl:gap-50">
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
        <div className="flex xl:hidden 2xl:block">
    <ListMapToggle view={view} setView={setView} />
  </div>
    </div>
  </div>

  {/* List/Map toggle — only visible between xl and 2xl */}
  <div className="hidden xl:flex 2xl:hidden justify-end mt-20">
    <ListMapToggle view={view} setView={setView} />
  </div>
</div>

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

      {/* ── Heading ── */}
      <div className="container mb-50 text-center" id="properties-list">
        <SectionHeading
          title="Available Off Plan Properties"
          className="mb-20 text-foreground"
        />
        <SectionDescription
          className="text-description text-foreground-light"
          text={`Showing ${filtered.length === 0 ? 0 : (currentPage - 1) * NEWS_PER_PAGE + 1}–${Math.min(currentPage * NEWS_PER_PAGE, filtered.length)} of ${filtered.length} premium developments`}
        />
      </div>

      {/* ── Cards / Map ── */}
      <section className="w-full mb-120 3xl:mb-160">
        {view === "list" ? (
          <div className="flex flex-col justify-center container">
            <div className="text-center">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-y-50 gap-x-30 xl:gap-x-[28px]">
                {paginated.map((project, i) => (
                  <ProjectCard key={i} {...project} />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full h-full">
            <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API as string}>
              <ProjectList projects={filtered} />
            </APIProvider>
          </div>
        )}

        {/* ── Pagination ── */}
        {totalPages > 1 && (
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