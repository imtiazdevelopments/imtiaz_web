"use client";

import { useMemo, useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import FilterDropdown from "../../common/FilterDropdown";
import { Plus } from "lucide-react";
import CustomOutlineButton from "../../common/CustomOutlineButton";
import { properties } from "../data";
import CustomSearch from "../../common/CustomSearch";
import ListMapToggle from "../../common/ListMapToggle";
import ProjectCard from "../../common/ProjectCard";
import { motion } from "framer-motion";
import ProjectList from './ProjectList'
import { APIProvider } from "@vis.gl/react-google-maps";
import { useContainerInset } from "@/app/hooks/useContainerInset";

const NEWS_PER_PAGE = 6;

// ── Filter options ──────────────────────────────────────────────
type PropertyType = "Villa" | "Apartment" | "Townhouse" | "Penthouse" | "Studio" | "";
type PropertyStatus = "Available" | "Sold Out" | "Coming Soon" | "Under Construction" | "";
type Community = "Downtown" | "Waterfront" | "Suburbs" | "Business Bay" | "Old Town" | "";

const propertyTypes: PropertyType[] = ["Villa", "Apartment", "Townhouse", "Penthouse", "Studio"];
const propertyStatuses: PropertyStatus[] = ["Available", "Sold Out", "Coming Soon", "Under Construction"];
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

    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString());
        if (!params.get("page")) {
            params.set("page", "1");
            router.replace(`${pathname}?${params.toString()}`, { scroll: false });
        }
    }, [pathname]);


    const updateParam = (key: string, value: string) => {
        const newsGrid = document.getElementById("news-list");
        const gridTop = newsGrid?.getBoundingClientRect().top ?? 0;
        const absoluteGridTop = window.scrollY + gridTop;

        const params = new URLSearchParams(searchParams.toString());
        if (value) params.set(key, value);
        else params.delete(key);
        params.set("page", "1");
        router.push(`${pathname}?${params.toString()}`, { scroll: false });

        requestAnimationFrame(() => {
            const newGridTop =
                document.getElementById("news-list")?.getBoundingClientRect().top ?? 0;
            const newAbsoluteGridTop = window.scrollY + newGridTop;
            const diff = newAbsoluteGridTop - absoluteGridTop;
            window.scrollBy({ top: -diff, behavior: "instant" });
        });
    };

    const clearFilters = () => {
        router.replace(`${pathname}?page=1`, { scroll: false });
    };

    const hasFilter = selectedPropertyType || selectedStatus || selectedCommunity;

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

            // ✅ LOCAL SEARCH (no URL)
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
    }, [
        selectedPropertyType,
        selectedStatus,
        selectedCommunity,
        searchQuery, // ✅ add dependency
        sorted,
    ]);


    return (
        <section className="w-full bg-white pt-70 pb-120 3xl:pb-160" data-header="dark">
            <div className="">
                {/* ── Desktop (lg+) ── */}
                <div className="hidden xl:flex items-center mb-70 xl:flex-col xl:gap-5 2xl:flex-row container">
                    <div className="flex items-center 3xl:gap-40 gap-2 [@media(min-width:1560px)_and_(max-width:1700px)]:gap-4">
                        <CustomSearch
                            text="Search Projects"
                            onClick={clearFilters}
                            variant="dark"
                            px=""
                            borderColor="border-primary-2"
                            textColor="text-foreground-light"
                            className="w-full md:w-auto !py-[17px] md:!py-5 h-[50px] lg:h-[66px]"
                            value={searchQuery}
                            onChange={setSearchQuery}
                        />
                        <FilterDropdown
                            placeholder="Properties Type"
                            options={propertyTypes}
                            value={selectedPropertyType}
                            onChange={(val) => updateParam("propertyType", val)}
                            className="[@media(min-width:1560px)_and_(max-width:1700px)]:px-4"
                        />
                        <FilterDropdown
                            placeholder="Status"
                            options={propertyStatuses}
                            value={selectedStatus}
                            onChange={(val) => updateParam("status", val)}
                            className="[@media(min-width:1560px)_and_(max-width:1700px)]:px-4"
                        />
                        <FilterDropdown
                            placeholder="Community"
                            options={communities}
                            value={selectedCommunity}
                            onChange={(val) => updateParam("community", val)}
                            className="[@media(min-width:1560px)_and_(max-width:1700px)]:px-4"
                        />
                        <CustomOutlineButton
                            text="Clear Filters"
                            onClick={clearFilters}
                            variant="dark"
                            px="px-60"
                            borderColor="border-primary-2"
                            textColor="text-foreground-light"
                            className="w-full md:w-auto !py-[17px] md:!py-5 h-[50px] lg:h-[66px] uppercase [@media(min-width:1560px)_and_(max-width:1700px)]:px-4"
                        />
                    </div>
                    <div className="justify-end flex-1 flex pr-3">
                        <ListMapToggle view={view} setView={setView} />
                    </div>
                </div>

                <div className="w-full mb-50 container">
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

                <div className="container">
                    <CustomSearch
                        text="Search Projects"
                        onClick={clearFilters}
                        variant="dark"
                        px=""
                        borderColor="border-primary-2"
                        textColor="text-foreground-light"
                        className="w-full py-4 lg:h-[56px] mb-5 block xl:hidden"
                        value={searchQuery}
                        onChange={setSearchQuery}
                    />

                </div>

                {/* ── Mobile (below lg) ── */}
                <div className="xl:hidden mb-70 container">
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
                            maxHeight: filtersOpen ? "500px" : "0px",
                            opacity: filtersOpen ? 1 : 0,
                        }}
                    >
                        <div className="flex flex-col gap-3 pt-4">

                            <FilterDropdown
                                placeholder="Property Type"
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
                                    text="Clear Filters"
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
                </div>

                <section className="w-full">
                    {view === "list" ? (
                        <div className="flex flex-col justify-center container">
                            <div className="text-center">
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-y-50 gap-x-30 xl:gap-x-[28px]">
                                    {filtered.map((project, i) => (
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
                </section>

            </div>
        </section>
    );
};

export default Main;