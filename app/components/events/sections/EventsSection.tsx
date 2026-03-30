"use client";

import { useMemo, useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import {
  eventItems,
  eventCategories,
  eventYears,
  eventMonths,
  EventCategory,
  EventYear,
  EventMonth,
} from "../data";
import Pagination from "../../common/Pagination";
import FilterDropdown from "../../common/FilterDropdown";
import EventCard from "./EventCard";
import { Plus } from "lucide-react";

const EVENTS_PER_PAGE = 6;

const EventsSection = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const selectedTopic = (searchParams.get("topic") as EventCategory) || "";
  const selectedYear = (searchParams.get("year") as EventYear) || "";
  const selectedMonth = (searchParams.get("month") as EventMonth) || "";
  const currentPage = Number(searchParams.get("page") || "1");

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

  const hasFilter = selectedTopic || selectedYear || selectedMonth;

  const sorted = useMemo(
    () =>
      [...eventItems].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      ),
    [],
  );

  const filtered = useMemo(() => {
    return sorted.filter((item) => {
      if (selectedTopic && item.category !== selectedTopic) return false;
      if (selectedYear && !item.date.startsWith(selectedYear)) return false;
      if (selectedMonth) {
        const monthIndex = new Date(`${selectedMonth} 1`).getMonth();
        const itemMonth = new Date(item.date).getMonth();
        if (itemMonth !== monthIndex) return false;
      }
      return true;
    });
  }, [selectedTopic, selectedYear, selectedMonth, sorted]);

  const totalPages = Math.ceil(filtered.length / EVENTS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * EVENTS_PER_PAGE,
    currentPage * EVENTS_PER_PAGE,
  );

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <section className="w-full bg-white pt-70 pb-160">
      <div className="container">
        {/* Filters Row */}
        {/* ── Desktop (lg+) ── */}
        <div className="hidden lg:flex items-center justify-between mb-70">
          <div className="flex items-center gap-30">
            <FilterDropdown
              placeholder="Topics"
              options={eventCategories}
              value={selectedTopic}
              onChange={(val) => updateParam("topic", val)}
            />
            <FilterDropdown
              placeholder="Year"
              options={eventYears}
              value={selectedYear}
              onChange={(val) => updateParam("year", val)}
            />
            <FilterDropdown
              placeholder="Month"
              options={eventMonths}
              value={selectedMonth}
              onChange={(val) => updateParam("month", val)}
            />
          </div>

          {hasFilter && (
            <button
              onClick={clearFilters}
              className="cursor-pointer uppercase px-60 3xl:px-[62px] py-5 rounded-full border border-primary-2 text-foreground-light font-[avenirRoman] text-19 leading-[100%] hover:bg-primary-2/10 transition-colors duration-300"
            >
              Clear Filter
            </button>
          )}
        </div>

        {/* ── Mobile (below lg) ── */}
        <div className="lg:hidden mb-70">
          {/* Toggle button */}
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

          {/* Collapsible content */}
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
                placeholder="Topics"
                options={eventCategories}
                value={selectedTopic}
                onChange={(val) => updateParam("topic", val)}
              />
              <FilterDropdown
                placeholder="Year"
                options={eventYears}
                value={selectedYear}
                onChange={(val) => updateParam("year", val)}
              />
              <FilterDropdown
                placeholder="Month"
                options={eventMonths}
                value={selectedMonth}
                onChange={(val) => updateParam("month", val)}
              />

              {hasFilter && (
                <button
                  onClick={clearFilters}
                  className="w-full cursor-pointer uppercase py-4 rounded-full border border-primary-2 text-foreground-light font-[avenirRoman] text-16 leading-[100%] hover:bg-primary-2/10 transition-colors duration-300"
                >
                  Clear Filter
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="w-full h-px bg-black/10 my-50" />

        {/* Cards Grid */}
        <div id="events-list" className="scroll-mt-20">
          {paginated.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-30 md:gap-40">
              {paginated.map((item) => (
                <EventCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <p className="text-center text-black/40 font-[avenirRoman] text-[16px] py-20">
              No events found.
            </p>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="w-full flex justify-center">
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
              scrollToId="events-list"
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default EventsSection;
